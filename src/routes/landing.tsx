import { NavigationLayout } from '@/components/layouts/navigation-layout';
import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { Text } from '@/components/ui/text';
import { useSessionInvalidate } from '@/features/auth/hooks/use-session-invalidate';

export const LandingRoute = () => {
  useSessionInvalidate();

  return (
    <NavigationLayout>
      <TwoSectionsLayout
        className="flex h-full w-full flex-col items-center justify-center gap-8 px-4 py-8"
        firstContent={
          <TwoSectionsLayout.FirstSection
            ratio={3}
            className="flex flex-col justify-center gap-6"
          >
            <Text element="h1" className="text-5xl leading-tight font-bold">
              Gestiona tu refugio de animales con facilidad
            </Text>
            <div className="space-y-3">
              <Text element="h2" className="text-xl text-gray-700">
                Organiza el cuidado, seguimiento médico y adopciones de tus
                animales rescatados desde una sola plataforma.
              </Text>
              <Text element="p" className="text-lg text-gray-600">
                Simplifica la administración de tu refugio y ayuda a más
                animales a encontrar un hogar a su medida.
              </Text>
            </div>
          </TwoSectionsLayout.FirstSection>
        }
        secondContent={
          <TwoSectionsLayout.SecondSection
            ratio={4}
          ></TwoSectionsLayout.SecondSection>
        }
      />
    </NavigationLayout>
  );
};
