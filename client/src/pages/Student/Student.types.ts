export interface Subject {
  id: number;
  time: string;
  subject: string;
  homework?: string;
  mark?: number;
}

export interface Props {
  weekDay: string;
  subjects: Array<Subject>;
}
