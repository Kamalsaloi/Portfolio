import Image from 'next/image';
import { Header } from '@/components/Header';

/**
 * Full-bleed hero built on the supplied plate images.
 *
 * Sticks to the top of the viewport at full height so the section that follows
 * can rise over it on scroll (see app/page.tsx). The nav lives inside here,
 * absolutely positioned over the image, which is what lets the hero occupy the
 * whole viewport instead of being pushed down by a header in normal flow.
 */
export function Hero() {
  return (
    <section className="sticky top-0 z-0 flex h-svh flex-col overflow-hidden bg-bone">
      {/* Plate. Portrait crop below md, landscape above: one scene, two
          framings, so the peak and the portal survive on a phone. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-full opacity-80 md:h-[115%]">
        <Image
          src="/Portfolio_hero_image_for_mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom md:hidden"
        />
        <Image
          src="/Portfolio_hero_image_for_desktop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-bottom md:block"
        />
      </div>

      <Header />

      {/* Handwritten note, left of the copy. */}
      <p
        aria-hidden
        className="font-hand pointer-events-none absolute top-1/2 left-4 z-20 -translate-y-1/2 text-lg leading-[1.2] text-[#5B8DEF] sm:left-8 sm:text-2xl lg:left-14 lg:text-[26px]"
      >
        Design
        <br />
        Build
        <br />
        Iterate
        <br />
        Ship
      </p>

      {/* Copy sits in the upper third, clear of the peak and the portal. */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-48 text-center sm:px-6 sm:pt-32 lg:pt-36">
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
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition-colors hover:bg-slate-800"
            >
              See My Work
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            {/* Hidden on mobile: the nav's pill already covers booking there. */}
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/10 backdrop-blur-sm transition-colors hover:bg-white sm:inline-flex"
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
        <p className="font-mono text-[10px] tracking-[0.18em] text-white uppercase drop-shadow-sm lg:text-slate-500 lg:drop-shadow-none">
          Scroll to explore
        </p>
        <svg
          className="h-10 w-3 text-white/90 lg:text-slate-400"
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
