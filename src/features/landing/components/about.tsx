import { TwoSectionsLayout } from '@/components/layouts/two-sections-layout';
import { Image } from '@/components/ui/image';
import { H2, H3, Lead } from '@/components/ui/text';
import ShellyAppDesktop from '@/assets/images/shelly-app-desktop.webp';
import { ShellyGradient } from '@/components/ui/shelly-gradient';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  BotMessageSquareIcon,
  ClipboardListIcon,
  DogIcon,
  UserPenIcon,
} from 'lucide-react';

const ABOUT_FEATURES = {
  firstSection: [
    {
      icon: DogIcon,
      title: 'Visualización',
      description: 'Obtené un vistazo general de tu refugio en un solo lugar.',
      color: 'green',
    },
    {
      icon: UserPenIcon,
      title: 'Adopciones',
      description:
        'Gestioná las solicitudes de adopción de manera eficiente y sin complicaciones.',
      color: 'sky',
    },
  ],
  secondSection: [
    {
      icon: BotMessageSquareIcon,
      title: 'Chat',
      description:
        'Automatizá el proceso de seguimiento y la recepción de solicitudes de adopción mediante un bot de WhatsApp.',
      color: 'purple',
    },
    {
      icon: ClipboardListIcon,
      title: 'Detalle',
      description:
        'Accedé a los detalles de cada mascota con registro histórico de eventos.',
      color: 'orange',
    },
  ],
};

const COLOR_CLASSES = {
  green: 'bg-gradient-to-br from-green-200 to-green-300 text-green-500',
  orange: 'bg-gradient-to-br from-orange-200 to-orange-300 text-orange-500',
  sky: 'bg-gradient-to-br from-sky-200 to-sky-300 text-sky-500',
  purple: 'bg-gradient-to-br from-purple-200 to-purple-300 text-purple-500',
} as const;

export const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col gap-24 bg-gradient-to-b from-amber-300/70 to-amber-200 px-4 py-8"
    >
      <TwoSectionsLayout
        className="mx-auto flex w-full max-w-7xl items-center gap-8 px-0"
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

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-0 md:grid-cols-2 md:grid-rows-2 md:px-8">
        {ABOUT_FEATURES.firstSection.map((feature) => (
          <AboutFeature key={feature.title} {...feature} />
        ))}
        {ABOUT_FEATURES.secondSection.map((feature) => (
          <AboutFeature key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

const AboutFeature = ({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="flex gap-4">
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl p-2 shadow-lg transition-transform hover:scale-110',
          COLOR_CLASSES[color as keyof typeof COLOR_CLASSES],
        )}
      >
        <Icon
          className={cn(
            COLOR_CLASSES[color as keyof typeof COLOR_CLASSES].split(' ')[2],
          )}
        />
      </div>
      <div className="flex flex-col gap-4">
        <H3 size="lg">{title}</H3>
        <Lead>{description}</Lead>
      </div>
    </div>
  );
};
