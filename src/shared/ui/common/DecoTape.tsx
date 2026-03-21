import { cn } from "@/shared/lib/utils";

interface DecoTapeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "quiet";
}

const SIZE_CLASS = {
  sm: "h-6 w-20",
  md: "h-8 w-32",
  lg: "h-10 w-40",
} as const;

const TONE_CLASS = {
  default: "opacity-85",
  quiet: "opacity-65",
} as const;

export function DecoTape({ className, size = "md", tone = "default" }: DecoTapeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-[2px] border border-note-stroke bg-note-tape shadow-[0_1px_0_0_var(--note-shadow-color)] backdrop-blur-[1.5px]",
        SIZE_CLASS[size],
        TONE_CLASS[tone],
        className,
      )}
    />
  );
}
