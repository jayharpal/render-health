import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios, { endpoints } from 'src/utils/axios';
import { IRoadmapUser, IRoadmapUserState } from 'src/types/roadmap';

const initialState: IRoadmapUserState = {
  isLoading: false,
  error: null,
  roadmap_user: null,
  roadmap_users: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'roadmap_users',
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
      state.roadmap_users = action.payload;
      state.notification = null;
    },

    getRoadMapByIdSuccess(state, action) {
      state.isLoading = false;
      state.roadmap_user = action.payload;
      state.notification = null;
    },
    assignRoadmapSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Roadmap assign successfully!';
    },
    removeAssignSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Roadmap assign remove successfully!';
    },
    clearNotification(state) {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

export default slice.reducer;

export type RoadmapState = ReturnType<typeof slice.reducer>;

export const { clearNotification } = slice.actions;

export function assignRoadmap(data: IRoadmapUser) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.roadmap_user.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.assignRoadmapSuccess(response.data.result));
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

export function getRoadmapsAllUser() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.roadmap_user.getAll);
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

export function removeAssign(roadmapUser_id: string | null) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${endpoints.roadmap_user.delete}/${roadmapUser_id}`);
      if (response?.data?.status) {
        dispatch(slice.actions.removeAssignSuccess(response.data.result));
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

export function getRoadmapsUser(roadmap_id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.roadmap_user.getRoadmapUSer);
      if (response.status === 200) {
        // Filter roadmap_users by roadmap_id
        const roadmapUsers = response.data.result.filter(
          (user: IRoadmapUser) => user.roadmap_id === roadmap_id
        );
        dispatch(slice.actions.getRoadmapsSuccess(roadmapUsers));
      } else {
        dispatch(slice.actions.hasError('Failed to fetch roadmaps'));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}
