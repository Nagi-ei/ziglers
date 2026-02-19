import {
  Activity01Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  Brain01Icon,
  Briefcase01Icon,
  CheckListIcon,
  Coins01Icon,
  GridIcon,
  PaintBoardIcon,
  Target02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";
import { Button } from "@/shared/ui/shadcn/Button";

const GRID_ITEMS = [
  { label: "Career", icon: Briefcase01Icon },
  { label: "Health", icon: Activity01Icon },
  { label: "Learning", icon: BookOpen01Icon },
  { label: "Finance", icon: Coins01Icon },
  { label: "CORE GOAL", icon: Target02Icon, isCenter: true }, // 가운데 아이콘 안 넣음.
  { label: "Habits", icon: CheckListIcon },
  { label: "Relations", icon: UserGroupIcon },
  { label: "Creative", icon: PaintBoardIcon },
  { label: "Mindset", icon: Brain01Icon },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <GridPatternBackground />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-center max-lg:items-center">
          <div className="mb-6 inline-flex w-fit -rotate-1 items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-primary text-sm shadow-[2px_2px_0px_0px_rgba(140,48,39,0.1)]">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium">The 9x9 Goal Setting Method</span>
          </div>

          <h1 className="mb-6 font-bold text-5xl text-foreground leading-[1.1] tracking-tight max-lg:text-center sm:text-6xl">
            Turn your big dreams into{" "}
            <span className="relative inline-block px-2 text-primary">
              <span className="absolute inset-0 -rotate-1 bg-primary/10" />
              actionable
            </span>{" "}
            steps.
          </h1>

          <p className="mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The Mandalart chart helps you break down vague ambitions into clear, manageable tasks
            using a simple grid system. It&apos;s not just a todo list; it&apos;s a map for your
            future.
          </p>

          <div className="flex flex-wrap gap-4 max-lg:justify-center">
            <Button
              size="lg"
              className="h-14 border-2 border-primary bg-primary px-8 text-lg text-primary-foreground shadow-[4px_4px_0px_0px_rgba(45,45,45,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,0.2)]"
            >
              Start Planning
              <Icon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-14 border-2 border-primary/30 bg-transparent px-8 text-foreground text-lg hover:bg-primary/5 hover:text-primary"
            >
              <Icon icon={GridIcon} className="mr-2 size-5" />
              View Examples
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 font-bold text-primary"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p>Join 1,000+ planners organizing their lives.</p>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="relative mx-auto w-full max-w-md max-lg:mt-8 lg:max-w-none">
          <div className="relative aspect-square rotate-1 border-2 border-primary/10 bg-card p-4 shadow-[8px_8px_0px_0px_rgba(140,48,39,0.15)]">
            <DecoTape className="absolute -top-3 left-1/2 -translate-x-1/2" />

            <div className="grid h-full w-full grid-cols-3 gap-2 p-2">
              {GRID_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`group relative flex items-center justify-center border text-center text-[10px] transition-colors hover:bg-primary/5 sm:text-xs ${
                    item.isCenter
                      ? "border-primary bg-primary/10 font-bold text-primary shadow-[inset_0_0_10px_rgba(140,48,39,0.1)]"
                      : "border-primary/40 bg-card text-muted-foreground"
                  }`}
                >
                  {/* Default State */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-0">
                    {item.isCenter ? (
                      item.label
                    ) : (
                      <Icon icon={item.icon} className="size-5 sm:size-6 lg:size-7" />
                    )}
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 ease-in group-hover:scale-100 group-hover:opacity-100">
                    {item.isCenter ? (
                      <Icon icon={item.icon} className="size-5 sm:size-6 lg:size-7" />
                    ) : (
                      <span className="px-1 font-medium">{item.label}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hand-drawn annotation */}
            <div className="absolute -right-8 -bottom-6 hidden rotate-[-5deg] md:block">
              <div className="flex flex-col items-center">
                <span className="text-primary text-sm">Start here!</span>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <path d="M80 20 Q 20 50 40 10" strokeWidth="2" fill="none" />
                  <path d="M35 15 L 40 10 L 45 15" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
