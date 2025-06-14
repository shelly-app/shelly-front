import { Image } from '@/components/ui/image';
import { Text, H1 } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { useIsScrolled } from '@/hooks/use-is-scrolled';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import ShellyLogo from '@/assets/images/shelly-logo.webp';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/#adopt', label: 'Adoptar' },
  { href: '/#donate', label: 'Donar' },
  { href: '/#about', label: 'Sobre Nosotros' },
];

export const Navbar = () => {
  const isScrolled = useIsScrolled(100);

  return (
    <nav
      className={cn(
        'fixed z-40 flex w-full items-center justify-between px-8 py-4 transition-colors duration-500 md:px-12',
        isScrolled
          ? 'border-b border-amber-400 bg-amber-300/60 shadow-sm backdrop-blur-md'
          : 'backdrop-blur-md',
      )}
    >
      <div className="flex items-center gap-2">
        <Image
          src={ShellyLogo}
          alt="Shelly Logo"
          className={cn(
            'h-16 w-16 transition-all duration-500',
            isScrolled && 'h-10 w-10',
          )}
        />
        <H1
          className={cn(
            'cursor-default text-amber-800 transition-all duration-500',
            isScrolled && 'lg:text-xl',
          )}
        >
          Shelly
        </H1>
      </div>

      <div className="flex items-center gap-12">
        <menu className="flex items-center gap-10 text-amber-800">
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
  const { scrollToSection } = useHashScroll();

  return (
    <li className="transition-transform hover:scale-110">
      <NavLink to={href} onClick={() => scrollToSection(href)}>
        <Text variant="primary">{children}</Text>
      </NavLink>
    </li>
  );
};
