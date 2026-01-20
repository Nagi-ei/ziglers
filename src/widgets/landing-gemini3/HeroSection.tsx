import {
  ArrowRight01Icon,
  Building01Icon,
  Layers01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-primary border-b-2 bg-background">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="mx-auto grid max-w-7xl xl:grid-cols-2">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-20 lg:px-8 xl:border-primary xl:border-r-2 xl:px-12 xl:py-32">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex items-center gap-2 border border-primary px-2 py-1 font-bold font-mono text-primary text-xs uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75"></span>
                <span className="relative inline-flex size-2 bg-primary"></span>
              </span>
              Site_Active
            </div>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>

          <h1 className="mb-6 font-black font-mono text-5xl text-foreground uppercase leading-none tracking-tighter sm:text-6xl lg:text-7xl">
            Architect <br />
            Your <span className="bg-primary px-2 text-background">Ambition</span>
          </h1>

          <p className="mb-10 max-w-md border-primary border-l-4 pl-6 font-medium text-lg text-muted-foreground leading-relaxed">
            Chaos is unstable ground. Structure is strength. Decompose your central ambition into 64
            executable building blocks with the Mandalart framework.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="accent"
              size="lg"
              className="h-14 border-2 border-transparent px-8 font-bold font-mono text-base uppercase tracking-wide hover:border-foreground hover:bg-background hover:text-foreground"
            >
              <HugeiconsIcon icon={Building01Icon} className="mr-2 size-5" />
              Lay_Foundation
            </Button>
            <Button
              variant="default"
              size="lg"
              className="h-14 border-2 border-primary bg-transparent px-8 font-bold font-mono text-base text-primary uppercase tracking-wide hover:bg-primary hover:text-background"
            >
              View_Blueprint
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-8 border-primary/20 border-t pt-8 font-bold font-mono text-muted-foreground text-xs uppercase">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Settings01Icon} className="size-4 text-primary" />
              <span>Structure_First</span>
            </div>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Layers01Icon} className="size-4 text-primary" />
              <span>Layer_By_Layer</span>
            </div>
          </div>
        </div>

        {/* Right Visual - Schematic Blueprint */}
        <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-primary/5 p-8 xl:p-16">
          <div className="relative aspect-square w-full max-w-md">
            {/* Blueprint Grid Lines */}
            <div className="pointer-events-none absolute inset-0 z-0 border-2 border-primary/30">
              {/* Corner Markers */}
              <div className="absolute -top-1 -left-1 size-4 border-primary border-t-2 border-l-2"></div>
              <div className="absolute -top-1 -right-1 size-4 border-primary border-t-2 border-r-2"></div>
              <div className="absolute -bottom-1 -left-1 size-4 border-primary border-b-2 border-l-2"></div>
              <div className="absolute -right-1 -bottom-1 size-4 border-primary border-r-2 border-b-2"></div>
            </div>

            <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3 gap-4 p-4 sm:p-8">
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                08
              </div>
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                01
              </div>
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                02
              </div>

              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                07
              </div>
              <div className="relative flex items-center justify-center border-4 border-primary bg-background shadow-[4px_4px_0px_0px_var(--color-primary)] sm:shadow-[8px_8px_0px_0px_var(--color-primary)]">
                <span className="text-center font-black font-mono text-primary text-sm uppercase leading-tight sm:text-lg">
                  CORE
                  <br />
                  GOAL
                </span>
              </div>
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                03
              </div>

              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                06
              </div>
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                05
              </div>
              <div className="flex items-center justify-center border-2 border-primary bg-background font-bold font-mono text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-background">
                04
              </div>
            </div>

            {/* Decor text */}
            <div className="absolute bottom-2 left-4 font-mono text-[10px] text-primary/60">
              FIG. 1.0 // ARCHITECTURE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
