import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
// utils
import { ChatMessagePayload, IChatState } from 'src/types/chat';
import axios, { endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: IChatState = {
  isLoading: false,
  error: null,
  chat_messages: [],
  // chat_summary: [],
  users: [],
  chat_users: [],
  notification: null,
  variant: 'success',
};

const slice = createSlice({
  name: 'chat',
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

    // GET CHAT_USERS
    getChatUsersSuccess(state, action) {
      state.isLoading = false;
      state.chat_users = action.payload;
      state.notification = null;
    },

    // GET ALL USERS
    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
      state.notification = null;
    },

    // GET CHAT
    getChatSuccess(state, action) {
      state.isLoading = false;
      state.chat_messages = action.payload;
      state.notification = null;
    },

    // GET CHAT SUMMARY
    // getChatSummarySuccess(state, action) {
    //   state.isLoading = false;
    //   state.chat_summary = action.payload;
    //   state.notification = null;
    // },

    chatSentSuccess(state, action) {
      state.isLoading = false;
      state.notification = action.payload;
      state.variant = 'success';
    },

    clearChat: (state) => {
      state.chat_messages = [];
    },

    clearNotification: (state) => {
      state.notification = null;
      state.variant = 'success';
    },
  },
});

// Reducer
export default slice.reducer;

export type ChatState = ReturnType<typeof slice.reducer>;

// Actions
export const { clearNotification, clearChat } = slice.actions;

// ----------------------------------------------------------------------

export function getAllChatUsers() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chat.getContacts);
      if (response?.data?.status) {
        dispatch(slice.actions.getChatUsersSuccess(response?.data?.result));
      } else {
        dispatch(slice.actions.hasError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllUsers() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chat.getUsers);
      if (response?.data?.status) {
        dispatch(slice.actions.getAllUsersSuccess(response?.data?.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getChatByChatID(chatId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.clearChat());
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(endpoints.chat.getChat(chatId));
      if (response?.data?.status) {
        dispatch(slice.actions.getChatSuccess(response?.data?.result));
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendMessage(data: ChatMessagePayload) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.chat.sendChat, data);
      if (response?.data?.status) {
        dispatch(slice.actions.chatSentSuccess(response?.data?.message));
        // enqueueSnackbar(response?.data?.message, { variant: "success" })
      } else {
        dispatch(slice.actions.hasError(response?.data?.message));
        enqueueSnackbar(response?.data?.message, { variant: "error" })
      }
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      enqueueSnackbar(error?.message || "Something went wrong!", { variant: "error" })
      return error?.message || error;
    }
  };
}

export function readMessage(msgId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(endpoints.chat.readChat(msgId));
      if (response?.data?.status) {
        dispatch(slice.actions.stopLoading());
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

// export function getChatSummary() {
//   return async (dispatch: Dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(endpoints.chat.getSummary);
//       if (response?.data?.status) {
//         dispatch(slice.actions.getChatSummarySuccess(response?.data?.result));
//       } else {
//         dispatch(slice.actions.hasError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
