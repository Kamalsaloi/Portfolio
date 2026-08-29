import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CaseStudy } from '@/components/CaseStudy';
import { OtherWork } from '@/components/OtherWork';
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

        <OtherWork
          id="range"
          eyebrow="Beyond the Core Product"
          title="The range behind the depth"
          description="Alongside the proposal flow, I designed and shipped the rest of the Aidoos platform. Write-ups for these are in progress."
        />

        <HowIWork />

        <AboutMe />

        <CTA />
      </main>
    </div>
  );
}
