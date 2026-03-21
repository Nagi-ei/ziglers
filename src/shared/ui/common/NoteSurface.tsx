import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/Card";

const noteSurfaceVariants = cva(
  "relative overflow-visible border-2 border-note-stroke transition-[background-color,border-color,box-shadow]",
  {
    variants: {
      tone: {
        surface: "bg-note-surface",
        raised: "bg-note-surface-raised",
      },
      depth: {
        sm: "shadow-[2px_2px_0_0_var(--note-shadow-color)]",
        md: "shadow-[4px_4px_0_0_var(--note-shadow-color)]",
        lg: "shadow-[8px_8px_0_0_var(--note-shadow-color)]",
      },
    },
    defaultVariants: {
      tone: "surface",
      depth: "md",
    },
  },
);

interface NoteSurfaceProps
  extends React.ComponentProps<typeof Card>,
    VariantProps<typeof noteSurfaceVariants> {}

export function NoteSurface({ className, tone, depth, ...props }: NoteSurfaceProps) {
  return (
    <Card
      data-depth={depth ?? "md"}
      data-slot="note-surface"
      data-tone={tone ?? "surface"}
      className={cn(noteSurfaceVariants({ tone, depth }), className)}
      {...props}
    />
  );
}
