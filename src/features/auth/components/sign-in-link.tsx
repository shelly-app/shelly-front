import { Text } from '@/components/ui/text';
import { useAuth } from 'react-oidc-context';
import { NavLink } from 'react-router';

export const SignInLink = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavLink
      to={isAuthenticated ? '/app/pets' : '/auth/sign-in'}
      className="rounded-lg bg-amber-200 px-4 py-2 transition-colors hover:bg-amber-300"
    >
      <Text element="h2" className="text-md font-semibold">
        {isAuthenticated ? 'Acceder' : 'Iniciar sesión'}
      </Text>
    </NavLink>
  );
};
