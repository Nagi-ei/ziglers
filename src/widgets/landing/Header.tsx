import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/Button";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-primary/20 border-b-2 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative rotate-[-2deg] transition-transform duration-300 group-hover:rotate-0">
            <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-none bg-primary opacity-20" />
            <Image
              src="/logo.png"
              alt="Zieglers"
              width={36}
              height={36}
              className="relative size-9"
            />
          </div>
          <span className="font-bold text-primary text-xl tracking-tight">Zieglers</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {["Method", "Templates", "Mobile"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative font-medium text-foreground/80 text-sm transition-colors hover:text-primary"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary/40 transition-all duration-300 hover:w-full group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden items-center gap-3 sm:flex">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none font-medium hover:bg-primary/10 hover:text-primary"
            >
              Log in
            </Button>
            <Button
              className="rounded-none border-2 border-primary bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              size="sm"
            >
              Get Started
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <HugeiconsIcon icon={Menu01Icon} className="size-6 text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
