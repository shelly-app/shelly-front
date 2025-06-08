import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { Text } from '@/components/ui/text';
import { SignInButton } from '@/features/auth/components/sign-in-button';
import DogPetGraphic from '@/assets/images/dog-pet-graphic.webp';
import { paths } from '@/config/paths';
import { SignInLoadingDialog } from '@/features/auth/components/sign-in-loading-dialog';

export const SignInRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      let redirectTo = paths.app.pets.path;
      if (user?.state) {
        const state = JSON.parse(atob(user.state as string));
        redirectTo = state.redirectTo || paths.app.pets.path;
      }
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, searchParams, user?.state]);

  return (
    <>
      <SignInLoadingDialog isLoading={isLoading} />
      <TwoSectionsLayout
        firstContent={
          <TwoSectionsLayout.FirstSection ratio={3}>
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
          </TwoSectionsLayout.FirstSection>
        }
        secondContent={
          <TwoSectionsLayout.SecondSection ratio={4}>
            <article className="flex h-full items-center justify-center">
              <figure className="relative flex h-full max-w-[600px] items-center justify-center">
                <img
                  src={DogPetGraphic}
                  alt="Dog Pet Graphic"
                  loading="eager"
                />
              </figure>
            </article>
          </TwoSectionsLayout.SecondSection>
        }
      />
    </>
  );
};
