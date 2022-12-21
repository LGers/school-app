import { instance } from './instance';
import { CreateClassInterface, Id, UpdateClassInterface } from './api.types';

export const URL = {
  deleteOne: (id: number) => `classes/${id}`,
  updateOne: (id: number) => `classes/${id}`,
  getOne: (id: number) => `classes/${id}`,
  createOne: () => 'classes',
  getAll: () => 'classes',
};

export const deleteOneClass = (id: number) => instance.delete(URL.deleteOne(id));
export const getOneClass = ({ id }: Id) => instance.get(URL.getOne(id));
export const getAllClasses = () => instance.get(URL.getAll());

export const createOneClass = ({ classNumber, classLetter }: CreateClassInterface) => instance.post(
  URL.createOne(),
  {
    classNumber,
    classLetter,
  },
);

export const updateOneClass = ({
  id, classNumber, classLetter,
}: UpdateClassInterface) => instance.put(
  URL.updateOne(id),
  {
    classNumber,
    classLetter,
  },
);
