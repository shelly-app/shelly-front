import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { H2, H3, Lead, Paragraph } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { HeartPlus, House, PawPrint, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from 'react-oidc-context';
import { ShellyGradient } from '@/components/ui/shelly-gradient';

const ADOPT_FEATURES = [
  {
    title: 'Amor incondicional',
    description:
      'Las mascotas adoptadas te darán amor y compañía sin condiciones. Cada día será una nueva aventura llena de cariño y momentos especiales.',
    icon: HeartPlus,
    iconColor: 'text-red-500',
    bgColor: 'from-red-100 to-red-50',
  },
  {
    title: 'Salva una vida',
    description:
      'Al adoptar, le das una segunda oportunidad a un animal que lo necesita. Tu decisión puede cambiar completamente el destino de una mascota.',
    icon: House,
    iconColor: 'text-green-600',
    bgColor: 'from-green-100 to-green-50',
  },
  {
    title: 'Compañía fiel',
    description:
      'Encuentra un amigo que te acompañará en los mejores y peores momentos. La lealtad de una mascota adoptada no tiene precio.',
    icon: PawPrint,
    iconColor: 'text-sky-600',
    bgColor: 'from-sky-100 to-sky-50',
  },
] as const;

type AdoptFeature = (typeof ADOPT_FEATURES)[number];

const AdoptFeatureCard = ({ feature }: { feature: AdoptFeature }) => {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        'group relative flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl',
        feature.bgColor,
      )}
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="rounded-xl bg-white/90 p-4 shadow-md transition-transform duration-300 group-hover:scale-110">
        <Icon className={cn('h-8 w-8', feature.iconColor)} />
      </div>
      <H3 className="text-xl font-semibold">{feature.title}</H3>
      <Separator orientation="horizontal" className="w-full" />
      <Paragraph className="text-gray-600">{feature.description}</Paragraph>
    </div>
  );
};

export const Adopt = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // TODO: This should lead to a page with all the shelters contacts (whatsapp bot link)
  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate('/app/pets');
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <section
      id="adopt"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-16 overflow-hidden bg-gradient-to-b from-amber-200 to-amber-100 px-4 py-24 md:py-32"
    >
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-center text-4xl font-bold md:text-5xl">
          Adopta una mascota con{' '}
          <ShellyGradient variant="h2" size="5xl">
            Shelly
          </ShellyGradient>
        </H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          ¡Dale un hogar a un amigo peludo! Encuentra tu compañero perfecto
          entre nuestras mascotas disponibles para adopción. Cada animal tiene
          una historia única esperando ser parte de la tuya.
        </Lead>
        <Button size="lg" className="mt-4" onClick={handleCtaClick}>
          Ver refugios disponibles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator className="w-full max-w-3xl bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {ADOPT_FEATURES.map((feature) => (
          <AdoptFeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
};
