export interface SignInData {
  token: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export interface AuthState {
  isAuth: boolean;
  isFetching: boolean;
  user: User;
  error: {
    message: string;
    status: number;
  };
}
