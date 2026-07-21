import { cognitoLogoutConfig } from "@/config/auth";
import {
  SIGN_OUT_REASON_STORAGE_KEY,
  type SignOutReason,
} from "@/features/auth/constants";
import { useCallback } from "react";

export const useSignOutAction = () => {
  const signOutAction = useCallback((reason?: SignOutReason) => {
    if (reason) {
      window.sessionStorage.setItem(SIGN_OUT_REASON_STORAGE_KEY, reason);
    } else {
      window.sessionStorage.removeItem(SIGN_OUT_REASON_STORAGE_KEY);
    }

    const {
      cognito_domain: cognitoDomain,
      client_id: clientId,
      logout_uri: logoutUri,
    } = cognitoLogoutConfig;

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&federated`;
  }, []);

  return signOutAction;
};
