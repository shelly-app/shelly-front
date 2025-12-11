import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { paths } from "@/config/paths";

import {
  AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "@/routes/app/root";
import { ProtectedRoute } from "@/components/protected-route.tsx";

// TODO: do we need this?
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  // Handle both default exports and named exports
  const ActualComponent =
    Component ||
    Object.values(rest).find(
      (value) => typeof value === "function" && value.name,
    );

  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component: ActualComponent,
  };
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import("./routes/landing.tsx").then(convert(queryClient)),
    },
    {
      path: paths.auth.signIn.path,
      lazy: () =>
        import("./routes/auth/sign-in.tsx").then(convert(queryClient)),
    },
    {
      path: paths.shelters.path,
      lazy: () => import("./routes/shelters.tsx").then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          index: true,
          element: <Navigate to={paths.app.pets.path} replace />,
        },
        {
          path: paths.app.pets.path,
          lazy: () =>
            import("./routes/app/pets/pets.tsx").then(convert(queryClient)),
        },
        {
          path: paths.app.pets.pet.path,
          lazy: () =>
            import("./routes/app/pets/pet.tsx").then(convert(queryClient)),
        },
        {
          path: paths.app.requests.path,
          lazy: () =>
            import("./routes/app/requests/requests.tsx").then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.members.path,
          lazy: () =>
            import("./routes/app/members/members.tsx").then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.members.profile.path,
          lazy: () =>
            import("./routes/app/members/profile.tsx").then(
              convert(queryClient),
            ),
        },
      ],
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found.tsx").then(convert(queryClient)),
    },
  ]);

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

export { AppRouter };
