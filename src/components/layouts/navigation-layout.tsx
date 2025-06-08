import { type ReactNode } from 'react';
import { NavBar } from '@/components/nav-bar';

export const NavigationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="h-full pt-[75px]">{children}</div>
    </>
  );
};
