import { useAuth } from 'react-oidc-context';
import { Navigate, useLocation } from 'react-router';

import { paths } from '@/config/paths';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
