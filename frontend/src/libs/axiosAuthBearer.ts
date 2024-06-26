import axios, { AxiosError } from 'axios';
import { APIS } from '../constants';
import { useAuthStore } from '../stores/auth';

const authApiWithBearer = axios.create({
  baseURL: APIS.auth,
});

authApiWithBearer.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token !== '') {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

authApiWithBearer.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (
      error?.response?.status === 401 &&
      !config?.sent &&
      useAuthStore.getState().isAuthenticated
    ) {
      config.sent = true;

      let access;
      try {
        const refresh = useAuthStore.getState().refreshToken;
        const res = await axios.post(
          new URL('token/refresh/', APIS.auth).toString(),
          {
            refresh,
          }
        );
        access = res.data.access;
        useAuthStore.getState().setAccessToken(access);
      } catch (err) {
        const errr = err as AxiosError;
        if (errr?.response?.status === 200) {
          useAuthStore.getState().logout();
          return Promise.reject(errr);
        }
      }

      config.headers = {
        ...config.headers,
        authorization: `Bearer ${access}`,
      };

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default authApiWithBearer;
