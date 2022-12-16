import { instance } from './instance';
import {
  SignInInterface,
  SignUpInterface,
} from './api.types';

export const URL = {
  signIn: () => 'signin',
  signUp: () => 'signup',
};

export const signIn = ({ email, password }: SignInInterface) => instance.post(URL.signIn(), {
  email,
  password,
});

export const signUp = ({
  firstName, lastName, email, password,
}: SignUpInterface) => instance.post(URL.signUp(), {
  firstName,
  lastName,
  email,
  password,
});
