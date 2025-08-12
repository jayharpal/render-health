import { useState, useCallback, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useForm } from 'react-hook-form';
// types
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getInterns } from 'src/redux/slices/interns';
import { IIntern } from 'src/types/interns';
import FormProvider from 'src/components/hook-form/form-provider';
import { IRoadmapUser } from 'src/types/roadmap';
import { assignRoadmap, getRoadmapsAllUser, removeAssign } from 'src/redux/slices/roadmap_users';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type INewAssignees = {
  id: string;
  roadmap_id: string;
  name: string;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  roadmap_id: string;
};

export default function KanbanInternsDialog({ open, onClose, roadmap_id }: Props) {
  const [searchIntern, setSearchIntern] = useState('');
  const dispatch = useDispatch();
  const { interns } = useSelector((state: RootState) => state.interns);
  const { roadmap_users } = useSelector((state) => state.roadmap_users);

  useEffect(() => {
    dispatch(getInterns());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getRoadmapsAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSearchInterns = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIntern(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: interns,
    query: searchIntern,
  });

  const notFound = !dataFiltered.length && !!searchIntern;

  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    // defaultValues,
  });

  const { watch, setValue } = methods;
  const values = watch();

  const [isAddingAssignee, setIsAddingAssignee] = useState(false);

  const handleAddAssignee = async (newAssignees: INewAssignees) => {
    if (isAddingAssignee) return;

    setIsAddingAssignee(true);

    const assignees = values.assignee || [];

    const isAlreadyAssigned = roadmap_users.some(
      (user: IRoadmapUser) =>
        user.user_id === newAssignees.id && user.roadmap_id === newAssignees.roadmap_id
    );

    if (!isAlreadyAssigned) {
      try {
        const response = await dispatch(
          assignRoadmap({ roadmap_id: newAssignees.roadmap_id, user_id: newAssignees.id })
        );

        if (response?.data?.status) {
          const updatedAssignees = [...assignees, newAssignees];
          setValue('assignee', updatedAssignees);
          dispatch(getRoadmapsAllUser());
        } else {
          console.error('Failed to assign roadmap');
        }
      } catch (error) {
        console.error('Error assigning roadmap:', error);
      } finally {
        setIsAddingAssignee(false);
      }
    } else {
      setIsAddingAssignee(false);
    }
  };

  const handleRemoveAssignee = async (internId: string) => {
    const assignees = values.assignee || [];
    const updatedAssignees = assignees.filter((as: any) => as.id !== internId);
    setValue('assignee', updatedAssignees);

    const roadmapUser = roadmap_users.find((user: IRoadmapUser) => user.user_id === internId);
    if (roadmapUser) {
      const { _id } = roadmapUser;
      const res = await dispatch(removeAssign(_id as string));
      if (res) {
        dispatch(getRoadmapsAllUser());
      }
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods}>
        <DialogTitle sx={{ pb: 0 }}>
          Interns <Typography component="span">({interns.length})</Typography>
        </DialogTitle>

        <Box sx={{ px: 3, py: 2.5 }}>
          <TextField
            fullWidth
            value={searchIntern}
            onChange={handleSearchInterns}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <DialogContent sx={{ p: 0 }}>
          {notFound ? (
            <SearchNotFound query={searchIntern} sx={{ mt: 3, mb: 10 }} />
          ) : (
            <Scrollbar
              sx={{
                px: 2.5,
                height: ITEM_HEIGHT * 6,
              }}
            >
              {dataFiltered.map((intern) => {
                const isAssigned = roadmap_users.some(
                  (user: IRoadmapUser) =>
                    user.user_id === intern._id && user.roadmap_id === roadmap_id
                );

                return (
                  <ListItem
                    key={intern._id}
                    disableGutters
                    secondaryAction={
                      <Button
                        size="small"
                        color={isAssigned ? 'primary' : 'inherit'}
                        startIcon={
                          <Iconify
                            width={16}
                            icon={isAssigned ? 'eva:checkmark-fill' : 'mingcute:add-line'}
                            sx={{ mr: -0.5 }}
                          />
                        }
                        onClick={() =>
                          !isAssigned
                            ? handleAddAssignee({
                                id: intern._id as string,
                                roadmap_id,
                                name: intern.name,
                              })
                            : handleRemoveAssignee(intern._id as string)
                        }
                      >
                        {isAssigned ? 'Assigned' : 'Assign'}
                      </Button>
                    }
                    sx={{ height: ITEM_HEIGHT }}
                  >
                    <ListItemAvatar>
                      <Avatar src={intern?.name} alt={intern?.name} />
                    </ListItemAvatar>

                    <ListItemText
                      primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                      secondaryTypographyProps={{ typography: 'caption' }}
                      primary={intern.name}
                      secondary={intern.email}
                    />
                  </ListItem>
                );
              })}
            </Scrollbar>
          )}
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }: { inputData: IIntern[]; query: string }) {
  if (query) {
    inputData = inputData.filter(
      (intern) =>
        intern.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        intern.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
