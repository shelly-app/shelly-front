import { useMemo, useState } from 'react';

import { LucidePawPrint, ChevronDown, ChevronUp } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useShelters } from '@/components/providers/shelters-provider';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, nameInitials } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { paths } from '@/config/paths';
import useSignOutAction from '@/features/auth/hooks/use-sign-out-action';
import { useNavigate } from 'react-router';

// Menu items.
const items = [
  {
    title: 'Mascotas',
    path: paths.app.pets.path,
    icon: LucidePawPrint,
  },
];

const AppSidebar = () => {
  const signOutAction = useSignOutAction();

  const userMenuItems = useMemo(
    () => [
      {
        title: 'Cuenta',
        url: '#',
      },
      {
        title: 'Cerrar sesión',
        url: '#',
        action: signOutAction,
      },
    ],
    [signOutAction],
  );

  const { state: sidebarState } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = useMemo(
    () => sidebarState === 'collapsed',
    [sidebarState],
  );
  // Should access this from a state that pulls count periodically.
  const [newPetsCount] = useState(0);
  const navigate = useNavigate();
  //useAuth() has user.profile, but we should use the User model from our db.
  // const { userData } = useUser();
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    profilePictureUrl: 'https://avatar.iran.liara.run/public/45',
  };

  const fullName = `${userData.firstName} ${userData.lastName}`;

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex items-center gap-6">
        <SidebarHeaderContent isCollapsed={isCollapsed} isMobile={isMobile} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <nav>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => navigate(item.path)}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <item.icon />
                    <Text className="text-inherit">{item.title}</Text>
                  </div>
                </SidebarMenuButton>
                {!!newPetsCount && (
                  <SidebarMenuBadge>{newPetsCount}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </SidebarContent>
      <SidebarFooter className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    'cursor-pointer text-nowrap',
                    isCollapsed &&
                      !isMobile &&
                      'relative rounded-full transition-transform hover:scale-110',
                  )}
                >
                  <Avatar
                    className={cn(
                      isCollapsed && !isMobile && 'absolute top-0 left-0',
                    )}
                  >
                    <AvatarImage
                      src={userData.profilePictureUrl}
                      alt={fullName}
                    />
                    <AvatarFallback>{nameInitials(fullName)}</AvatarFallback>
                  </Avatar>{' '}
                  {(!isCollapsed || isMobile) && (
                    <>
                      <Text>{fullName}</Text>
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="cursor-pointer"
                    onClick={item.action}
                  >
                    <Text>{item.title}</Text>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const SidebarHeaderContent = ({ isCollapsed = false, isMobile = false }) => {
  const { shelters, currentShelter, setCurrentShelter, isLoading } =
    useShelters();

  return (
    <>
      <Text className="pointer-events-none bg-gradient-to-t from-amber-400 to-amber-500 bg-clip-text text-3xl font-bold text-transparent select-none">
        {isCollapsed && !isMobile ? 'S' : 'Shelly'}
      </Text>
      {isLoading ? (
        <Skeleton className="bg-sidebar-border h-12 w-full" />
      ) : (
        <SidebarMenu>
          <SidebarMenuItem>
            {shelters.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="cursor-pointer justify-center">
                    <Text variant="ellipsis">
                      {isCollapsed && !isMobile
                        ? currentShelter?.name[0].toUpperCase()
                        : currentShelter?.name}
                    </Text>
                    {(!isCollapsed || isMobile) && (
                      <ChevronDown className="ml-auto" />
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-3xs bg-amber-50">
                  {shelters.map((shelter) => (
                    <DropdownMenuItem
                      key={shelter.id}
                      onClick={() => setCurrentShelter(shelter)}
                      className="cursor-pointer"
                    >
                      <Text variant="ellipsis">{shelter.name}</Text>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              currentShelter?.name
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </>
  );
};

export { AppSidebar };
