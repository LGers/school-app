import { instance } from './instance';
import {
  Id, ScheduleRecord, ScheduleRecordsByWeek, UpdateScheduleRecord,
} from './api.types';

const API_ENDPOINT = 'schedules';

export const URL = {
  deleteOne: (id: number) => `${API_ENDPOINT}/${id}`,
  updateOne: (id: number) => `${API_ENDPOINT}/${id}`,
  getOne: (id: number) => `${API_ENDPOINT}/${id}`,
  getScheduleByWeek: ({ classId, weekDay }: ScheduleRecordsByWeek) => (
    `${API_ENDPOINT}/${classId}/${weekDay}`
  ),
  createOne: () => `${API_ENDPOINT}`,
  getAll: () => `${API_ENDPOINT}`,
};

export const deleteOneScheduleRecord = ({ id }: Id) => instance.delete(URL.deleteOne(id));

export const getOneClassWeekScheduleByWeekDay = (data: ScheduleRecordsByWeek) => (
  instance.get(URL.getScheduleByWeek(data))
);

export const createOneScheduleRecord = (scheduleRecord: ScheduleRecord) => instance.post(
  URL.createOne(),
  scheduleRecord,
);

export const updateOneScheduleRecord = ({
  id, teacherId, homework,
}: UpdateScheduleRecord) => instance.put(
  URL.updateOne(id),
  {
    teacherId,
    homework,
  },
);

export const deleteScheduleRecord = ({ id }: Id) => instance.delete(URL.deleteOne(id));
