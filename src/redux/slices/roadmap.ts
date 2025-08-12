import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios, { endpoints } from 'src/utils/axios';
import { IRoadmapPostData, IRoadmapState } from 'src/types/roadmap';
import { enqueueSnackbar } from 'notistack';

const initialState: IRoadmapState = {
  isLoading: false,
  error: null,
  roadmap: null,
  roadmaps: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'roadmaps',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },

    getRoadmapsSuccess(state, action) {
      state.isLoading = false;
      state.roadmaps = action.payload;
      state.notification = null;
    },

    getRoadMapByIdSuccess(state, action) {
      state.isLoading = false;
      state.roadmap = action.payload;
      state.notification = null;
    },

    createRoadmapSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Roadmap created successfully!';
      state.variant = 'success';
    },
    updateRoadmapSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Roadmap updated successfully!';
      state.variant = 'success';
    },
    deleteRoadmapSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Roadmap deleted successfully!';
    },
    clearRoadmap(state) {
      state.roadmap = null;
    },
    clearNotification(state) {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

export default slice.reducer;

export type RoadmapState = ReturnType<typeof slice.reducer>;

export const { clearNotification, clearRoadmap } = slice.actions;

export function getRoadmaps() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.roadmap.getAll); // Update API endpoint
      if (response.status === 200) {
        dispatch(slice.actions.getRoadmapsSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError('Failed to fetch roadmaps'));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}
export function createRoadmap(data: IRoadmapPostData) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.roadmap.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createRoadmapSuccess(response.data.result));
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
export function getRoadMapById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.roadmap.getById(id));
      if (response.status) {
        dispatch(slice.actions.getRoadMapByIdSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error
    }
  };
}
export function updateRoadmap(id: string, data: IRoadmapPostData) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.roadmap.update(id), data);
      if (response?.data?.status && response?.status === 200) {
        dispatch(slice.actions.updateRoadmapSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
      return response;
    } catch (error) {
      enqueueSnackbar('Update Failed', { variant: 'error' });
      // dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
export function deleteRoadmap(id: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.roadmap.delete, id);
      if (response?.data?.status) {
        dispatch(slice.actions.deleteRoadmapSuccess(response.data.result));
        // getRoadmaps(); // After deleting, refresh the list of roadmaps
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
