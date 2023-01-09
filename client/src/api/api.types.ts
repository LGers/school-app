export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  firstName: string,
  lastName: string,
}

export interface UpdatePasswordInterface {
  id: number;
  password: string;
}

export interface UpdateUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Id {
  id: number;
}

export interface DeleteUserInterface {
  id: number;
}

export interface GetOneUserInterface {
  id: number;
}

export interface CreateClassInterface {
  classNumber: string;
  classLetter: string;
}

export interface UpdateClassInterface extends CreateClassInterface {
  id: number;
}

export interface UpdateUserRoleAndClassIdInterface {
  id: number;
  role: string;
  classId: number | string | null;
}

export interface UpdateUserRoleInterface {
  id: number;
  role: string;
}

export interface UpdateScheduleRecord {
  id: number;
  teacherId: number | string;
  homework: string;
}

export interface ScheduleRecord extends UpdateScheduleRecord {
  classId: string | number;
  date: string;
  subjectId: number | string;
}

export interface ScheduleRecordsByWeek {
  classId: string | number;
  weekDay: string;
}
