import { H1, H3 } from '@/components/ui/text';
import { PetShowcaseCard } from '@/features/landing/components/pet-showcase-card';
import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';

export const Hero = () => {
  const getRoundedClass = (index: number) => {
    if (index === 0) return 'rounded-tl-2xl';
    if (index === 2) return 'rounded-tr-2xl';
    if (index === 3) return 'rounded-bl-2xl';
    if (index === 5) return 'rounded-br-2xl';
    return '';
  };

  return (
    <section
      id="#"
      className="h-[93%] bg-gradient-to-b from-amber-200/80 to-amber-300/70"
    >
      <TwoSectionsLayout
        className="mx-auto flex w-full max-w-[90rem] items-center gap-8"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent
            ratio={3}
            className="flex flex-col justify-center gap-6"
          >
            <H1 weight="medium">
              Gestiona tu refugio de mascotas con facilidad
            </H1>
            <H3 size="lg">
              Simplifica la administración de tu refugio y ayuda a más animales
              a encontrar un hogar a su medida.
            </H3>
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent
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
          </TwoSectionsLayout.SectionContent>
        }
      />
    </section>
  );
};
