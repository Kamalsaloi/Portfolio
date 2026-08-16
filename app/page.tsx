import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CaseStudy } from '@/components/CaseStudy';
import { Range } from '@/components/Range';
import { HowIWork } from '@/components/HowIWork';
import { AboutMe } from '@/components/AboutMe';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main>
        <Hero />

        <CaseStudy />

        <Range />

        <HowIWork />

        <AboutMe />

        <CTA />
      </main>
    </div>
  );
}
