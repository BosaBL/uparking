import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/estacionamientos')({
  component: () => <div>Hello /_auth/_admin/estacionamientos!</div>,
});
