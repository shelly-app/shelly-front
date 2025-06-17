import { ShellyGradient } from '@/components/ui/shelly-gradient';
import { H2 } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import { ProviderSignInButton } from '@/features/auth/components/provider-sign-in-button';

export const SocialSignIn = () => (
  <article className="flex h-full max-h-7/12 justify-center px-4 py-12 md:max-h-[unset] md:py-48">
    <div className="flex w-full max-w-96 flex-col items-center gap-8 rounded-lg bg-amber-100/50 p-6 shadow-md md:gap-12 md:p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <ShellyGradient size="3xl" className="md:text-4xl">
            Shelly{' '}
          </ShellyGradient>
          <Separator orientation="vertical" className="h-8 md:h-10" />
          <H2 size="3xl" className="md:text-4xl">
            Refugios{' '}
          </H2>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-8 md:gap-12">
        <ProviderSignInButton provider="Google" className="w-full md:w-auto" />
      </div>
    </div>
  </article>
);
