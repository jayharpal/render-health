import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ICommunityQuestion, ICommunityQuestionState } from 'src/types/community';
import axios, { endpoints } from '../../utils/axios';

const initialState: ICommunityQuestionState = {
  isLoading: false,
  isLLMLoading: false,
  error: null,
  community_question: [],
  community_questions: null,
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'community_question',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },

    startLLMLoading(state) {
      state.isLLMLoading = true;
      state.notification = null;
    },

    stopLLMLoading(state) {
      state.isLLMLoading = false;
    },

    getLLMResponseSuccess(state, action) {
      state.isLLMLoading = false;
      state.variant = 'success';
      state.notification = action.payload;
    },

    getLLMResponseFailed(state, action) {
      state.isLLMLoading = false;
      state.variant = 'error';
      state.notification = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },
    createCommunityQuestionSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Question Asked successfully!';
    },
    getCommunityQuestionSuccess(state, action) {
      state.isLoading = false;
      state.community_question = action.payload;
      state.notification = null;
    },
    getQuestionByIdSuccess(state, action) {
      state.isLoading = false;
      state.community_questions = action.payload;
      state.notification = null;
    },
    updateCommunityQuestionSuccess(state) {
      state.isLoading = false;
      state.notification = 'Question updated successfully!';
    },
    deleteCommunityQuestionSuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Question deleted successfully!';
    },
    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type CommunityState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function createCommunityQuestion(data: ICommunityQuestion) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.community_question.createQuestion, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createCommunityQuestionSuccess(response.data.result));
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
export function getCommunityQuestion() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.community_question.getAllQuestions); // Update API endpoint
      if (response.status === 200) {
        dispatch(slice.actions.getCommunityQuestionSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(''));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(''));
    }
  };
}
export function getQuestionById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.community_question.getById(id));
      if (response.status) {
        dispatch(slice.actions.getQuestionByIdSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(''));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(''));
    }
  };
}
export function updateCommunityQuestion(id: string, data: ICommunityQuestion) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.community_question.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateCommunityQuestionSuccess(response.data.result));
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
export function deleteCommunityQuestion(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.community_question.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteCommunityQuestionSuccess(response.data.result));
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

export function getAnswerFromLLM(data: ICommunityQuestion) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLLMLoading());
    try {
      const response = await axios.post(endpoints.community_question.getLLMResponse, data);
      if (response?.data?.status) {
        dispatch(slice.actions.getLLMResponseSuccess(response?.data?.message));
      } else {
        dispatch(slice.actions.getLLMResponseFailed(response?.data?.message));
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.getLLMResponseFailed(error?.message ? error?.message : error));
      return error;
    }
  };
}
