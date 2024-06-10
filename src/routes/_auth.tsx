import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const state = useAuthStore.getState();
    await state.checkTokens();
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({
        to: '/',
        replace: true,
      }) as Error;
    }
  },
  component: () => <Outlet />,
});
