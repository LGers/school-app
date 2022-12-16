import { ApiError } from './redux.types';

export const getErrorData = (error: ApiError): ApiError => {
  const errorData: ApiError = { message: '', status: 0 };
  if ((error as ApiError).response) {
    errorData.message = (error as ApiError).response?.data.message ?? '';
    errorData.status = (error as ApiError).request?.status ?? 0;
  } else {
    errorData.message = (error as ApiError).message ?? '';
    errorData.status = 0;
  }
  return errorData;
};
