import { Text } from '@/components/ui/text';
import { useIsScrolled } from '@/hooks/use-is-scrolled';
import { cn } from '@/lib/utils';
import { useAuth } from 'react-oidc-context';
import { NavLink } from 'react-router';

export const SignInLink = () => {
  const { isAuthenticated } = useAuth();
  const isScrolled = useIsScrolled(100);

  return (
    <NavLink
      to={isAuthenticated ? '/app/pets' : '/auth/sign-in'}
      className={cn(
        'rounded-md border bg-white/50 px-4 py-2 text-amber-800 transition-colors duration-500',
        isScrolled
          ? 'border-amber-300 bg-amber-300 shadow-md backdrop-blur-sm hover:bg-amber-200/80'
          : 'border-transparent backdrop-blur-md hover:bg-white/70',
      )}
    >
      <Text element="h2" className="text-md font-semibold text-amber-800">
        {isAuthenticated ? 'Acceder' : 'Iniciar sesión'}
      </Text>
    </NavLink>
  );
};
