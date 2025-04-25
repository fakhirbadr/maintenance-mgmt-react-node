"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

// Données pour les régions du Maroc
const chartData = [
  { region: "Rabat", desktop: 186, mobile: 80 },
  { region: "Casablanca", desktop: 305, mobile: 200 },
  { region: "Marrakech", desktop: 237, mobile: 120 },
  { region: "Fès", desktop: 73, mobile: 190 },
  { region: "Agadir", desktop: 209, mobile: 130 },
  { region: "Tanger", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TicketComparisonByRegion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparaison des Tickets par Région</CardTitle>
        <CardDescription>
          Comparaison des tickets de maintenance corrective pour 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            width={300} // Ajuste la largeur du graphique
            height={100}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="region"
              tickLine={false}
              tickMargin={20}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="desktop"
              fill="url(#desktopGradient)" // Applique le dégradé
              radius={4}
              barSize={50} // Réduit la taille des barres
            />
            <Bar
              dataKey="mobile"
              fill="url(#mobileGradient)" // Applique le dégradé
              radius={4}
              barSize={50} // Réduit la taille des barres
            />
            {/* Dégradé pour les barres Desktop */}
            <defs>
              <linearGradient
                id="desktopGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#EA7D62", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#DBEAFE", stopOpacity: 1 }}
                />
              </linearGradient>
              {/* Dégradé pour les barres Mobile */}
              <linearGradient
                id="mobileGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#81E7AF", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#03A791", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
