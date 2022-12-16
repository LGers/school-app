export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  firstName: string,
  lastName: string,
}

export interface UpdatePasswordInterface {
  id: number;
  password: string;
}

export interface UpdateUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface DeleteUserInterface {
  id: number;
}

export interface GetOneUserInterface {
  id: number;
}
