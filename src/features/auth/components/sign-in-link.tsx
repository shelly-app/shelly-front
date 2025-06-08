import { Text } from '@/components/ui/text';
import { NavLink } from 'react-router';

export const SignInLink = () => {
  return (
    <NavLink to="/auth/sign-in">
      <div className="rounded-lg bg-amber-200 px-4 py-2">
        <Text element="h2" className="text-md font-semibold">
          Iniciar sesión
        </Text>
      </div>
    </NavLink>
  );
};
