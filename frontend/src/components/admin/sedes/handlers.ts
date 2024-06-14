import axios from '../../../libs/axiosBaseBearer';
import { SedeT } from './sedes';

export const handleCreate = async (data: SedeT) => {
  const reqObj = {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
  };
  return axios.post('/api/admin/sedes/', reqObj);
};
export const handleDelete = async (data: SedeT) => {
  const reqObj = {
    id: data.id,
    nombre: data.nombre,
    direccion: data.direccion,
  };

  return axios.delete(`/api/admin/sedes/${reqObj.id}/`);
};
export const handleUpdate = async (data: SedeT) => {
  const { id } = data;
  const reqObj = {
    nombre: data.nombre,
    direccion: data.direccion,
  };

  return axios.patch(`/api/admin/sedes/${id}/`, reqObj);
};
