import { Text } from '@/components/ui/text';
import SignInLink from '@/features/auth/components/sign-in-link';

const LandingRoute = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Text element="h1" className="text-4xl font-bold">
        Shelly
      </Text>
      <Text element="h2" className="text-lg">
        Adopta a tu mejor amigo!
      </Text>
      <SignInLink />
    </div>
  );
};

export default LandingRoute;
