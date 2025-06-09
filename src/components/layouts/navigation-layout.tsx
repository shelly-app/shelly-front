import { type ReactNode } from 'react';
import { NavBar } from '@/components/nav-bar';
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
      <NavBar />
      <div className={cn('h-full pt-[75px]', className)}>{children}</div>
    </>
  );
};
