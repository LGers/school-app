import { MyKnownError } from './auth/auth.types';

export const getErrorData = (error: MyKnownError): MyKnownError => {
  const errorData: MyKnownError = { message: '', status: 0 };
  if ((error as MyKnownError).response) {
    errorData.message = (error as MyKnownError).response?.data.message ?? '';
    errorData.status = (error as MyKnownError).request?.status ?? 0;
  } else {
    errorData.message = (error as MyKnownError).message ?? '';
    errorData.status = 0;
  }
  return errorData;
};
