"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CtaSection as CtaGemini3 } from "@/widgets/landing-gemini3/CtaSection";
import { Footer as FooterGemini3 } from "@/widgets/landing-gemini3/Footer";
import { Header as HeaderGemini3 } from "@/widgets/landing-gemini3/Header";
import { HeroSection as HeroGemini3 } from "@/widgets/landing-gemini3/HeroSection";
import { MethodSection as MethodGemini3 } from "@/widgets/landing-gemini3/MethodSection";
import { TemplateSection as TemplateGemini3 } from "@/widgets/landing-gemini3/TemplateSection";
import { CtaSection as CtaGemini4 } from "@/widgets/landing-gemini4/CtaSection";
import { Footer as FooterGemini4 } from "@/widgets/landing-gemini4/Footer";
import { Header as HeaderGemini4 } from "@/widgets/landing-gemini4/Header";
import { HeroSection as HeroGemini4 } from "@/widgets/landing-gemini4/HeroSection";
import { MethodSection as MethodGemini4 } from "@/widgets/landing-gemini4/MethodSection";
import { TemplateSection as TemplateGemini4 } from "@/widgets/landing-gemini4/TemplateSection";
import { CtaSection as CtaOpus } from "@/widgets/landing-opus/CtaSection";
import { Footer as FooterOpus } from "@/widgets/landing-opus/Footer";
import { Header as HeaderOpus } from "@/widgets/landing-opus/Header";
import { HeroSection as HeroOpus } from "@/widgets/landing-opus/HeroSection";
import { MethodSection as MethodOpus } from "@/widgets/landing-opus/MethodSection";
import { TemplateSection as TemplateOpus } from "@/widgets/landing-opus/TemplateSection";
import { VariantSwitcher } from "@/widgets/VariantSwitcher";

const VARIANT_COMPONENTS = {
  v1: {
    Header: HeaderOpus,
    HeroSection: HeroOpus,
    MethodSection: MethodOpus,
    TemplateSection: TemplateOpus,
    CtaSection: CtaOpus,
    Footer: FooterOpus,
  },
  v2: {
    Header: HeaderGemini3,
    HeroSection: HeroGemini3,
    MethodSection: MethodGemini3,
    TemplateSection: TemplateGemini3,
    CtaSection: CtaGemini3,
    Footer: FooterGemini3,
  },
  v3: {
    Header: HeaderGemini4,
    HeroSection: HeroGemini4,
    MethodSection: MethodGemini4,
    TemplateSection: TemplateGemini4,
    CtaSection: CtaGemini4,
    Footer: FooterGemini4,
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
