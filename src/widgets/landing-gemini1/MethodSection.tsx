import { ArrowRight01Icon, GridIcon, RouteIcon, Target02Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";

export function MethodSection() {
  const steps: {
    icon: IconSvgElement;
    number: string;
    title: string;
    description: string;
  }[] = [
    {
      icon: Target02Icon,
      number: "01",
      title: "Define Core Goal",
      description:
        "Place your main objective in the center. This is your north star—the single focus that drives all subsequent actions.",
    },
    {
      icon: GridIcon,
      number: "02",
      title: "Expand Logic",
      description:
        "Surround your core goal with 8 sub-goals. Break the abstract into the concrete areas of life or business.",
    },
    {
      icon: RouteIcon,
      number: "03",
      title: "Execute Tasks",
      description:
        "Each sub-goal explodes into 8 actionable tasks. You now have 64 specific steps to take you from dream to reality.",
    },
  ];

  return (
    <section id="method" className="w-full border-border border-y bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mb-6 font-bold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
              The Power of <br />
              <span className="text-primary">Geometric Thinking</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mandalart isn&apos;t just a list. It&apos;s a map. By visualizing the relationship
              between the whole and the parts, you eliminate overwhelm and clarity emerges.
            </p>
          </div>
          <div className="mx-8 mb-4 hidden h-px flex-1 bg-border md:block"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col border border-border bg-background p-8 transition-all hover:border-primary hover:shadow-primary/5 hover:shadow-xl"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex size-12 items-center justify-center bg-secondary text-primary-foreground transition-colors group-hover:bg-primary">
                  <HugeiconsIcon icon={step.icon} className="size-6" />
                </div>
                <span className="font-black text-6xl text-muted/20 transition-colors group-hover:text-primary/10">
                  {step.number}
                </span>
              </div>

              <h3 className="mb-4 font-bold text-foreground text-xl transition-colors group-hover:text-primary">
                {step.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">{step.description}</p>

              <div className="mt-8 flex -translate-x-2 items-center font-semibold text-primary text-sm opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                Learn more <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
