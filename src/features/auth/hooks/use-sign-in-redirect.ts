import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useSearchParams } from 'react-router';

const useSignInRedirect = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirectTo') || '/app';
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, searchParams]);
};

export default useSignInRedirect;
