import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";
import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section id="mobile" className="relative overflow-hidden bg-card px-4 py-24 sm:px-6 lg:px-8">
      <GridPatternBackground />

      <div className="relative mx-auto max-w-4xl">
        <div className="rotate-1 border-2 border-primary/10 bg-background p-8 text-center shadow-[8px_8px_0px_0px_rgba(45,45,45,0.1)] sm:p-12">
          <DecoTape className="absolute -top-4 left-1/2 -translate-x-1/2" />

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
              className="h-14 rounded-none border-2 border-primary bg-primary px-8 text-lg text-primary-foreground shadow-[4px_4px_0px_0px_rgba(45,45,45,0.2)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,0.2)]"
            >
              Start Planning Free
              <Icon icon={ArrowRight01Icon} className="ml-2 size-5" />
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Icon icon={Mail01Icon} className="size-4" />
            <span>Join 1,000+ others getting organized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
