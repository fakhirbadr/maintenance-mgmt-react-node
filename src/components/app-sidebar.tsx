"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Timer,
  Command,
  Frame,
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
import { NavProjects } from "./ui/nav-projects";
import { NavUser } from "./ui/nav-user";
import { TeamSwitcher } from "./ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Données de configuration
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Vue d'ensemble",
      url: "#",
      icon: AppWindow,
      isActive: true,
      items: [
        { title: "interface1", url: "#" },
        { title: "interface2", url: "#" },
        { title: "interface3", url: "#" },
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
      ],
    },
    {
      title: "Corrective",
      url: "#",
      icon: Wrench,
      items: [
        { title: "Tableau de board", url: "/preventive/dashboard" },
        { title: "Création", url: "/preventive/creation" },
        { title: "Planning", url: "/preventive/planning" },
        { title: "Alerte", url: "/preventive/alerte" },
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
  // projects: [
  //   { name: "Design Engineering", url: "#", icon: Frame },
  //   { name: "Sales & Marketing", url: "#", icon: PieChart },
  //   { name: "Travel", url: "#", icon: Map },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null; // ou un placeholder/squelette de chargement
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <h1 className="to-Yellow-500 flex items-center justify-center bg-gradient-to-r from-orange-600 bg-clip-text text-3xl font-extrabold text-transparent">
          - ABAI -
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
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
