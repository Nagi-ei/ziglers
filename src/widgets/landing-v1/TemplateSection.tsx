import {
  Activity01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";

const TEMPLATES = [
  {
    icon: Briefcase01Icon,
    title: "Career Construction",
    description: "Lay the groundwork for promotion and professional mastery.",
  },
  {
    icon: Activity01Icon,
    title: "Health Foundation",
    description: "Build a robust body and mind with consistent daily bricks.",
  },
  {
    icon: BookOpen01Icon,
    title: "Knowledge Tower",
    description: "Systematically stack new skills and expand your expertise.",
  },
  {
    icon: Target02Icon,
    title: "Habit Structure",
    description: "Cement positive routines that withstand the test of time.",
  },
];

export function TemplateSection() {
  return (
    <section id="templates" className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-semibold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
            Ready-to-Build Blueprints
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Don&apos;t start from scratch. Use our pre-engineered templates to start building
            immediately.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <Card
              key={template.title}
              className="group cursor-pointer rounded-none border-2 border-foreground bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--color-brand-primary)]"
            >
              <CardHeader className="space-y-4">
                <div className="flex size-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary/10">
                  <HugeiconsIcon
                    icon={template.icon}
                    className="size-6 text-foreground transition-colors group-hover:text-primary"
                  />
                </div>
                <CardTitle className="font-bold text-lg uppercase tracking-wide transition-colors group-hover:text-primary">
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="default"
            size="lg"
            className="h-12 rounded-none border-2 border-foreground px-8 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-white/20"
          >
            View All Blueprints
            <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
