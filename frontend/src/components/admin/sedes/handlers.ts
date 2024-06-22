import { APIS } from '../../../constants';
import axios from '../../../libs/axiosBaseBearer';
import { SedeT } from './sedes';

const url = new URL('sedes/', APIS.admin).toString();

export const handleCreate = async (data: SedeT) => {
  const reqObj = {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
  };
  return axios.post(url, reqObj);
};
export const handleDelete = async (data: SedeT) => {
  const reqObj = {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
  };

  return axios.delete(`${url}${reqObj.id}/`);
};
export const handleUpdate = async (data: SedeT) => {
  const { id } = data;
  const reqObj = {
    nombre: data.nombre,
    direccion: data.direccion,
  };

  return axios.patch(`${url}${id}/`, reqObj);
};
