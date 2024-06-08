import { createFileRoute } from '@tanstack/react-router';
import Register from '../../components/auth/register';

export const Route = createFileRoute('/_auth/auth/register')({
  component: () => <Register />,
});
