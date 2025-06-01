import TwoSectionsLayout from '@/components/layouts/two-sections-layout';
import SignInButton from '@/features/auth/components/sign-in-button';

const SignInRoute = () => {
  return (
    <TwoSectionsLayout
      firstContent={
        <TwoSectionsLayout.FirstSection ratio={3}>
          <div className="flex h-screen items-center justify-center">
            <SignInButton provider="Google" />
          </div>
        </TwoSectionsLayout.FirstSection>
      }
      secondContent={
        <TwoSectionsLayout.SecondSection ratio={4}>
          <div className="flex h-screen items-center justify-center">
            Sign Up Form Placeholder
          </div>
        </TwoSectionsLayout.SecondSection>
      }
    />
  );
};

export default SignInRoute;
