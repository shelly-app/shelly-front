import { cognitoLogoutConfig } from '@/config/cognito';
import { useCallback } from 'react';

const useSignOutAction = () => {
  const signOutAction = useCallback(() => {
    const {
      cognito_domain: cognitoDomain,
      client_id: clientId,
      logout_uri: logoutUri,
    } = cognitoLogoutConfig;

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&federated`;
  }, []);

  return signOutAction;
};

export default useSignOutAction;
