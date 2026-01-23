import { cookies } from "next/headers";
import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/shadcn/Sidebar";
import { AppSidebar } from "@/widgets/app-sidebar/AppSidebar";

export default async function InsetSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value;
  const defaultOpen = sidebarState === undefined ? true : sidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant="inset" />
      <SidebarInset className="rounded-none">
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
