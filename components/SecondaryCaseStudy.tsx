import Image from 'next/image';
import Link from 'next/link';

/**
 * The second case study, one step down from the featured Vantage block.
 *
 * It replaced a horizontal rail of Aidoos work that thinned out to a single
 * card, where a rail reads as mostly empty. It shares Vantage's 1180 column so
 * the two line up, but it is quieter on purpose: a smaller heading, a text
 * link instead of a pill, and a cropped glimpse of the proposal in a pale well
 * rather than a full screen on a gradient mat. The page runs off the bottom
 * edge, which says "long document" without having to show all of it.
 *
 * Copy is the case study's own title and deck, so the two can't disagree.
 */
export function SecondaryCaseStudy() {
  return (
    <section id="range" className="bg-white px-6 py-20 sm:px-10 lg:px-[50px]">
      <Link
        href="/case-studies/aidoos-proposal-flow"
        className="group mx-auto grid max-w-[1180px] grid-cols-1 overflow-hidden rounded-[20px] border border-slate-200 transition-shadow duration-300 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
          <div className="flex flex-col gap-4">
            <p className="text-[15px] text-slate-500">Also at Aidoos</p>
            <h2 className="text-2xl leading-[1.25] font-bold tracking-[-0.02em] text-balance text-[#15181F] sm:text-[28px]">
              Designing Aidoos&apos; AI proposal flow
            </h2>
            <p className="max-w-[440px] text-base leading-7 text-slate-500">
              From a single line of text to a signed, priced proposal. Every screen in between exists
              because a screen before it was cut.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#15181F]">
            Read the case study
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        <div className="relative h-[280px] overflow-hidden bg-card sm:h-[340px] lg:h-auto lg:min-h-[380px]">
          <div className="absolute inset-x-6 top-8 bottom-0 overflow-hidden rounded-t-[10px] border border-b-0 border-card-line/60 bg-white shadow-[0_10px_30px_-12px_rgba(20,40,90,0.25)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:inset-x-10 sm:top-10">
            <Image
              src="/aidoos-proposal-frame.png"
              alt="The start of a generated Aidoos proposal: a HealthTech patient portal, its summary, and the first of its priced modules."
              width={2560}
              height={5862}
              sizes="(max-width: 1024px) 88vw, 620px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Link>
    </section>
  );
}
