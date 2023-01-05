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

const PREFIX = 'auth';

export const fetchSignIn = createAsyncThunk<SignInData, SignInInterface>(
  `${PREFIX}/fetchLogin`,
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
  `${PREFIX}/fetchSignUp`,
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
  `${PREFIX}/fetchDeleteUser`,
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
  `${PREFIX}/fetchGetOneUser`,
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
