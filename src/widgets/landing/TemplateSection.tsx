import {
  Activity01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

const TEMPLATES = [
  {
    title: "Career Growth",
    description: "Map out your professional journey, skills, and networking goals.",
    icon: Briefcase01Icon,
    rotate: "rotate-1",
  },
  {
    title: "Health & Fitness",
    description: "Balance diet, exercise, sleep, and mental well-being.",
    icon: Activity01Icon,
    rotate: "rotate-[-1deg]",
  },
  {
    title: "Learning & Skills",
    description: "Structure your study path for languages, coding, or arts.",
    icon: BookOpen01Icon,
    rotate: "rotate-2",
  },
  {
    title: "Relationships",
    description: "Strengthen bonds with family, friends, and community.",
    icon: UserGroupIcon,
    rotate: "rotate-[-2deg]",
  },
] as const;

export function TemplateSection() {
  return (
    <section id="templates" className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              Ready-made Templates
            </h2>
            <p className="mt-2 text-muted-foreground">
              Don&apos;t start from scratch. Pick a theme.
            </p>
          </div>
          <Button
            variant="default"
            className="border-2 border-primary/30 bg-transparent shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            See All Templates
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.title}
              className={`group relative flex h-full flex-col justify-between border-2 border-primary/10 bg-card p-6 transition-transform duration-300 hover:z-10 hover:-translate-y-2 ${template.rotate} shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]`}
            >
              <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]" />

              <div>
                <div className="mb-4 inline-flex size-10 items-center justify-center border border-primary/10 bg-card dark:bg-background">
                  <Icon icon={template.icon} className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-foreground text-lg">{template.title}</h3>
                <p className="mb-6 text-muted-foreground text-sm">{template.description}</p>
              </div>

              <div className="mt-auto border-primary/20 border-t border-dashed pt-4">
                <button
                  type="button"
                  className="flex items-center font-medium text-primary text-sm transition-colors hover:underline"
                >
                  Use Template
                  <Icon icon={ArrowRight01Icon} className="ml-1 size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
