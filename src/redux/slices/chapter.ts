import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

// utils
import { IChapterRequest, IChapterState } from 'src/types/chapter';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: IChapterState = {
  isLoading: false,
  error: null,
  //   projects: [],
  chapters: [],
  chapter: null,
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'chapter',
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

    // GET Chapter
    getChapterSuccess(state, action) {
      state.isLoading = false;
      state.chapters = action.payload;
      state.notification = null;
    },

    // GET Chapter
    getChapterByIdSuccess(state, action) {
      state.isLoading = false;
      state.chapter = action.payload;
      state.notification = null;
    },

    // CREATE Chapter
    createChapterSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    createChapterHasError(state, action) {
      state.isLoading = false;
    },

    // UPDATE Chapter
    updateChapterSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    updateChapterHasError(state, action) {
      state.isLoading = false;
    },

    deleteChapterSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
    // Add this reducer in your slice
    clearChapters(state) {
      state.chapter = null;
      state.chapters = [];
      state.notification = null;
    },
  },
});

// Reducer
export default slice.reducer;

export type ChapterState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getChapters() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chapter.getAll);
      if (response?.status) {
        dispatch(slice.actions.getChapterSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getChapterById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chapter.getById(id));
      if (response.status) {
        dispatch(slice.actions.getChapterByIdSuccess(response.data.result));
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

export function getChapterBySubject(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.clearChapters());
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chapter.getBySubject(id));
      if (response.status) {
        dispatch(slice.actions.getChapterByIdSuccess(response.data.result));
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

export function createChapter(data: IChapterRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearNotification());
    try {
      const response = await axios.post(endpoints.chapter.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createChapterSuccess(response.data.message));
      } else {
        dispatch(slice.actions.createChapterHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || 'Something went wrong!', { variant: 'error' });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
      dispatch(slice.actions.createChapterHasError(error));
      return error;
    }
  };
}

export function updateChapter(id: string, data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.chapter.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateChapterSuccess(response.data.message));
      } else {
        dispatch(slice.actions.updateChapterHasError(response?.data?.message));
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

export function deleteChapter(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.chapter.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteChapterSuccess(response.data.message));
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