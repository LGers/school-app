export interface Subject {
  id: number,
  date: string,
  homework: string | undefined,
  createdAt: string | undefined,
  updatedAt: string | undefined,
  classId: number,
  subjectId: string,
  subject: string;
}

export interface ScheduleRecord {
  weekDay: string,
  date: string,
  subjects: Array<Subject>,
}

export interface WeekScheduleState {
  isFetching: boolean;
  weekSchedule: Array<ScheduleRecord>;
  error: {
    message: string;
    status: number;
  };
}

export interface WeekScheduleResponse {
  data: {
    classId: number;
    currentDay: string;
    endOfWeek: string;
    startOfWeek: string;
  },
  weekSchedule: Array<ScheduleRecord>
}
