"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CtaSection as CtaV1 } from "@/widgets/landing-v1/CtaSection";
import { Footer as FooterV1 } from "@/widgets/landing-v1/Footer";
import { Header as HeaderV1 } from "@/widgets/landing-v1/Header";
import { HeroSection as HeroV1 } from "@/widgets/landing-v1/HeroSection";
import { MethodSection as MethodV1 } from "@/widgets/landing-v1/MethodSection";
import { TemplateSection as TemplateV1 } from "@/widgets/landing-v1/TemplateSection";
import { CtaSection as CtaV2 } from "@/widgets/landing-v2/CtaSection";
import { Footer as FooterV2 } from "@/widgets/landing-v2/Footer";
import { Header as HeaderV2 } from "@/widgets/landing-v2/Header";
import { HeroSection as HeroV2 } from "@/widgets/landing-v2/HeroSection";
import { MethodSection as MethodV2 } from "@/widgets/landing-v2/MethodSection";
import { TemplateSection as TemplateV2 } from "@/widgets/landing-v2/TemplateSection";
import { CtaSection as CtaV3 } from "@/widgets/landing-v3/CtaSection";
import { Footer as FooterV3 } from "@/widgets/landing-v3/Footer";
import { Header as HeaderV3 } from "@/widgets/landing-v3/Header";
import { HeroSection as HeroV3 } from "@/widgets/landing-v3/HeroSection";
import { MethodSection as MethodV3 } from "@/widgets/landing-v3/MethodSection";
import { TemplateSection as TemplateV3 } from "@/widgets/landing-v3/TemplateSection";
import { VariantSwitcher } from "@/widgets/VariantSwitcher";

const VARIANT_COMPONENTS = {
  v1: {
    Header: HeaderV1,
    HeroSection: HeroV1,
    MethodSection: MethodV1,
    TemplateSection: TemplateV1,
    CtaSection: CtaV1,
    Footer: FooterV1,
  },
  v2: {
    Header: HeaderV2,
    HeroSection: HeroV2,
    MethodSection: MethodV2,
    TemplateSection: TemplateV2,
    CtaSection: CtaV2,
    Footer: FooterV2,
  },
  v3: {
    Header: HeaderV3,
    HeroSection: HeroV3,
    MethodSection: MethodV3,
    TemplateSection: TemplateV3,
    CtaSection: CtaV3,
    Footer: FooterV3,
  },
} as const;

type VariantKey = keyof typeof VARIANT_COMPONENTS;

function LandingPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant") || "v1";
  const variant: VariantKey = (
    variantParam in VARIANT_COMPONENTS ? variantParam : "v1"
  ) as VariantKey;

  const Components = VARIANT_COMPONENTS[variant];

  return (
    <div className="flex min-h-screen flex-col">
      <Components.Header />
      <main className="flex-1">
        <Components.HeroSection />
        <Components.MethodSection />
        <Components.TemplateSection />
        <Components.CtaSection />
      </main>
      <Components.Footer />
      <VariantSwitcher />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LandingPageContent />
    </Suspense>
  );
}
