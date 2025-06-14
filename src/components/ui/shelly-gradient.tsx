import { H2 } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export const ShellyGradient = ({
  children,
  className,
  size,
  weight,
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}) => {
  return (
    <H2
      className={cn(
        'pointer-events-none bg-gradient-to-t from-amber-500 to-amber-600 bg-clip-text text-transparent select-none',
        className,
      )}
      size={size}
      weight={weight}
    >
      {children}
    </H2>
  );
};
