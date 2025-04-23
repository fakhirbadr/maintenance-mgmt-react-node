"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { Button } from "@/components/ui/button";

// Données des régions
const regionData = [
  { region: "Tanger-Tétouan-Al Hoceïma", maintenance: 230 },
  { region: "L'Oriental", maintenance: 190 },
  { region: "Fès-Meknès", maintenance: 210 },
  { region: "Rabat-Salé-Kénitra", maintenance: 186 },
  { region: "Béni Mellal-Khénifra", maintenance: 175 },
  { region: "Casablanca-Settat", maintenance: 305 },
  { region: "Marrakech-Safi", maintenance: 260 },
  { region: "Drâa-Tafilalet", maintenance: 120 },
  { region: "Souss-Massa", maintenance: 150 },
  { region: "Guelmim-Oued Noun", maintenance: 95 },
  { region: "Laâyoune-Sakia El Hamra", maintenance: 70 },
  { region: "Dakhla-Oued Ed-Dahab", maintenance: 55 },
];

const provinceData = {
  "Tanger-Tétouan-Al Hoceïma": [
    { province: "Tanger", maintenance: 80 },
    { province: "Tétouan", maintenance: 75 },
    { province: "Al Hoceïma", maintenance: 75 },
  ],
  "L'Oriental": [
    { province: "Oujda", maintenance: 65 },
    { province: "Nador", maintenance: 65 },
    { province: "Berkane", maintenance: 60 },
  ],
  "Fès-Meknès": [
    { province: "Fès", maintenance: 85 },
    { province: "Meknès", maintenance: 70 },
    { province: "Ifrane", maintenance: 55 },
  ],
  "Rabat-Salé-Kénitra": [
    { province: "Rabat", maintenance: 50 },
    { province: "Salé", maintenance: 45 },
    { province: "Kénitra", maintenance: 91 },
  ],
  "Béni Mellal-Khénifra": [
    { province: "Béni Mellal", maintenance: 60 },
    { province: "Khénifra", maintenance: 60 },
    { province: "Azilal", maintenance: 55 },
  ],
  "Casablanca-Settat": [
    { province: "Casablanca", maintenance: 150 },
    { province: "Mohammedia", maintenance: 80 },
    { province: "Settat", maintenance: 75 },
  ],
  "Marrakech-Safi": [
    { province: "Marrakech", maintenance: 120 },
    { province: "Safi", maintenance: 70 },
    { province: "Essaouira", maintenance: 70 },
  ],
  "Drâa-Tafilalet": [
    { province: "Errachidia", maintenance: 40 },
    { province: "Ouarzazate", maintenance: 40 },
    { province: "Tinghir", maintenance: 40 },
  ],
  "Souss-Massa": [
    { province: "Agadir", maintenance: 70 },
    { province: "Taroudant", maintenance: 40 },
    { province: "Tiznit", maintenance: 40 },
  ],
  "Guelmim-Oued Noun": [
    { province: "Guelmim", maintenance: 35 },
    { province: "Tan-Tan", maintenance: 30 },
    { province: "Assa-Zag", maintenance: 30 },
  ],
  "Laâyoune-Sakia El Hamra": [
    { province: "Laâyoune", maintenance: 35 },
    { province: "Boujdour", maintenance: 20 },
    { province: "Tarfaya", maintenance: 15 },
  ],
  "Dakhla-Oued Ed-Dahab": [
    { province: "Dakhla", maintenance: 35 },
    { province: "Aousserd", maintenance: 20 },
  ],
};

