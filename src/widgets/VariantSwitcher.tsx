"use client";

import { Layers01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/shadcn/Button";

const VARIANTS = [
  { id: "v1", name: "v1" },
  { id: "v2", name: "v2" },
  { id: "v3", name: "v3" },
] as const;

export function VariantSwitcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const currentVariantId = searchParams.get("variant") || "v1";
  const currentVariant = VARIANTS.find((v) => v.id === currentVariantId) || VARIANTS[0];

  const handleSwitch = () => {
    const currentIndex = VARIANTS.findIndex((v) => v.id === currentVariant.id);
    const nextIndex = (currentIndex + 1) % VARIANTS.length;
    const nextVariant = VARIANTS[nextIndex];

    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", nextVariant.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button
        variant="accent"
        onClick={handleSwitch}
        className="h-12 gap-2 rounded-full px-4 shadow-lg transition-all hover:scale-105"
      >
        <HugeiconsIcon icon={Layers01Icon} className="size-5" />
        <span className="font-medium">{currentVariant.name}</span>
      </Button>
    </div>
  );
}
