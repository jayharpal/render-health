import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link, Avatar } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { ICommunityQuestion } from 'src/types/community';
import { Box } from '@mui/system';
import { enqueueSnackbar } from 'notistack';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  clearNotification,
  createCommunityAnswer,
  getCommunityAnswer,
} from 'src/redux/slices/community_answer';
import { useAuthContext } from 'src/auth/hooks';
import { deleteCommunityQuestion, getCommunityQuestion } from 'src/redux/slices/community_question';
import ProjectNewFolderDialog from './community-new-edit-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: ICommunityQuestion;
  editRowData: ICommunityQuestion | null;
  isAdmin: boolean;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  onClose?: VoidFunction;
};

export default function CommunityTableRow({
  row,
  isAdmin,
  onDeleteRow,
  onEditRow,
  editRowData,
  onClose,
}: Props) {
  const { notification, variant } = useSelector((state: RootState) => state.community_answer);
  const theme = useTheme();

  const { content, updatedAt, _id, user: userData } = row;

  const details = useBoolean();

  const confirm = useBoolean();

  const edit = useBoolean();

  const popover = usePopover();

  const { user } = useAuthContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, variant, dispatch]);
  const defaultStyles = {
    borderTop: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
  };
  const NewCommunityAnswerSchema = Yup.object().shape({
    content: Yup.string().required('Answer is required'),
  });

  const defaultValues = useMemo(
    () => ({
      content: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewCommunityAnswerSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const postData = {
        user_id: user?.id || user?._id,
        content: data?.content,
        community_question_id: row._id,
      };
      const res = await dispatch(createCommunityAnswer(postData));
      if (res?.data?.status) {
        dispatch(getCommunityAnswer());
        methods.reset();
        onClose?.();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteCommunityQuestion(row._id as string));
      if (res.data.status) {
        dispatch(getCommunityQuestion());
      }
      onDeleteRow();
    } catch (error) {
      console.error('Error deleting roadmap:', error);
    }
  };
  const isSelf = user?._id === row?.user_id;

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 2,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: theme.customShadows.z20,
            },
          },
          [`& .${tableCellClasses.root}`]: {
            ...defaultStyles,
          },
          ...(details.value && {
            [`& .${tableCellClasses.root}`]: {
              ...defaultStyles,
            },
          }),
        }}
      >
        <TableCell>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="center" columnGap="10px">
              <Avatar
                variant="rounded"
                src={userData?.name || userData?.email}
                alt={userData?.name || userData?.email}
              />
              <Stack>
                <Link
                  href={paths.dashboard.community.id(_id as string)}
                  color="black"
                  fontSize="14px"
                  fontWeight="bold"
                >
                  Question : {content}
                </Link>
                <Typography variant="subtitle2">by {userData?.name || userData?.email}</Typography>
                {row?.updatedAt && row?.updatedAt !== row?.createdAt && (
                  <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                    (edited)
                  </Typography>
                )}
              </Stack>
            </Stack>

            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '10px',
                }}
              >
                <RHFTextField
                  fullWidth
                  multiline
                  rows={3}
                  name="content"
                  placeholder="Your Answer"
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="medium"
                  loading={isSubmitting}
                  sx={{
                    width: '150px',
                  }}
                >
                  Answer
                </LoadingButton>
              </Box>
            </FormProvider>
          </Stack>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack alignItems="start" justifyContent="flex-start">
            <ListItemText
              primary={format(new Date(updatedAt as string), 'dd MMM yyyy')}
              secondary={format(new Date(updatedAt as string), 'p')}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                mt: 0.5,
                component: 'span',
                typography: 'caption',
              }}
            />
          </Stack>
        </TableCell>

        <TableCell
          align="right"
          sx={{
            px: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {(isAdmin || isSelf) && (
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            edit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />

      <ProjectNewFolderDialog
        currentCommunityQuestion={editRowData}
        open={edit.value}
        onClose={edit.onFalse}
      />
    </>
  );
}
