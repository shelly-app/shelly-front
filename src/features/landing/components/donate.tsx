import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { H2, H3, Lead, Paragraph } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ArrowRight, Code, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from 'react-oidc-context';

const DONATE_FEATURES = [
  {
    title: 'Mantener Shelly gratuito',
    description:
      'Tu donación nos ayuda a mantener Shelly como una plataforma gratuita para todos los refugios, permitiéndonos seguir desarrollando y mejorando la herramienta.',
    icon: Code,
    iconColor: 'text-amber-600',
    bgColor: 'from-amber-100 to-amber-50',
  },
  {
    title: 'Mejoras continuas',
    description:
      'Contribuye al desarrollo de nuevas funcionalidades y mejoras en la plataforma, haciendo que Shelly sea cada vez más útil y fácil de usar para los refugios.',
    icon: Sparkles,
    iconColor: 'text-purple-500',
    bgColor: 'from-purple-100 to-purple-50',
  },
  {
    title: 'Crecimiento de la comunidad',
    description:
      'Ayuda a expandir nuestra red de refugios y voluntarios, permitiendo que más mascotas encuentren su hogar ideal y más refugios se beneficien de nuestra plataforma.',
    icon: Users,
    iconColor: 'text-green-600',
    bgColor: 'from-green-100 to-green-50',
  },
] as const;

type DonateFeature = (typeof DONATE_FEATURES)[number];

const DonateFeatureCard = ({ feature }: { feature: DonateFeature }) => {
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

export const Donate = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // TODO: This should lead to a page with donation options (mercadopago, etc)
  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate('/app/donate');
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <section
      id="donate"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-16 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50 px-4 py-24 md:py-32"
    >
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-center text-4xl font-bold md:text-5xl">
          Apoya nuestra causa
        </H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          Ayudanos a seguir brindando una herramienta gratuita para que los
          refugios puedan encontrar el hogar ideal para cada mascota.
        </Lead>
        <Button size="lg" className="mt-4" onClick={handleCtaClick}>
          Donar ahora
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator className="w-full max-w-3xl bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {DONATE_FEATURES.map((feature) => (
          <DonateFeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
};
