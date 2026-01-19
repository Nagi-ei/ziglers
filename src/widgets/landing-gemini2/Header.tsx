import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden bg-primary">
              <Image
                src="/logo.png"
                alt="Zieglers Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tighter">Zieglers</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Method", "Templates", "Mobile"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-medium text-muted-foreground text-sm uppercase tracking-widest decoration-2 underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="font-bold uppercase tracking-wide">
              Log in
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-none bg-foreground font-bold text-background uppercase tracking-wide hover:bg-foreground/90 dark:text-foreground"
            >
              Get Started
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <HugeiconsIcon icon={Menu01Icon} className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
