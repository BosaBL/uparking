import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
});

export default authApi;
