import { GithubIcon, Linkedin01Icon, TwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/shared/ui/shadcn/Separator";

export function Footer() {
  return (
    <footer className="w-full border-border border-t-2 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <Image src="/logo.png" alt="Zieglers" width={24} height={24} />
              <span className="font-bold text-foreground text-xl tracking-tight">Zieglers</span>
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              Construct your life&apos;s work. The premier goal-setting platform for architects of
              their own destiny.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={TwitterIcon} className="size-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={GithubIcon} className="size-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="size-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
                Product
              </h4>
              <Link
                href="#method"
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                Methodology
              </Link>
              <Link
                href="#templates"
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                Blueprints
              </Link>
              <Link
                href="#"
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                Pricing
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Legal</h4>
              <Link
                href="#"
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-12 h-[2px] bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-medium text-muted-foreground text-sm">
            © {new Date().getFullYear()} Zieglers. Built with precision.
          </p>
          <div className="flex items-center gap-2 font-bold text-muted-foreground text-xs uppercase tracking-widest">
            <span>Est. 2024</span>
            <span className="size-1 rounded-full bg-muted-foreground" />
            <span>Mandalart System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
