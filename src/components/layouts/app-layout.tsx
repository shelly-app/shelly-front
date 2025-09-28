import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="bg-sidebar fixed top-4 left-4 block h-8 w-8 cursor-pointer rounded-full border md:hidden" />
      <main className="h-full w-full px-8 pt-8 pb-20">{children}</main>
    </SidebarProvider>
  );
};
