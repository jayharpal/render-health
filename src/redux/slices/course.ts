import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

// utils
import { ICourseRequest, ICourseState } from 'src/types/course';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: ICourseState = {
  isLoading: false,
  error: null,
  //   projects: [],
  courses: null,
  videoLoadingId: null, // Add video loading state
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },
    startVideoLoading(state, action) {
      state.videoLoadingId = action.payload; // Store the ID of the course
    },
    stopVideoLoading(state) {
      state.videoLoadingId = null; // Clear the video loading ID
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.videoLoadingId = null; // Ensure video loading is reset on error
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },

    // GET Courses
    getCourseSuccess(state, action) {
      state.isLoading = false;
      state.courses = action.payload;
      state.notification = null;
    },

    // GET Courses
    getCourseByIdSuccess(state, action) {
      state.isLoading = false;
      state.courses = action.payload;
      state.notification = null;
    },

    // CREATE Courses
    createCourseSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    createCourseHasError(state, action) {
      state.isLoading = false;
    },

    // UPDATE COURSES
    updateCourseSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    updateCourseHasError(state, action) {
      state.isLoading = false;
    },

    deleteCourseSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type CourseState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification, startVideoLoading, stopVideoLoading } = slice.actions;

// ----------------------------------------------------------------------

export function getCourses() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.course.getAll);
      if (response?.status) {
        dispatch(slice.actions.getCourseSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCourseById(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.course.getById(id));
      if (response.status) {
        dispatch(slice.actions.getCourseByIdSuccess(response.data.result));
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

export function createCourse(data: ICourseRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(clearNotification());
    try {
      const response = await axios.post(endpoints.course.create, data);
      if (response?.data?.status) {
        dispatch(slice.actions.createCourseSuccess(response.data.message));
      } else {
        dispatch(slice.actions.createCourseHasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message || 'Something went wrong!', { variant: 'error' });
      }
      return response;
    } catch (error) {
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
      dispatch(slice.actions.createCourseHasError(error));
      return error;
    }
  };
}

export function updateCourse(id: string, data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.course.update(id), data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateCourseSuccess(response.data.message));
      } else {
        dispatch(slice.actions.updateCourseHasError(response?.data?.message));
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

export function deleteCourse(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(endpoints.course.delete(id));
      if (response?.data?.status) {
        dispatch(slice.actions.deleteCourseSuccess(response.data.message));
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