const siteData = {
  Tanger: [
    { site: "Site Tanger A", maintenance: 30 },
    { site: "Site Tanger B", maintenance: 25 },
    { site: "Site Tanger C", maintenance: 25 },
  ],
  Tétouan: [
    { site: "Site Tétouan A", maintenance: 30 },
    { site: "Site Tétouan B", maintenance: 20 },
    { site: "Site Tétouan C", maintenance: 25 },
  ],
  "Al Hoceïma": [
    { site: "Site Al H A", maintenance: 25 },
    { site: "Site Al H B", maintenance: 25 },
    { site: "Site Al H C", maintenance: 25 },
  ],
  Oujda: [
    { site: "Site Oujda A", maintenance: 25 },
    { site: "Site Oujda B", maintenance: 20 },
    { site: "Site Oujda C", maintenance: 20 },
  ],
  Nador: [
    { site: "Site Nador A", maintenance: 20 },
    { site: "Site Nador B", maintenance: 25 },
    { site: "Site Nador C", maintenance: 20 },
  ],
  Berkane: [
    { site: "Site Berkane A", maintenance: 20 },
    { site: "Site Berkane B", maintenance: 20 },
    { site: "Site Berkane C", maintenance: 20 },
  ],
  Fès: [
    { site: "Site Fès A", maintenance: 30 },
    { site: "Site Fès B", maintenance: 30 },
    { site: "Site Fès C", maintenance: 25 },
  ],
  Meknès: [
    { site: "Site Meknès A", maintenance: 25 },
    { site: "Site Meknès B", maintenance: 20 },
    { site: "Site Meknès C", maintenance: 25 },
  ],
  Ifrane: [
    { site: "Site Ifrane A", maintenance: 20 },
    { site: "Site Ifrane B", maintenance: 15 },
    { site: "Site Ifrane C", maintenance: 20 },
  ],
  Rabat: [
    { site: "Site Rabat A", maintenance: 15 },
    { site: "Site Rabat B", maintenance: 20 },
    { site: "Site Rabat C", maintenance: 15 },
  ],
  Salé: [
    { site: "Site Salé A", maintenance: 10 },
    { site: "Site Salé B", maintenance: 15 },
    { site: "Site Salé C", maintenance: 20 },
  ],
  Kénitra: [
    { site: "Site Kénitra A", maintenance: 30 },
    { site: "Site Kénitra B", maintenance: 31 },
    { site: "Site Kénitra C", maintenance: 30 },
  ],
  "Béni Mellal": [
    { site: "Site BM A", maintenance: 20 },
    { site: "Site BM B", maintenance: 20 },
    { site: "Site BM C", maintenance: 20 },
  ],
  Khénifra: [
    { site: "Site Khnifra A", maintenance: 20 },
    { site: "Site Khnifra B", maintenance: 20 },
    { site: "Site Khnifra C", maintenance: 20 },
  ],
  Azilal: [
    { site: "Site Azilal A", maintenance: 20 },
    { site: "Site Azilal B", maintenance: 20 },
    { site: "Site Azilal C", maintenance: 15 },
  ],
  Casablanca: [
    { site: "Site Casa A", maintenance: 50 },
    { site: "Site Casa B", maintenance: 50 },
    { site: "Site Casa C", maintenance: 50 },
  ],
  Mohammedia: [
    { site: "Site Moh A", maintenance: 25 },
    { site: "Site Moh B", maintenance: 30 },
    { site: "Site Moh C", maintenance: 25 },
  ],
  Settat: [
    { site: "Site Settat A", maintenance: 25 },
    { site: "Site Settat B", maintenance: 25 },
    { site: "Site Settat C", maintenance: 25 },
  ],
  Marrakech: [
    { site: "Site Marrakech A", maintenance: 40 },
    { site: "Site Marrakech B", maintenance: 40 },
    { site: "Site Marrakech C", maintenance: 40 },
  ],
  Safi: [
    { site: "Site Safi A", maintenance: 25 },
    { site: "Site Safi B", maintenance: 25 },
    { site: "Site Safi C", maintenance: 20 },
  ],
  Essaouira: [
    { site: "Site Essaouira A", maintenance: 25 },
    { site: "Site Essaouira B", maintenance: 25 },
    { site: "Site Essaouira C", maintenance: 20 },
  ],
  Errachidia: [
    { site: "Site Errachidia A", maintenance: 15 },
    { site: "Site Errachidia B", maintenance: 15 },
    { site: "Site Errachidia C", maintenance: 10 },
  ],
  Ouarzazate: [
    { site: "Site Ouarzazate A", maintenance: 15 },
    { site: "Site Ouarzazate B", maintenance: 15 },
    { site: "Site Ouarzazate C", maintenance: 10 },
  ],
  Tinghir: [
    { site: "Site Tinghir A", maintenance: 10 },
    { site: "Site Tinghir B", maintenance: 15 },
    { site: "Site Tinghir C", maintenance: 15 },
  ],
  Agadir: [
    { site: "Site Agadir A", maintenance: 25 },
    { site: "Site Agadir B", maintenance: 25 },
    { site: "Site Agadir C", maintenance: 20 },
  ],
  Taroudant: [
    { site: "Site Taroudant A", maintenance: 15 },
    { site: "Site Taroudant B", maintenance: 15 },
    { site: "Site Taroudant C", maintenance: 10 },
  ],
  Tiznit: [
    { site: "Site Tiznit A", maintenance: 15 },
    { site: "Site Tiznit B", maintenance: 15 },
    { site: "Site Tiznit C", maintenance: 10 },
  ],
  Guelmim: [
    { site: "Site Guelmim A", maintenance: 15 },
    { site: "Site Guelmim B", maintenance: 10 },
    { site: "Site Guelmim C", maintenance: 10 },
  ],
  "Tan-Tan": [
    { site: "Site Tan-Tan A", maintenance: 10 },
    { site: "Site Tan-Tan B", maintenance: 10 },
    { site: "Site Tan-Tan C", maintenance: 10 },
  ],
  "Assa-Zag": [
    { site: "Site Assa A", maintenance: 10 },
    { site: "Site Assa B", maintenance: 10 },
    { site: "Site Assa C", maintenance: 10 },
  ],
  Laâyoune: [
    { site: "Site Laâyoune A", maintenance: 15 },
    { site: "Site Laâyoune B", maintenance: 10 },
    { site: "Site Laâyoune C", maintenance: 10 },
  ],
  Boujdour: [
    { site: "Site Boujdour A", maintenance: 10 },
    { site: "Site Boujdour B", maintenance: 5 },
    { site: "Site Boujdour C", maintenance: 5 },
  ],
  Tarfaya: [
    { site: "Site Tarfaya A", maintenance: 5 },
    { site: "Site Tarfaya B", maintenance: 5 },
    { site: "Site Tarfaya C", maintenance: 5 },
  ],
  Dakhla: [
    { site: "Site Dakhla A", maintenance: 15 },
    { site: "Site Dakhla B", maintenance: 10 },
    { site: "Site Dakhla C", maintenance: 10 },
  ],
  Aousserd: [
    { site: "Site Aousserd A", maintenance: 10 },
    { site: "Site Aousserd B", maintenance: 5 },
    { site: "Site Aousserd C", maintenance: 5 },
  ],
};

