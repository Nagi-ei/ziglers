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

import { CtaSection as CtaOpus } from "@/widgets/landing-opus/CtaSection";
import { Footer as FooterOpus } from "@/widgets/landing-opus/Footer";
import { Header as HeaderOpus } from "@/widgets/landing-opus/Header";
import { HeroSection as HeroOpus } from "@/widgets/landing-opus/HeroSection";
import { MethodSection as MethodOpus } from "@/widgets/landing-opus/MethodSection";
import { TemplateSection as TemplateOpus } from "@/widgets/landing-opus/TemplateSection";

function LandingPageContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant") || "gemini1";
  const isOpus = variant === "opus";

  const Components = {
    Header: isOpus ? HeaderOpus : HeaderGemini1,
    HeroSection: isOpus ? HeroOpus : HeroGemini1,
    MethodSection: isOpus ? MethodOpus : MethodGemini1,
    TemplateSection: isOpus ? TemplateOpus : TemplateGemini1,
    CtaSection: isOpus ? CtaOpus : CtaGemini1,
    Footer: isOpus ? FooterOpus : FooterGemini1,
  };

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
