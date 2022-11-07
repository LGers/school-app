import { createAsyncThunk } from '@reduxjs/toolkit';

import { MyKnownError, SignInData } from './auth.types';
import { SignInInterface, SignUpInterface } from '../../api/api.types';
import { signIn, signUp } from '../../api/auth';
import { getErrorData } from '../redux.utils';

export const fetchSignIn = createAsyncThunk<SignInData, SignInInterface>(
  'auth/fetchLogin',
  async ({ email, password }: SignInInterface, thunkAPI) => {
    try {
      const res = await signIn({ email, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as MyKnownError));
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
      return thunkAPI.rejectWithValue(getErrorData(error as MyKnownError));
    }
  },
);
