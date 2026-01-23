import { DashboardBoards } from "@/widgets/dashboard-boards/DashboardBoards";
import { DashboardCharts } from "@/widgets/dashboard-charts/DashboardCharts";
import { DashboardSummary } from "@/widgets/dashboard-summary/DashboardSummary";

export default function Dashboard1Page() {
  return (
    <main className="container space-y-8 py-8">
      <div>
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="text-muted-foreground">Inset Sidebar + 각진 모서리 레이아웃</p>
      </div>
      <DashboardSummary />
      <DashboardCharts />
      <DashboardBoards />
    </main>
  );
}
