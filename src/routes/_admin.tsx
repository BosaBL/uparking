import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth';
import Nav from '../components/admin/nav';

function Component() {
  const { userData, logout } = useAuthStore();
  return <Nav user={structuredClone(userData)} logout={logout} />;
}

export const Route = createFileRoute('/_admin')({
  beforeLoad: async () => {
    const data = await useAuthStore.getState().getUserData();
    if (data?.rol !== 'admin') {
      throw redirect({ to: '/home', replace: true }) as Error;
    }
  },
  component: Component,
  shouldReload: true,
});
