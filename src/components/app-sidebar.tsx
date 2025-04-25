"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Timer,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  AppWindow,
  Wrench,
  Sun,
  Moon,
} from "lucide-react";
import { NavMain } from "./ui/nav-main";
import { NavUser } from "./ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useMenu } from "../context/MenuContext";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Vue d'ensemble",
      url: "#",
      icon: AppWindow,
      items: [
        { title: "Tableau de board", url: "#" },
        { title: "Rapports", url: "#" },
        { title: "Predictive", url: "#" },
      ],
    },
    {
      title: "Préventive",
      url: "#",
      icon: Timer,
      items: [
        { title: "Tableau de board", url: "/preventive/dashboard" },
        { title: "Création", url: "/preventive/creation" },
        { title: "Planning", url: "/preventive/planning" },
        { title: "Alerte", url: "/preventive/alerte" },
        { title: "historique", url: "/preventive/historique" },
      ],
    },
    {
      title: "Corrective",
      url: "#",
      icon: Wrench,
      items: [
        { title: "Tableau de board", url: "/corrective/dashboard" },
        { title: "Création", url: "/corrective/creation" },
        { title: "Planning", url: "/corrective/planning" },
        { title: "Alerte", url: "/corrective/alerte" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Général", url: "#" },
        { title: "Équipe", url: "#" },
        { title: "Facturation", url: "#" },
        { title: "Limites", url: "#" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme();
  const { activeMenu, setActiveMenu } = useMenu();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleMenuToggle = (title: string) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  if (!mounted) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="to-Yellow-500 flex items-center justify-center bg-gradient-to-r from-orange-600 bg-clip-text text-3xl font-extrabold text-transparent">
          - ABAI -
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          activeMenu={activeMenu}
          onMenuToggle={handleMenuToggle}
        />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Mode clair
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Mode sombre
            </>
          )}
        </Button>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
