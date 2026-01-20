import {
  BookOpen01Icon,
  Briefcase01Icon,
  Coins01Icon,
  WorkoutRunIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function TemplateSection() {
  const templates = [
    { name: "Career_Blueprint", icon: Briefcase01Icon, color: "bg-blue-500" },
    { name: "Health_Foundation", icon: WorkoutRunIcon, color: "bg-red-500" },
    { name: "Finance_Structure", icon: Coins01Icon, color: "bg-green-500" },
    { name: "Skill_Architecture", icon: BookOpen01Icon, color: "bg-yellow-500" },
  ];

  return (
    <section id="templates" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-black font-mono text-3xl text-foreground uppercase tracking-tight md:text-5xl">
            Ready-Made Blueprints
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-muted-foreground text-sm">
            Select a blueprint to start building.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border-2 border-primary/10 bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="group relative flex aspect-square flex-col items-center justify-center bg-background p-8 transition-colors hover:bg-primary/5"
            >
              <div className="mb-6 flex size-20 items-center justify-center border-2 border-primary/20 bg-card transition-all group-hover:scale-110 group-hover:border-primary group-hover:bg-background group-hover:shadow-[4px_4px_0px_0px_var(--color-primary)]">
                <HugeiconsIcon icon={template.icon} className="size-8 text-primary" />
              </div>

              <h3 className="font-bold font-mono text-base text-foreground uppercase tracking-widest">
                {template.name}
              </h3>

              <button
                type="button"
                className="mt-4 font-bold text-primary text-xs uppercase opacity-0 transition-opacity group-hover:opacity-100"
              >
                [ Start_Build ]
              </button>

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 size-2 border-primary/30 border-t border-l opacity-0 group-hover:opacity-100"></div>
              <div className="absolute top-2 right-2 size-2 border-primary/30 border-t border-r opacity-0 group-hover:opacity-100"></div>
              <div className="absolute bottom-2 left-2 size-2 border-primary/30 border-b border-l opacity-0 group-hover:opacity-100"></div>
              <div className="absolute right-2 bottom-2 size-2 border-primary/30 border-r border-b opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
