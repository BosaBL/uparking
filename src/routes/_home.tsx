import { Outlet, createFileRoute } from '@tanstack/react-router';
import { User, useAuthStore } from '../stores/auth';
import Nav from '../components/home/nav';

function Component() {
  const { userData, getUserData } = useAuthStore();
  return <Nav user={userData} getUserData={getUserData} />;
}

export const Route = createFileRoute('/_home')({
  beforeLoad: () => {
    useAuthStore.getState().getUserData();
  },
  component: Component,
});
