'use client';

import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// api
// import { moveColumn } from 'src/api/kanban';
// components
import EmptyContent from 'src/components/empty-content';
import { useSnackbar } from 'src/components/snackbar';
// redux
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification } from 'src/redux/slices/taskboard';
import Scrollbar from 'src/components/scrollbar/scrollbar';
//
import { getRoadMapById, updateRoadmap } from 'src/redux/slices/roadmap';
import { extractId } from 'src/utils/helper';
import KanbanColumn from '../roadmap-column';
// import KanbanColumnAdd from '../taskboard-column-add';
import { KanbanColumnSkeleton } from '../roadmap-skeleton';

// ----------------------------------------------------------------------

type RoadMapProps = {
  roadmapId: string;
};

interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

interface ColumnCollection {
  [key: string]: Column;
}
interface Project {
  _id: string;
  project_id?: string;
  color_code: string;
  name: string;
  taskList: [];
}
interface Projectdata {
  _id: string;
  color_code: string;
  name: string;
  taskList: {
    _id: string;
    reporter_id: string[]; // Update the type based on your requirements
    assignee_id: string[]; // Update the type based on your requirements
    type: string;
    priority: string;
    attachments: any[]; // Update the type based on your requirements
    is_deleted: boolean;
    user_id: string;
    board_id: string;
    project_id: string;
    name: string;
    // Add other properties as needed
  }[];
}

interface Task {
  id: string;
  due: [Date, Date];
  status: string;
  labels: string[];
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

export default function RoadMapTaskBoardView({ roadmapId }: RoadMapProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    isLoading: boardLoading,
    notification,
    variant,
  } = useSelector((state: RootState) => state.roadmap);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsdata, setProjectsdata] = useState<Projectdata[]>([]);

  const { roadmap } = useSelector((state: RootState) => state.roadmap);

  useEffect(() => {
    dispatch(getRoadMapById(roadmapId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmapId]);

  useEffect(() => {
    if (roadmap && roadmap.projects) {
      const updatedProjects: Project[] = roadmap.projects.map((project) => ({
        _id: project._id || '', 
        project_id: project.project_id,
        color_code: '#fff',
        name: project.name || '', 
        taskList: [],
      }));
      const sortedProjects = roadmap?.project_sequence?.map((seqProject) => {
        const foundProject = updatedProjects.find((proj) => proj._id === seqProject.project_id);
        return foundProject;
      }).filter(Boolean);

      setProjects(sortedProjects as Project[]);
    }
  }, [roadmap]);

  useEffect(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const newData: Projectdata[] = projects.map((project) => ({
        _id: project._id,
        name: project.name,
        color_code: '#fff',
        taskList: [
          {
            _id: '',
            reporter_id: [],
            assignee_id: [],
            type: '',
            priority: '',
            attachments: [],
            is_deleted: false,
            user_id: '',
            board_id: project._id,
            project_id: '',
            name: project.name,
            updatedAt: '',
            createdAt: '',
            assignee: [],
            reporter: [],
            user_task: [],
          },
        ],
      }));
      newData.sort((a, b) => Number(a._id) - Number(b._id));
      setProjectsdata(newData);
    }
  }, [projects]);

  const transformData = (projectsdatas: Projectdata[]) => {
    const columns: ColumnCollection = {};
    const tasks: TaskCollection = {};
    const ordered: string[] = [];

    projectsdatas.forEach((project: Projectdata, projectIndex: number) => {
      project.taskList.forEach((task: any, taskIndex: number) => {
        const taskId = `${projectIndex + 1}-task-${task._id}${taskIndex + 1}`;
        tasks[taskId] = {
          id: taskId,
          due: [task?.start_date, task?.end_date],
          status: task.status,
          labels: task?.type ? [task?.type] : [],
          comments: [],
          assignee: task?.assignee?.map((assignee: any) => ({
            id: `user-${assignee._id}`,
            name: assignee.name,
            avatarUrl: '',
          })),
          priority: task?.priority,
          attachments: task?.attachments,
          reporter: task?.reporter?.map((reporter: any) => ({
            id: `user-${reporter._id}`,
            name: reporter.email,
            avatarUrl: '',
          })),
          name: task?.name,
          description: task?.description,
          etatime: task?.etatime,
          time: task?.time,
        };
      });

      const columnId = `${projectIndex + 1}-column-${project._id}${projectIndex + 1}`;
      columns[columnId] = {
        id: columnId,
        name: project.name,
        taskIds: project.taskList.map(
          (task: any, taskIndex: number) => `${projectIndex + 1}-task-${task._id}${taskIndex + 1}`
        ),
      };

      const orderId = `${projectIndex + 1}-column-${project._id}${projectIndex + 1}`;
      ordered.push(orderId);
    });

    return { board: { columns, tasks, ordered } };
  };

  const { board } = transformData(projectsdata);

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
        if (type === 'DEFAULT') {
          const newOrdered = [...board.ordered];
          let projectDetails: any[] = [];
          if (roadmap && roadmap.project_sequence) {
            projectDetails = roadmap.project_sequence.map((project: any) => ({
              _id: project._id,
              project_id: project.project_id,
              sequence: project.sequence,
            }));
          }  
          newOrdered.splice(source.index, 1);
          newOrdered.splice(destination.index, 0, draggableId);

          const updatedProjectDetails = newOrdered
            .map((columnId, index) => {
              const project_id = extractId(columnId);

              const projectDetail = projectDetails.find(
                (project: any) => project.sequence === Number(project_id)
              );

              if (projectDetail) {
                return {
                  ...projectDetail,
                  sequence: index + 1,
                };
              }
              return null;
            })
            .filter((project) => project !== null);

          if (updatedProjectDetails.length > 0) {
            if (roadmapId) {
              dispatch(updateRoadmap(roadmapId, { projects: updatedProjectDetails }));
              dispatch(getRoadMapById(roadmapId as string));
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, board, roadmap, roadmapId]
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

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {roadmap?.title} - Taskboard
      </Typography>

      {boardLoading && renderSkeleton}

      {(!board || (board && Array.isArray(board) && board.length <= 0)) && (
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            maxHeight: { md: 480 },
          }}
        />
      )}

      {!!board?.ordered.length && (
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
                      projectId={roadmapId}
                    />
                  ))}

                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Scrollbar>
      )}
    </Container>
  );
}
