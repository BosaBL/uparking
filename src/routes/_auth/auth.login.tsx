import { createFileRoute } from '@tanstack/react-router';
import Login from '../../components/auth/login';

export const Route = createFileRoute('/_auth/auth/login')({
  component: () => <Login />,
});
