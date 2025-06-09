import { Text } from '@/components/ui/text';
import { useAuth } from 'react-oidc-context';
import { NavLink } from 'react-router';

export const SignInLink = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavLink
      to={isAuthenticated ? '/app/pets' : '/auth/sign-in'}
      className="rounded-lg border-1 border-amber-200 bg-amber-200/80 px-4 py-2 backdrop-blur-lg transition-colors hover:border-transparent hover:bg-amber-300/60"
    >
      <Text element="h2" className="text-md font-semibold">
        {isAuthenticated ? 'Acceder' : 'Iniciar sesión'}
      </Text>
    </NavLink>
  );
};
