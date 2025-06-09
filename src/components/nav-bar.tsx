import { Text } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '#', label: 'Inicio' },
  { href: '#adopt', label: 'Adoptar' },
  { href: '#donate', label: 'Donar' },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Add transparent background initially and then switch to amber-200/60 on scroll
    <nav
      className={cn(
        'fixed z-40 flex w-full items-center justify-between bg-amber-200/60 px-8 py-4 transition-colors md:px-12',
        isScrolled
          ? 'bg-amber-200/60 shadow-sm backdrop-blur-sm'
          : 'bg-transparent',
      )}
    >
      <Text className="cursor-default text-xl font-bold">Shelly</Text>
      <div className="flex gap-12">
        <menu className="flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </menu>
        <SignInLink />
      </div>
    </nav>
  );
};

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li className="transition-transform hover:scale-110">
      <a href={href}>
        <Text>{children}</Text>
      </a>
    </li>
  );
};
