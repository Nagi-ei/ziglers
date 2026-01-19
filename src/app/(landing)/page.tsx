"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CtaSection as CtaGemini1 } from "@/widgets/landing-gemini1/CtaSection";
import { Footer as FooterGemini1 } from "@/widgets/landing-gemini1/Footer";
import { Header as HeaderGemini1 } from "@/widgets/landing-gemini1/Header";
import { HeroSection as HeroGemini1 } from "@/widgets/landing-gemini1/HeroSection";
import { MethodSection as MethodGemini1 } from "@/widgets/landing-gemini1/MethodSection";
import { TemplateSection as TemplateGemini1 } from "@/widgets/landing-gemini1/TemplateSection";
import { VariantSwitcher } from "@/widgets/landing-gemini1/VariantSwitcher";

import { CtaSection as CtaGemini2 } from "@/widgets/landing-gemini2/CtaSection";
import { Footer as FooterGemini2 } from "@/widgets/landing-gemini2/Footer";
import { Header as HeaderGemini2 } from "@/widgets/landing-gemini2/Header";
import { HeroSection as HeroGemini2 } from "@/widgets/landing-gemini2/HeroSection";
import { MethodSection as MethodGemini2 } from "@/widgets/landing-gemini2/MethodSection";
import { TemplateSection as TemplateGemini2 } from "@/widgets/landing-gemini2/TemplateSection";

import { CtaSection as CtaGemini3 } from "@/widgets/landing-gemini3/CtaSection";
import { Footer as FooterGemini3 } from "@/widgets/landing-gemini3/Footer";
import { Header as HeaderGemini3 } from "@/widgets/landing-gemini3/Header";
import { HeroSection as HeroGemini3 } from "@/widgets/landing-gemini3/HeroSection";
import { MethodSection as MethodGemini3 } from "@/widgets/landing-gemini3/MethodSection";
import { TemplateSection as TemplateGemini3 } from "@/widgets/landing-gemini3/TemplateSection";

import { CtaSection as CtaOpus } from "@/widgets/landing-opus/CtaSection";
import { Footer as FooterOpus } from "@/widgets/landing-opus/Footer";
import { Header as HeaderOpus } from "@/widgets/landing-opus/Header";
import { HeroSection as HeroOpus } from "@/widgets/landing-opus/HeroSection";
import { MethodSection as MethodOpus } from "@/widgets/landing-opus/MethodSection";
import { TemplateSection as TemplateOpus } from "@/widgets/landing-opus/TemplateSection";

const VARIANT_COMPONENTS = {
  gemini1: {
    Header: HeaderGemini1,
    HeroSection: HeroGemini1,
    MethodSection: MethodGemini1,
    TemplateSection: TemplateGemini1,
    CtaSection: CtaGemini1,
    Footer: FooterGemini1,
  },
  gemini2: {
    Header: HeaderGemini2,
    HeroSection: HeroGemini2,
    MethodSection: MethodGemini2,
    TemplateSection: TemplateGemini2,
    CtaSection: CtaGemini2,
    Footer: FooterGemini2,
  },
  gemini3: {
    Header: HeaderGemini3,
    HeroSection: HeroGemini3,
    MethodSection: MethodGemini3,
    TemplateSection: TemplateGemini3,
    CtaSection: CtaGemini3,
    Footer: FooterGemini3,
  },
  opus: {
    Header: HeaderOpus,
    HeroSection: HeroOpus,
    MethodSection: MethodOpus,
    TemplateSection: TemplateOpus,
    CtaSection: CtaOpus,
    Footer: FooterOpus,
  },
} as const;

type VariantKey = keyof typeof VARIANT_COMPONENTS;

function LandingPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant") || "gemini1";
  const variant: VariantKey = (
    variantParam in VARIANT_COMPONENTS ? variantParam : "gemini1"
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
