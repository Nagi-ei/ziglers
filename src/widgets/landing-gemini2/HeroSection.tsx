import { ArrowRight01Icon, GridIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

const GRID_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-border border-b bg-background">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-center border-border px-6 py-20 lg:col-span-7 lg:border-r lg:px-12">
          <div className="mb-8 flex items-center gap-2 font-mono text-primary text-sm uppercase tracking-widest">
            <HugeiconsIcon icon={GridIcon} className="size-4" />
            <span>Mandalart Methodology v2.0</span>
          </div>

          <h1 className="mb-8 font-black text-6xl text-foreground uppercase leading-[0.9] tracking-tighter sm:text-8xl lg:text-9xl">
            Clarity
            <br />
            Through
            <br />
            <span className="text-primary">Division</span>
          </h1>

          <p className="mb-10 max-w-lg border-primary border-l-4 pl-6 font-medium text-muted-foreground text-xl leading-relaxed">
            Complexity kills ambition. The Mandalart method forces you to break one big goal into 64
            actionable steps.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="default"
              size="lg"
              className="h-16 rounded-none bg-foreground px-10 font-bold text-background text-lg uppercase tracking-wider transition-all hover:bg-primary hover:text-white dark:text-foreground"
            >
              Start Planning
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-16 rounded-none border-2 border-foreground px-10 font-bold text-lg uppercase tracking-wider transition-all hover:bg-foreground hover:text-background"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center border-border border-t bg-card p-8 lg:col-span-5 lg:border-t-0">
          <div className="grid aspect-square w-full max-w-md grid-cols-3 gap-2">
            {GRID_INDEXES.map((i) => (
              <div
                key={`outer-${i}`}
                className={`relative border-2 border-foreground/10 transition-all duration-500 hover:border-primary ${i === 4 ? "border-primary bg-primary" : "bg-background"}
                  `}
              >
                <div className="absolute inset-0 grid grid-cols-3 gap-px opacity-20">
                  {GRID_INDEXES.map((j) => (
                    <div key={`inner-${i}-${j}`} className="bg-foreground/20" />
                  ))}
                </div>
                {i === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white">
                    GOAL
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute right-8 bottom-8 select-none font-black text-9xl text-foreground/5">
            64
          </div>
        </div>
      </div>
    </section>
  );
}
