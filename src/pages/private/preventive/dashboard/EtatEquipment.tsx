"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Données pour l'état des équipements avec des couleurs plus douces en dégradé
const equipmentData = [
  { status: "new", count: 120, fill: "url(#newGradient)" }, // Vert doux
  { status: "good", count: 350, fill: "url(#goodGradient)" }, // Bleu doux
  { status: "non_conform", count: 80, fill: "url(#nonConformGradient)" }, // Rouge doux
];

const chartConfig: ChartConfig = {
  count: {
    label: "Nombre",
  },
  new: {
    label: "Nouveaux",
    color: "#6EDB8D", // Couleur plus douce pour la légende
  },
  good: {
    label: "Bons",
    color: "#6EB3DB", // Couleur plus douce pour la légende
  },
  non_conform: {
    label: "Non conformes",
    color: "#DB6E6E", // Couleur plus douce pour la légende
  },
};

const EtatEquipment = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>État des équipements</CardTitle>
        <CardDescription>Statistiques actuelles</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <defs>
              {/* Dégradé vert doux */}
              <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6EDB8D" />
                <stop offset="100%" stopColor="#4CAF50" />
              </linearGradient>

              {/* Dégradé bleu doux */}
              <linearGradient id="goodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6EB3DB" />
                <stop offset="100%" stopColor="#2196F3" />
              </linearGradient>

              {/* Dégradé rouge doux */}
              <linearGradient
                id="nonConformGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#DB6E6E" />
                <stop offset="100%" stopColor="#F44336" />
              </linearGradient>
            </defs>

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={equipmentData}
              dataKey="count"
              nameKey="status"
              label
              innerRadius={60}
            >
              {equipmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Nouveaux équipements +12% ce trimestre{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Répartition des équipements par état
        </div>
      </CardFooter>
    </Card>
  );
};

export default EtatEquipment;
