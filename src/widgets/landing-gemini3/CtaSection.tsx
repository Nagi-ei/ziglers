import { Rocket01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section className="border-primary border-y-2 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center border-primary-foreground/20 border-b-2 px-6 py-20 lg:border-r-2 lg:border-b-0 lg:p-24">
          <h2 className="mb-6 font-black font-mono text-4xl uppercase leading-none tracking-tighter md:text-6xl">
            System
            <br />
            Ready.
          </h2>
          <p className="max-w-md font-mono text-lg opacity-80">
            Awaiting user input. Begin the initialization sequence to structure your goals.
          </p>
        </div>

        <div className="flex items-center justify-center bg-primary-foreground/5 p-12 lg:p-24">
          <div className="flex w-full max-w-sm flex-col gap-4">
            <div className="flex items-center justify-between border-primary-foreground/30 border-b pb-2 font-mono text-xs uppercase opacity-70">
              <span>Status</span>
              <span className="animate-pulse">Online</span>
            </div>
            <Button
              variant="default"
              size="lg"
              className="h-20 w-full border-2 border-primary-foreground bg-primary-foreground font-black text-primary text-xl uppercase hover:bg-transparent hover:text-primary-foreground dark:text-foreground"
            >
              <HugeiconsIcon icon={Rocket01Icon} className="mr-3 size-6" />
              Start_Engine
            </Button>
            <p className="text-center font-mono text-[10px] opacity-60">
              NO CREDIT CARD REQUIRED FOR INITIALIZATION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
