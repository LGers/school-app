export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Teacher {
  userId: number;
  teacherId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TeachersState {
  isFetching: boolean;
  teachers: Array<Teacher>;
  users: Array<User>;
  error: {
    message: string;
    status: number;
  };
}
