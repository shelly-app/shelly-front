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
        'rounded-lg px-5 py-2.5 font-medium transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-amber-400 text-amber-900 shadow-lg hover:bg-amber-500 hover:shadow-xl active:scale-95'
          : 'bg-amber-100/80 text-amber-800 backdrop-blur-sm hover:bg-amber-200/90 hover:shadow-md active:scale-95',
      )}
    >
      <H2 className="text-inherit">
        {isAuthenticated ? 'Acceder' : 'Iniciar sesión'}
      </H2>
    </NavLink>
  );
};
