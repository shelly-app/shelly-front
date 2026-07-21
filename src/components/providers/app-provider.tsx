import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "react-oidc-context";

import { authConfig } from "@/config/auth";

import { MainErrorFallback } from "@/components/errors/main";
import { queryConfig } from "@/lib/react-query";
import { SheltersProvider } from "@/components/providers/shelters-provider";
import { Suspense, useState } from "react";
import { Toaster } from "sonner";

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
            <SheltersProvider>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              {children}
              <Toaster richColors closeButton position="top-center" />
            </SheltersProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export { AppProvider };
