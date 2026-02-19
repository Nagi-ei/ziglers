"use client";

import {
  Add01Icon,
  ChartIncreaseIcon,
  DashboardSquare02Icon,
  Folder02Icon,
  SidebarLeft01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/Avatar";
import { Separator } from "@/shared/ui/shadcn/Separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
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
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant={variant} collapsible="icon" {...props} className="border-r-0">
      {/* Header */}
      <SidebarHeader className="mb-4 border-b py-4">
        <div className="flex items-center justify-between transition-all duration-200 ease-linear">
          <button
            type="button"
            onClick={isCollapsed ? toggleSidebar : undefined}
            className={cn(
              "flex items-center gap-3 transition-all duration-200 ease-linear",
              isCollapsed ? "cursor-pointer" : "cursor-default",
            )}
          >
            <div className="relative size-10 shrink-0">
              <Image src="/logo.png" alt="Zieglers Logo" fill className="object-contain" />
            </div>
            <span
              className={cn(
                "max-w-64 overflow-hidden whitespace-nowrap font-semibold text-sidebar-foreground text-xl tracking-tight opacity-100 transition-all duration-200 ease-linear",
                isCollapsed ? "max-w-0 opacity-0" : "",
              )}
            >
              Zieglers
            </span>
          </button>
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              "flex size-8 items-center justify-center overflow-hidden text-sidebar-foreground/70 transition-all duration-200 ease-linear hover:text-sidebar-foreground",
              isCollapsed ? "hidden max-w-0 opacity-0" : "-mr-2",
            )}
          >
            <Icon icon={SidebarLeft01Icon} size={20} strokeWidth={1.5} />
          </button>
        </div>
      </SidebarHeader>

      {/* New Board */}
      <SidebarContent className="gap-6 p-2">
        <Link
          href="/boards/new"
          className={cn(
            "flex h-10 items-center rounded-none bg-sidebar-accent px-[11px] font-medium text-sidebar-accent-foreground transition-all duration-200 ease-linear hover:bg-secondary",
          )}
        >
          <Icon icon={Add01Icon} size={20} className={cn("shrink-0")} strokeWidth={2} />
          <span
            className={cn(
              "ml-3 max-w-64 overflow-hidden whitespace-nowrap font-bold text-base opacity-100 transition-all duration-200 ease-linear",
              isCollapsed ? "max-w-0 opacity-0" : "",
            )}
          >
            New Board
          </span>
        </Link>

        <Separator />

        {/* Menu Items */}
        <nav className="flex flex-col gap-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || item.alternatives?.includes(pathname);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex h-10 items-center rounded-none px-[11px] font-medium transition-all duration-200 ease-linear",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  icon={item.icon}
                  size={20}
                  className="shrink-0"
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span
                  className={cn(
                    "ml-3 max-w-64 overflow-hidden whitespace-nowrap opacity-100 transition-all duration-200 ease-linear",
                    isCollapsed ? "max-w-0 opacity-0" : "",
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      {/* User */}
      <SidebarFooter className="border-sidebar-border/40 border-t py-4 transition-all duration-200 ease-linear">
        <div className="flex items-center overflow-hidden transition-all duration-200 ease-linear">
          <Avatar className="size-10 shrink-0 rounded-none border border-sidebar-border shadow-sm">
            <AvatarImage src="" alt={PLACEHOLDER_USER.name} />
            <AvatarFallback className="flex items-center justify-center rounded-none bg-sidebar-accent font-medium text-sidebar-foreground">
              <Icon icon={UserIcon} size={16} className="text-sidebar-foreground/70" />
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "ml-3 flex max-w-64 flex-col overflow-hidden whitespace-nowrap opacity-100 transition-all duration-200 ease-linear",
              isCollapsed ? "max-w-0 opacity-0" : "",
            )}
          >
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
