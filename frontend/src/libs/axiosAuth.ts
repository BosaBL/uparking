import axios from 'axios';
import { BASEAPI } from '../constants';

const authApi = axios.create({
  baseURL: BASEAPI,
});

export default authApi;
