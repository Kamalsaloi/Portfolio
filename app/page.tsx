import { Intro } from '@/components/Intro';
import { Hero } from '@/components/Hero';
import { CaseStudy } from '@/components/CaseStudy';
import { OtherWork } from '@/components/OtherWork';
import { HowIWork } from '@/components/HowIWork';
import { AboutMe } from '@/components/AboutMe';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-bone">
      {/* Cold open. Sits above everything until it clears itself. */}
      <Intro />

      {/*
        Parallax: the hero is sticky at full viewport height and everything
        after it is a sibling with a higher z-index, so the rest of the page
        slides up over a hero that stays put. Both must live in this one
        containing block for the sticky to release correctly.

        The rounded top corners belong to the rising panel rather than the
        hero: the hero's own bottom corners would be covered by the panel and
        never seen, whereas rounding the panel is what makes it read as a
        sheet lifting over the image.
      */}
      <main className="relative">
        <Hero />

        <div className="relative z-10 overflow-clip rounded-t-[28px] border-t border-slate-200 bg-white shadow-[0_-24px_60px_-20px_rgba(15,23,42,0.28)] sm:rounded-t-[40px]">
          <CaseStudy />

          <OtherWork
            id="range"
            tone="white"
            eyebrow="Beyond the Core Product"
            title="The range behind the depth"
            description="Alongside the proposal flow, I designed and shipped the rest of the Aidoos platform. Write-ups for these are in progress."
          />

          <HowIWork />

          <AboutMe />

          <CTA />
        </div>
      </main>
    </div>
  );
}
