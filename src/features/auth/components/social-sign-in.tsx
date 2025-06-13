import { Text } from '@/components/ui/text';
import { ProviderSignInButton } from '@/features/auth/components/provider-sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full justify-center py-24 md:py-48">
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-center md:items-start">
        <Text element="h1" variant="title">
          Iniciar
        </Text>
        <Text element="h1" variant="title">
          Sesión
        </Text>
      </div>
      <div className="flex flex-col items-center gap-24 md:items-start md:gap-12">
        <Text element="h2" variant="subtitle">
          Refugios
        </Text>
        <ProviderSignInButton provider="Google" />
      </div>
    </div>
  </article>
);
