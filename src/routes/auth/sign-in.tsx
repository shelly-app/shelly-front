import TwoSectionsLayout from '@/components/layouts/two-sections-layout';
import { Text } from '@/components/ui/text';
import SignInButton from '@/features/auth/components/sign-in-button';
import DogPetGraphic from '@/assets/images/dog-pet-graphic.webp';

const SignInRoute = () => {
  return (
    <TwoSectionsLayout
      firstContent={
        <TwoSectionsLayout.FirstSection ratio={3}>
          <article className="flex h-full justify-center py-48">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start">
                <Text element="h1" className="text-4xl font-bold">
                  Iniciar
                </Text>
                <Text element="h1" className="text-4xl font-bold">
                  Sesión
                </Text>
              </div>
              <div className="flex flex-col items-start gap-12">
                <Text element="h2" className="text-3xl">
                  Shelly
                </Text>
                <SignInButton provider="Google" />
              </div>
            </div>
          </article>
        </TwoSectionsLayout.FirstSection>
      }
      secondContent={
        <TwoSectionsLayout.SecondSection ratio={4}>
          <article className="flex h-full items-center justify-center">
            <figure className="relative flex h-full max-w-[600px] items-center justify-center">
              <img src={DogPetGraphic} alt="Dog Pet Graphic" loading="eager" />
            </figure>
          </article>
        </TwoSectionsLayout.SecondSection>
      }
    />
  );
};

export default SignInRoute;
