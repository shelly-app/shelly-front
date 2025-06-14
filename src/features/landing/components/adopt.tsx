import { Separator } from '@/components/ui/separator';
import { H2, H3, Lead, Paragraph } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { HeartPlus, House, PawPrint } from 'lucide-react';

export const Adopt = () => {
  return (
    <section
      id="adopt"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-12 overflow-hidden bg-gradient-to-b from-amber-200 to-amber-100 px-4 py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-24 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      </div>

      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-4xl font-bold md:text-5xl">Adopta una mascota</H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          ¡Dale un hogar a un amigo peludo! Encuentra tu compañero perfecto
          entre nuestras mascotas disponibles para adopción. Cada animal tiene
          una historia única esperando ser parte de la tuya.
        </Lead>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            title: 'Amor incondicional',
            description:
              'Las mascotas adoptadas te darán amor y compañía sin condiciones.',
            icon: HeartPlus,
            iconColor: 'text-red-500',
            bgColor: 'bg-amber-50',
          },
          {
            title: 'Salva una vida',
            description:
              'Al adoptar, le das una segunda oportunidad a un animal que lo necesita.',
            icon: House,
            iconColor: 'text-green-600',
            bgColor: 'bg-amber-50',
          },
          {
            title: 'Compañía fiel',
            description:
              'Encuentra un amigo que te acompañará en los mejores y peores momentos.',
            icon: PawPrint,
            iconColor: 'text-sky-600',
            bgColor: 'bg-amber-50',
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className={cn(
              'flex flex-col items-center gap-4 rounded-xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1',
              feature.bgColor,
            )}
          >
            <feature.icon className={cn('h-12 w-12', feature.iconColor)} />
            <H3 className="text-xl font-semibold">{feature.title}</H3>
            <Separator orientation="horizontal" className="w-full" />
            <Paragraph>{feature.description}</Paragraph>
          </div>
        ))}
      </div>
    </section>
  );
};
