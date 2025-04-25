import { config } from "@/config";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingPage from "../loading";
import AboutPage from "../private/about";
import Planning from "../private/preventive/planning";
import Alerte from "../private/preventive/alerte";
import Dashboard from "../private/preventive/dashboard";
import Historique from "../private/preventive/historique";
import DashboardCorrective from "../private/corrective/dashboard/dashboard";
import CrationCorrective from "../private/corrective/creation/index";
import PlanningCorrective from "../private/corrective/planning/index";
import AlerteCorrective from "../private/corrective/alerte/index";

const GlobalLayout = lazy(() => import("../layout"));
const LoginPage = lazy(() => import("../public/login"));
const Creation = lazy(() => import("../private/preventive/creationPreventive"));

const HomePage = lazy(() => import("../private/home"));
const PrivateLayout = lazy(() => import("../private/layout"));
const NotFoundPage = lazy(() => import("../public/not-found"));
const DevPage = lazy(() => import("../public/dev"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/preventive/dashboard" element={<Dashboard />} />
              <Route path="/preventive/creation" element={<Creation />} />
              <Route path="/preventive/planning" element={<Planning />} />
              <Route path="/preventive/alerte" element={<Alerte />} />
              <Route path="/preventive/historique" element={<Historique />} />

              <Route
                path="/corrective/dashboard"
                element={<DashboardCorrective />}
              />
              <Route
                path="/corrective/creation"
                element={<CrationCorrective />}
              />
              <Route
                path="/corrective/planning"
                element={<PlanningCorrective />}
              />
              <Route path="/corrective/alerte" element={<AlerteCorrective />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFoundPage />} />
            {config.environment === "development" && (
              <Route path="/dev" element={<DevPage />} />
            )}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
