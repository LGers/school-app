import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Teacher,
  TeachersState, User,
} from './teachers.types';
import { ApiError } from '../redux.types';
import {
  fetchDeleteTeacher, fetchGetAllTeachers, fetchUpdateTeacher,
} from './teachers.thunk';

const initialState: TeachersState = {
  isFetching: false,
  teachers: [],
  users: [],
  error: {
    message: '',
    status: 0,
  },
};

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    resetTeachersErrorMessage: (state) => {
      state.error = initialState.error;
    },

    resetTeachersState: (state) => {
      state.users = initialState.users;
      state.teachers = initialState.teachers;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetAllTeachers.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(
      fetchGetAllTeachers.fulfilled,
      (state, action: PayloadAction<{ teachers: Array<Teacher>, users: Array<User> }>) => {
        state.teachers = action.payload.teachers;
        state.users = action.payload.users;
        state.isFetching = false;
      },
    );

    builder.addCase(fetchGetAllTeachers.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchDeleteTeacher.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchDeleteTeacher.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchDeleteTeacher.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateTeacher.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchUpdateTeacher.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateTeacher.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  resetTeachersErrorMessage, resetTeachersState,
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
