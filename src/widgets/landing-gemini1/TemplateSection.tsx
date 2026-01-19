import {
  BookOpen01Icon,
  Briefcase01Icon,
  DollarCircleIcon,
  HeartCheckIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function TemplateSection() {
  const templates: {
    category: string;
    title: string;
    icon: IconSvgElement;
    items: string[];
  }[] = [
    {
      category: "Career",
      title: "Startup Launch",
      icon: Briefcase01Icon,
      items: ["Product Dev", "Marketing", "Funding", "Hiring"],
    },
    {
      category: "Health",
      title: "Marathon Training",
      icon: HeartCheckIcon,
      items: ["Nutrition", "Endurance", "Recovery", "Gear"],
    },
    {
      category: "Finance",
      title: "Financial Freedom",
      icon: DollarCircleIcon,
      items: ["Investments", "Savings", "Budgeting", "Side Hustle"],
    },
    {
      category: "Learning",
      title: "Learn New Language",
      icon: BookOpen01Icon,
      items: ["Vocabulary", "Grammar", "Speaking", "Immersion"],
    },
  ];

  return (
    <section id="templates" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 inline-block border border-primary/20 px-4 py-1.5 font-bold text-primary text-xs uppercase tracking-widest">
            Start Fast
          </span>
          <h2 className="mb-4 font-bold text-3xl text-foreground tracking-tight sm:text-4xl lg:text-5xl">
            Proven Templates
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Don&apos;t start from a blank canvas. Choose a framework designed by experts to
            accelerate your planning process.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.title}
              className="group flex flex-col justify-between border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary"
            >
              <div>
                <div className="mb-6 inline-flex size-10 items-center justify-center border border-border bg-background transition-colors group-hover:border-primary group-hover:text-primary">
                  <HugeiconsIcon icon={template.icon} className="size-5" />
                </div>

                <div className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  {template.category}
                </div>

                <h3 className="mb-4 font-bold text-foreground text-xl">{template.title}</h3>

                <ul className="mb-6 space-y-2">
                  {template.items.map((item) => (
                    <li key={item} className="flex items-center text-muted-foreground text-sm">
                      <span className="mr-2 size-1 bg-primary/40 group-hover:bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-between border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground group-hover:border-primary"
              >
                Use Template
                <span className="text-lg leading-none">+</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
