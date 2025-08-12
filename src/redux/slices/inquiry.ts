import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import { IInquiry, IInquiryState } from 'src/types/inquiry';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: IInquiryState = {
  isLoading: false,
  error: null,
  inquirys: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.notification = null;
    },

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
      state.notification = null;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.notification = action.payload;
      state.variant = 'error';
    },

    // GET Inquirys
    getInquirySuccess(state, action) {
      state.isLoading = false;
      state.inquirys = action.payload;
      state.notification = null;
    },

    // UPDATE Inquirys
    updateInquirySuccess(state, action) {
      state.isLoading = false;
      state.notification = 'Inquiry update success!';
    },

    // CONVERT TO USER
    convertToUserSuccess(state) {
      state.isLoading = false;
      state.notification = 'User registered successfully!';
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type InquiryState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification } = slice.actions;

// ----------------------------------------------------------------------

export function getInquiry(query?: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.inquiry.getInquiry, { params: { search: query } });
      if (response.status) {
        dispatch(slice.actions.getInquirySuccess(response.data.result));
      } else {
        dispatch(slice.actions.hasError(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postInquiry(data: IInquiry) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.inquiry.post, data);
      if (response?.data?.status) {
        dispatch(slice.actions.stopLoading(response.data.result));
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

export function updateInquiry(data: IInquiry) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(endpoints.inquiry.updateInquiry, data);
      if (response?.data?.status) {
        dispatch(slice.actions.updateInquirySuccess(response.data.result));
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

export function convertToUser(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.inquiry.convertToUser + id);
      if (response?.data?.status) {
        dispatch(slice.actions.convertToUserSuccess());
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
