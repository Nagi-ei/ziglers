import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <span className="mb-6 block font-black font-mono text-foreground text-lg uppercase">
              ZIEGLERS_V3
            </span>
            <p className="max-w-xs font-mono text-muted-foreground text-xs">
              Systematic planning tool for non-linear thinkers.
              <br />
              Licensed under MIT Protocol.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold font-mono text-primary text-xs uppercase">Map</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Method
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold font-mono text-primary text-xs uppercase">Legal</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold font-mono text-primary text-xs uppercase">Social</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="decoration-2 underline-offset-4 hover:text-foreground hover:underline"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-primary/10 border-t-2 pt-8 md:flex-row">
          <p className="font-mono text-[10px] text-muted-foreground uppercase">
            © 2026 Zieglers Inc. All systems nominal.
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${i <= 3 ? "bg-primary" : "bg-primary/20"}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
