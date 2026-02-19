import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full w-full flex-1 flex-col">
      <GridPatternBackground />

      <div className="z-100 border-b bg-background px-8 py-4">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>

      {children}
    </div>
  );
}
