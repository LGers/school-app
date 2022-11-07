export interface SignInData {
  token: string;
}

export interface User {
  id: number | undefined;
  firstName: string;
  lastName: string;
  role: string;
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

export interface MyKnownError {
  message: string;
  status: number;
  response?: {
    data: {
      message: string;
    };
  };
  request?: {
    status: number;
  };
}

export interface TokenData {
  id: number,
  firstName: string,
  lastName: string,
  role: string,
  exp: number
}
