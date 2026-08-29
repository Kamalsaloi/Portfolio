import Link from 'next/link';
import { AidoosHeroReplica } from '@/components/case-study/aidoos-hero/AidoosHeroReplica';
import { ScaledFrame } from '@/components/case-study/aidoos-hero/ScaledFrame';

export function CaseStudy() {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Featured Case Study
          </p>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-slate-950 sm:text-4xl">
            Aidoos: building a startup&apos;s platform end to end
          </h2>

          <p className="text-lg leading-relaxed text-slate-500">
            As the founding designer at Aidoos, I designed and shipped the entire product, from first
            wireframe to a live, scalable platform used by real customers today.
          </p>

          <Link
            href="/case-studies/aidoos-proposal-flow"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            View Full Case Study
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Visual */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative" style={{ perspective: '2000px' }}>
            <div
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              style={{
                transform: 'rotateX(8deg) rotateY(-14deg) rotateZ(1deg)',
                boxShadow: '0 30px 60px -20px rgba(15,23,42,0.35)',
              }}
            >
              <ScaledFrame nativeWidth={1280} nativeHeight={712}>
                <AidoosHeroReplica />
              </ScaledFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
