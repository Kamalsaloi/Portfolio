import Link from 'next/link';

function WindowMock({
  className = '',
  style,
  bars = 3,
}: {
  className?: string;
  style?: React.CSSProperties;
  bars?: number;
}) {
  return (
    <div
      className={`absolute rounded-2xl border border-slate-200 bg-white shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] overflow-hidden ${className}`}
      style={style}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex h-full">
        <div className="hidden sm:flex w-14 shrink-0 flex-col gap-3 border-r border-slate-100 p-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-6 w-6 rounded-lg bg-slate-100" />
          ))}
        </div>
        <div className="flex-1 min-w-0 p-5 space-y-3">
          <div className="h-4 w-2/5 rounded bg-slate-200" />
          <div className="h-3 w-4/5 rounded bg-slate-100" />
          <div className="h-3 w-3/5 rounded bg-slate-100" />
          {bars > 3 && (
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-14 rounded-lg bg-slate-100" />
              <div className="h-14 rounded-lg bg-slate-100" />
              <div className="h-14 rounded-lg bg-slate-100" />
            </div>
          )}
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-5/6 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

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

          <div
            className="relative mx-auto h-[300px] sm:h-[420px] max-w-3xl"
            style={{ perspective: '2000px' }}
          >
            <WindowMock
              bars={4}
              className="left-1/2 top-0 w-[80%] sm:w-[70%] h-[240px] sm:h-[320px] -translate-x-[35%]"
              style={{
                transform: 'rotateX(10deg) rotateY(-16deg) rotateZ(1deg)',
                zIndex: 10,
              }}
            />
            <WindowMock
              bars={2}
              className="left-0 bottom-0 w-[55%] sm:w-[42%] h-[180px] sm:h-[230px]"
              style={{
                transform: 'rotateX(8deg) rotateY(-16deg) rotateZ(1deg)',
                zIndex: 20,
                boxShadow: '0 50px 90px -25px rgba(15,23,42,0.35)',
              }}
            />
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
