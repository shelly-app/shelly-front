import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { Text } from '@/components/ui/text';
import { PetShowcaseCard } from '@/features/landing/components/pet-showcase-card';

export const Hero = () => {
  const getRoundedClass = (index: number) => {
    if (index === 0) return 'rounded-tl-2xl';
    if (index === 2) return 'rounded-tr-2xl';
    if (index === 3) return 'rounded-bl-2xl';
    if (index === 5) return 'rounded-br-2xl';
    return '';
  };

  return (
    <section id="#" className="bg-radial-amber h-10/12">
      <TwoSectionsLayout
        className="flex h-full w-full flex-col items-center justify-center gap-8 px-4 py-8"
        firstContent={
          <TwoSectionsLayout.FirstSection
            ratio={3}
            className="flex flex-col justify-center gap-6"
          >
            <Text element="h1" variant="title">
              Gestiona tu refugio de animales con facilidad
            </Text>
            <div className="space-y-3">
              <Text element="h2" variant="primary">
                Simplifica la administración de tu refugio y ayuda a más
                animales a encontrar un hogar a su medida.
              </Text>
            </div>
          </TwoSectionsLayout.FirstSection>
        }
        secondContent={
          <TwoSectionsLayout.SecondSection
            ratio={4}
            className="flex h-fit flex-wrap items-center justify-start"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PetShowcaseCard
                key={`https://placedog.net/${(i + 4) * 100}`}
                src={`https://placedog.net/${(i + 4) * 100}`}
                alt="Perro de muestra"
                className={getRoundedClass(i)}
              />
            ))}
          </TwoSectionsLayout.SecondSection>
        }
      />
    </section>
  );
};
