import { createAsyncThunk } from '@reduxjs/toolkit';
import { Id, UpdateUserRoleAndClassIdInterface } from '../../api/api.types';
import { getAllClasses, getOneClass } from '../../api/classes';
import { getErrorData } from '../redux.utils';
import { ApiError } from '../redux.types';
import { getAllUsers, updateUserRoleAndClassId } from '../../api/users';

export const fetchGetOneClass = createAsyncThunk(
  'oneClass/fetchGetOneClass',
  async ({ id } : Id, thunkAPI) => {
    try {
      const res = await getOneClass({ id });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchGetAllClasses = createAsyncThunk(
  'oneClass/fetchGetAllClasses',
  async (_, thunkAPI) => {
    try {
      const res = await getAllClasses();

      return res.data.classes;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchGetAllUsers = createAsyncThunk(
  'oneClass/fetchGetAllUsers',
  async (_, thunkAPI) => {
    try {
      const res = await getAllUsers();

      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchUpdateStudent = createAsyncThunk(
  'oneClass/fetchUpdateStudent',
  async ({
    id, role, classId,
  }: UpdateUserRoleAndClassIdInterface, thunkAPI) => {
    try {
      const res = await updateUserRoleAndClassId({
        id, role, classId,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
