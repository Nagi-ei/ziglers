import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Zieglers Logo" width={32} height={32} className="size-8" />
          <span className="font-bold text-foreground text-xl tracking-tight">Zieglers</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <Link href="#method" className="font-medium text-sm transition-colors hover:text-primary">
            Method
          </Link>
          <Link
            href="#templates"
            className="font-medium text-sm transition-colors hover:text-primary"
          >
            Templates
          </Link>
          <Link href="#mobile" className="font-medium text-sm transition-colors hover:text-primary">
            Mobile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="sm" className="rounded-none font-medium hover:bg-muted">
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-none font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none dark:shadow-white/20"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
