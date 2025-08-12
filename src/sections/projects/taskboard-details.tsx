import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// types
import { IKanbanTask } from 'src/types/kanban';
import { ITaskBoard, IUpdateTask } from 'src/types/taskboard';
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
import { complexity, types } from 'src/assets/data/config';
import { useAuthContext } from 'src/auth/hooks';
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import KanbanDetailsToolbar from './taskboard-details-toolbar';
import KanbanContactsDialog from './taskboard-contacts-dialog';
import KanbanDetailsCommentList from './taskboard-details-comment-list';
import KanbanDetailsCommentInput from './taskboard-details-comment-input';
import KanbanDetailsAttachments from './taskboard-details-attachments';
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

type INewAssignees = {
  id: string;
  name: string;
};

// ----------------------------------------------------------------------

type Props = {
  task: IKanbanTask;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  //
  onUpdateTask: (updateTask: IUpdateTask) => void;
  onDeleteTask: VoidFunction;
  taskboards: ITaskBoard[];
};

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  //
  onUpdateTask,
  onDeleteTask,
  taskboards
}: Props) {
  const [attachments, setAttachments] = useState(task?.attachments);

  const { isAdmin } = useAuthContext();

  const like = useBoolean();

  const contacts = useBoolean();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const extractId = (id: string) => id.match(/(?<=-)[a-f\d]{24}(?=\d*$)/)?.[0];
  let taskId: string | undefined;
  if (isAdmin) {
    taskId = extractId(task.id as string);
  } else {
    taskId = task?.task_id;
  }

  const TaskSchema = Yup.object().shape({
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
      complexity: task?.complexity && Array.isArray(task.complexity) ? task?.complexity[0] : task?.complexity,
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
    resolver: yupResolver(TaskSchema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  const values = watch();

  const handleAddAssignee = (newAssignees: INewAssignees) => {
    const updatedAssignees = [...values.assignee, newAssignees];
    setValue('assignee', updatedAssignees);
  };

  const handleRemoveAssignee = (internId: string) => {
    const updatedAssignees = values.assignee.filter((as: any) => as.id !== internId);
    setValue('assignee', updatedAssignees);
  };

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

  const assignees = task.assignee || [];

  const renderComments = (
    <KanbanDetailsCommentList task_id={taskId as string} />
  );

  const renderCommentInput = (
    <KanbanDetailsCommentInput
      task_id={taskId as string}
      assignees={assignees}
      isAdmin={isAdmin}
    />
  );

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
          assignee={values.assignee}
          open={contacts.value}
          onClose={contacts.onFalse}
          onAddAssignees={handleAddAssignee}
          onRemoveAssignees={handleRemoveAssignee}
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

  const renderComplexity = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Complexity</StyledLabel>
      <RHFAutocompleteMultiple
        name="complexity"
        size="small"
        freeSolo
        sx={{
          width: '34%',
        }}
        options={(complexity?.map((option: any) => option) as readonly any[]) ?? []}
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

  const tasks = taskboards.flatMap((board: ITaskBoard) =>
    board?.taskList?.flatMap((taskItem) =>
      (taskItem.user_task || []).map((userTaskItem) => ({
        name: userTaskItem.user?.name || 'Unknown',
        taskName: taskItem.name,
        boardName: userTaskItem.board_data?.name || taskItem.board_data?.name,
        etaTime: taskItem.etatime,
        taskId: taskItem._id,
      }))
    )
  ).filter(taskItem => taskItem?.taskId === taskId && taskItem?.taskName === task?.name);

  const renderUserStatuses = (
    <Box sx={{ p: 2, overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Board Name</TableCell>
              <TableCell>ETA Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((taskItem, index) => (
              <TableRow key={index}>
                <TableCell>{taskItem?.name}</TableCell>
                <TableCell>{taskItem?.taskName}</TableCell>
                <TableCell>{taskItem?.boardName}</TableCell>
                <TableCell>{taskItem?.etaTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderOverview = (
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
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

          {renderComplexity}

          {renderEtaTime}

          {task.status === 'Completed' && renderTime}

          {renderDueDate}

          {renderPriority}

          {renderDescription}

          {renderAttachments}
        </Stack>
      </FormProvider>
    </Scrollbar>
  );

  return (
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}
      </FormProvider>

      <Divider />
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          backgroundColor: 'background.neutral',
          minHeight: "52px",
          '& .MuiTabs-scroller': {
            padding: '8px',
          },
          '& .MuiTab-root': {
            borderRadius: '8px',
            padding: '10px 0px',
            zIndex: 1,
            fontSize: '0.75rem',
            minHeight: "auto",
            margin: "0px !important",
            width: "100%"
          },
          '& .MuiTabs-indicator': {
            paddingY: "12px",
            background: (theme) => theme.palette.background.paper,
            borderRadius: '8px',
            height: "33px",
            top: "calc(50% - 15.5px)",
            bottom: "calc(50% - 15.5px)",
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
            boxShadow: (theme) => theme.customShadows.z12,
          }
        }}
      >
        <Tab label="Overview" />
        <Tab label="Comments" />
        {isAdmin && <Tab label="Userwise Status" />}
      </Tabs>
      <Divider />

      {tabIndex === 0 && renderOverview}
      {tabIndex === 1 && renderComments}
      {tabIndex === 1 && renderCommentInput}
      {isAdmin && tabIndex === 2 && renderUserStatuses}

    </Drawer >
  );
}
