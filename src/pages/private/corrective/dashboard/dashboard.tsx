import React from "react";
import CardCorrective from "./cardCorrective";
import { ListChecks, Hourglass, DollarSign, Activity } from "lucide-react";
import { TicketComparisonByRegion } from "./TicketComparisonByRegion";

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-4 text-xl font-semibold">
        Tableau de bord de maintenance corrective
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4">
          <CardCorrective
            title={"Nombre des tickets ouverts"}
            value={"45"}
            icon={ListChecks}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
        </div>
        <div className="p-4">
          <CardCorrective
            title={"Temps moyen de réparation (MTTR)"}
            value={"3h 25m"}
            icon={Hourglass}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          />
        </div>
        <div className="p-4">
          <CardCorrective
            title={"Coûts de maintenance"}
            value={"79 280 MAD"}
            icon={DollarSign}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
          />
        </div>
        <div className="p-4">
          <CardCorrective
            title={"Nombre des tickets en cours"}
            value={"28"}
            icon={Activity}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>
      </div>
      <div className="h-[50%] w-[100%]">
        <TicketComparisonByRegion />
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
