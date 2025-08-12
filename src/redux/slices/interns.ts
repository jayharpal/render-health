import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IIntern, IInternState } from 'src/types/interns';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: IInternState = {
  isLoading: false,
  error: null,
  interns: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'interns',
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
    getInternsSuccess(state, action) {
      state.isLoading = false;
      state.interns = action.payload;
      state.notification = null;
    },

    // CREATE PROJECTS
    createInternSuccess(state, action) {
      state.isLoading = false;
      state.interns = action.payload;
      state.notification = 'Intern created successfully!';
    },

    // UPDATE PROJECTS
    updateInternSuccess(state) {
      state.isLoading = false;
      state.notification = 'Intern updated successfully!';
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type InternState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getInterns() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.intern.getAll);
      if (response.status) {
        dispatch(slice.actions.getInternsSuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// export function createIntern(data: IIntern) {
//   return async (dispatch: Dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(endpoints.project.create, data);
//       if (response?.data?.status) {
//         dispatch(slice.actions.createInternSuccess(response.data.result));
//       } else {
//         dispatch(slice.actions.hasError(response?.data?.message));
//       }
//       return response;
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       return error;
//     }
//   };
// }

export function updateIntern(data: IIntern) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.project.update, data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateInternSuccess(response.data.result));
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
