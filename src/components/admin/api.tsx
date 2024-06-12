import axios, { AxiosResponse } from 'axios';
import { APIS } from '../../constants';
import { useAuthStore } from '../../stores/auth';
import { SedeT } from './sedes.d';

const authApiWithBearer = axios.create({
  baseURL: APIS.admin,
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

export async function getSedesRequest(): Promise<AxiosResponse<SedeT[]>> {
  return authApiWithBearer.get('/sedes');
}

export async function deleteSedeRequest(
  id: SedeT['id']
): Promise<AxiosResponse> {
  return authApiWithBearer.delete(`/sedes/${id}`);
}

export async function addSedeRequest(
  sede: SedeT
): Promise<AxiosResponse<SedeT>> {
  return authApiWithBearer.post('/sedes/', sede);
}

export async function updateSedeRequest(
  sede: SedeT['id'],
  data: SedeT & Omit<SedeT, 'id'>
): Promise<AxiosResponse<SedeT>> {
  return authApiWithBearer.patch(`/sedes/${sede}/`, data);
}
