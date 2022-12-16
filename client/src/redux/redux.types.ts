export interface ApiError {
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
