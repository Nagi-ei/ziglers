import { CtaSection } from "@/widgets/landing/CtaSection";
import { Footer } from "@/widgets/landing/Footer";
import { Header } from "@/widgets/landing/Header";
import { HeroSection } from "@/widgets/landing/HeroSection";
import { MethodSection } from "@/widgets/landing/MethodSection";
import { TemplateSection } from "@/widgets/landing/TemplateSection";

export default function LandingPage() {
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
