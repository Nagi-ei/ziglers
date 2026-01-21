import {
  Calendar04Icon,
  Home03Icon,
  InboxDownloadIcon,
  Search01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/shadcn/Sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: <Icon icon={Home03Icon} />,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <Icon icon={InboxDownloadIcon} />,
  },
  {
    title: "Calendar",
    url: "#",
    icon: <Icon icon={Calendar04Icon} />,
  },
  {
    title: "Search",
    url: "#",
    icon: <Icon icon={Search01Icon} />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <Icon icon={Settings01Icon} />,
  },
];

export default function SidebarExample({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={24} height={24} draggable={false} />
              Zieglers
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
