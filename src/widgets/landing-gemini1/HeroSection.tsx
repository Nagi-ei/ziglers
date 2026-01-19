import {
  ArrowRight01Icon,
  Award01Icon,
  Target02Icon,
  WorkoutRunIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function HeroSection() {
  const outerCells = Array.from({ length: 9 }, (_, i) => ({
    id: `outer-${i}`,
    isCenter: i === 4,
    index: i,
  }));

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="flex flex-col justify-center text-left">
          <div className="mb-6 inline-flex w-fit items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-wider">
            <span className="size-2 bg-primary"></span>
            Systematic Goal Achievement
          </div>

          <h1 className="mb-6 font-extrabold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
            Turn Ambition Into <br className="hidden lg:block" />
            <span className="text-primary underline decoration-4 decoration-primary/30 underline-offset-8">
              Actionable Logic
            </span>
          </h1>

          <p className="mb-8 max-w-lg text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Stop dreaming vaguely. Start planning strictly. The Mandalart method breaks your central
            goal into 64 concrete, undeniable steps.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="accent"
              size="lg"
              className="h-14 px-8 text-base shadow-lg shadow-primary/20"
            >
              Start Planning Now
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
            <Button
              variant="default"
              size="lg"
              className="h-14 border-primary/20 px-8 text-base hover:bg-primary/5"
            >
              View Examples
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Target02Icon} className="size-4 text-primary" />
              <span>Define Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={WorkoutRunIcon} className="size-4 text-primary" />
              <span>Break Down</span>
            </div>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Award01Icon} className="size-4 text-primary" />
              <span>Achieve</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-md border border-border bg-card p-1 shadow-2xl shadow-primary/10">
            <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px bg-border">
              {outerCells.map((cell) => {
                const innerCells = Array.from({ length: 9 }, (_, k) => ({
                  id: `inner-${cell.index}-${k}`,
                  index: k,
                }));
                return (
                  <div
                    key={cell.id}
                    className={`relative flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-primary/5 ${cell.isCenter ? "z-10 scale-102 bg-primary p-2 text-primary-foreground shadow-xl ring-4 ring-background" : "bg-background"}
                    `}
                  >
                    {cell.isCenter ? (
                      <>
                        <span className="mb-1 text-[10px] uppercase tracking-widest opacity-80">
                          Core Goal
                        </span>
                        <span className="font-bold text-sm leading-tight sm:text-lg">
                          Launch Business
                        </span>
                      </>
                    ) : (
                      <div className="grid h-full w-full grid-cols-3 gap-0.5 p-1 opacity-40">
                        {innerCells.map((inner) => (
                          <div
                            key={inner.id}
                            className={`bg-current ${inner.index === 4 ? "bg-primary" : "bg-muted-foreground/30"}`}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="absolute -right-6 -bottom-6 -z-10 h-full w-full border border-primary/10 bg-primary/5"></div>
            <div className="absolute -top-6 -left-6 -z-10 h-full w-full border border-primary/20 border-dashed"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
