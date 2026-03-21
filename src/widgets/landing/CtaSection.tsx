import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";
import { NoteSurface } from "@/shared/ui/common/NoteSurface";
import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section id="mobile" className="relative overflow-hidden bg-card px-4 py-24 sm:px-6 lg:px-8">
      <GridPatternBackground />

      <div className="relative mx-auto max-w-4xl">
        <NoteSurface tone="raised" depth="lg" className="rotate-1 p-8 text-center sm:p-12">
          <DecoTape size="lg" className="absolute -top-4 left-1/2 -translate-x-1/2" />

          <h2 className="mb-6 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Ready to map out your goals?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Start with a simple 9x9 grid. Fill it with your dreams. Watch them become reality. No
            credit card required.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 border-2 border-primary bg-primary px-8 text-lg text-primary-foreground shadow-[4px_4px_0_0_var(--note-shadow-color)] transition-[transform,background-color,color,box-shadow] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[2px_2px_0_0_var(--note-shadow-color)]"
            >
              Start Planning Free
              <Icon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Icon icon={Mail01Icon} className="size-4" />
            <span>Join 1,000+ others getting organized</span>
          </div>
        </NoteSurface>
      </div>
    </section>
  );
}
