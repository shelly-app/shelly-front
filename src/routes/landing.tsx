import { NavigationLayout } from '@/components/layouts/navigation-layout';
import { useSessionInvalidate } from '@/features/auth/hooks/use-session-invalidate';
import { About } from '@/features/landing/components/about';
import { Adopt } from '@/features/landing/components/adopt';
import { Contact } from '@/features/landing/components/contact';
import { Hero } from '@/features/landing/components/hero';

export const LandingRoute = () => {
  useSessionInvalidate();

  return (
    <NavigationLayout>
      <Hero />
      <About />
      <Adopt />
      <Contact />
    </NavigationLayout>
  );
};
