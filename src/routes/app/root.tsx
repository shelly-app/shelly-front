import { AppLayout } from '@/components/layouts/app-layout';
import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AppRoot;
