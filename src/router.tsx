import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';
// import { ProtectedRoute } from '@/lib/auth';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from '@/routes/app/root';

// TODO: do we need this?
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/landing.tsx').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        // <ProtectedRoute>
        <AppRoot />
        // </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        // {
        //   path: paths.app.dashboard.path,
        //   lazy: () =>
        //     import('./routes/app/dashboard.tsx').then(
        //       convert(queryClient),
        //     ),
        // },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found.tsx').then(convert(queryClient)),
    },
  ]);

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

export { AppRouter };
