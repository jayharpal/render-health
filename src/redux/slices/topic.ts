import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

// utils
import { ITopicRequest, ITopicState } from 'src/types/topic';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: ITopicState = {
  isLoading: false,
  error: null,
  //   projects: [],
  topics: [],
  topic: null,
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'topic',
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

    // GET Topic
    getTopicSuccess(state, action) {
      state.isLoading = false;
      state.topics = action.payload;
      state.notification = null;
    },

    // GET Topic
    getTopicByIdSuccess(state, action) {
      state.isLoading = false;
      state.topic = action.payload;
      state.notification = null;
    },

    // CREATE Topic
    createTopicSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    createTopicHasError(state, action) {
      state.isLoading = false;
    },

    // UPDATE Topic
    updateTopicSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    updateTopicHasError(state, action) {
      state.isLoading = false;
    },

    deleteTopicSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
    // Add this reducer in your slice
    clearTopics(state) {
      state.topic = null;
      state.topics = [];
      state.notification = null;
    },
  },
});

// Reducer
export default slice.reducer;

export type TopicState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getTopics() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.topic.getAll);
      if (response?.status) {
        dispatch(slice.actions.getTopicSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTopicById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.topic.getById(id));
      if (response.status) {
        dispatch(slice.actions.getTopicByIdSuccess(response.data.result));
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

export function getTopicByChapter(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.clearTopics());
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.topic.getByChapter(id));
      if (response.status) {
        dispatch(slice.actions.getTopicByIdSuccess(response.data.result));
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

export function createTopic(data: ITopicRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearNotification());
    try {
      const response = await axios.post(endpoints.topic.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createTopicSuccess(response.data.message));
      } else {
        dispatch(slice.actions.createTopicHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || 'Something went wrong!', { variant: 'error' });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
      dispatch(slice.actions.createTopicHasError(error));
      return error;
    }
  };
}

export function updateTopic(id: string, data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.topic.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateTopicSuccess(response.data.message));
      } else {
        dispatch(slice.actions.updateTopicHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || 'Something went wrong!', { variant: 'error' });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function deleteTopic(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.topic.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteTopicSuccess(response.data.message));
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
