import { DashboardBoards } from "@/widgets/dashboard-boards/DashboardBoards";
import { DashboardCharts } from "@/widgets/dashboard-charts/DashboardCharts";
import { DashboardSummary } from "@/widgets/dashboard-summary/DashboardSummary";

export default function Dashboard1Page() {
  return (
    <div className="space-y-12">
      <DashboardSummary />
      <DashboardCharts />
      <DashboardBoards />
    </div>
  );
}
