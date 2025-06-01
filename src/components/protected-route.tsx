import { useAuth } from 'react-oidc-context';
import { Navigate, useLocation } from 'react-router';

import { paths } from '@/config/paths';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.auth.signIn.getHref(location.pathname)} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
