import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_admin/admin/vigilantes')({
  component: () => <div>Hello /_auth/_admin/vigilantes!</div>,
});
