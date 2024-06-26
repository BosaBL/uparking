import { createFileRoute } from '@tanstack/react-router';

import Sedes from '../../components/admin/sedes/Sedes';
import { SedeT } from '../../components/admin/sedes/sedes.d';
import { APIS } from '../../constants';
import axios from '../../libs/axiosBaseBearer';

export const Route = createFileRoute('/_admin/admin/sedes')({
  loader: async (): Promise<SedeT[]> => {
    const url = new URL('sedes/', APIS.admin).toString();

    const data = await axios.get(url);
    return data.data;
  },
  component: Sedes,
  shouldReload: true,
});
