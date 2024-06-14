import { createFileRoute } from '@tanstack/react-router';

import Vigilantes from '../../components/admin/vigilantes/Vigilantes';
import { VigilanteT } from '../../components/admin/vigilantes/vigilantes';
import axios from '../../libs/axiosBaseBearer';

export const Route = createFileRoute('/_admin/admin/vigilantes')({
  loader: async (): Promise<VigilanteT[]> => {
    const data = await axios.get('/api/admin/vigilantes/');
    return data.data;
  },
  component: Vigilantes,
  shouldReload: true,
});
