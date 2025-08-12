import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

// utils
import { IProjectPostData, IProjectState } from 'src/types/projects';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: IProjectState = {
  isLoading: false,
  error: null,
  projects: [],
  project: null,
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },

    // GET PROJECTS
    getProjectsSuccess(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
      state.notification = null;
    },

    // GET PROJECT
    getProjectByIdSuccess(state, action) {
      state.isLoading = false;
      state.project = action.payload;
      state.notification = null;
    },

    // CREATE PROJECTS
    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Project created successfully!';
    },

    createProjectHasError(state, action) {
      state.isLoading = false;
    },

    // UPDATE PROJECTS
    updateProjectSuccess(state) {
      state.isLoading = false;
      state.notification = 'Project updated successfully!';
    },

    updateProjectHasError(state, action) {
      state.isLoading = false;
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type ProjectState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getProjects() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.project.getAll);
      if (response?.status) {
        dispatch(slice.actions.getProjectsSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProjectById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.project.getById(id));
      if (response.status) {
        dispatch(slice.actions.getProjectByIdSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function createProject(data: IProjectPostData) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearNotification());
    try {
      const response = await axios.post(endpoints.project.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createProjectSuccess(response.data.result));
      } else {
        dispatch(slice.actions.createProjectHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || "Something went wrong!", { variant: "error" })
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || "Something went wrong!", { variant: "error" })
      dispatch(slice.actions.createProjectHasError(error));
      return error;
    }
  };
}

export function updateProject(data: IProjectPostData) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.project.update, data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateProjectSuccess(response.data.result));
      } else {
        dispatch(slice.actions.updateProjectHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || "Something went wrong!", { variant: "error" })
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || "Something went wrong!", { variant: "error" })
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
