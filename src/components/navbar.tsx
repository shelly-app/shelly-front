import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { useIsScrolled } from '@/hooks/use-is-scrolled';
import { cn } from '@/lib/utils';
import ShellyLogo from '@/assets/images/shelly-logo.webp';
import { ShellyGradient } from '@/components/ui/shelly-gradient';

const NAV_ITEMS = [
  { id: '/', label: 'Inicio' },
  { id: '#about', label: 'Sobre Nosotros' },
  { id: '#adopt', label: 'Adoptar' },
  { id: '#donate', label: 'Donar' },
];

export const Navbar = () => {
  const isScrolled = useIsScrolled(50);

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
        <ShellyGradient
          className={cn(
            'cursor-default text-4xl transition-all duration-500',
            isScrolled && 'lg:text-xl',
          )}
        >
          Shelly
        </ShellyGradient>
      </div>

      <div className="flex items-center gap-12">
        <menu className="flex items-center gap-10 text-amber-800">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} id={item.id}>
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
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { scrollToSection } = useHashScroll();

  return (
    <li>
      <button
        className="cursor-pointer transition-transform hover:scale-110"
        onClick={() => scrollToSection(id)}
      >
        <Text variant="primary">{children}</Text>
      </button>
    </li>
  );
};
