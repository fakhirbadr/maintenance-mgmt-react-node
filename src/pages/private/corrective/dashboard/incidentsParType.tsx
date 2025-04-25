import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

// Exemple de données avec les noms des appareils
const chartData = [
  { device: "Appareil 1", maintenance: 12, corrective: 5 },
  { device: "Appareil 2", maintenance: 15, corrective: 8 },
  { device: "Appareil 3", maintenance: 10, corrective: 6 },
  { device: "Appareil 4", maintenance: 20, corrective: 12 },
  { device: "Appareil 5", maintenance: 18, corrective: 9 },
  { device: "Appareil 6", maintenance: 22, corrective: 10 },
];

const chartConfig = {
  maintenance: {
    label: "Maintenance",
    color: "hsl(var(--chart-1))",
  },
  corrective: {
    label: "Corrective Maintenance",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Maintenance Corrective par Appareil</CardTitle>
        <CardDescription>Répartition par appareil</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="device" // Changement de 'month' à 'device'
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="maintenance" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="maintenance"
              layout="vertical"
              fill="var(--color-maintenance)"
              radius={4}
            >
              <LabelList
                dataKey="device"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="maintenance"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="corrective"
              layout="vertical"
              fill="var(--color-corrective)"
              radius={4}
            >
              <LabelList
                dataKey="device"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="corrective"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing corrective maintenance data per device for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
