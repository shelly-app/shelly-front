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

// Shelters should be retrieved from a context or a global state.
const MOCK_SHELTERS: Partial<Shelter>[] = [
  {
    id: 1,
    name: 'Shelter 1',
  },
  {
    id: 2,
    name: 'Shelter 2',
  },
];

const AppSidebar = () => {
  // Should access this from a state that pulls count periodically.
  const [newPetsCount] = useState(0);
  const [currentShelter, setCurrentShelter] = useState<
    (typeof MOCK_SHELTERS)[0] | null
  >(MOCK_SHELTERS[0] ?? null);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {currentShelter ? (
                  <SidebarMenuButton>
                    {currentShelter.name}
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                ) : (
                  <Skeleton className="h-8 w-full bg-sidebar-border" />
                )}
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
          </SidebarMenuItem>
        </SidebarMenu>
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
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
