import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Zieglers Logo" width={32} height={32} className="size-8" />
          <span className="font-bold text-foreground text-xl">Zieglers</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation" />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="accent" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
