import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import GoogleIcon from '@/assets/svg/google-icon.svg';
import { useAuth } from 'react-oidc-context';
import { type AuthProvider } from '@/features/auth/types';
import { useSearchParams } from 'react-router';

const SVG_ICONS = {
  Google: GoogleIcon,
};

const signInButtonVariants = cva(
  'flex cursor-pointer items-center gap-3 px-4 py-2 border rounded-lg font-medium shadow-sm hover:shadow-md transition duration-200',
  {
    variants: {
      variant: {
        Google: 'bg-white text-gray-700 border-gray-300',
      },
    },
  },
);

const SignInButton = ({
  provider,
  className,
}: {
  provider: AuthProvider;
  className?: string;
}) => {
  const [searchParams] = useSearchParams();
  const { signinRedirect } = useAuth();

  const handleSignIn = async () => {
    await signinRedirect({
      extraQueryParams: {
        identity_provider: provider,
      },
      state: btoa(
        JSON.stringify({ redirectTo: searchParams.get('redirectTo') }),
      ),
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className={cn(signInButtonVariants({ variant: provider, className }))}
    >
      <img
        src={SVG_ICONS[provider]}
        alt={`${provider} icon`}
        className="h-5 w-5"
      />
      <span>Iniciar sesión con Google</span>
    </button>
  );
};

export default SignInButton;
