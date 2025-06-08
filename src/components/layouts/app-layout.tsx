import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-full w-full p-4">
        <SidebarTrigger className="mt-2 cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  );
};
