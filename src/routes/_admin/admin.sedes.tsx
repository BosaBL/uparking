import { createFileRoute } from '@tanstack/react-router';
import { AxiosResponse } from 'axios';
import Sedes from '../../components/admin/Sedes';
import { getSedesRequest } from '../../components/admin/api';
import { SedeT } from '../../components/admin/sedes.d';

export const Route = createFileRoute('/_admin/admin/sedes')({
  loader: async (): Promise<SedeT[]> => {
    const data = await getSedesRequest();
    return data.data;
  },
  component: () => <Sedes />,
  shouldReload: true,
});
