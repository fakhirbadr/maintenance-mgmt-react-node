import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes"; // ✅ IMPORT ICI
import "./global.css";
import Router from "./pages/router/index.tsx";
import { MenuProvider } from "./context/MenuContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router />
      </ThemeProvider>
    </MenuProvider>
  </StrictMode>,
);
