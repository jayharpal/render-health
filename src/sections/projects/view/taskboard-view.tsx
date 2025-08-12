'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSnackbar } from 'src/components/snackbar';
// redux
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification, getTaskBoards, updateTask } from 'src/redux/slices/taskboard';
import { getProjectById } from 'src/redux/slices/projects';
import Scrollbar from 'src/components/scrollbar/scrollbar';
//
import { useAuthContext } from 'src/auth/hooks';
import { useDebounce } from 'src/hooks/use-debounce';
import FormProvider, { RHFDueDatePicker } from 'src/components/hook-form';
import { Box } from '@mui/system';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';
import { Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import KanbanColumn from '../taskboard-column';
// import KanbanColumnAdd from '../taskboard-column-add';
import { KanbanColumnSkeleton } from '../taskboard-skeleton';
import KanbanColumnAdd from '../taskboard-column-add';
// ----------------------------------------------------------------------

type TaskBoardProps = {
  projectId: string;
};

interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

interface ColumnCollection {
  [key: string]: Column;
}

interface Task {
  id: string;
  due: [Date, Date];
  status: string;
  labels: string[];
  complexity: string[];
  comments: any[]; // You can replace 'any' with a specific comment interface if needed
  assignee: any;
  priority: string;
  attachments: any[]; // You can replace 'any' with a specific attachment interface if needed
  reporter: any;
  name: string;
  description: string;
  etatime?: string;
  time?: string;
  reporter_id?: string[];
  assignee_id?: string[];
  task_id?: string;
}

// interface Ordered {
//   id: string;
// }

interface TaskCollection {
  [key: string]: Task;
}
// interface OrderedCollection {
//   [key: string]: Ordered;
// }

export default function TaskBoardView({ projectId }: TaskBoardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { isAdmin } = useAuthContext();
  const dispatch = useDispatch();
  const {
    isLoading: boardLoading,
    notification,
    variant,
  } = useSelector((state: RootState) => state.taskboard);

  const { taskboards } = useSelector((state: RootState) => state.taskboard);
  const { project } = useSelector((state: RootState) => state.projects);

  const initialStartDate = searchParams.get('startDate');
  const initialEndDate = searchParams.get('endDate');

  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([
    initialStartDate ? new Date(initialStartDate) : null,
    initialEndDate ? new Date(initialEndDate) : null,
  ]);

  const debouncedDateRangeQuery = useDebounce(selectedDateRange, 150);

  const methods = useForm();

  const rangePicker = useDateRangePicker(
    selectedDateRange[0] || new Date(),
    selectedDateRange[1] || new Date()
  );

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setSelectedDateRange([startDate, endDate]);

    const newQuery = new URLSearchParams(searchParams.toString());
    if (startDate) newQuery.set('startDate', startDate.toISOString());
    if (endDate) newQuery.set('endDate', endDate.toISOString());

    router.push(`?${newQuery.toString()}`);
  };

  const onNewChangeStartDate = (startDate: Date | null) => {
    rangePicker.onChangeStartDate(startDate);
    handleDateChange(startDate, selectedDateRange[1]);
  };

  const onNewChangeEndDate = (endDate: Date | null) => {
    rangePicker.onChangeEndDate(endDate);
    handleDateChange(selectedDateRange[0], endDate);
  };

  useEffect(() => {
    dispatch(
      getTaskBoards(
        projectId,
        debouncedDateRangeQuery[0] as Date,
        debouncedDateRangeQuery[1] as Date
      )
    );
  }, [projectId, debouncedDateRangeQuery, dispatch]);

  useEffect(() => {
    dispatch(getProjectById(projectId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const transformData = (taskboardData: any) => {
    const columns: ColumnCollection = {};
    const tasks: TaskCollection = {};
    const ordered: string[] = [];

    taskboardData.forEach((board: any, boardIndex: number) => {
      const columnId = `${boardIndex + 1}-column-${board._id}${boardIndex + 1}`;
      columns[columnId] = {
        id: columnId,
        name: board.name,
        taskIds: board.taskList.map(
          (task: any, taskIndex: number) => `${taskIndex + 1}-task-${task._id}${taskIndex + 1}`
        ),
      };

      board.taskList.forEach((task: any, taskIndex: number = 0) => {
        const taskId = `${taskIndex + 1}-task-${task._id}${taskIndex + 1}`;
        tasks[taskId] = {
          id: taskId,
          due: [task?.start_date, task?.end_date],
          status: board.name,
          labels: task?.type ? [task?.type] : [],
          complexity: task?.complexity ? [task?.complexity] : [],
          comments: [],
          assignee: task?.assignee?.map((assignee: any) => ({
            id: `user-${assignee._id}`,
            name: assignee.name,
            avatarUrl: '', // Add the assignee's avatar URL here
          })),
          priority: task?.priority,
          attachments: task?.attachments,
          reporter: task?.reporter?.map((reporter: any) => ({
            id: `user-${reporter._id}`,
            name: reporter.email,
            avatarUrl: '', // Add the reporter's avatar URL here
          })),
          name: task?.name,
          description: task?.description,
          etatime: task?.etatime,
          time: task?.time,
          task_id: task?.task_id,
        };
      });

      const orderId = `${boardIndex + 1}-column-${board._id}${boardIndex + 1}`;
      ordered.push(orderId);
    });

    return { board: { columns, tasks, ordered } };
  };

  const { board } = transformData(taskboards);

  const onDragEnd = useCallback(
    async ({ destination, source, draggableId, type }: DropResult) => {
      try {
        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }

        // Moving column
        if (type === 'COLUMN') {
          const newOrdered = [...board.ordered];

          newOrdered.splice(source.index, 1);

          newOrdered.splice(destination.index, 0, draggableId);

          // moveColumn(newOrdered);
          return;
        }

        const sourceColumn = board?.columns[source.droppableId];

        const destinationColumn = board?.columns[destination.droppableId];

        // Moving task to same list
        if (sourceColumn.id === destinationColumn.id) {
          const newTaskIds = [...sourceColumn.taskIds];

          newTaskIds.splice(source.index, 1);

          newTaskIds.splice(destination.index, 0, draggableId);

          // moveTask({
          //   ...board?.columns,
          //   [sourceColumn.id]: {
          //     ...sourceColumn,
          //     taskIds: newTaskIds,
          //   },
          // });

          console.info('Moving to same list!');

          return;
        }

        // Moving task to different list
        const sourceTaskIds = [...sourceColumn.taskIds];

        const destinationTaskIds = [...destinationColumn.taskIds];

        // Remove from source
        const srcId = sourceTaskIds.splice(source.index, 1);

        // Insert into destination
        destinationTaskIds.splice(destination.index, 0, draggableId);

        const extractId = (id: string) => id.match(/(?<=-)[a-f\d]{24}(?=\d*$)/)?.[0];
        const boardId = extractId(destinationColumn.id);
        const taskId = extractId(srcId[0]);

        const updateTaskData = {
          board_id: boardId as string,
          project_id: projectId,
          task_id: taskId as string,
        };

        const res = await dispatch(updateTask(updateTaskData));
        if (res?.data?.status) {
          dispatch(
            getTaskBoards(
              projectId,
              debouncedDateRangeQuery[0] as Date,
              debouncedDateRangeQuery[1] as Date
            )
          );
        }

        // moveTask({
        //   ...board?.columns,
        //   [sourceColumn.id]: {
        //     ...sourceColumn,
        //     taskIds: sourceTaskIds,
        //   },
        //   [destinationColumn.id]: {
        //     ...destinationColumn,
        //     taskIds: destinationTaskIds,
        //   },
        // });

        console.info('Moving to different list!');
      } catch (error) {
        console.error(error);
      }
    },
    [board?.columns, board?.ordered, projectId, dispatch, debouncedDateRangeQuery]
  );

  const renderSkeleton = (
    <Stack direction="row" alignItems="flex-start" spacing={3}>
      {[...Array(4)].map((_, index) => (
        <KanbanColumnSkeleton key={index} index={index} />
      ))}
    </Stack>
  );

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, dispatch, enqueueSnackbar, variant]);

  const handleDateClear = () => {
    setSelectedDateRange([null, null]);
    methods.setValue('due', { startDate: null, endDate: null });

    rangePicker.onChangeStartDate(null);
    rangePicker.onChangeEndDate(null);

    rangePicker.onClose();

    const newQuery = new URLSearchParams(searchParams.toString());
    newQuery.delete('startDate');
    newQuery.delete('endDate');
    router.push(`?${newQuery.toString()}`);
  };

  const renderDueDate = (
    <Stack direction="row" alignItems="center">
      {rangePicker.open ? (
        <Button
          variant="outlined"
          startIcon={<Iconify icon="lets-icons:date-today-duotone-line" />}
          size="large"
          onClick={rangePicker.onOpen}
        >
          {rangePicker.shortLabel}
        </Button>
      ) : (
        <Stack direction="row" alignItems="center" columnGap="20px">
          {selectedDateRange[0] && selectedDateRange[1] ? (
            <>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="lets-icons:date-today-duotone-line" />}
                size="large"
                onClick={rangePicker.onOpen}
              >
                {rangePicker.shortLabel}
              </Button>
              <Button
                color="error"
                onClick={handleDateClear}
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              >
                Clear
              </Button>
            </>
          ) : (
            <Button
              sx={{
                paddingRight: { xs: '1rem', sm: '2rem' },
                fontSize: { xs: '0.75rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                textAlign: 'center',
              }}
              variant="outlined"
              startIcon={<Iconify icon="lets-icons:date-today-duotone-line" />}
              size="large"
              onClick={rangePicker.onOpen}
            >
              Select Date Range
            </Button>

          )}
        </Stack>
      )}
      <FormProvider methods={methods}>
        <RHFDueDatePicker
          name="due"
          title="Select Date Range"
          variant="calendar"
          open={rangePicker.open}
          onClose={rangePicker.onClose}
          onNewChangeStartDate={onNewChangeStartDate}
          onNewChangeEndDate={onNewChangeEndDate}
        />
      </FormProvider>
    </Stack>
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        columnGap="20px"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Typography variant="h4">{project?.name} - Taskboard</Typography>
        {renderDueDate}
      </Box>

      {boardLoading && renderSkeleton}

      {/* {(!board || (board && Array.isArray(board) && board.length <= 0)) && (
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            maxHeight: { md: 480 },
          }}
        />
      )} */}

      {/* {!!board?.ordered.length && ( */}
      <Scrollbar sx={{ height: '70vh' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal">
            {(provided) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  p: 0.25,
                  height: 1,
                  // overflowY: 'hidden',
                  // ...hideScroll.x,
                }}
              >
                {board?.ordered.map((columnId, index) => (
                  <KanbanColumn
                    index={index}
                    key={columnId}
                    column={board?.columns[columnId]}
                    tasks={board?.tasks}
                    projectId={projectId}
                    taskboards={taskboards}
                    debouncedDateRangeQuery={debouncedDateRangeQuery}
                  />
                ))}

                {provided.placeholder}

                {isAdmin && <KanbanColumnAdd projectId={projectId as string} />}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollbar>
      {/* )}s */}
    </Container>
  );
}
