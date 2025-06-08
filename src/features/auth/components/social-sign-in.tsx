import { Text } from '@/components/ui/text';
import { SignInButton } from '@/features/auth/components/sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full justify-center py-24 md:py-48">
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-center md:items-start">
        <Text element="h1" className="text-5xl font-bold">
          Iniciar
        </Text>
        <Text element="h1" className="text-5xl font-bold">
          Sesión
        </Text>
      </div>
      <div className="flex flex-col items-center gap-24 md:items-start md:gap-12">
        <Text element="h2" className="text-3xl">
          Refugios
        </Text>
        <SignInButton provider="Google" />
      </div>
    </div>
  </article>
);
