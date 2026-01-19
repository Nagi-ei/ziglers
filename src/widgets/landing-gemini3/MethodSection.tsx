import {
  ArrowRight02Icon,
  Rocket01Icon,
  Structure03Icon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function MethodSection() {
  const steps = [
    {
      icon: Target02Icon,
      label: "Phase_01",
      title: "Define Core",
      desc: "Identify the singular objective. The nucleus of your operation.",
    },
    {
      icon: Structure03Icon,
      label: "Phase_02",
      title: "Explode Logic",
      desc: "Break the core into 8 sub-goals. Break those into 8 tasks. 64 total nodes.",
    },
    {
      icon: Rocket01Icon,
      label: "Phase_03",
      title: "Execute Runtime",
      desc: "Systematic execution of leaf nodes. Small actions, massive compounding.",
    },
  ];

  return (
    <section id="method" className="border-primary border-b-2 bg-card py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 font-bold font-mono text-primary text-sm uppercase tracking-widest">
              // Methodology
            </h2>
            <h3 className="font-black font-mono text-3xl text-foreground uppercase md:text-4xl">
              Operating Procedure
            </h3>
          </div>
          <div className="h-px flex-1 bg-primary/20 md:mx-8 md:mb-4"></div>
          <div className="font-bold font-mono text-muted-foreground text-xs">V 3.0.1</div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col border-2 border-border bg-background p-8 transition-all hover:border-primary hover:shadow-[8px_8px_0px_0px_var(--color-primary)]"
            >
              <div className="mb-6 flex items-start justify-between border-border border-b pb-4 group-hover:border-primary/30">
                <span className="font-black font-mono text-primary text-xs uppercase">
                  {step.label}
                </span>
                <HugeiconsIcon
                  icon={step.icon}
                  className="size-8 text-foreground group-hover:text-primary"
                />
              </div>

              <h4 className="mb-4 font-bold font-mono text-foreground text-xl uppercase">
                {step.title}
              </h4>

              <p className="flex-1 text-muted-foreground text-sm leading-relaxed">{step.desc}</p>

              {idx !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 bg-background p-1 lg:block">
                  <HugeiconsIcon icon={ArrowRight02Icon} className="size-6 text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
