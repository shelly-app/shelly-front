import MainLayout from '@/components/layouts/main-layout';
import { Outlet } from 'react-router';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
