import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from 'react-oidc-context';

import { env } from '@/config/env';
import { cognitoAuthConfig } from '@/config/cognito';

import { MainErrorFallback } from '@/components/errors/main';
// import { Notifications } from '@/components/ui/notifications';
// import { Spinner } from '@/components/ui/spinner';
// import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SheltersProvider } from '@/components/providers/shelters-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider {...cognitoAuthConfig}>
            <SidebarProvider>
              <SheltersProvider>
                {env.DEV && <ReactQueryDevtools />}
                {children}
              </SheltersProvider>
            </SidebarProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export { AppProvider };
