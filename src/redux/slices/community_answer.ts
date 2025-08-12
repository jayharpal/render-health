import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ICommunityAnswer, ICommunityAnswerState } from 'src/types/community';
import axios, { endpoints } from '../../utils/axios';

const initialState: ICommunityAnswerState = {
  isLoading: false,
  error: null,
  community_answers: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'community_answer',
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
    createCommunityAnswerSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },
    updateCommunityAnswerSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },
    deleteCommunityAnswerSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },
    getCommunityAnswerSuccess(state, action) {
      state.isLoading = false;
      state.community_answers = action.payload;
      state.notification = null;
    },
    getAnswersByQuestionIdSuccess(state, action) {
      state.isLoading = false;
      state.community_answers = action.payload;
      state.notification = null;
    },
    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
    clearAnswers: (state) => {
      state.community_answers = [];
    },
  },
});

// Reducer
export default slice.reducer;

export type CommunityAnsState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification, clearAnswers } = slice.actions;

// ----------------------------------------------------------------------

export function createCommunityAnswer(data: ICommunityAnswer) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.community_answer.createAnswer, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createCommunityAnswerSuccess(response?.data?.message));
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
export function getCommunityAnswer() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.community_answer.getAllAnswers); // Update API endpoint
      if (response.status === 200) {
        dispatch(slice.actions.getCommunityAnswerSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(''));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(''));
    }
  };
}
export function getAnswerById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.community_answer.getById(id));
      if (response.status) {
        dispatch(slice.actions.getCommunityAnswerSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(''));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(''));
      return error;
    }
  };
}
export function getAnswersByQuestionId(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearAnswers());
    try {
      const response = await axios.get(endpoints.community_answer.getByQuestionId(id));
      if (response.status) {
        dispatch(slice.actions.getAnswersByQuestionIdSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(''));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(''));
      return error;
    }
  };
}
export function updateCommunityAnswer(id: string, data: ICommunityAnswer) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.community_answer.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateCommunityAnswerSuccess(response?.data?.message));
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
export function deleteCommunityAnswer(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.community_answer.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteCommunityAnswerSuccess(response?.data?.message));
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
