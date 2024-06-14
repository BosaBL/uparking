import { createFileRoute } from '@tanstack/react-router';

import Sedes from '../../components/admin/sedes/Sedes';
import { SedeT } from '../../components/admin/sedes/sedes.d';
import axios from '../../libs/axiosBaseBearer';

export const Route = createFileRoute('/_admin/admin/sedes')({
  loader: async (): Promise<SedeT[]> => {
    const data = await axios.get('/api/admin/sedes/');
    return data.data;
  },
  component: Sedes,
  shouldReload: true,
});
