'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
import SocketIOClient from 'socket.io-client';
import Link from 'next/link';

import { enqueueSnackbar } from 'src/components/snackbar';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '../../types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
    isAdmin: boolean;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
    isAdmin: boolean;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  isAdmin: false,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
      isAdmin: action.payload.isAdmin,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      isAdmin: action.payload.isAdmin,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
      isAdmin: false,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pathname = usePathname();
  const path = "/dashboard"; // Adjust the path according to your routes
  const isOnChat = pathname.startsWith(path);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const mode = sessionStorage.getItem('mode');
      const isAdmin = mode === 'true';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, mode as string);

        const response = await axios.get(endpoints.auth.checkSession);
        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
            isAdmin,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
            isAdmin: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          isAdmin: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const userId = state.user?.id || state.user?._id;
    const userType = state.isAdmin ? 'admin' : 'user';

    const apiUrl = process.env.NEXT_PUBLIC_HOST_API;
    if (apiUrl && state.user) {
      const socket = SocketIOClient(apiUrl);
      socket.on('connect', () => {
        console.log('Connected to server');

        socket.emit("join", JSON.stringify({ sender: userId }))
      });

      socket.on('newMessageNotify', (newMessage: any) => {
        if (!isOnChat) {
          enqueueSnackbar(
            <span>
              New message from {newMessage?.sender_name}.{' '}
              <Link href={paths.dashboard.chat.chatId(newMessage?.chat_id)}>
                Go to chat
              </Link>
            </span>,
            { variant: 'info' }
          );
        }
      });

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          socket.emit('user_active', userId, userType);
        } else {
          socket.emit('user_inactive', userId, userType);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      socket.on('error', () => {
        console.log('Connected to server with');
      });

      return () => {
        // Clean up the socket connection when the component is unmounted
        socket.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }

    return undefined;
  }, [state.user, state.isAdmin, isOnChat]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };
      try {
        // const response = await axios.post(endpoints.auth.login, data, {
        //   headers: {
        //     platform: 'web',
        //   },
        // });
        // if (response.data.status) {
        //   const user = response.data?.user;
        //   setSession(response?.data?.accesstoken, `${user?.is_admin}`);
        //   const isAdmin = user?.is_admin;
        //   dispatch({
        //     type: Types.LOGIN,
        //     payload: {
        //       user,
        //       isAdmin,
        //     },
        //   });
        //   return response?.data?.message;

        //   enqueueSnackbar(response?.data?.message || "Login successfully!", { variant: 'success' });
        // }
        // return response?.data;

        const mockUser = {
          id: 1,
          name: "Test User",
          email,
          is_admin: true,
        };

        // Normally, API returns token, so we mock it too
        const mockAccessToken = "mock-token-123";

        // Set session as usual
        // setSession(mockAccessToken, `${mockUser.is_admin}`);
        sessionStorage.setItem('accessToken', mockAccessToken);
        enqueueSnackbar("Login successfully!", { variant: 'success' });

        // Dispatch login to store
        dispatch({
          type: Types.LOGIN,
          payload: {
            user: mockUser,
            isAdmin: mockUser.is_admin,
          },
        });

        // enqueueSnackbar(response?.data?.message || "Login failed!", { variant: 'error' });
      } catch (error) {
        console.error('error', error);
        return error;
        // enqueueSnackbar(error.message || "Login failed!", { variant: 'error' });
      }
    },
    []
  );

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const response = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      isAdmin: state.isAdmin as boolean,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, state.isAdmin, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
