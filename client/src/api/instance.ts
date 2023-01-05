import axios from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

instance.interceptors.request.use(async (axiosRequest) => {
  axiosRequest.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  };

  return axiosRequest;
});
