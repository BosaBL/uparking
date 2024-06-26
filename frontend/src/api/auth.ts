import axios from '../libs/axiosAuthBearer';

export type UserUpdateDataFormType = {
  p_nombre: string;
  s_nombre: string;
  p_apellido: string;
  s_apellido: string;
  telefono: string;
};

export type RegisterFormType = {
  rut: string;
  p_nombre: string;
  s_nombre: string;
  p_apellido: string;
  s_apellido: string;
  email: string;
  password1: string;
  password2: string;
};

export const loginRequest = async (email: string, password: string) => {
  return axios.post('/login/', { email, password });
};

export const registerRequest = async (data: RegisterFormType) => {
  return axios.post('/registration/', data);
};

export const userDataRequest = async () => {
  return axios.get('/user/');
};

export const blacklistRequest = async (refresh: string) => {
  return axios.post('/blacklist/', { refresh });
};

export const updateUserDataRequest = async (data: UserUpdateDataFormType) => {
  return axios.patch('/user/', data);
};
