import { InstagramIcon, Linkedin01Icon, TwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: InstagramIcon, label: "Instagram" },
    { icon: TwitterIcon, label: "Twitter" },
    { icon: Linkedin01Icon, label: "LinkedIn" },
  ];

  return (
    <footer className="border-border border-t bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-black text-2xl uppercase tracking-tighter">
              Zieglers
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm">
              A systematic approach to ambition. Break down big dreams into small, actionable steps.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href="#"
                  className="flex size-10 items-center justify-center border border-border transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  aria-label={item.label}
                >
                  <HugeiconsIcon icon={item.icon} className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-mono text-primary text-xs uppercase tracking-widest">
              Sitemap
            </h4>
            <ul className="flex flex-col gap-4">
              {["Method", "Templates", "Pricing", "About", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-medium text-foreground text-sm uppercase tracking-wide decoration-1 underline-offset-4 hover:text-primary hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-mono text-primary text-xs uppercase tracking-widest">Legal</h4>
            <ul className="flex flex-col gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-border border-t pt-10 md:flex-row">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            &copy; {currentYear} Zieglers Inc.
          </p>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            Designed in Seoul
          </p>
        </div>
      </div>
    </footer>
  );
}
