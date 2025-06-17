import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';

import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { SignInLoadingDialog } from '@/features/auth/components/sign-in-loading-dialog';
import { SocialSignIn } from '@/features/auth/components/social-sign-in';
import { SignInPetsFigure } from '@/features/auth/components/sign-in-pets-figure';

import { paths } from '@/config/paths';
import { ArrowLeft } from 'lucide-react';

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
    <AuthLayout>
      <SignInLoadingDialog isLoading={isLoading} />
      <TwoSectionsLayout
        className="h-dvh flex-col-reverse gap-4 px-0 py-0 md:flex-row md:gap-8 md:px-0 md:py-0"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent
            ratio={3}
            className="hidden bg-amber-200 md:block"
          >
            <SignInPetsFigure className="bg-radial-amber px-4 opacity-80 md:px-8" />
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent
            className="flex flex-col justify-center gap-4 md:gap-6 md:px-0"
            ratio={3}
          >
            <SocialSignIn />
          </TwoSectionsLayout.SectionContent>
        }
      />
      <NavLink to={paths.home.path}>
        <ArrowLeft className="absolute top-4 left-4 z-10 h-8 w-8 cursor-pointer rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-400/10 md:top-6 md:left-6 md:h-10 md:w-10" />
      </NavLink>
    </AuthLayout>
  );
};
