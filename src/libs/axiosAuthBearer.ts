import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const token = useAuthStore.getState().accessToken;

const authApiWithBearer = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
});

authApiWithBearer.interceptors.request.use((config) => {
  if (token !== '') {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

export default authApiWithBearer;
