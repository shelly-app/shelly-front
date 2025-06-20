import { ComponentProps, forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends ComponentProps<'input'> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, leftIcon, rightIcon, fullWidth = false, ...props },
    ref,
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    if (hasLeftIcon || hasRightIcon) {
      return (
        <div className={cn('relative', fullWidth && 'w-full')}>
          {hasLeftIcon && (
            <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            data-slot="input"
            className={cn(
              'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 h-10 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
              hasLeftIcon ? 'pl-10' : 'px-3',
              hasRightIcon ? 'pr-10' : hasLeftIcon ? '' : 'px-3',
              className,
            )}
            ref={ref}
            {...props}
          />
          {hasRightIcon && (
            <div className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

// For debugging in react dev tools
Input.displayName = 'Input';

export { Input };
