import {
  Activity01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Brain01Icon,
  Briefcase01Icon,
  CheckListIcon,
  Coins01Icon,
  PaintBoardIcon,
  Target02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

const GRID_ITEMS = [
  { label: "Career", icon: Briefcase01Icon },
  { label: "Health", icon: Activity01Icon },
  { label: "Learning", icon: BookOpen01Icon },
  { label: "Finance", icon: Coins01Icon },
  { label: "Your Goals", icon: Target02Icon, isCenter: true },
  { label: "Habits", icon: CheckListIcon },
  { label: "Relations", icon: UserGroupIcon },
  { label: "Creative", icon: PaintBoardIcon },
  { label: "Mindset", icon: Brain01Icon },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-4 py-16 lg:py-24">
        <div className="grid grid-cols-3 gap-4 p-4 sm:gap-6">
          {GRID_ITEMS.map((item, index) => (
            <div
              key={item.label}
              className={`group relative flex size-28 flex-col items-center justify-center border-2 border-foreground transition-all duration-300 ease-out sm:size-32 lg:size-40 ${
                item.isCenter
                  ? "bg-primary text-primary-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                  : "bg-card text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--color-brand-primary)]"
              }
              `}
            >
              {item.isCenter ? (
                <div className="z-10 flex flex-col items-center gap-2 text-center">
                  <span className="font-bold text-sm uppercase tracking-widest">Target</span>
                  <span className="font-black text-4xl leading-none sm:text-5xl lg:text-6xl">
                    64
                  </span>
                  <span className="font-bold text-xs">Steps</span>
                </div>
              ) : (
                <>
                  <HugeiconsIcon
                    icon={item.icon}
                    className="mb-3 size-8 transition-transform duration-300 group-hover:scale-110 sm:size-10 lg:size-12"
                  />
                  <span className="font-bold text-xs uppercase tracking-wide sm:text-sm">
                    {item.label}
                  </span>
                </>
              )}

              {!item.isCenter && (
                <>
                  <div className="absolute top-1 left-1 size-1 bg-foreground/10" />
                  <div className="absolute right-1 bottom-1 size-1 bg-foreground/10" />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex max-w-3xl flex-col items-center gap-8 text-center">
          <h1 className="font-black text-4xl text-foreground leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Build Your <br />
            <span className="relative mt-2 inline-block -skew-x-6 transform bg-foreground px-4 py-1 text-background">
              Success Stack
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Don&apos;t just set goals. Construct them. <br />
            Break big dreams into 64 solid, stackable bricks of action.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="accent"
              className="h-14 rounded-none border-2 border-foreground px-8 font-bold text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-white/20"
            >
              Start Building
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
            <Button
              variant="default"
              size="lg"
              className="h-14 rounded-none border-2 border-foreground bg-transparent px-8 font-bold text-base transition-colors hover:bg-foreground hover:text-background"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
