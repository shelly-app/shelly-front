import { Text } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { useIsScrolled } from '@/hooks/use-is-scrolled';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

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
      <Text className="cursor-default text-xl font-bold text-amber-800">
        Shelly
      </Text>

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
        <Text>{children}</Text>
      </NavLink>
    </li>
  );
};
