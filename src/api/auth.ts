import axios from '../libs/axiosAuthBearer';

export const loginRequest = async (email: string, password: string) => {
  return axios.post('/auth/login/', { email, password });
};
