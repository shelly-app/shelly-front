import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { useIsScrolled } from '@/hooks/use-is-scrolled';
import { cn } from '@/lib/utils';
import ShellyLogo from '@/assets/images/shelly-logo.webp';
import { ShellyGradient } from '@/components/ui/shelly-gradient';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { id: '/', label: 'Inicio' },
  { id: '#about', label: 'Sobre Nosotros' },
  { id: '#adopt', label: 'Adoptar' },
  { id: '#donate', label: 'Donar' },
];

export const Navbar = () => {
  const isScrolled = useIsScrolled(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed z-50 flex w-full items-center justify-between px-4 py-4 transition-colors duration-500 md:px-12',
          isScrolled
            ? 'border-b border-amber-400 bg-amber-300/60 shadow-sm backdrop-blur-md'
            : 'backdrop-blur-md',
          isMenuOpen && 'bg-amber-300 shadow-none',
        )}
      >
        <div className="flex items-center gap-2">
          <Image
            src={ShellyLogo}
            alt="Shelly Logo"
            className={cn(
              'h-12 w-12 transition-all duration-500 md:h-16 md:w-16',
              isScrolled && 'h-8 w-8 md:h-10 md:w-10',
            )}
          />
          <ShellyGradient
            className={cn(
              'cursor-default text-2xl transition-all duration-500 md:text-4xl',
              isScrolled && 'text-xl md:text-2xl',
            )}
          >
            Shelly
          </ShellyGradient>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-12 md:flex">
          <ul
            className="flex items-center gap-10 text-amber-800"
            role="menu"
            aria-label="Menu de navegación"
          >
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.id} id={item.id}>
                {item.label}
              </NavItem>
            ))}
          </ul>
          <SignInLink />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative z-50 md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-amber-800" />
          ) : (
            <Menu className="h-6 w-6 text-amber-800" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-[80px] right-0 z-40 h-[calc(100vh-80px)] w-[280px] transform bg-amber-300/95 p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          isScrolled && 'top-[69px] h-[calc(100vh-69px)]',
        )}
      >
        <div className="flex h-full flex-col items-center justify-start gap-8 pt-8">
          <menu className="flex flex-col items-center gap-8 text-amber-800">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.id} id={item.id} onClick={closeMenu}>
                {item.label}
              </NavItem>
            ))}
          </menu>
          <SignInLink className="mt-4" />
        </div>
      </div>
    </>
  );
};

const NavItem = ({
  id,
  children,
  onClick,
}: {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { scrollToSection } = useHashScroll();

  const handleClick = () => {
    scrollToSection(id);
    onClick?.();
  };

  return (
    <li>
      <button
        className="cursor-pointer text-lg transition-transform hover:scale-110 md:text-base"
        onClick={handleClick}
      >
        <Text variant="primary">{children}</Text>
      </button>
    </li>
  );
};
