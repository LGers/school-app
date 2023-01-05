import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Id,
  UpdateUserRoleInterface,
} from '../../api/api.types';
import { getErrorData } from '../redux.utils';
import { ApiError } from '../redux.types';
import { getAllUsers, updateUserRole } from '../../api/users';
import { User } from './teachers.types';
import { Roles } from '../../constants/common.dictionary';

const PREFIX = 'teachers';

export const fetchGetAllTeachers = createAsyncThunk(
  `${PREFIX}/fetchGetAllTeachers`,
  async (_, thunkAPI) => {
    try {
      const usersRes = await getAllUsers();
      const teachers = usersRes.data.users
        .filter((user: User) => user.role === Roles.TEACHER);
      const users = usersRes.data.users
        .filter((user: User) => user.role === Roles.USER);

      return { teachers, users };
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchDeleteTeacher = createAsyncThunk(
  `${PREFIX}/fetchDeleteTeacher`,
  async ({
    id,
  }: Id, thunkAPI) => {
    try {
      const res = await updateUserRole({
        id, role: Roles.USER,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchUpdateTeacher = createAsyncThunk(
  `${PREFIX}/fetchUpdateTeacher`,
  async ({
    id, role,
  }: UpdateUserRoleInterface, thunkAPI) => {
    try {
      const res = await updateUserRole({
        id, role,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
