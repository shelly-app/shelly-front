import { H1 } from '@/components/ui/text';
import { ProviderSignInButton } from '@/features/auth/components/provider-sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full justify-center py-24 md:py-48">
    <div className="flex flex-col items-center gap-8 rounded-lg bg-amber-100/50 p-8 shadow-md">
      <H1 className="text-2xl">Inicia sesión</H1>
      <div className="flex flex-col items-center gap-24 md:items-center md:gap-12">
        <ProviderSignInButton provider="Google" />
      </div>
    </div>
  </article>
);
