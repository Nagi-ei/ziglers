import { DashboardBoards } from "@/widgets/dashboard-boards/DashboardBoards";
import { DashboardCharts } from "@/widgets/dashboard-charts/DashboardCharts";
import { DashboardSummary } from "@/widgets/dashboard-summary/DashboardSummary";

export default function Dashboard1Page() {
  return (
    <div className="space-y-16 px-4 py-8 md:px-8">
      <DashboardSummary />
      <DashboardCharts />
      <DashboardBoards />
    </div>
  );
}
