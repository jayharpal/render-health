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
// types
import { IKanbanAssignee } from 'src/types/kanban';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getInterns } from 'src/redux/slices/interns';
import { IIntern } from 'src/types/interns';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type INewAssignees = {
  id: string;
  name: string;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  assignee?: IKanbanAssignee[];
  onAddAssignees: (newAssignees: INewAssignees) => void;
  onRemoveAssignees: (id: string) => void;
};

export default function KanbanInternsDialog({
  assignee = [],
  open,
  onClose,
  onAddAssignees,
  onRemoveAssignees,
}: Props) {
  const [searchIntern, setSearchIntern] = useState('');
  const dispatch = useDispatch();
  const { interns } = useSelector((state: RootState) => state.interns);
  const { project } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(getInterns());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchInterns = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIntern(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: interns,
    query: searchIntern,
    membersIds: project?.members_id || [],
  });

  const notFound = !dataFiltered.length && !!searchIntern;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
        Interns <Typography component="span">({dataFiltered.length})</Typography>
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
              const checked = assignee.map((person) => person.id).includes(intern._id as string);

              return (
                <ListItem
                  key={intern._id}
                  disableGutters
                  secondaryAction={
                    <Button
                      size="small"
                      color={checked ? 'primary' : 'inherit'}
                      startIcon={
                        <Iconify
                          width={16}
                          icon={checked ? 'eva:checkmark-fill' : 'mingcute:add-line'}
                          sx={{ mr: -0.5 }}
                        />
                      }
                      onClick={() =>
                        !checked
                          ? onAddAssignees({ id: intern._id as string, name: intern.name })
                          : onRemoveAssignees(intern._id as string)
                      }
                    >
                      {checked ? 'Assigned' : 'Assign'}
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
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query, membersIds, }: { inputData: IIntern[]; query: string; membersIds: string[]; }) {
  inputData = inputData.filter((intern) => membersIds.includes(intern._id as string));

  if (query) {
    inputData = inputData.filter(
      (intern) =>
        intern.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        intern.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}
