import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

const chartData = [
  { technicien: "Technicien A", retard: 22 },
  { technicien: "Technicien B", retard: 17 },
  { technicien: "Technicien C", retard: 15 },
  { technicien: "Technicien D", retard: 13 },
  { technicien: "Technicien E", retard: 12 },
  { technicien: "Technicien F", retard: 9 },
];

const chartConfig = {
  retard: {
    label: "Retard (en heures)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const DelayedPrentiveByTechnicienChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retards par Technicien</CardTitle>
        <CardDescription>Analyse des retards accumulés</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="retard" />
            <YAxis
              dataKey="technicien"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => value}
              orientation="right"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="retard" fill="#F7AFA7" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Cumul des retards pour les techniciens
        </div>
      </CardFooter>
    </Card>
  );
};

export default DelayedPrentiveByTechnicienChart;
