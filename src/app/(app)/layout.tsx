import { cookies } from "next/headers";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "@/shared/ui/shadcn/Sidebar";
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
      <SidebarInset className="bg-sidebar md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none">
        <div className="h-full min-h-0 overflow-y-auto">
          <div className="my-4 mr-4 flex min-h-[calc(100%-2rem)] flex-col overflow-clip bg-background shadow-sm">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
