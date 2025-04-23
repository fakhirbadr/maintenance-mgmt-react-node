import React from "react";
import { MonthlyComparisonChart } from "./MonthlyComparisonChart";
import MaintenancePreventiveChart from "./MaintenancePreventiveChart";
import EtatEquipment from "./EtatEquipment";
import DelayedPrentiveByTechnicienChart from "./DelayedPrentiveByTechnicienChart";

const Index = () => {
  return (
    <div className="bg-background min-h-screen gap-y-5 px-4 py-6 md:px-8 lg:px-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Tableau de bord
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <MonthlyComparisonChart />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <MaintenancePreventiveChart />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EtatEquipment />
        <DelayedPrentiveByTechnicienChart />
      </div>
    </div>
  );
};

export default Index;
