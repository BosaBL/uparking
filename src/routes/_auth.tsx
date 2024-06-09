import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const state = useAuthStore.getState();
    await state.checkTokens();
    if (useAuthStore.getState().isAuthenticated) {
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
