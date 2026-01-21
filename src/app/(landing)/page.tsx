"use client";

import { Suspense } from "react";
import { CtaSection } from "@/widgets/landing/CtaSection";
import { Footer } from "@/widgets/landing/Footer";
import { Header } from "@/widgets/landing/Header";
import { HeroSection } from "@/widgets/landing/HeroSection";
import { MethodSection } from "@/widgets/landing/MethodSection";
import { TemplateSection } from "@/widgets/landing/TemplateSection";

function LandingPageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MethodSection />
        <TemplateSection />
        <CtaSection />
      </main>
      <Footer />
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
