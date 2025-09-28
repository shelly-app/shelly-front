import { useMemo, useState } from "react";

import {
  LucidePawPrint,
  ChevronDown,
  ChevronUp,
  LucideUsers,
  LucideFiles,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useShelters } from "@/components/providers/shelters-provider";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFullName, getNameInitials } from "@/lib/utils";
import { useMobile } from "@/hooks/use-media-queries";
import { paths } from "@/config/paths";
import { useSignOutAction } from "@/features/auth/hooks/use-sign-out-action";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { Separator } from "@/components/ui/separator";

// Menu items.
const MENU_ITEMS = [
  {
    title: "Mascotas",
    path: paths.app.pets.path,
    icon: LucidePawPrint,
  },
  {
    title: "Solicitudes",
    path: paths.app.requests.path,
    icon: LucideFiles,
  },
  {
    title: "Miembros",
    path: paths.app.members.path,
    icon: LucideUsers,
  },
];

const AppSidebar = () => {
  const signOutAction = useSignOutAction();

  const userMenuItems = useMemo(
    () => [
      {
        title: "Cuenta",
        url: "#",
      },
      {
        title: "Cerrar sesión",
        url: "#",
        action: signOutAction,
      },
    ],
    [signOutAction],
  );

  const { state: sidebarState } = useSidebar();
  const isMobile = useMobile();
  const isCollapsed = useMemo(
    () => sidebarState === "collapsed",
    [sidebarState],
  );
  // Should access this from a state that pulls count periodically.
  const [newPetsCount] = useState(0);
  const navigate = useNavigate();
  // We should use the User model from our db.
  // const { user } = useUser();
  const { user } = useAuth();

  const userProfile = useMemo(() => {
    if (!user) return null;
    return {
      firstName: user.profile?.given_name,
      lastName: user.profile?.family_name,
      fullName: getFullName(
        user.profile?.given_name,
        user.profile?.family_name,
      ),
      picture: user.profile?.picture,
    };
  }, [user]);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex items-center gap-6">
        <SidebarHeaderContent isCollapsed={isCollapsed} isMobile={isMobile} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <nav>
          <SidebarMenu>
            {MENU_ITEMS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => navigate(item.path)}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <item.icon />
                    <Text variant="primary">{item.title}</Text>
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
                    "cursor-pointer text-nowrap",
                    isCollapsed &&
                      !isMobile &&
                      "relative rounded-full transition-transform hover:scale-110",
                  )}
                >
                  <Avatar
                    className={cn(
                      isCollapsed && !isMobile && "absolute top-0 left-0",
                    )}
                  >
                    <AvatarImage
                      src={userProfile?.picture}
                      alt={userProfile?.fullName}
                    />
                    <AvatarFallback>
                      {getNameInitials(userProfile?.fullName)}
                    </AvatarFallback>
                  </Avatar>{" "}
                  {(!isCollapsed || isMobile) && (
                    <>
                      <Text variant="primary">{userProfile?.fullName}</Text>
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
                    <Text variant="primary">{item.title}</Text>
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
      <ShellyGradient className="text-4xl">
        {isCollapsed && !isMobile ? "S" : "Shelly"}
      </ShellyGradient>
      <Separator orientation="horizontal" className="w-full" />
      {isLoading ? (
        <Skeleton className="bg-sidebar-border h-12 w-full" />
      ) : (
        <SidebarMenu>
          <SidebarMenuItem>
            {shelters.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="cursor-pointer justify-center">
                    <Text variant="ellipsis" weight="medium">
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
                      className="cursor-pointer hover:bg-amber-100"
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
