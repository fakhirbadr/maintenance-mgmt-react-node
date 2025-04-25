import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/app-sidebar";
import { MenuProvider } from "@/context/MenuContext"; // Assure-toi que MenuContext est configuré correctement

export default function PrivateLayout() {
  return (
    <MenuProvider>
      {" "}
      {/* Fournit le contexte pour l'état du menu */}
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Outlet /> {/* Le contenu dynamique de la page */}
        </main>
      </SidebarProvider>
    </MenuProvider>
  );
}
