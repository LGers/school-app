export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  classId: number;
}

export interface OneClass {
  id: number,
  classNumber: number,
  classLetter: string,
  students: Array<Student>
}

export interface ClassesState {
  isFetching: boolean;
  classNumbers: Array<number>;
  list: Array<OneClass>;
  error: {
    message: string;
    status: number;
  };
}
