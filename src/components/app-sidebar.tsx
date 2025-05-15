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
import { Shelter } from '@/types/api';
import { Skeleton } from '@/components/ui/skeleton';

// Menu items.
const items = [
  {
    title: 'Pets',
    url: '#',
    icon: LucideDog,
  },
];

const userMenuItems = [
  {
    title: 'Account',
    url: '#',
  },
  {
    title: 'Sign out',
    url: '#',
  },
];

// Shelters should be retrieved from a context or a global state.
const MOCK_SHELTERS: Shelter[] = [
  {
    id: 1,
    name: 'Shelter 1',
    address: 'string',
    phone: 'string',
    email: 'string',
    website: 'string',
    createdAt: 0,
  },
  // {
  //   id: 2,
  //   name: 'Shelter 2',
  // },
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
    <Sidebar collapsible="icon" className="gap-24">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {!!newPetsCount && (
                <SidebarMenuBadge>{newPetsCount}</SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer text-nowrap">
                  <User2 /> {userData.firstName} {userData.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {userMenuItems.map((item) => (
                  <DropdownMenuItem key={item.title} className="cursor-pointer">
                    <span>{item.title}</span>
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
  const [currentShelter, setCurrentShelter] = useState<
    (typeof MOCK_SHELTERS)[0] | null
  >(MOCK_SHELTERS[0] ?? null);
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  if (!currentShelter)
    return <Skeleton className="h-12 w-full bg-sidebar-border" />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {MOCK_SHELTERS.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="cursor-pointer justify-center text-nowrap">
                {isCollapsed
                  ? currentShelter.name[0].toUpperCase()
                  : currentShelter.name}
                {!isCollapsed && <ChevronDown className="ml-auto" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              {MOCK_SHELTERS.map((shelter) => (
                <DropdownMenuItem
                  key={shelter.id}
                  onClick={() => setCurrentShelter(shelter)}
                >
                  <span>{shelter.name}</span>
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

export default AppSidebar;
