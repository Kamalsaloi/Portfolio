import Link from 'next/link';
import { AidoosHeroReplica } from '@/components/case-study/aidoos-hero/AidoosHeroReplica';
import { ScaledFrame } from '@/components/case-study/aidoos-hero/ScaledFrame';

export function CaseStudy() {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white overflow-hidden px-6 sm:px-16 pt-16 pb-16">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative mx-auto max-w-3xl" style={{ perspective: '2000px' }}>
            <div
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              style={{
                transform: 'rotateX(10deg) rotateY(-16deg) rotateZ(1deg)',
                boxShadow: '0 50px 90px -25px rgba(15,23,42,0.35)',
              }}
            >
              <ScaledFrame nativeWidth={1280} nativeHeight={712}>
                <AidoosHeroReplica />
              </ScaledFrame>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
            Featured Case Study
          </p>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <h2 className="max-w-2xl text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              Aidoos — building a startup&apos;s platform end to end
            </h2>

            <Link
              href="/case-studies/aidoos-proposal-flow"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              View Full Case Study
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
            As the founding designer at Aidoos, I designed and shipped the entire product — from
            first wireframe to a live, scalable platform used by real customers today.
          </p>
        </div>
      </div>
    </section>
  );
}
