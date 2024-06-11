import { createFileRoute } from '@tanstack/react-router';
import Nav from '../components/home/nav';
import { useAuthStore } from '../stores/auth';

function Component() {
  const { userData, logout } = useAuthStore();
  return <Nav user={structuredClone(userData)} logout={logout} />;
}

export const Route = createFileRoute('/_home')({
  beforeLoad: () => {
    useAuthStore.getState().getUserData();
  },
  component: Component,
  shouldReload: true,
});
