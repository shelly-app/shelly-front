import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "react-oidc-context";

import { authConfig } from "@/config/auth";

import { MainErrorFallback } from "@/components/errors/main";
// import { Notifications } from '@/components/ui/notifications';
// import { Spinner } from '@/components/ui/spinner';
// import { AuthLoader } from '@/lib/auth';
import { queryConfig } from "@/lib/react-query";
import { SheltersProvider } from "@/components/providers/shelters-provider";
import { AuthApiProvider } from "@/components/providers/auth-api-provider";
import { Suspense, useState } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider {...authConfig}>
            <AuthApiProvider>
              <SheltersProvider>
                {import.meta.env.DEV && <ReactQueryDevtools />}
                {children}
              </SheltersProvider>
            </AuthApiProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export { AppProvider };
