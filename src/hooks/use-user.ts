import { useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { api } from "@/lib/api-client";
import type { User } from "@/types/api";

export const useUser = () => {
  const auth = useAuth();

  return useQuery({
    queryKey: ["user"],
    enabled: auth.isAuthenticated && !auth.isLoading,
    queryFn: () => api.get<never, User>("/users/me"),
  });
};
