import { Award01Icon, Target02Icon, WorkoutRunIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function MethodSection() {
  const steps = [
    {
      id: "01",
      title: "Define",
      description:
        "Start with the core. What is the one singular ambition that defines your year? Place it in the center.",
      icon: Target02Icon,
    },
    {
      id: "02",
      title: "Expand",
      description:
        "Break the core into 8 sub-themes. Finance, Health, Career, Relationships. Cover all bases.",
      icon: WorkoutRunIcon,
    },
    {
      id: "03",
      title: "Execute",
      description:
        "Shatter each sub-theme into 8 concrete tasks. You now have 64 actionable steps to success.",
      icon: Award01Icon,
    },
  ];

  return (
    <section id="method" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="sticky top-24 font-black text-5xl text-foreground uppercase tracking-tighter sm:text-6xl">
              The
              <br />
              <span className="text-primary">Process</span>
            </h2>
            <div className="mt-8 h-2 w-24 bg-foreground"></div>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group relative flex flex-col gap-6 border-border border-t-2 pt-12 transition-all hover:border-primary sm:flex-row sm:gap-12"
              >
                <div className="font-black text-6xl text-muted-foreground/20 transition-colors group-hover:text-primary">
                  {step.id}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={step.icon} className="size-6 text-primary" />
                    <h3 className="font-bold text-3xl text-foreground uppercase tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-lg text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
