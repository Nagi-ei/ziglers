import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section className="bg-primary py-32 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 font-black text-5xl uppercase tracking-tighter sm:text-7xl lg:text-8xl">
          Build Your
          <br />
          Masterpiece
        </h2>

        <p className="mb-12 max-w-2xl font-medium text-lg leading-relaxed opacity-90 sm:text-xl">
          The blank page is daunting. The grid is liberating. Fill the boxes, clear your mind, and
          execute your vision.
        </p>

        <Button
          variant="secondary"
          size="lg"
          className="h-16 rounded-none bg-background px-12 font-bold text-foreground text-lg uppercase tracking-widest hover:bg-background/90"
        >
          Start For Free
          <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-5" />
        </Button>
      </div>
    </section>
  );
}
