import { DashboardBoards } from "@/widgets/dashboard-boards/DashboardBoards";
import { DashboardCharts } from "@/widgets/dashboard-charts/DashboardCharts";
import { DashboardSummary } from "@/widgets/dashboard-summary/DashboardSummary";

export default function Dashboard2Page() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-8">
      <div className="sticky top-0 z-10 border-b bg-background pb-4">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>
      <DashboardSummary />
      <DashboardCharts />
      <DashboardBoards />
    </main>
  );
}
