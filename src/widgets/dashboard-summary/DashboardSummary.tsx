"use client";

import {
  ChartHistogramIcon,
  CheckmarkCircle02Icon,
  GridViewIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";
import { useSummaryStats } from "./model";

export const DashboardSummary = () => {
  const { data } = useSummaryStats();

  const stats = [
    {
      title: "Total Boards",
      value: data.totalBoards,
      change: data.totalBoardsChange,
      icon: GridViewIcon,
    },
    {
      title: "Completed Tasks",
      value: data.completedTasks,
      change: data.completedTasksChange,
      icon: CheckmarkCircle02Icon,
    },
    {
      title: "Active Goals",
      value: data.activeGoals,
      change: data.activeGoalsChange,
      icon: Target02Icon,
    },
    {
      title: "Overall Progress",
      value: `${data.overallProgress}%`,
      change: data.overallProgressChange,
      icon: ChartHistogramIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="rounded-none bg-card shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
            <Icon icon={stat.icon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stat.value}</div>
            <p className="text-muted-foreground text-xs">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
