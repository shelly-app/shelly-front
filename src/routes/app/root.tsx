import { AppLayout } from '@/components/layouts/app-layout';
import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
  return <div>¡Algo salió mal!</div>;
};

export const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
