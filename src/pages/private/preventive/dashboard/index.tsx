import React from "react";
import { MonthlyComparisonChart } from "./MonthlyComparisonChart";
import MaintenancePreventiveChart from "./MaintenancePreventiveChart";
import EtatEquipment from "./EtatEquipment";
import DelayedPrentiveByTechnicienChart from "./DelayedPrentiveByTechnicienChart";
import StatsCard from "./Card";
import { ListCheck, Hourglass } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-background min-h-screen px-4 py-6 md:px-8 lg:px-12">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Tableau de bord
      </h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatsCard
            title="Revenue"
            value="44 5231 MAD"
            icon={ListCheck}
            iconBgColor="bg-blue-500"
          />
          <StatsCard
            title="Maintenance preventive réalisées"
            value="+2350"
            icon={ListCheck}
            iconBgColor="bg-emerald-500"
          />
          <StatsCard
            title="Maintenance preventive en attente"
            value="2350"
            icon={Hourglass}
            iconBgColor="bg-orange-500"
          />
          <StatsCard
            title="Performance"
            value="66.5%"
            icon={ListCheck}
            iconBgColor="bg-amber-500"
          />
        </div>
        <div>
          <MonthlyComparisonChart />
        </div>

        <div>
          <MaintenancePreventiveChart />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <EtatEquipment />
          <DelayedPrentiveByTechnicienChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
