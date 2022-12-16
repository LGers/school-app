import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUpdatePassword, fetchUpdateUser,
} from './users.thunk';
import {
  UsersState,
} from './users.types';
import { ApiError } from '../redux.types';

const initialState: UsersState = {
  isAuth: false,
  isFetching: false,
  error: {
    message: '',
    status: 0,
  },
};

export const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUsersErrorMessage: (state) => {
      state.error = initialState.error;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUpdatePassword.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchUpdatePassword.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchUpdatePassword.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchUpdateUser.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateUser.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  resetUsersErrorMessage,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
