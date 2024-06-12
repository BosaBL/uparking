import { createFileRoute, redirect } from '@tanstack/react-router';
import UpdateUserDataForm from '../../components/home/UpdateUserDataForm';
import { useAuthStore } from '../../stores/auth';

export const Route = createFileRoute('/_home/home/user')({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: '/home/user' },
      }) as Error;
    }
  },
  loader: () => {
    useAuthStore.getState().getUserData();
    return useAuthStore.getState().userData;
  },
  component: () => <UpdateUserDataForm />,
  shouldReload: true,
});
