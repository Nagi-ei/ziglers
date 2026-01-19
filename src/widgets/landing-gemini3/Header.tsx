import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-primary border-b-2 bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-stretch justify-between lg:h-20">
        {/* Logo Area */}
        <div className="flex items-center border-primary border-r-2 bg-primary px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative size-8 border border-background">
              <Image src="/logo.png" alt="Zieglers Logo" fill className="object-contain" />
            </div>
            <span className="font-bold font-mono text-background text-xl tracking-tighter lg:text-2xl">
              Zieglers
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-stretch lg:flex">
          {["Method", "Templates", "Mobile"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="flex items-center border-primary/20 border-l px-8 font-medium font-mono text-muted-foreground text-sm uppercase tracking-widest transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-stretch">
          <div className="hidden items-center gap-4 border-primary border-l-2 px-6 lg:flex lg:px-8">
            <ThemeToggle />
            <div className="h-8 w-px bg-primary/20"></div>
            <Link
              href="/login"
              className="font-bold font-mono text-primary text-sm hover:underline"
            >
              [LOG_IN]
            </Link>
            <Button
              variant="accent"
              size="lg"
              className="h-10 px-6 font-bold font-mono uppercase shadow-none ring-offset-0"
            >
              Get_Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex aspect-square h-full items-center justify-center border-primary border-l-2 bg-background text-primary transition-colors hover:bg-primary hover:text-background lg:hidden"
          >
            <HugeiconsIcon icon={Menu01Icon} className="size-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
