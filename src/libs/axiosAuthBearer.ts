import axios from 'axios';
import { APIS } from '../constants';
import { useAuthStore } from '../stores/auth';

const authApiWithBearer = axios.create({
  baseURL: APIS.auth,
  withCredentials: true,
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

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      await useAuthStore.getState().checkTokens();
      const refresh = useAuthStore.getState().refreshToken;
      const access = useAuthStore.getState().accessToken;

      if (access && refresh && useAuthStore.getState().isAuthenticated) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${access}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default authApiWithBearer;
