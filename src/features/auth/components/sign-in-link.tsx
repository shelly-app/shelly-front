import { H2 } from '@/components/ui/text';
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
        'rounded-md border bg-amber-50/50 px-4 py-2 text-amber-800 transition-colors duration-500',
        isScrolled
          ? 'border-amber-300 bg-amber-300 shadow-md backdrop-blur-sm hover:bg-amber-200/80'
          : 'border-transparent backdrop-blur-md hover:bg-amber-50/70',
      )}
    >
      <H2 className="text-amber-800">
        {isAuthenticated ? 'Acceder' : 'Iniciar sesión'}
      </H2>
    </NavLink>
  );
};
