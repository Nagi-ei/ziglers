import { Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/shared/ui/common/BackButton";
import { DecoTape } from "@/shared/ui/common/DecoTape";
import { GridPatternBackground } from "@/shared/ui/common/GridPatternBackground";
import { Button } from "@/shared/ui/shadcn/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/shadcn/Card";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4">
      <GridPatternBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="group relative">
          <DecoTape className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 -rotate-2 shadow-sm" />

          <Card className="relative z-10 overflow-hidden border-2 border-primary/10 bg-card shadow-[8px_8px_0px_0px_rgba(45,45,45,0.1)]">
            <CardHeader className="flex flex-col items-center space-y-4 pt-12">
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0">
                  <Image src="/logo.png" alt="Zieglers Logo" fill className="object-contain" />
                </div>
                <span className="font-bold text-2xl tracking-tight">Zieglers</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 py-8 text-center">
              <div className="space-y-2">
                <h1 className="select-none pb-4 font-bold text-8xl text-primary/10">404</h1>
                <h2 className="font-bold text-xl">Page Not Found</h2>
                <p className="mx-auto max-w-[280px] text-muted-foreground text-sm leading-relaxed">
                  Oops! The page you are looking for seems to have wandered off into the unknown.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 bg-primary/5 p-6 sm:flex-row sm:justify-center">
              <Button
                className="w-full min-w-30 gap-2 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] sm:w-auto"
                render={<Link href="/" />}
                nativeButton={false}
              >
                <Icon icon={Home01Icon} className="h-4 w-4" />
                <span>Return Home</span>
              </Button>
              <BackButton
                variant="default"
                className="w-full min-w-30 gap-2 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] sm:w-auto"
              />
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
