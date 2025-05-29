import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate } from 'react-router';

import { paths } from '@/config/paths';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth.isAuthenticated)
    navigate(paths.auth.login.getHref(location.pathname), { replace: true });

  return children;
};

export default ProtectedRoute;
