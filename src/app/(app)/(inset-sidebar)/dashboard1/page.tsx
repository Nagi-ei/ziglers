import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";
import { DashboardBoards } from "@/widgets/dashboard-boards/DashboardBoards";
import { DashboardCharts } from "@/widgets/dashboard-charts/DashboardCharts";
import { DashboardSummary } from "@/widgets/dashboard-summary/DashboardSummary";

export default function Dashboard1Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <GridPatternBackground />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl space-y-12 px-4 py-8 md:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="relative inline-block rotate-[-1deg] border-2 border-primary/10 bg-background px-8 py-6 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
            <DecoTape className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <h1 className="font-bold text-3xl text-foreground tracking-tight md:text-4xl">
              Constructing Your Vision
            </h1>
            <p className="mt-2 font-medium text-muted-foreground">
              "Great things are done by a series of small things brought together."
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <DashboardSummary />
          <DashboardCharts />
          <DashboardBoards />
        </div>
      </div>
    </main>
  );
}
