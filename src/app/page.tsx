import { Hero } from "@/components/home/Hero";
import { ScrollMarquee } from "@/components/home/ScrollMarquee";
import { Pillars } from "@/components/home/Pillars";
import { ScrollShowcase } from "@/components/home/ScrollShowcase";
import { ProcessTeaser } from "@/components/home/ProcessTeaser";
import { StackingProjects } from "@/components/home/StackingProjects";
import { CTASection } from "@/components/shared/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollMarquee />
      <Pillars />
      <ScrollShowcase />
      <ProcessTeaser />
      <StackingProjects />
      <CTASection />
    </>
  );
}
