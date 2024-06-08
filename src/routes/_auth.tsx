import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { User } from '../stores/auth';
import { useAuthStore } from '../stores/auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const state = useAuthStore.getState();
    state.checkTokens();
    if (state.isAuthenticated) {
      if (typeof state.userData !== 'string') {
        if (state.userData.rol === 'admin') {
          throw redirect({
            to: '/admin',
            replace: true,
          }) as Error;
        }
      }
      throw redirect({
        to: '/',
        replace: true,
      }) as Error;
    }
  },
  component: () => <Outlet />,
});
