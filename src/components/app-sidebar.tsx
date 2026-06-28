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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getNameInitials } from "@/lib/utils";
import { paths } from "@/config/paths";
import { useSignOutAction } from "@/features/auth/hooks/use-sign-out-action";
import { useNavigate } from "react-router-dom";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { Image } from "@/components/ui/image";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/language-selector";
import { useShelters } from "./providers/shelters-provider";
import { useUser } from "@/hooks/use-user";
import { useRoleLabel } from "@/hooks/use-role-label";

const AppSidebar = () => {
  const { t } = useTranslation();
  const roleLabel = useRoleLabel();
  const signOutAction = useSignOutAction();
  const navigate = useNavigate();

  const MENU_ITEMS = useMemo(
    () => [
      {
        title: t("sidebar.pets"),
        path: paths.app.pets.path,
        icon: LucidePawPrint,
      },
      {
        title: t("sidebar.requests"),
        path: paths.app.requests.path,
        icon: LucideFiles,
      },
      {
        title: t("sidebar.members"),
        path: paths.app.members.path,
        icon: LucideUsers,
      },
    ],
    [t],
  );

  const userMenuItems = useMemo(
    () => [
      {
        title: t("sidebar.profile"),
        url: paths.app.members.profile.getHref("me"),
        action: () => navigate(paths.app.members.profile.getHref("me")),
      },
      {
        title: t("sidebar.sign_out"),
        url: "#",
        action: signOutAction,
      },
    ],
    [signOutAction, t, navigate],
  );

  const { state: sidebarState } = useSidebar();
  const isCollapsed = useMemo(
    () => sidebarState === "collapsed",
    [sidebarState],
  );
  // Should access this from a state that pulls count periodically.
  const [newPetsCount] = useState(0);
  const { shelters, currentShelter, setCurrentShelter } = useShelters();
  const { data: user } = useUser();

  const userProfile = useMemo(() => {
    if (!user) return null;
    return {
      fullName: user.name,
      email: user.email,
      role: currentShelter?.role,
    };
  }, [user, currentShelter]);

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
      <div className={cn("px-6 py-3", isCollapsed && "px-2")}>
        {shelters.length > 0 ? (
          <Select
            value={currentShelter?.id?.toString()}
            onValueChange={(value) => {
              const shelter = shelters.find((s) => s?.id?.toString() === value);
              if (shelter) {
                setCurrentShelter(shelter);
              }
            }}
          >
            <SelectTrigger
              className="w-full"
              size={isCollapsed ? "sm" : "default"}
            >
              <SelectValue placeholder={t("sidebar.select_shelter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {shelters.map((shelter) => (
                  <SelectItem key={shelter.id} value={shelter.id.toString()}>
                    {shelter.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          "No eres miembro de ningún refugio."
        )}
      </div>
      <div className={cn("px-6 py-3", isCollapsed && "px-2")}>
        <LanguageSelector isCollapsed={isCollapsed} />
      </div>
      <hr className="my-2" />
      <SidebarFooter className={cn("p-4", isCollapsed && "p-2 pb-6")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={isCollapsed ? t("sidebar.user") : undefined}
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
                          {roleLabel(userProfile?.role)}
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
