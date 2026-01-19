import { Button } from "@/shared/ui/shadcn/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/Card";

const TEMPLATES = [
  {
    icon: "💼",
    title: "Career Growth",
    description: "Plan your professional development and climb the career ladder.",
  },
  {
    icon: "💪",
    title: "Health & Fitness",
    description: "Build sustainable habits for physical and mental wellness.",
  },
  {
    icon: "📚",
    title: "Learning Goals",
    description: "Master new skills and expand your knowledge systematically.",
  },
  {
    icon: "🎯",
    title: "Habit Building",
    description: "Create lasting positive habits that stick.",
  },
];

export function TemplateSection() {
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-2xl text-foreground sm:text-3xl lg:text-4xl">
            Ready-to-Use Templates
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base">
            Get started quickly with our curated templates for common goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <Card
              key={template.title}
              className="cursor-pointer border-none transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <span className="mb-2 text-3xl">{template.icon}</span>
                <CardTitle className="text-base">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="default" size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
}
