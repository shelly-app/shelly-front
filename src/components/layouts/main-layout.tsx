import { AppSidebar } from '@/components/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar />
      <main>
        <SidebarTrigger className="mt-2 cursor-pointer" />
        {children}
      </main>
    </>
  );
};

export { MainLayout };
