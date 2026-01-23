import { cookies } from "next/headers";
import { SIDEBAR_COOKIE_NAME, SidebarProvider, SidebarTrigger } from "@/shared/ui/shadcn/Sidebar";
import { AppSidebar } from "@/widgets/app-sidebar/AppSidebar";

export default async function DefaultSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value;
  const defaultOpen = sidebarState === undefined ? true : sidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant="sidebar" />
      <main className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
