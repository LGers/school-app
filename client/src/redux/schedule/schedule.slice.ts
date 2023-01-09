import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeekScheduleState, WeekScheduleResponse } from './schedule.types';
import { ApiError } from '../redux.types';
import { fetchGetOneClassWeekSchedule } from './schedule.thunk';

const initialState: WeekScheduleState = {
  isFetching: false,
  weekSchedule: [],
  error: {
    message: '',
    status: 0,
  },
};

export const scheduleSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetScheduleErrorMessage: (state) => {
      state.error = initialState.error;
    },

    resetScheduleState: (state) => {
      state.weekSchedule = initialState.weekSchedule;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetOneClassWeekSchedule.pending, (state) => {
      state.isFetching = true;
      state.error = initialState.error;
    });

    builder.addCase(
      fetchGetOneClassWeekSchedule.fulfilled,
      (state, action: PayloadAction<WeekScheduleResponse>) => {
        const weekSchedule = action.payload.weekSchedule.slice(0, 6)
          .map((item) => (
            {
              ...item,
              time: item.date,
            }
          ));
        weekSchedule.slice(0, 6);
        state.weekSchedule = action.payload.weekSchedule.slice(0, 6);
        state.isFetching = false;
      },
    );

    builder.addCase(fetchGetOneClassWeekSchedule.rejected, (state, action) => {
      state.error = action.payload as ApiError;
      state.isFetching = false;
    });
  },
});

export const {
  resetScheduleErrorMessage, resetScheduleState,
} = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
