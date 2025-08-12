import { useCallback } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
// @mui
import { alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// api
// import {
//   updateColumn,
//   clearColumn,
//   deleteColumn,
//   deleteTask,
// } from 'src/api/kanban';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
// types
import { IKanbanColumn, IKanbanTask } from 'src/types/kanban';
import { ITaskBoard, IUpdateTask } from 'src/types/taskboard';
// redux
import { useDispatch } from 'src/redux/store';
import { createTask, getTaskBoards, updateTask } from 'src/redux/slices/taskboard';
//
import KanbanTaskAdd from './taskboard-task-add';
import KanbanTaskItem from './taskboard-task-item';
import KanbanColumnToolBar from './taskboard-column-tool-bar';

// ----------------------------------------------------------------------

type Props = {
  column: IKanbanColumn;
  tasks: Record<string, IKanbanTask>;
  index: number;
  projectId: string;
  taskboards: ITaskBoard[];
  debouncedDateRangeQuery: [Date | null, Date | null];
};

export default function KanbanColumn({
  column,
  tasks,
  index,
  projectId,
  taskboards,
  debouncedDateRangeQuery,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const openAddTask = useBoolean();
  const extractId = (Id: string) => Id.match(/(?<=-)[a-f\d]{24}(?=\d*$)/)?.[0];

  const handleUpdateColumn = useCallback(
    async (columnName: string) => {
      try {
        if (column.name !== columnName) {
          // updateColumn(column.id, columnName);

          enqueueSnackbar('Update success!', {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    // [column.id, column.name, enqueueSnackbar]
    [column.name, enqueueSnackbar]
  );

  const handleClearColumn = useCallback(async () => {
    try {
      // clearColumn(column.id);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteColumn = useCallback(async () => {
    try {
      // deleteColumn(column.id);

      enqueueSnackbar('Delete success!', {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } catch (error) {
      console.error(error);
    }
  }, [enqueueSnackbar]);

  const handleAddTask = useCallback(
    async (taskData: IKanbanTask) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, assignee, comments, due, reporter, labels, status, ...rest } = taskData;
      const boardId = extractId(column.id);

      const postData = {
        ...rest,
        board_id: boardId,
        project_id: projectId,
      };

      try {
        const res = await dispatch(createTask(postData));
        if (res?.data?.status) {
          dispatch(
            getTaskBoards(
              projectId,
              debouncedDateRangeQuery[0] as Date,
              debouncedDateRangeQuery[1] as Date
            )
          );
        }
        openAddTask.onFalse();
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, openAddTask, projectId, dispatch,debouncedDateRangeQuery]
  );
  // eslint-enable-next-line @typescript-eslint/no-unused-vars

  const handleUpdateTask = useCallback(
    async (taskData: IUpdateTask) => {
      const { id, due, assignee, ...rest } = taskData;
      const boardId = extractId(column.id);
      const taskId = extractId(id as string);

      const postData = {
        board_id: boardId,
        project_id: projectId,
        task_id: taskId,
        start_date: due?.startDate,
        end_date: due?.endDate,
        assignee_id: assignee?.map((assign: any) => assign.id),
        ...rest,
      };
      try {
        const res = await dispatch(updateTask(postData));
        if (res?.data?.status) {
          dispatch(
            getTaskBoards(
              projectId,
              debouncedDateRangeQuery[0] as Date,
              debouncedDateRangeQuery[1] as Date
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, dispatch, projectId, debouncedDateRangeQuery]
  );

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      try {
        // deleteTask(column.id, taskId);

        enqueueSnackbar('Delete success!', {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [enqueueSnackbar]
  );

  const renderAddTask = (
    <Stack
      spacing={2}
      sx={{
        pb: 3,
      }}
    >
      {openAddTask.value && (
        <KanbanTaskAdd
          status={column.name}
          onAddTask={handleAddTask}
          onCloseAddTask={openAddTask.onFalse}
        />
      )}

      <Button
        fullWidth
        size="large"
        color="inherit"
        startIcon={
          <Iconify
            icon={openAddTask.value ? 'solar:close-circle-broken' : 'mingcute:add-line'}
            width={18}
            sx={{ mr: -0.5 }}
          />
        }
        onClick={openAddTask.onToggle}
        sx={{ fontSize: 14 }}
      >
        {openAddTask.value ? 'Close' : 'Add Task'}
      </Button>
    </Stack>
  );

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            px: 2,
            borderRadius: 2,
            bgcolor: 'background.neutral',
            ...(snapshot.isDragging && {
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.24),
            }),
          }}
        >
          <Stack {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={column.name}
              onUpdateColumn={handleUpdateColumn}
              onClearColumn={handleClearColumn}
              onDeleteColumn={handleDeleteColumn}
            />

            <Droppable droppableId={column.id} type="TASK">
              {(dropProvided) => (
                <Stack
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  spacing={2}
                  sx={{
                    py: 3,
                    width: 280,
                  }}
                >
                  {column.taskIds.map((taskId, taskIndex) => (
                    <KanbanTaskItem
                      key={taskId}
                      index={taskIndex}
                      task={tasks[taskId]}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={() => handleDeleteTask(taskId)}
                      taskboards={taskboards}
                    />
                  ))}
                  {dropProvided.placeholder}
                </Stack>
              )}
            </Droppable>

            {renderAddTask}
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
