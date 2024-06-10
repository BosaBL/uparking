import { Navigate } from '@tanstack/react-router';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Navigate to="/home" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
