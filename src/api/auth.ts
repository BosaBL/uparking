import axios from '../libs/axiosAuthBearer';

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
  return axios.post('/auth/login/', { email, password });
};

export const registerRequest = async (data: RegisterFormType) => {
  return axios.post('/auth/registration/', data);
};
