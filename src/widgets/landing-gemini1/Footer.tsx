import { Github01Icon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Zieglers" width={32} height={32} className="size-8" />
              <span className="font-bold text-foreground text-xl tracking-tight">ZIEGLERS</span>
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm leading-6">
              The systematic goal planner for ambitious minds. Built with precision, designed for
              clarity.
            </p>
            <div className="flex space-x-6">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <HugeiconsIcon icon={NewTwitterIcon} className="size-5" />
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">GitHub</span>
                <HugeiconsIcon icon={Github01Icon} className="size-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">LinkedIn</span>
                <HugeiconsIcon icon={Linkedin01Icon} className="size-5" />
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold text-foreground text-sm uppercase leading-6 tracking-wider">
                  Product
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/#method"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Methodology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#templates"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#pricing"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/showcase"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Showcase
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold text-foreground text-sm uppercase leading-6 tracking-wider">
                  Company
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold text-foreground text-sm uppercase leading-6 tracking-wider">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground text-sm leading-6 hover:text-primary"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-border border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-muted-foreground text-xs leading-5">
            &copy; 2026 Zieglers Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
