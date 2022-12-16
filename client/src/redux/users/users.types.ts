export interface UsersState {
  isAuth: boolean;
  isFetching: boolean;
  error: {
    message: string;
    status: number;
  };
}
