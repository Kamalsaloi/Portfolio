import { Header } from '@/components/Header';

/**
 * Plain white hero: the type carries it.
 *
 * Fills the viewport and scrolls away normally. The nav lives inside here,
 * absolutely positioned, which is what lets the hero occupy the whole viewport
 * instead of being pushed down by a header in normal flow.
 */
export function Hero() {
  return (
    <section className="relative flex h-svh flex-col overflow-hidden bg-white">
      <Header />

      {/* Copy is vertically centred now that there is no scene to sit above. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-12 pb-16 text-center sm:px-6">
        <div className="flex max-w-3xl flex-col items-center gap-5">
          <p className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase sm:text-[11px] sm:tracking-[0.24em]">
            Product Designer &middot; Builder &middot; Problem Solver
          </p>

          <h1 className="max-w-[680px] text-[42px] leading-[1.06] font-bold tracking-tight text-balance text-slate-950 sm:text-[44px] sm:leading-[1.08] lg:text-[48px]">
            I design products from concept to shipped code.
          </h1>

          <p className="max-w-[500px] text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Helping founders move fast with clear design, strong user experience, and clean, scalable
            interfaces
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              See My Work
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            {/* Hidden on mobile: the nav's pill already covers booking there. */}
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 sm:inline-flex"
            >
              Book a Call
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue. Centred on a phone, in the corner once there is room. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 lg:left-14 lg:translate-x-0 lg:items-start"
      >
        <p className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
          Scroll to explore
        </p>
        <svg
          className="h-10 w-3 text-slate-400"
          viewBox="0 0 12 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M6 0v30" />
          <path d="M2 26l4 4 4-4" />
        </svg>
      </div>
    </section>
  );
}
