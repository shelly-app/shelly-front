import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-primary',
      ellipsis: 'overflow-ellipsis overflow-hidden text-nowrap',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type TextProps = {
  className?: string;
  variant?: VariantProps<typeof textVariants>['variant'];
} & React.ComponentPropsWithoutRef<'span'>;

const Text = ({ children, className, variant, ...props }: TextProps) => {
  return (
    <span
      data-slot="text"
      className={cn(textVariants({ variant, className }))}
      {...props}
    >
      {children}
    </span>
  );
};

export { Text };
