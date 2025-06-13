import { type ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

export const NavigationLayout = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Navbar />
      <div className={cn('h-full', className)}>{children}</div>
    </>
  );
};
