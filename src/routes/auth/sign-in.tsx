import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';

import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
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
    <>
      <SignInLoadingDialog isLoading={isLoading} />
      <TwoSectionsLayout
        className="flex-col-reverse gap-8 px-0 py-0 md:px-0 md:py-0"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent ratio={3} className="bg-amber-200">
            <NavLink to={paths.home.path}>
              <ArrowLeft className="absolute top-6 left-6 z-10 h-10 w-10 cursor-pointer rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-400/10" />
            </NavLink>
            <SignInPetsFigure className="bg-radial-amber px-8 opacity-80" />
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent
            className="flex flex-col justify-center gap-6"
            ratio={3}
          >
            <SocialSignIn />
          </TwoSectionsLayout.SectionContent>
        }
      />
    </>
  );
};
