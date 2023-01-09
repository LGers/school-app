import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorData } from '../redux.utils';
import { ApiError } from '../redux.types';
import { ScheduleRecordsByWeek } from '../../api/api.types';
import { getOneClassWeekScheduleByWeekDay } from '../../api/schedule';

const PREFIX = 'schedule';

export const fetchGetOneClassWeekSchedule = createAsyncThunk(
  `${PREFIX}/fetchGetOneClassWeekSchedule`,
  async ({ classId, weekDay } : ScheduleRecordsByWeek, thunkAPI) => {
    try {
      const res = await getOneClassWeekScheduleByWeekDay({ classId, weekDay });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error as ApiError));
    }
  },
);
