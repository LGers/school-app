import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OneClassState, OneClass, ApiOneClass, User,
} from './oneClass.types';
import { ApiError } from '../redux.types';
import {
  fetchGetOneClass,
  fetchGetAllClasses,
  fetchGetAllUsers,
  fetchUpdateStudent,
} from './oneClass.thunk';

const initialState: OneClassState = {
  isFetching: false,
  oneClass: {
    students: [],
  },
  classesList: [],
  users: [],
  error: {
    message: '',
    status: 0,
  },
};

export const oneClassSlice = createSlice({
  name: 'oneClass',
  initialState,
  reducers: {
    resetOneClassErrorMessage: (state) => {
      state.error = initialState.error;
    },

    resetOneClassState: (state) => {
      state.oneClass = initialState.oneClass;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetOneClass.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchGetOneClass.fulfilled, (state, action: PayloadAction<OneClass>) => {
      state.oneClass = action.payload;
      state.isFetching = false;
    });

    builder.addCase(fetchGetOneClass.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchGetAllClasses.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchGetAllClasses.fulfilled, (
      state,
      action: PayloadAction<Array<ApiOneClass>>,
    ) => {
      state.classesList = action.payload
        .map((cl) => ({ id: cl.id, name: cl.classNumber + cl.classLetter }))
        .sort((a, b) => a.name.localeCompare(b.name));
      state.isFetching = false;
    });

    builder.addCase(fetchGetAllClasses.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchGetAllUsers.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchGetAllUsers.fulfilled, (
      state,
      action: PayloadAction<Array<User>>,
    ) => {
      state.users = action.payload.filter((user) => user.role === 'USER');
      state.isFetching = false;
    });

    builder.addCase(fetchGetAllUsers.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateStudent.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchUpdateStudent.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateStudent.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  resetOneClassErrorMessage, resetOneClassState,
} = oneClassSlice.actions;

export const oneClassReducer = oneClassSlice.reducer;
