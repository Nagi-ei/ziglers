import {
  Calendar04Icon,
  Home03Icon,
  InboxDownloadIcon,
  Search01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
    url: "#",
    icon: <HugeiconsIcon icon={Home03Icon} />,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <HugeiconsIcon icon={InboxDownloadIcon} />,
  },
  {
    title: "Calendar",
    url: "#",
    icon: <HugeiconsIcon icon={Calendar04Icon} />,
  },
  {
    title: "Search",
    url: "#",
    icon: <HugeiconsIcon icon={Search01Icon} />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <HugeiconsIcon icon={Settings01Icon} />,
  },
];

export default function SidebarExample({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
