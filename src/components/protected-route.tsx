import { useEffect, useRef } from "react";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";

import { paths } from "@/config/paths";
import { useUser } from "@/hooks/use-user";
import { useSignOutAction } from "@/features/auth/hooks/use-sign-out-action";
import SectionLoader from "@/components/section-loader";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { data: user, isLoading: isUserLoading } = useUser();
  const signOut = useSignOutAction();
  const hasStartedSignOut = useRef(false);
  const { t } = useTranslation();
  const location = useLocation();

  const hasNoShelters =
    isAuthenticated && !isUserLoading && user?.shelters.length === 0;

  useEffect(() => {
    if (hasNoShelters && !hasStartedSignOut.current) {
      hasStartedSignOut.current = true;
      signOut("no-shelter");
    }
  }, [hasNoShelters, signOut]);

  if (isAuthLoading || (isAuthenticated && isUserLoading) || hasNoShelters) {
    return <SectionLoader text={t("auth.checking_access")} />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.signIn.getHref(location.pathname)} replace />
    );
  }

  return children;
};
