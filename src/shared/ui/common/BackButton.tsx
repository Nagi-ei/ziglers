"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { Button } from "@/shared/ui/shadcn/Button";

export function BackButton({
  className,
  variant = "ghost",
  ...props
}: ComponentProps<typeof Button>) {
  const router = useRouter();

  return (
    <Button variant={variant} onClick={() => router.back()} className={className} {...props}>
      <Icon icon={ArrowLeft01Icon} className="h-4 w-4" />
      <span>Go Back</span>
    </Button>
  );
}
