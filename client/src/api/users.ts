import { instance } from './instance';
import {
  DeleteUserInterface,
  GetOneUserInterface,
  UpdatePasswordInterface,
  UpdateUserInterface,
  UpdateUserRoleAndClassIdInterface,
  UpdateUserRoleInterface,
} from './api.types';

export const URL = {
  updateUser: (id: number) => `users/${id}`,
  deleteUser: (id: number) => `users/${id}`,
  getOne: (id: number) => `users/${id}`,
  getAll: () => 'users',
};

export const updatePassword = ({
  id,
  password,
}: UpdatePasswordInterface) => instance.put(URL.updateUser(id), {
  password,
});

export const updateUser = ({
  id, firstName, lastName, role, email,
}: UpdateUserInterface) => instance.put(URL.updateUser(id), {
  firstName,
  lastName,
  email,
  role,
});

export const deleteUser = ({ id }: DeleteUserInterface) => instance.delete(URL.deleteUser(id));
export const getOneUser = ({ id }: GetOneUserInterface) => instance.get(URL.getOne(id));
export const getAllUsers = () => instance.get(URL.getAll());

export const updateUserRoleAndClassId = ({
  id, role, classId,
}: UpdateUserRoleAndClassIdInterface) => instance.put(URL.updateUser(id), {
  role,
  classId,
});

export const updateUserRole = ({
  id, role,
}: UpdateUserRoleInterface) => instance.put(URL.updateUser(id), {
  role,
});
