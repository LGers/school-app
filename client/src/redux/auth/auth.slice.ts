import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { ApiError, TokenData } from '../redux.types';
import {
  fetchDeleteUser, fetchGetOneUser,
  fetchSignIn,
  fetchSignUp,
} from './auth.thunk';
import {
  AuthState, User,
} from './auth.types';

const ERROR_MESSAGE = 'Authorization error';

const initialState: AuthState = {
  isAuth: false,
  isFetching: false,
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    role: '',
    email: '',
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
    logout: () => {
      localStorage.removeItem('authToken');
    },

    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      if (!action.payload) {
        state.user = initialState.user;
      }
    },

    updateUser: (state, action: PayloadAction<User>) => {
      if (!action.payload) {
        state.user = initialState.user;
      } else {
        state.user = action.payload;
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
        const { id }: TokenData = jwt_decode(action.payload.token);
        state.user.id = id;
        state.isAuth = true;
      } catch (e) {
        state.error.message = ERROR_MESSAGE;
        state.isAuth = false;
      }
      state.isFetching = false;
    });

    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchSignUp.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchSignUp.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchGetOneUser.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchGetOneUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isFetching = false;
    });

    builder.addCase(fetchGetOneUser.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchDeleteUser.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchDeleteUser.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchDeleteUser.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  logout, setAuth, updateUser, resetErrorMessage,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
