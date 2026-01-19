import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section className="w-full bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="mb-4 font-bold text-2xl text-primary-foreground sm:text-3xl lg:text-4xl">
          Start Your Journey Today
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80 text-sm sm:text-base">
          Join thousands of goal-setters who are turning their dreams into actionable plans with
          Zieglers.
        </p>
        <Button
          size="lg"
          className="px-8 font-semibold text-sm dark:bg-brand-bg-darker dark:text-brand-fg dark:hover:bg-brand-bg"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  );
}
