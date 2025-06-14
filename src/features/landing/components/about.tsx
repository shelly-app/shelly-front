import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { Image } from '@/components/ui/image';
import { H2, Lead } from '@/components/ui/text';
import ShellyAppDesktop from '@/assets/images/shelly-app-desktop.webp';
import { ShellyGradient } from '@/components/ui/shelly-gradient';
import { Separator } from '@/components/ui/separator';

export const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col gap-24 bg-gradient-to-b from-amber-300/70 to-amber-200 px-4 py-8"
    >
      <TwoSectionsLayout
        className="mx-auto flex w-full max-w-7xl items-center gap-8"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent className="flex flex-col items-center gap-24">
            <div className="flex flex-col gap-4">
              <H2 className="leading-tight" size="4xl">
                El sistema de gestión definitivo para tu refugio
              </H2>
              <Lead size="lg">
                Lo sabemos, gestionar un refugio de mascotas no es fácil.
                Mantener un registro de tus mascotas, adopciones y eventos es
                una tarea que requiere mucho tiempo y esfuerzo.{' '}
                <ShellyGradient variant="lead" size="lg">
                  Shelly
                </ShellyGradient>{' '}
                vino a cambiar eso.
              </Lead>
            </div>
            <Separator className="w-full bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent className="flex flex-col items-center">
            <Image
              src={ShellyAppDesktop}
              alt="Shelly App Desktop"
              className="drop-shadow-lg"
            />
          </TwoSectionsLayout.SectionContent>
        }
      />

      <TwoSectionsLayout
        className="mx-auto flex w-full max-w-7xl items-center gap-8"
        firstSectionContent={
          <TwoSectionsLayout.SectionContent className="flex w-full flex-col gap-4">
            <div>PEPE</div>
            <div>PEPE</div>
          </TwoSectionsLayout.SectionContent>
        }
        secondSectionContent={
          <TwoSectionsLayout.SectionContent className="flex w-full flex-col gap-4">
            <div>PEPE</div>
            <div>PEPE</div>
          </TwoSectionsLayout.SectionContent>
        }
      />
    </section>
  );
};

// const AboutFeature = ({
//   icon: Icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) => {
//   return (
//     <div>
//       <div>PEPE</div>
//       <div>PEPE</div>
//     </div>
//   );
// };
