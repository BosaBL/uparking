import { createFileRoute } from '@tanstack/react-router';
import Map from '../../components/home/map';

export const Route = createFileRoute('/_admin/admin/')({
  component: () => <Map />,
});
