import * as Yup from 'yup';

// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import { Box, Tooltip, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import React, { useState, useMemo } from 'react';
import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { createComment, getComments } from 'src/redux/slices/taskboard';
import { extractId } from 'src/utils/helper';
import { IAssignee, ICommentAdd } from 'src/types/taskboard';
import Iconify from 'src/components/iconify/iconify';
import AssigneeDialog from './taskboard-comment-dialog';
// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}));

type CommentFormProps = {
  assignees: IAssignee[];
  isAdmin: boolean;
  task_id: string;
};

export default function KanbanDetailsCommentInput({ assignees, isAdmin, task_id }: CommentFormProps) {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState<IAssignee[]>([]);

  const NewUserSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    is_private: Yup.boolean(),
    recipient_user: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      comment: '',
      is_private: false,
      recipient_user: []
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { comment, is_private } = data;
      const postData: ICommentAdd = {
        task_id,
        comment_text: comment,
        is_private,
      };
      if (isAdmin) {
        postData.recipient_user_id = selectedAssignees.map((assignee) => extractId(assignee.id, 1));
      }
      await dispatch(createComment(postData));
      await dispatch(getComments(task_id));
      reset();
      setSelectedAssignees([]);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleAddAssignees = (newAssignee: IAssignee) => {
    setSelectedAssignees((prevSelected) => [
      ...prevSelected,
      newAssignee,
    ]);
  };

  const handleRemoveAssignees = (assigneeId: string) => {
    setSelectedAssignees((prevSelected) =>
      prevSelected.filter((selected) => selected.id !== assigneeId)
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack direction="column" spacing={3} sx={{ py: 3, px: 2.5 }}>
        <Stack direction="row" spacing={2} >
          <Avatar src={user?.photoURL || user?.name || ''} alt={user?.name} />
          <RHFTextField
            name='comment'
            fullWidth
            multiline
            rows={3}
            placeholder="Type a message"
          />
        </Stack>

        <Stack
          direction={isAdmin ? "column" : "row"}
          ml={6.9}
          gap={3}
          justifyContent="space-between"
        >
          {isAdmin ? (
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Private for</StyledLabel>
                <AvatarGroup max={8}
                  sx={{
                    [`& .${avatarGroupClasses.avatar}`]: {
                      width: 24,
                      height: 24,
                    },
                    flexWrap: "wrap",
                  }}
                >
                  {selectedAssignees.map((assignee) => (
                    <Tooltip key={assignee.id} title={assignee.name} arrow placement="top" >
                      <Avatar src={assignee.name} alt={assignee.name || ''} />
                    </Tooltip>
                  ))}
                </AvatarGroup>
                <Tooltip title="Add assignee" arrow placement="top" >
                  <IconButton
                    onClick={handleOpenDialog} sx={{
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                      border: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                  >
                    <Iconify icon="mingcute:add-line" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <AssigneeDialog
                open={open}
                onClose={handleCloseDialog}
                assignees={assignees}
                selectedAssignees={selectedAssignees}
                onAddAssignees={handleAddAssignees}
                onRemoveAssignees={handleRemoveAssignees}
              />
            </Box>
          ) : (
            <RHFSwitch name='is_private' label="Private" boxSx={{ order: 1 }} />
          )}

          <Box sx={{ order: isAdmin ? 2 : 0 }}>
            <LoadingButton loading={isSubmitting} variant="contained" type='submit'>
              Comment
            </LoadingButton>
          </Box>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
