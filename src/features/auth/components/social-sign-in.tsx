import { ShellyGradient } from '@/components/ui/shelly-gradient';
import { H2 } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { ProviderSignInButton } from '@/features/auth/components/provider-sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full justify-center py-24 md:py-48">
    <div className="flex min-w-96 flex-col items-center gap-12 rounded-lg bg-amber-100/50 p-8 shadow-md">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <ShellyGradient size="4xl">Shelly </ShellyGradient>
          <Separator orientation="vertical" />
          <H2 size="4xl">Refugios </H2>
        </div>
      </div>
      <div className="flex flex-col items-center gap-24 md:items-center md:gap-12">
        <ProviderSignInButton provider="Google" />
      </div>
    </div>
  </article>
);
