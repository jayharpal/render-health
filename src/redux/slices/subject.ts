import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

// utils
import { ISubjectRequest, ISubjectState } from 'src/types/subject';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: ISubjectState = {
  isLoading: false,
  error: null,
  //   projects: [],
  subjects: [],
  subject: null,
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'subject',
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

    // GET Subject
    getSubjectSuccess(state, action) {
      state.isLoading = false;
      state.subjects = action.payload;
      state.notification = null;
    },

    // GET Subject
    getSubjectByIdSuccess(state, action) {
      state.isLoading = false;
      state.subject = action.payload;
      state.notification = null;
    },

    // CREATE Subject
    createSubjectSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    createSubjectHasError(state, action) {
      state.isLoading = false;
    },

    // UPDATE Subject
    updateSubjectSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    updateSubjectHasError(state, action) {
      state.isLoading = false;
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },

    deleteSubjectSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },
    // Add this reducer in your slice
    clearSubjects(state) {
      state.subject = null;
      state.subjects = [];
      state.notification = null;
    },
  },
});

// Reducer
export default slice.reducer;

export type SubjectState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getSubjects() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.subject.getAll);
      if (response?.status) {
        dispatch(slice.actions.getSubjectSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSubjectById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.subject.getById(id));
      if (response.status) {
        dispatch(slice.actions.getSubjectByIdSuccess(response.data.result));
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

export function getSubjectByCourse(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.clearSubjects());
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.subject.getByCourse(id));
      if (response.status) {
        dispatch(slice.actions.getSubjectByIdSuccess(response.data.result));
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

export function createSubject(data: ISubjectRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearNotification());
    try {
      const response = await axios.post(endpoints.subject.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createSubjectSuccess(response.data.message));
      } else {
        dispatch(slice.actions.createSubjectHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || 'Something went wrong!', { variant: 'error' });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
      dispatch(slice.actions.createSubjectHasError(error));
      return error;
    }
  };
}

export function updateSubject(id: string, data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.subject.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateSubjectSuccess(response.data.message));
      } else {
        dispatch(slice.actions.updateSubjectHasError(response?.data?.message));
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

export function deleteSubject(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.subject.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteSubjectSuccess(response.data.message));
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
