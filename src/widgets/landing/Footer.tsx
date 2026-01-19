import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/shared/ui/shadcn/Separator";

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Zieglers Logo"
                width={24}
                height={24}
                className="size-6"
              />
              <span className="font-bold text-foreground">Zieglers</span>
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm">
              Transform your goals into actionable steps with the Mandalart method.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground text-sm">Product</h4>
              <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                Features
              </Link>
              <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                Templates
              </Link>
              <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                Pricing
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground text-sm">Legal</h4>
              <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground text-sm hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Zieglers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
