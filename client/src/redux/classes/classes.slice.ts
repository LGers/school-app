import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ClassesState, OneClass,
} from './classes.types';
import { ApiError } from '../redux.types';
import { fetchCreateClass, fetchGetAllClasses, fetchUpdateClass } from './classes.thunk';
import { getClassNumbers, sortClasses } from './classes.utils';

const initialState: ClassesState = {
  isFetching: false,
  classNumbers: [],
  list: [],
  error: {
    message: '',
    status: 0,
  },
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    resetClassesErrorMessage: (state) => {
      state.error = initialState.error;
    },

    resetClassesState: (state) => {
      state.classNumbers = [];
      state.list = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetAllClasses.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchGetAllClasses.fulfilled, (
      state,
      action: PayloadAction<Array<OneClass>>,
    ) => {
      state.list = sortClasses(action.payload);
      state.classNumbers = getClassNumbers(action.payload);
      state.isFetching = false;
    });

    builder.addCase(fetchGetAllClasses.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchCreateClass.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchCreateClass.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchCreateClass.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateClass.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(fetchUpdateClass.fulfilled, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchUpdateClass.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  resetClassesErrorMessage, resetClassesState,
} = classesSlice.actions;

export const classesReducer = classesSlice.reducer;
