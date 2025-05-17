import { useState } from 'react';

import { LucideDog, ChevronDown, ChevronUp, User2 } from 'lucide-react';

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
import { Text } from '@/components/text';

// Menu items.
const items = [
  {
    title: 'Mascotas',
    url: '#',
    icon: LucideDog,
  },
];

const userMenuItems = [
  {
    title: 'Cuenta',
    url: '#',
  },
  {
    title: 'Cerrar sesión',
    url: '#',
  },
];

const AppSidebar = () => {
  // Should access this from a state that pulls count periodically.
  const [newPetsCount] = useState(0);
  // const { userData } = useAuth(); // or something like this
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <Text>{item.title}</Text>
                </a>
              </SidebarMenuButton>
              {!!newPetsCount && (
                <SidebarMenuBadge>{newPetsCount}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer text-nowrap">
                  <User2 />{' '}
                  <Text>
                    {userData.firstName} {userData.lastName}
                  </Text>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.title} className="cursor-pointer">
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

const SidebarHeaderContent = () => {
  const { state } = useSidebar();
  const { shelters, currentShelter, setCurrentShelter, isLoading } =
    useShelters();
  const isCollapsed = state === 'collapsed';

  if (isLoading) return <Skeleton className="h-12 w-full bg-sidebar-border" />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {shelters.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="cursor-pointer justify-center">
                <Text variant="ellipsis">
                  {isCollapsed
                    ? currentShelter?.name[0].toUpperCase()
                    : currentShelter?.name}
                </Text>
                {!isCollapsed && <ChevronDown className="ml-auto" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-3xs">
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
  );
};

export { AppSidebar };
