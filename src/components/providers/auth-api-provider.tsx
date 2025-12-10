import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { setAuthToken } from "@/lib/api-client";

interface AuthApiProviderProps {
  children: React.ReactNode;
}

/**
 * Provider that synchronizes Cognito authentication tokens with API client
 * Automatically sets/removes the Authorization header when auth state changes
 */
export function AuthApiProvider({ children }: AuthApiProviderProps) {
  const auth = useAuth();

  useEffect(() => {
    // Extract token from OIDC user (prefer access_token, fallback to id_token)
    const token = auth.user?.access_token || auth.user?.id_token || null;
    setAuthToken(token);
  }, [auth.user]);

  return <>{children}</>;
}
