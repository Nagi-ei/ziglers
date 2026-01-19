import {
  ArrowRight01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Coins01Icon,
  HealthIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function TemplateSection() {
  const templates = [
    {
      id: "career",
      title: "Career Growth",
      description: "Promotion, pivot, or startup launch.",
      icon: Briefcase01Icon,
    },
    {
      id: "health",
      title: "Physical Health",
      description: "Marathon, muscle gain, or wellness.",
      icon: HealthIcon,
    },
    {
      id: "finance",
      title: "Wealth Building",
      description: "Investing, saving, and debt clearing.",
      icon: Coins01Icon,
    },
    {
      id: "learning",
      title: "Skill Acquisition",
      description: "Language, coding, or public speaking.",
      icon: BookOpen01Icon,
    },
  ];

  return (
    <section id="templates" className="border-border border-t bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block font-mono text-primary text-xs uppercase tracking-widest">
              Start Fast
            </span>
            <h2 className="font-black text-4xl text-foreground uppercase tracking-tight sm:text-5xl">
              Curated{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px var(--foreground)" }}
              >
                Paths
              </span>
            </h2>
          </div>
          <Link
            href="/templates"
            className="group flex items-center gap-2 border-primary border-b-2 pb-1 font-bold text-foreground uppercase tracking-wider transition-colors hover:text-primary"
          >
            View All Templates
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-5 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative flex aspect-square flex-col justify-between bg-background p-8 transition-colors hover:bg-foreground hover:text-background"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs opacity-50">
                  0{templates.indexOf(template) + 1}
                </span>
                <HugeiconsIcon
                  icon={template.icon}
                  className="size-10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:text-background"
                />
              </div>

              <div>
                <h3 className="mb-2 font-bold text-xl uppercase tracking-wide">{template.title}</h3>
                <p className="text-sm opacity-70 group-hover:opacity-90">{template.description}</p>
              </div>

              <div className="pointer-events-none absolute inset-0 border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
