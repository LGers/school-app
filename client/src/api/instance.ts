import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

instance.interceptors.request.use(async (axiosRequest) => {
  axiosRequest.headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  };
  return axiosRequest;
});
