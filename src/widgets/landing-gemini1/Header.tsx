import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Zieglers" width={32} height={32} className="size-8" />
          <span className="font-medium text-foreground text-xl tracking-tight">Zieglers</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#method"
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            Method
          </Link>
          <Link
            href="/#templates"
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            Templates
          </Link>
          <Link
            href="/#mobile"
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
          >
            Mobile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="sm" className="font-medium">
              Log in
            </Button>
            <Button variant="accent" size="sm" className="font-medium">
              Get Started
            </Button>
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden">
            <HugeiconsIcon icon={Menu01Icon} className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
