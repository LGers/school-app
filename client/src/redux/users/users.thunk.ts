import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DeleteUserInterface,
  UpdatePasswordInterface,
  UpdateUserInterface,
} from '../../api/api.types';
import { getErrorData } from '../redux.utils';
import { deleteUser, updatePassword, updateUser } from '../../api/users';
import { ApiError } from '../redux.types';

export const fetchUpdatePassword = createAsyncThunk(
  'users/fetchUpdatePassword',
  async ({
    id, password,
  }: UpdatePasswordInterface, thunkAPI) => {
    try {
      const res = await updatePassword({
        id, password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchUpdateUser = createAsyncThunk(
  'users/fetchUpdateUser',
  async ({
    id, firstName, lastName, email, role,
  }: UpdateUserInterface, thunkAPI) => {
    try {
      const res = await updateUser({
        id, firstName, lastName, email, role,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async ({
    id,
  }: DeleteUserInterface, thunkAPI) => {
    try {
      const res = await deleteUser({ id });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
