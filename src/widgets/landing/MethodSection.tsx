import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";

const STEPS = [
  {
    step: "01",
    title: "Define Your Core Goal",
    description:
      "Start with one central goal that you want to achieve. This becomes the heart of your Mandalart.",
  },
  {
    step: "02",
    title: "Break Into 8 Sub-Goals",
    description:
      "Surround your main goal with 8 related objectives that support your central vision.",
  },
  {
    step: "03",
    title: "Create 81 Action Items",
    description:
      "Each sub-goal expands into 8 specific tasks, giving you 81 actionable steps to success.",
  },
];

export function MethodSection() {
  return (
    <section className="w-full bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-2xl text-foreground sm:text-3xl lg:text-4xl">
            The Mandalart Method
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base">
            A proven goal-setting technique used by world-class achievers to turn ambitions into
            reality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <Card key={step.step} className="border-none">
              <CardHeader>
                <div className="mb-2 inline-flex size-12 items-center justify-center bg-primary font-bold text-lg text-primary-foreground">
                  {step.step}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
