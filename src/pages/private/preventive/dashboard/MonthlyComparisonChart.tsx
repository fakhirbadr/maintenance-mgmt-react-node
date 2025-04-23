"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartData = [
  // Avril 2024
  { date: "2024-04-01", pv_preventive: 52 },
  { date: "2024-04-02", pv_preventive: 65 },
  { date: "2024-04-03", pv_preventive: 58 },
  { date: "2024-04-04", pv_preventive: 60 },
  { date: "2024-04-05", pv_preventive: 63 },
  { date: "2024-04-06", pv_preventive: 55 },
  { date: "2024-04-07", pv_preventive: 67 },
  { date: "2024-04-08", pv_preventive: 62 },
  { date: "2024-04-09", pv_preventive: 66 },
  { date: "2024-04-10", pv_preventive: 59 },
  { date: "2024-04-11", pv_preventive: 64 },
  { date: "2024-04-12", pv_preventive: 68 },
  { date: "2024-04-13", pv_preventive: 70 },
  { date: "2024-04-14", pv_preventive: 69 },
  { date: "2024-04-15", pv_preventive: 65 },
  { date: "2024-04-16", pv_preventive: 63 },
  { date: "2024-04-17", pv_preventive: 71 },
  { date: "2024-04-18", pv_preventive: 60 },
  { date: "2024-04-19", pv_preventive: 67 },
  { date: "2024-04-20", pv_preventive: 66 },
  { date: "2024-04-21", pv_preventive: 64 },
  { date: "2024-04-22", pv_preventive: 68 },
  { date: "2024-04-23", pv_preventive: 72 },
  { date: "2024-04-24", pv_preventive: 70 },
  { date: "2024-04-25", pv_preventive: 69 },
  { date: "2024-04-26", pv_preventive: 65 },
  { date: "2024-04-27", pv_preventive: 62 },
  { date: "2024-04-28", pv_preventive: 66 },
  { date: "2024-04-29", pv_preventive: 70 },
  { date: "2024-04-30", pv_preventive: 71 },

  // Mai 2024
  { date: "2024-05-01", pv_preventive: 72 },
  { date: "2024-05-02", pv_preventive: 74 },
  { date: "2024-05-03", pv_preventive: 73 },
  { date: "2024-05-04", pv_preventive: 75 },
  { date: "2024-05-05", pv_preventive: 70 },
  { date: "2024-05-06", pv_preventive: 68 },
  { date: "2024-05-07", pv_preventive: 69 },
  { date: "2024-05-08", pv_preventive: 71 },
  { date: "2024-05-09", pv_preventive: 73 },
  { date: "2024-05-10", pv_preventive: 72 },
  { date: "2024-05-11", pv_preventive: 74 },
  { date: "2024-05-12", pv_preventive: 76 },
  { date: "2024-05-13", pv_preventive: 75 },
  { date: "2024-05-14", pv_preventive: 77 },
  { date: "2024-05-15", pv_preventive: 79 },
  { date: "2024-05-16", pv_preventive: 80 },
  { date: "2024-05-17", pv_preventive: 78 },
  { date: "2024-05-18", pv_preventive: 77 },
  { date: "2024-05-19", pv_preventive: 76 },
  { date: "2024-05-20", pv_preventive: 78 },
  { date: "2024-05-21", pv_preventive: 80 },
  { date: "2024-05-22", pv_preventive: 79 },
  { date: "2024-05-23", pv_preventive: 81 },
  { date: "2024-05-24", pv_preventive: 83 },
  { date: "2024-05-25", pv_preventive: 84 },
  { date: "2024-05-26", pv_preventive: 85 },
  { date: "2024-05-27", pv_preventive: 12 },
  { date: "2024-05-28", pv_preventive: 87 },
  { date: "2024-05-29", pv_preventive: 88 },
  { date: "2024-05-30", pv_preventive: 89 },
  { date: "2024-05-31", pv_preventive: 90 },

  // Juin 2024
  ...Array.from({ length: 30 }, (_, i) => ({
    date: `2024-06-${String(i + 1).padStart(2, "0")}`,
    pv_preventive: 90 + i,
  })),

  // Juillet 2024
  ...Array.from({ length: 31 }, (_, i) => ({
    date: `2024-07-${String(i + 1).padStart(2, "0")}`,
    pv_preventive: 120 + i,
  })),
];

const chartConfig = {
  pv_preventive: {
    label: "PV Préventive",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyComparisonChart() {
  const [timeRange, setTimeRange] = React.useState("30d");

  const getFilteredData = (range: string, isPreviousPeriod = false) => {
    const referenceDate = new Date("2024-05-31");
    let daysToSubtract = 90;
    if (range === "30d") {
      daysToSubtract = 30;
    } else if (range === "7d") {
      daysToSubtract = 7;
    }

    // Pour la période précédente, on décale de la durée de la période
    const offset = isPreviousPeriod ? daysToSubtract : 0;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract - offset);

    const endDate = new Date(referenceDate);
    endDate.setDate(endDate.getDate() - offset);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });
  };

  const currentPeriodData = getFilteredData(timeRange);
  const previousPeriodData = getFilteredData(timeRange, true);

  // Calcul des totaux pour les deux périodes
  const currentTotal = currentPeriodData.reduce(
    (sum, item) => sum + item.pv_preventive,
    0,
  );
  const previousTotal = previousPeriodData.reduce(
    (sum, item) => sum + item.pv_preventive,
    0,
  );

  // Calcul de la tendance
  const trend = previousTotal
    ? ((currentTotal - previousTotal) / previousTotal) * 100
    : 0;
  const isUp = trend >= 0;

  // Fonction pour formater la période
  const formatPeriod = (data: typeof chartData) => {
    if (data.length === 0) return "";
    const start = new Date(data[0].date);
    const end = new Date(data[data.length - 1].date);
    return `${start.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })} - ${end.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })}`;
  };

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Comparaison des PV préventifs</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Comparaison avec la période précédente équivalente
          </span>
          <span className="@[540px]/card:hidden">PV préventifs</span>
        </CardDescription>
        <div className="absolute top-4 right-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              3 mois
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              30 jours
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              7 jours
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              aria-label="Select a value"
            >
              <SelectValue placeholder="3 mois" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 mois
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 jours
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 jours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={currentPeriodData}>
            <defs>
              <linearGradient id="fillPvPreventive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pv_preventive)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pv_preventive)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <defs>
              <linearGradient
                id="colorPvPreventive"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#EA7D62" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F2AC9B" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="pv_preventive"
              stroke="#EA7D62" // Couleur de la ligne
              fill="url(#colorPvPreventive)" // Appliquer le dégradé ici
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {isUp ? (
                <>
                  Augmentation de {trend.toFixed(1)}%{" "}
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </>
              ) : (
                <>
                  Diminution de {Math.abs(trend).toFixed(1)}%{" "}
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </>
              )}
            </div>
            <div className="text-muted-foreground flex flex-col gap-1 leading-none">
              <div>
                Période actuelle: {formatPeriod(currentPeriodData)} - Total:{" "}
                {currentTotal}
              </div>
              <div>
                Période précédente: {formatPeriod(previousPeriodData)} - Total:{" "}
                {previousTotal}
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
