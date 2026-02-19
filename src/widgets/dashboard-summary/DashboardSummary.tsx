import {
  ChartHistogramIcon,
  CheckmarkCircle02Icon,
  GridViewIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";
import { getSummaryStats } from "./model";

export const DashboardSummary = () => {
  const { data } = getSummaryStats();

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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`group relative transition-transform duration-300 ${index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"} hover:-translate-y-2`}
        >
          <DecoTape className="absolute -top-3 left-1/2 z-10 origin-right -translate-x-1/2 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-x-0 group-hover:opacity-0" />
          <Card className="border-2 border-primary/10 bg-card shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
              <Icon icon={stat.icon} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{stat.value}</div>
              <p className="text-muted-foreground text-xs">{stat.change}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
