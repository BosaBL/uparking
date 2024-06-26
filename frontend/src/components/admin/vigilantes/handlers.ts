import { APIS } from '../../../constants';
import axios from '../../../libs/axiosBaseBearer';
import { VigilanteSimpleT } from './vigilantes';

export const handleCreate = async (data: VigilanteSimpleT) => {
  const url = new URL(`users/${data.id}/`, APIS.admin);
  const reqObj = {
    rol: 'vigilante',
  };
  return axios.patch(url.toString(), reqObj);
};

export const handleDelete = async (data: VigilanteSimpleT) => {
  const url = new URL(`vigilantes/${data.id}/`, APIS.admin);
  const reqObj = {
    rol: 'user',
  };
  return axios.patch(url.toString(), reqObj);
};
