import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-20 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 30px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <h2 className="mb-6 font-black text-3xl text-primary-foreground tracking-tight sm:text-4xl lg:text-6xl">
          Lay Your First Brick Today
        </h2>
        <p className="mx-auto mb-10 max-w-xl font-medium text-lg text-primary-foreground/90 sm:text-xl">
          The tallest towers started with a single block. Join thousands of builders turning their
          dreams into concrete reality.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="h-14 rounded-none border-2 border-primary-foreground px-10 font-bold text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]"
        >
          Start Building Free
          <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
        </Button>
      </div>
    </section>
  );
}
