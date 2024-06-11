import { Outlet, createFileRoute } from '@tanstack/react-router';
import { User, useAuthStore } from '../stores/auth';
import Nav from '../components/home/nav';

function Component() {
  const { userData, logout } = useAuthStore();
  return <Nav user={userData} logout={logout} />;
}

export const Route = createFileRoute('/_home')({
  beforeLoad: () => {
    useAuthStore.getState().getUserData();
  },
  component: Component,
  shouldReload: true,
});
