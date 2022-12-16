import { createAsyncThunk } from '@reduxjs/toolkit';

import { SignInData } from './auth.types';
import {
  DeleteUserInterface, GetOneUserInterface,
  SignInInterface,
  SignUpInterface,
} from '../../api/api.types';
import {
  signIn, signUp,
} from '../../api/auth';
import { getErrorData } from '../redux.utils';
import { deleteUser, getOneUser } from '../../api/users';
import { ApiError } from '../redux.types';

export const fetchSignIn = createAsyncThunk<SignInData, SignInInterface>(
  'auth/fetchLogin',
  async ({ email, password }: SignInInterface, thunkAPI) => {
    try {
      const res = await signIn({ email, password });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async ({
    firstName, lastName, email, password,
  }: SignUpInterface, thunkAPI) => {
    try {
      const res = await signUp({
        firstName, lastName, email, password,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  'auth/fetchDeleteUser',
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

export const fetchGetOneUser = createAsyncThunk(
  'auth/fetchGetOneUser',
  async ({
    id,
  }: GetOneUserInterface, thunkAPI) => {
    try {
      const res = await getOneUser({ id });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
