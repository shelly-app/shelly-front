import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('text-md', {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      ellipsis: 'overflow-ellipsis overflow-hidden text-nowrap',
      title: 'text-5xl leading-tight font-bold',
      subtitle1: 'text-xl text-gray-700',
      subtitle2: 'text-lg text-gray-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TextProps = {
  element?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  variant?: VariantProps<typeof textVariants>['variant'];
} & React.ComponentPropsWithoutRef<'span'>;

export const Text = ({
  children,
  element: Element = 'span',
  className,
  variant,
  ...props
}: TextProps) => {
  return (
    <Element
      data-slot="text"
      className={cn(textVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Element>
  );
};
