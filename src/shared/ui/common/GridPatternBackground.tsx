import { cn } from "@/shared/lib/utils";

interface GridPatternBackgroundProps {
  className?: string;
  density?: "tight" | "normal" | "loose";
  tone?: "subtle" | "default";
}

const DENSITY_CLASS = {
  tight: "bg-size-[18px_18px]",
  normal: "bg-size-[24px_24px]",
  loose: "bg-size-[32px_32px]",
} as const;

const TONE_CLASS = {
  subtle: "opacity-[0.03]",
  default: "opacity-[0.05]",
} as const;

export function GridPatternBackground({
  className,
  density = "normal",
  tone = "subtle",
}: GridPatternBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(var(--note-grid)_1px,transparent_1px),linear-gradient(90deg,var(--note-grid)_1px,transparent_1px)]",
        DENSITY_CLASS[density],
        TONE_CLASS[tone],
        className,
      )}
    />
  );
}
