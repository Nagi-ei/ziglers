import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full flex-1 flex-col">
      <GridPatternBackground />

      <div className="sticky top-0 z-100 border-b bg-background px-8 py-4">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-12 px-4 py-8 md:px-8">
        {/* <div className="relative mx-auto max-w-2xl text-center">
          <div className="relative inline-block -rotate-1 border-2 border-primary/10 bg-background px-8 py-6 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
            <DecoTape className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <h1 className="font-bold text-3xl text-foreground tracking-tight md:text-4xl">
              Constructing Your Vision
            </h1>
            <p className="mt-2 font-medium text-muted-foreground">
              &quot;Great things are done by a series of small things brought together.&quot;
            </p>
          </div>
        </div> */}

        {children}
      </div>
    </div>
  );
}
