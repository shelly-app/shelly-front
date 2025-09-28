import { useMemo, useState } from "react";
import ShellyLogo from "@/assets/images/shelly-logo.webp";

import {
  LucidePawPrint,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFullName, getNameInitials } from "@/lib/utils";
import { paths } from "@/config/paths";
import { useSignOutAction } from "@/features/auth/hooks/use-sign-out-action";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { Image } from "@/components/ui/image";

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
      role: "ADMIN",
    };
  }, [user]);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarTrigger className="bg-sidebar absolute top-2 -right-4 hidden h-8 w-8 cursor-pointer rounded-full border md:block" />
      <SidebarHeader
        className={cn(
          "flex items-center justify-start px-6 pt-6",
          isCollapsed && "px-2 pt-8",
        )}
      >
        <div className="flex w-full items-center gap-2">
          <Image
            src={ShellyLogo}
            alt="Shelly Logo"
            className={cn(
              "h-12 w-12 transition-all duration-200 ease-in-out",
              isCollapsed && "h-8 w-8",
            )}
          />
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              isCollapsed ? "hidden" : "w-auto opacity-100",
            )}
          >
            <ShellyGradient className="text-3xl font-bold whitespace-nowrap">
              Shelly
            </ShellyGradient>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className={cn("px-6 pt-6", isCollapsed && "px-2")}>
        <nav>
          <SidebarMenu className={cn(isCollapsed && "gap-4")}>
            {MENU_ITEMS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? item.title : undefined}
                >
                  <div
                    onClick={() => navigate(item.path)}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <item.icon />
                    <Text size="sm" weight="medium" variant="primary">
                      {item.title}
                    </Text>
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
      <hr className="my-2" />
      <SidebarFooter className={cn("p-4", isCollapsed && "p-2 pb-6")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={isCollapsed ? "Usuario" : undefined}
                  style={isCollapsed ? { padding: "0 !important" } : {}}
                  className={cn(
                    "box-content cursor-pointer gap-3 text-nowrap",
                    isCollapsed &&
                      "relative box-border rounded-full transition-transform hover:scale-110",
                  )}
                >
                  <Avatar
                    className={cn(
                      "size-10",
                      isCollapsed && "absolute top-0 left-0 size-8",
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
                  {!isCollapsed && (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <Text
                          size="sm"
                          className="font-medium"
                          variant="primary"
                        >
                          {userProfile?.fullName}
                        </Text>
                        <Text size="xs" variant="secondary">
                          Administrador
                        </Text>
                      </div>
                      <ChevronUp className="ml-auto" strokeWidth={1.5} />
                    </div>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className={cn(
                  "w-[--radix-popper-anchor-width]",
                  isCollapsed && "ml-4",
                )}
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

export { AppSidebar };
