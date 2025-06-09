import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { SignInLoadingDialog } from '@/features/auth/components/sign-in-loading-dialog';
import { SocialSignIn } from '@/features/auth/components/social-sign-in';
import { SignInPetsFigure } from '@/features/auth/components/sign-in-pets-figure';

import { paths } from '@/config/paths';
import { NavigationLayout } from '@/components/layouts/navigation-layout';

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
    <NavigationLayout>
      <SignInLoadingDialog isLoading={isLoading} />
      <TwoSectionsLayout
        className="flex h-full w-full flex-col items-center justify-center gap-8 px-4 py-8"
        firstContent={
          <TwoSectionsLayout.FirstSection
            className="flex flex-col justify-center gap-6"
            ratio={3}
          >
            <SocialSignIn />
          </TwoSectionsLayout.FirstSection>
        }
        secondContent={
          <TwoSectionsLayout.SecondSection ratio={4}>
            <SignInPetsFigure />
          </TwoSectionsLayout.SecondSection>
        }
      />
    </NavigationLayout>
  );
};
