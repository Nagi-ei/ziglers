import {
  ArrowRight01Icon,
  CheckListIcon,
  GridViewIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";

const STEPS = [
  {
    title: "Define Your Core Goal",
    description: "Place your main ambition in the center of the 9x9 grid. This is your north star.",
    icon: Target02Icon,
    rotate: "rotate-[-1deg]",
  },
  {
    title: "Break Into 8 Sub-goals",
    description:
      "Identify 8 key areas or pillars needed to achieve that core goal around the center.",
    icon: GridViewIcon,
    rotate: "rotate-[1deg]",
  },
  {
    title: "Expand Each Sub-goal",
    description:
      "Break down each sub-goal into 8 specific, actionable tasks. That's 64 steps to success.",
    icon: CheckListIcon,
    rotate: "rotate-[-2deg]",
  },
] as const;

export function MethodSection() {
  return (
    <section id="method" className="relative overflow-hidden bg-card px-4 py-20 sm:px-6 lg:px-8">
      <GridPatternBackground />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="relative inline-block font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            <span className="relative z-10">How Mandalart Works</span>
            <span className="absolute -bottom-2 left-0 h-3 w-full -rotate-1 bg-primary/20" />
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple process to turn vague dreams into concrete plans.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="group relative">
              {index < STEPS.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 md:block">
                  <Icon icon={ArrowRight01Icon} className="size-8 text-primary/40" />
                </div>
              )}

              <div
                className={`relative h-full border-2 border-primary/10 bg-background p-6 transition-transform duration-300 hover:z-10 hover:-translate-y-2 ${step.rotate} shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]`}
              >
                <DecoTape className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-1" />

                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-none border-2 border-primary/20 bg-card shadow-[2px_2px_0px_0px_rgba(45,45,45,0.1)]">
                  <Icon icon={step.icon} className="size-6 text-primary" />
                </div>

                <h3 className="mb-3 font-bold text-foreground text-xl">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                <div className="absolute -right-2 -bottom-2 font-bold font-handwriting text-4xl text-primary/5">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