const chartConfig = {
  maintenance: {
    label: "Maintenance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type NavigationState = {
  level: "region" | "province" | "site";
  region?: string;
  province?: string;
};

const MaintenancePreventiveChart = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    level: "region",
  });
  const [currentData, setCurrentData] = useState(regionData);

  const handleBarClick = (data: any) => {
    if (!data.activePayload || !data.activePayload[0]) return;

    const payload = data.activePayload[0].payload;

    if (navigation.level === "region") {
      // Passage au niveau province
      const regionName = payload.region;
      setNavigation({ level: "province", region: regionName });
      setCurrentData(
        provinceData[regionName as keyof typeof provinceData] || [],
      );
    } else if (navigation.level === "province") {
      // Passage au niveau site
      const provinceName = payload.province;
      setNavigation((prev) => ({
        ...prev,
        level: "site",
        province: provinceName,
      }));
      setCurrentData(siteData[provinceName as keyof typeof siteData] || []);
    }
  };

  const handleBackClick = () => {
    if (navigation.level === "province") {
      // Retour aux régions
      setNavigation({ level: "region" });
      setCurrentData(regionData);
    } else if (navigation.level === "site") {
      // Retour aux provinces
      setNavigation((prev) => ({
        ...prev,
        level: "province",
        province: undefined,
      }));
      setCurrentData(
        provinceData[navigation.region as keyof typeof provinceData] || [],
      );
    }
  };

  const getTitle = () => {
    switch (navigation.level) {
      case "province":
        return `Maintenance - ${navigation.region}`;
      case "site":
        return `Maintenance - ${navigation.province}`;
      default:
        return "Maintenance par région";
    }
  };

  const getDescription = () => {
    switch (navigation.level) {
      case "province":
        return "Données pour les provinces de la région";
      case "site":
        return `Données pour les sites de ${navigation.province}`;
      default:
        return "Données pour diverses régions du Maroc";
    }
  };

  const getDataKey = () => {
    switch (navigation.level) {
      case "province":
        return "province";
      case "site":
        return "site";
      default:
        return "region";
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {navigation.level !== "region" && (
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <CardTitle>{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={currentData}
            width={800}
            height={300}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={handleBarClick}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={getDataKey()}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="maintenance"
              fill="url(#gradient)"
              radius={8}
              style={{ cursor: "pointer" }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Augmentation de 5,2 % ce mois-ci <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {navigation.level === "region"
            ? "Cliquez sur une région pour voir les données par province"
            : navigation.level === "province"
              ? `Cliquez sur une province pour voir les données par site`
              : `Affichage des données de maintenance pour les sites de ${navigation.province}`}
        </div>
      </CardFooter>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#F7CABF", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F7A7A0", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
};

export default MaintenancePreventiveChart;
