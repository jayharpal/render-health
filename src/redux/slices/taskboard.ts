import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import {
  ITaskBoard,
  ITaskBoardState,
  IUpdateTask,
  ICommentAdd,
  ITaskBoardPostData,
} from 'src/types/taskboard';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: ITaskBoardState = {
  isLoading: false,
  isCommentLoading: false,
  error: null,
  taskboards: [],
  notification: null,
  variant: 'success',
  comments: [], // Initialize it as an empty array or with appropriate default values
};

const slice = createSlice({
  name: 'taskboard',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
      state.notification = null;
    },

    // START COMMENT LOADING
    startCommentLoading(state) {
      state.isCommentLoading = true;
    },

    // STOP COMMENT LOADING
    stopCommentLoading(state) {
      state.isCommentLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },

    // GET TASKBOARDS
    getTaskBoardsSuccess(state, action) {
      state.isLoading = false;
      state.taskboards = action.payload;
      state.notification = null;
    },

    // CREATE TASK
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Task created successfully!';
    },

    // UPDATE TASK
    updateTaskSuccess(state) {
      state.isLoading = false;
      state.notification = 'Task updated successfully!';
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },

    getCommentsSuccess(state, action) {
      state.isCommentLoading = false;
      state.comments = action.payload;
      state.notification = null;
    },

    // CREATE TASK BOARD
    createTaskBoardSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Task board created successfully!';
    },

    clearComments(state) {
      state.comments = [];
    },

    // CREATE COMMENT
    createCommentSuccess(state, action) {
      state.isCommentLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export type TaskBoardState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification, clearComments } = slice.actions;

// ----------------------------------------------------------------------

export function getTaskBoards(id: string, startDate?: Date, endDate?: Date) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.taskboard.getAll(id), {
        params: {
          start_date: startDate?.toISOString(),
          end_date: endDate?.toISOString(),
        },
      });
      if (response.status) {
        dispatch(slice.actions.getTaskBoardsSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createTask(data: ITaskBoard) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.taskboard.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createTaskSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function updateTask(data: IUpdateTask) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.taskboard.update, data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateTaskSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
export function getComments(taskId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCommentLoading());
    try {
      const response = await axios.get(endpoints.comment.getAll(taskId));
      if (response?.data?.result) {
        dispatch(slice.actions.getCommentsSuccess(response?.data?.result));
      } else {
        dispatch(slice.actions.hasError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createComment(commentData: ICommentAdd) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCommentLoading());
    try {
      const response = await axios.post(endpoints.comment.create, commentData);
      if (response?.data?.status) {
        dispatch(slice.actions.createCommentSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function createTaskBoard(data: ITaskBoardPostData) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.taskboard.createBoard, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createTaskBoardSuccess(response?.data));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
