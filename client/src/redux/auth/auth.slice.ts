import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import {
  fetchSignIn,
  fetchSignUp,
} from './auth.thunk';
import {
  AuthState, MyKnownError, TokenData, User,
} from './auth.types';

const ERROR_MESSAGE = 'Authorization error';

const getUserData = (token: string): User => {
  const data: TokenData = jwt_decode(token);
  const {
    firstName, lastName, id, role,
  } = data;
  return {
    firstName, lastName, id, role,
  };
};

const initialState: AuthState = {
  isAuth: false,
  isFetching: false,
  user: {
    id: undefined,
    firstName: '',
    lastName: '',
    role: '',
  },
  error: {
    message: '',
    status: 0,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      if (!action.payload) {
        state.user = initialState.user;
      }
    },
    resetErrorMessage: (state) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      try {
        localStorage.setItem('authToken', action.payload.token);
        state.user = getUserData(action.payload.token);
        state.isAuth = true;
      } catch (e) {
        state.error.message = ERROR_MESSAGE;
        state.isAuth = false;
      }
      state.isFetching = false;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.error = action.payload as MyKnownError;
      state.isFetching = false;
    });

    builder.addCase(fetchSignUp.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      try {
        localStorage.setItem('authToken', action.payload.token);
        state.user = getUserData(action.payload.token);
        state.isAuth = true;
      } catch (e) {
        state.error.message = ERROR_MESSAGE;
        state.isAuth = false;
      }
      state.isFetching = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.error = action.payload as MyKnownError;
      state.isFetching = false;
    });
  },
});

export const {
  setAuth, resetErrorMessage,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
