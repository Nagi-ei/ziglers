import { Button } from "@/shared/ui/shadcn/Button";

const GRID_ITEMS = [
  { label: "Career", icon: "💼" },
  { label: "Health", icon: "💪" },
  { label: "Learning", icon: "📚" },
  { label: "Finance", icon: "💰" },
  { label: "Your Goals", icon: "", isCenter: true },
  { label: "Habits", icon: "🎯" },
  { label: "Relations", icon: "❤️" },
  { label: "Creative", icon: "🎨" },
  { label: "Mindset", icon: "🧠" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-4 py-16 lg:py-24">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {GRID_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex size-24 flex-col items-center justify-center border sm:size-28 lg:size-36 ${
                item.isCenter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
              } transition-colors`}
            >
              {item.isCenter ? (
                <div className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className="font-bold text-xs sm:text-sm lg:text-base">Your Goals</span>
                  <span className="font-bold text-lg sm:text-xl lg:text-2xl">64 Steps</span>
                </div>
              ) : (
                <>
                  <span className="text-xl sm:text-2xl lg:text-3xl">{item.icon}</span>
                  <span className="mt-1 font-medium text-xs sm:text-sm">{item.label}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-2xl font-bold text-3xl text-foreground sm:text-4xl lg:text-5xl">
            Transform One Goal Into{" "}
            <span className="underline decoration-4 decoration-primary underline-offset-4">
              64 Actionable Steps
            </span>
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base lg:text-lg">
            The Mandalart method helps you break down your biggest dreams into achievable daily
            actions. Start planning your success today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent" size="lg" className="px-6 font-semibold text-sm">
              Get Started Free
            </Button>
            <Button variant="default" size="lg" className="px-6 font-semibold text-sm">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
