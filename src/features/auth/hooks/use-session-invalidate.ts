import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router';

export const useSessionInvalidate = () => {
  const { removeUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('logout')) {
      removeUser();
      setSearchParams((prev) => {
        prev.delete('logout');
        return prev;
      });
    }
  }, [searchParams, removeUser, setSearchParams]);
};
