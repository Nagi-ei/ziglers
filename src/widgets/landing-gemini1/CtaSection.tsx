import { Button } from "@/shared/ui/shadcn/Button";

export function CtaSection() {
  return (
    <section id="mobile" className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary px-6 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="font-bold text-3xl text-primary-foreground tracking-tight sm:text-4xl">
              Ready to structure your success?
              <br />
              Start building your grid today.
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-8">
              Join thousands of achievers using the Mandalart method to clarity their vision and
              execute their dreams. No credit card required for the free tier.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button variant="secondary" size="lg" className="h-12 px-8 font-semibold">
                Get Started for Free
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="h-12 border border-primary-foreground/20 px-8 font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute top-0 left-1/2 h-[64rem] w-[128rem] -translate-x-1/2 stroke-primary-foreground/10 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="grid-pattern"
                  width="48"
                  height="48"
                  x="50%"
                  y="-1"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 48V.5H48" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
              <svg
                x="50%"
                y="-1"
                className="overflow-visible fill-primary-foreground/5"
                aria-hidden="true"
              >
                <rect width="48" height="48" x="-144" y="96" />
                <rect width="48" height="48" x="-48" y="288" />
                <rect width="48" height="48" x="144" y="144" />
                <rect width="48" height="48" x="240" y="336" />
              </svg>
            </svg>
            <div className="absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
              <div className="absolute top-1/2 right-0 h-64 w-64 -translate-y-1/2 border border-primary-foreground/10 opacity-50 sm:right-16" />
              <div className="absolute top-1/2 right-4 h-32 w-32 translate-x-1/2 -translate-y-1/2 border border-primary-foreground/10 opacity-30 sm:right-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
