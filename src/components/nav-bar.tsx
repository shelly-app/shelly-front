import { Text } from '@/components/ui/text';
import { SignInLink } from '@/features/auth/components/sign-in-link';
import { NavLink } from 'react-router';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/adopt', label: 'Adoptar' },
  { href: '/donate', label: 'Donar' },
];

export const NavBar = () => {
  return (
    <nav className="md:py-8' fixed z-40 flex w-full items-center justify-between bg-amber-100 px-8 py-4 shadow-sm md:px-12">
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
      <NavLink to={href}>
        <Text>{children}</Text>
      </NavLink>
    </li>
  );
};
