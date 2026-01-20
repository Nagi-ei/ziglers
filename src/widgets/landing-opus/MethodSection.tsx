import { GridViewIcon, LayoutGridIcon, TaskDaily01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";

const STEPS = [
  {
    step: "01",
    icon: LayoutGridIcon,
    title: "Define Core Goal",
    description:
      "Lay the foundation. Choose one central ambition that will anchor your entire structure.",
  },
  {
    step: "02",
    icon: GridViewIcon,
    title: "Expand Structure",
    description: "Build the walls. Surround your core goal with 8 supporting pillars or sub-goals.",
  },
  {
    step: "03",
    icon: TaskDaily01Icon,
    title: "Stack Actions",
    description:
      "Detail the bricks. Break each pillar into 8 actionable tasks—64 steps to the top.",
  },
];

export function MethodSection() {
  return (
    <section id="method" className="w-full border-border border-y bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-black text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
            The Construction Method
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            A proven architectural blueprint for success. Build your dreams one calculated brick at
            a time.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute top-12 left-0 -z-10 hidden h-0.5 w-full bg-border md:block" />

          {STEPS.map((step, index) => (
            <div
              key={step.step}
              className={`flex flex-col ${index === 1 ? "md:mt-12" : index === 2 ? "md:mt-24" : ""}`}
            >
              <Card className="h-full rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--color-brand-primary)]">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex size-14 items-center justify-center border-2 border-foreground bg-primary font-bold text-primary-foreground text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {step.step}
                    </div>
                    <HugeiconsIcon icon={step.icon} className="size-10 text-muted-foreground/50" />
                  </div>
                  <CardTitle className="font-bold text-xl uppercase tracking-wide">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
