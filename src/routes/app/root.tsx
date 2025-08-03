import { AppLayout } from "@/components/layouts/app-layout";
import { Outlet } from "react-router-dom";

import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (import.meta.env.DEV) console.error("Route error:", error);

  return <div>¡Algo salió mal!</div>;
};

export const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
