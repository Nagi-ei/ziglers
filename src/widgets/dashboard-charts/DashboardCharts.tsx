"use client";

import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/shadcn/Chart";
import { useChartData } from "./model";

const progressChartConfig = {
  progress: { label: "Progress", color: "var(--chart-1)" },
} satisfies ChartConfig;

const statusChartConfig = {
  completed: { label: "Completed", color: "var(--chart-1)" },
  inProgress: { label: "In Progress", color: "var(--chart-2)" },
  pending: { label: "Pending", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function DashboardCharts() {
  const { progressData, statusData } = useChartData();

  return (
    <section>
      <h2 className="relative mb-10 inline-block font-bold text-xl">
        <span className="relative z-10">Your Progress Journey</span>
        <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 bg-primary/20" />
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="group relative transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1">
          <DecoTape className="absolute -top-3 left-1/2 z-10 origin-right -translate-x-1/2 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-x-0 group-hover:opacity-0" />
          <Card className="border-2 border-primary/10 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={progressChartConfig} className="min-h-[200px]">
                <AreaChart accessibilityLayer data={progressData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="progress"
                    type="natural"
                    fill="var(--color-progress)"
                    fillOpacity={0.4}
                    stroke="var(--color-progress)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="group relative transition-transform duration-300 hover:-translate-y-2 hover:rotate-1">
          <DecoTape className="absolute -top-3 left-1/2 z-10 origin-right -translate-x-1/2 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-x-0 group-hover:opacity-0" />
          <Card className="border-2 border-primary/10 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
            <CardHeader className="flex justify-between">
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>2025 Goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={statusChartConfig} className="min-h-[200px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={60}
                    strokeWidth={5}
                  />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="status" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
