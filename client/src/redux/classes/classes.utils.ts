import { OneClass } from './classes.types';

export const sortClasses = (classes: Array<OneClass>): Array<OneClass> => (
  classes
    .sort((a, b) => (a.classNumber + a.classLetter)
      .localeCompare(b.classNumber + b.classLetter))
);

export const getClassNumbers = (classes: Array<OneClass>): Array<number> => (
  Array.from(new Set(classes.map((cl) => cl.classNumber)))
);
