import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export type TextVariants = VariantProps<typeof textVariants>['variant'];

const textVariants = cva('', {
  variants: {
    variant: {
      // Semantic variants
      primary: 'text-foreground',
      secondary: 'text-muted-foreground',
      muted: 'text-muted-foreground/80',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',

      // Typography variants
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',

      // Content variants
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      subtle: 'text-sm text-muted-foreground',

      // Utility variants
      ellipsis: 'overflow-hidden text-ellipsis whitespace-nowrap',
      truncate: 'truncate',
      balance: 'text-balance',
      nowrap: 'whitespace-nowrap',

      // Interactive variants
      link: 'text-primary underline-offset-4 hover:underline',
      button: 'font-medium text-primary hover:text-primary/90',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'base',
    weight: 'normal',
    align: 'left',
    leading: 'normal',
  },
});

type TextElement =
  | 'span'
  | 'p'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'a'
  | 'small';

type TextProps = {
  element?: TextElement;
  className?: string;
  variant?: TextVariants;
  size?: VariantProps<typeof textVariants>['size'];
  weight?: VariantProps<typeof textVariants>['weight'];
  align?: VariantProps<typeof textVariants>['align'];
  leading?: VariantProps<typeof textVariants>['leading'];
} & React.ComponentPropsWithoutRef<'span'>;

export const Text = ({
  children,
  element: Element = 'span',
  className,
  variant,
  size,
  weight,
  align,
  leading,
  ...props
}: TextProps) => {
  return (
    <Element
      data-slot="text"
      className={cn(
        textVariants({ variant, size, weight, align, leading }),
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

// Export commonly used text components for convenience
export const H1 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h1" variant="h1" {...props} />
);

export const H2 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h2" variant="h2" {...props} />
);

export const H3 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h3" variant="h3" {...props} />
);

export const H4 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h4" variant="h4" {...props} />
);

export const H5 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h5" variant="h5" {...props} />
);

export const H6 = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="h6" variant="h6" {...props} />
);

export const Lead = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="p" variant="lead" {...props} />
);

export const Paragraph = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="p" variant="primary" {...props} />
);

export const Small = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="small" variant="small" {...props} />
);

export const Muted = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="span" variant="subtle" {...props} />
);

export const Link = (props: Omit<TextProps, 'element' | 'variant'>) => (
  <Text element="a" variant="link" {...props} />
);
