import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
// import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// types
import { IKanbanTask } from 'src/types/kanban';
import { IUpdateTask } from 'src/types/taskboard';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, {
  RHFAutocompleteMultiple,
  RHFDueDatePicker,
  RHFTaskPriorityButton,
  RHFTaskTextField,
  RHFTextField,
} from 'src/components/hook-form';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
//
import { types } from 'src/assets/data/config';
import { getComments, createComment } from 'src/redux/slices/taskboard';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from 'src/auth/hooks';
import KanbanDetailsToolbar from './roadmap-details-toolbar';
import KanbanContactsDialog from './roadmap-contacts-dialog';
// import KanbanDetailsAttachments from './taskboard-details-attachments';
import KanbanDetailsCommentList from './roadmap-details-comment-list';
import KanbanDetailsCommentInput from './roadmap-details-comment-input';
import KanbanDetailsAttachments from './roadmap-details-attachments';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}));

// ----------------------------------------------------------------------

// type INewAssignees = {
//   id: string;
//   name: string;
// };

// ----------------------------------------------------------------------

type Props = {
  task: IKanbanTask;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  //
  onUpdateTask: (updateTask: IUpdateTask) => void;
  onDeleteTask: VoidFunction;
};

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  //
  onUpdateTask,
  onDeleteTask,
}: Props) {
  const dispatch = useDispatch();

  // const [priority, setPriority] = useState(task.priority);
  const [attachments, setAttachments] = useState(task?.attachments);

  const { user, isAdmin } = useAuthContext();

  const like = useBoolean();

  const contacts = useBoolean();

  const extractId = (id: string) => id.match(/(?<=-)[a-f\d]{24}(?=\d*$)/)?.[0];
  const taskId = extractId(task.id as string);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Task Name is required'),
    priority: Yup.string().required('Task Priority is required'),
    description: Yup.string().required('Task Description is required'),
    due: Yup.mixed(),
    assignee: Yup.mixed(),
    type: Yup.mixed(),
    etatime: Yup.string().required('Estimated time is required'),
    // members_id: Yup.array().min(1, 'Project Member are required'),
  });
  const defaultValues = useMemo(
    () => ({
      name: task?.name || '',
      // due: task?.due || []
      due:
        task?.due && Array.isArray(task?.due) && task?.due?.length > 0
          ? {
              startDate: task.due[0] ? new Date(task.due[0]) : null,
              endDate: task.due[1] ? new Date(task.due[1]) : null,
            }
          : [],
      priority: task?.priority || '',
      description: task?.description || '',
      attachments: [...attachments] || '',
      assignee: (task?.assignee || []).map((assignee) => ({
        id: assignee.id.replace('user-', ''),
        name: assignee.name,
      })),
      type: task?.labels && Array.isArray(task.labels) ? task?.labels[0] : task?.labels,
      etatime: task?.etatime || '',
      time: task?.time || '',
      // members_id: task?.members?.map((member: any) => ({
      //   label: member.name,
      //   value: member._id,
      // })) || [],
    }),
    [task, attachments]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { watch, handleSubmit } = methods;

  const values = watch();

  const rangePicker = useDateRangePicker(
    values && values.due[0] ? values.due[0] : task.due[0],
    values && values.due[1] ? values.due[1] : task.due[1]
  );
  const onSubmit = handleSubmit(async (data) => {
    try {
      const addImages: any = [];
      const removeImages: any = [];
      const uploadPromises = attachments.map(async (file: any) => {
        if (file instanceof File) {
          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await axios.post('/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            const imageUrl = response.data.result.image_url;
            addImages.push(imageUrl);
          } catch (uploadError) {
            console.error('Error uploading file:', uploadError);
          }
        } else {
          // If it's not a File, it's an existing attachment that should be kept
          addImages.push(file);
        }
      });
      await Promise.all(uploadPromises);

      // Remove images that should be removed
      const updatedAttachments = [...addImages, ...removeImages];
      setAttachments(updatedAttachments);

      onUpdateTask({
        ...data,
        id: task.id,
        attachments: updatedAttachments,
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleCommentSubmit = async (comment: string) => {
    try {
      let postData;
      if (isAdmin) {
        postData = {
          admin_id: user?.id || user?._id,
          task_id: taskId as string,
          comment_text: comment,
        };
      } else {
        postData = {
          user_id: user?._id,
          task_id: taskId as string,
          comment_text: comment,
        };
      }
      await dispatch(createComment(postData));
      await dispatch(getComments(taskId as string));
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const renderComments = <KanbanDetailsCommentList task_id={taskId as string} />;
  const renderCommentInput = <KanbanDetailsCommentInput onCommentSubmit={handleCommentSubmit} />;

  const renderHead = (
    <KanbanDetailsToolbar
      liked={like.value}
      taskName={task.name}
      onLike={like.onToggle}
      onDelete={onDeleteTask}
      taskStatus={task.status}
      onCloseDetails={onCloseDetails}
      onSubmit={onSubmit}
    />
  );

  const renderName = <RHFTaskTextField name="name" placeholder="Task Name" />;

  const renderReporter = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Reporter</StyledLabel>
      <Avatar alt={task.reporter?.name} src={task.reporter?.avatarUrl} />
    </Stack>
  );

  const renderAssignee = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

      <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
        {values.assignee.map((assigneeUser: any) => (
          <Tooltip title={assigneeUser?.name} arrow placement="top">
            <Avatar key={assigneeUser?.id} src={assigneeUser?.name} alt={assigneeUser?.name} />
          </Tooltip>
        ))}

        <Tooltip title="Add assignee">
          <IconButton
            onClick={contacts.onTrue}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>

        <KanbanContactsDialog
          roadmap_id={values.assignee}
          open={contacts.value}
          onClose={contacts.onFalse}
        />
      </Stack>
    </Stack>
  );

  const renderLabel = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

      {/* {!!task.labels.length && (
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
          {task.labels.map((label) => (
            <Chip key={label} color="info" label={label} size="small" variant="soft" />
          ))}
        </Stack>
      )} */}
      <RHFAutocompleteMultiple
        name="type"
        freeSolo
        size="small"
        sx={{
          width: '34%',
        }}
        options={(types?.map((option: any) => option) as readonly any[]) ?? []}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option.toUpperCase()}
          </li>
        )}
      />
    </Stack>
  );
  const renderEtaTime = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>ETA TIME</StyledLabel>
      <RHFTextField
        name="etatime"
        size="small"
        sx={{
          width: '34%',
        }}
        disabled={!!task.etatime && task.etatime.length > 0}
      />
    </Stack>
  );
  const renderTime = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px', display: 'flex' }}>
        COMPLETED IN
      </StyledLabel>
      <RHFTextField
        name="time"
        size="small"
        sx={{
          width: '34%',
        }}
      />
    </Stack>
  );

  const renderDueDate = (
    <Stack direction="row" alignItems="center">
      <StyledLabel> Due date </StyledLabel>

      {rangePicker.selected ? (
        <Button size="small" onClick={rangePicker.onOpen}>
          {rangePicker.shortLabel}
        </Button>
      ) : (
        <Tooltip title="Add due date">
          <IconButton
            onClick={rangePicker.onOpen}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>
      )}

      <RHFDueDatePicker
        name="due"
        title="Select Date Range"
        variant="calendar"
        open={rangePicker.open}
        onClose={rangePicker.onClose}
        onNewChangeStartDate={rangePicker.onChangeStartDate}
        onNewChangeEndDate={rangePicker.onChangeEndDate}
      />
    </Stack>
  );

  const renderPriority = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Priority</StyledLabel>

      {/* <KanbanDetailsPriority priority={priority} onChangePriority={handleChangePriority} /> */}
      <RHFTaskPriorityButton name="priority" />
    </Stack>
  );

  const renderDescription = (
    <Stack direction="row">
      <StyledLabel> Description </StyledLabel>

      <RHFTextField name="description" multiline size="small" />
    </Stack>
  );

  const renderAttachments = (
    <Stack direction="row">
      <StyledLabel>Attachments</StyledLabel>
      <KanbanDetailsAttachments
        attachments={attachments}
        setAttachments={(file: any) => setAttachments(file)}
      />
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Drawer
        open={openDetails}
        onClose={onCloseDetails}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: {
            width: {
              xs: 1,
              sm: 480,
            },
          },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              pt: 3,
              pb: 5,
              px: 2.5,
            }}
          >
            {renderName}

            {renderReporter}

            {renderAssignee}

            {renderLabel}

            {renderEtaTime}

            {task.status === 'Completed' && renderTime}

            {renderDueDate}

            {renderPriority}

            {renderDescription}

            {renderAttachments}
          </Stack>
          {renderComments}
        </Scrollbar>

        {renderCommentInput}
      </Drawer>
    </FormProvider>
  );
}
