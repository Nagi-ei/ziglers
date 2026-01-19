import { ArrowRight01Icon, GridIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      {/* Background decoration - subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#8c3027 1px, transparent 1px), linear-gradient(90deg, #8c3027 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit -rotate-1 items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-primary text-sm shadow-[2px_2px_0px_0px_rgba(140,48,39,0.1)]">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium">The 9x9 Goal Setting Method</span>
          </div>

          <h1 className="mb-6 font-bold text-5xl text-foreground leading-[1.1] tracking-tight sm:text-6xl">
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

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="h-14 rounded-none border-2 border-primary bg-primary px-8 text-lg text-primary-foreground shadow-[4px_4px_0px_0px_rgba(45,45,45,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,0.2)]"
            >
              Start Planning
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-14 rounded-none border-2 border-primary/30 bg-transparent px-8 text-foreground text-lg hover:bg-primary/5 hover:text-primary"
            >
              <HugeiconsIcon icon={GridIcon} className="mr-2 size-5" />
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
            <p>Join 10,000+ planners organizing their lives.</p>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square rotate-1 border-2 border-primary/10 bg-[#f7f5f2] p-4 shadow-[8px_8px_0px_0px_rgba(140,48,39,0.15)]">
            {/* Decorative tape */}
            <div className="absolute -top-3 left-1/2 h-8 w-32 -translate-x-1/2 rotate-[-2deg] bg-primary/20 opacity-60 backdrop-blur-[1px]" />

            <div className="grid h-full w-full grid-cols-3 gap-2 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center border text-center text-[10px] transition-colors hover:bg-primary/5 sm:text-xs ${
                    i === 4
                      ? "border-primary bg-primary/10 font-bold text-primary shadow-[inset_0_0_10px_rgba(140,48,39,0.1)]"
                      : "border-primary/20 bg-white text-muted-foreground"
                  }`}
                >
                  {i === 4 ? "CORE GOAL" : `Sub-goal ${i + 1}`}
                </div>
              ))}
            </div>

            {/* Hand-drawn annotation */}
            <div className="absolute -right-8 -bottom-6 hidden rotate-[-5deg] md:block">
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-primary text-sm">Start here!</span>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary"
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
