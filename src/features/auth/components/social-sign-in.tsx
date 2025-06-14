import { H1, H2 } from '@/components/ui/text';
import { ProviderSignInButton } from '@/features/auth/components/provider-sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full justify-center py-24 md:py-48">
    <div className="flex flex-col items-center gap-12 rounded-lg bg-amber-100/50 p-8 shadow-md">
      <div className="flex flex-col items-center gap-2">
        <H1 className="text-3xl font-medium">Inicia sesión</H1>
        <H2 className="text-2xl font-medium">Refugios</H2>
      </div>
      <div className="flex flex-col items-center gap-24 md:items-center md:gap-12">
        <ProviderSignInButton provider="Google" />
      </div>
    </div>
  </article>
);
