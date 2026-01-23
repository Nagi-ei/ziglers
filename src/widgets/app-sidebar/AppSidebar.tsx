"use client";

import {
  Add01Icon,
  ChartIncreaseIcon,
  DashboardSquare02Icon,
  Folder02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/Avatar";
import { Button } from "@/shared/ui/shadcn/Button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/shadcn/Sidebar";

const PLACEHOLDER_USER = {
  name: "John Doe",
  email: "john@example.com",
  initials: "JD",
};

const MENU_ITEMS = [
  {
    title: "Dashboard",
    icon: DashboardSquare02Icon,
    href: "/dashboard1",
    alternatives: ["/dashboard2"],
  },
  {
    title: "My Boards",
    icon: Folder02Icon,
    href: "/boards",
  },
  {
    title: "Popular",
    icon: ChartIncreaseIcon,
    href: "/popular",
  },
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ variant = "inset", ...props }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant={variant} {...props} className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="mb-6 flex items-center gap-2 px-1">
          <div className="relative size-8 shrink-0">
            <Image src="/logo.png" alt="Zieglers Logo" fill className="object-contain" />
          </div>
          <span className="font-semibold text-sidebar-foreground text-xl tracking-tight">
            Zieglers
          </span>
        </div>
        <Button className="h-10 w-full justify-start gap-2 rounded-none bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
          <Icon icon={Add01Icon} size={20} strokeWidth={2} />
          New Board
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarMenu className="gap-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || item.alternatives?.includes(pathname);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  className="h-10 gap-3 rounded-none font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground"
                  render={
                    <Link href={item.href}>
                      <Icon icon={item.icon} size={20} strokeWidth={isActive ? 2 : 1.5} />
                      <span>{item.title}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/40 border-t p-4">
        <div className="flex items-center gap-3 px-1">
          <Avatar className="h-9 w-9 rounded-none border border-sidebar-border shadow-sm">
            <AvatarImage src="" alt={PLACEHOLDER_USER.name} />
            <AvatarFallback className="flex items-center justify-center rounded-none bg-sidebar-accent font-medium text-sidebar-foreground">
              <Icon icon={UserIcon} size={16} className="text-sidebar-foreground/70" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-medium text-sidebar-foreground text-sm">
              {PLACEHOLDER_USER.name}
            </span>
            <span className="truncate text-muted-foreground text-xs">{PLACEHOLDER_USER.email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
