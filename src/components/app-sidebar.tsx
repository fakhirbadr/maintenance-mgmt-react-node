import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Menu items
const items = [
  {
    title: "Home",
    url: "/about",
    icon: Home,
  },
  {
    title: "Préventive",
    url: "#",
    icon: Inbox,
    submenu: [
      { title: "Tableau de board", url: "/preventive/dashboard" },
      { title: "Création", url: "/preventive/creation" },
      { title: "Planning", url: "/preventive/planning" },
      { title: "Alerte", url: "/preventive/alerte" },
    ],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-dark flex justify-center bg-gray-200">
            NEXTRACK 4.0 🛠️
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex w-full items-center justify-between pr-2"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {item.submenu && <ChevronRight className="h-4 w-4" />}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.submenu && hoveredItem === item.title && (
                    <div className="fixed top-auto left-[200px] z-50 mt-[-2px] w-40 rounded border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <ul className="py-1">
                        {item.submenu.map((sub) => (
                          <li key={sub.title}>
                            <a
                              href={sub.url}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                            >
                              {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
