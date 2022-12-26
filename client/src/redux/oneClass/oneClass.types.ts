export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  classId: number;
}

export interface OneClass {
  students: Array<Student>
  id?: number,
  classNumber?: number,
  classLetter?: string,
}

export interface ApiOneClass {
  students: Array<Student>
  id: number,
  classNumber: number,
  classLetter: string,
}

export interface ClassesList {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface OneClassState {
  isFetching: boolean;
  oneClass: OneClass;
  classesList: Array<ClassesList>;
  users: Array<User>;
  error: {
    message: string;
    status: number;
  };
}

export interface UpdateStudentInterface {
  id: number;
  role: string;
  classId: string;
}
