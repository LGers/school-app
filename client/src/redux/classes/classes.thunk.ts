import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateClassInterface, UpdateClassInterface } from '../../api/api.types';
import { getErrorData } from '../redux.utils';
import { ApiError } from '../redux.types';
import {
  createOneClass, deleteOneClass, getAllClasses, updateOneClass,
} from '../../api/classes';

export const fetchGetAllClasses = createAsyncThunk(
  'classes/fetchGetAllClasses',
  async (_, thunkAPI) => {
    try {
      const res = await getAllClasses();

      return res.data.classes;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchDeleteClass = createAsyncThunk(
  'classes/fetchDeleteClass',
  async (id: number, thunkAPI) => {
    try {
      const res = await deleteOneClass(id);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchCreateClass = createAsyncThunk(
  'classes/fetchCreateClass',
  async (oneClass: CreateClassInterface, thunkAPI) => {
    try {
      const res = await createOneClass(oneClass);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);

export const fetchUpdateClass = createAsyncThunk(
  'classes/fetchUpdateClass',
  async (oneClass: UpdateClassInterface, thunkAPI) => {
    try {
      const res = await updateOneClass(oneClass);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
