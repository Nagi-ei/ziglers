import { cn } from "@/shared/lib/utils";

interface DecoTapeProps {
  className?: string;
}

export function DecoTape({ className }: DecoTapeProps) {
  return <div className={cn("h-8 w-32 bg-primary/20 opacity-60 backdrop-blur-[1px]", className)} />;
}
