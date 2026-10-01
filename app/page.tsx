import { Intro } from '@/components/Intro';
import { Hero } from '@/components/Hero';
import { CaseStudy } from '@/components/CaseStudy';
import { SecondaryCaseStudy } from '@/components/SecondaryCaseStudy';
import { Redesigns } from '@/components/Redesigns';
import { HowIWork } from '@/components/HowIWork';
import { AboutMe } from '@/components/AboutMe';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-bone">
      {/* Cold open. Sits above everything until it clears itself. */}
      <Intro />

      <main className="relative">
        <Hero />

        {/* overflow-clip, not hidden: hidden would make this a scroll container
            and break the sticky deck inside HowIWork. */}
        <div className="relative overflow-clip border-t border-slate-200 bg-white">
          <CaseStudy />

          <SecondaryCaseStudy />

          <Redesigns />

          <HowIWork />

          <AboutMe />

          <CTA />
        </div>
      </main>
    </div>
  );
}
