import Image from 'next/image';
import Link from 'next/link';

/* The mat gradient, carried over verbatim from the Paper artboard so the two
   stay identical: oklab stops with oklab interpolation, warm on the left
   easing through near-white to cool on the right. */
const MAT =
  'linear-gradient(in oklab 135deg, oklab(73.7% 0.067 0.122) 0%, oklab(89.7% 0.023 0.028) 50%, oklab(65.9% -0.040 -0.086) 100%)';

/**
 * The featured case study on the homepage. Vantage leads.
 *
 * Copy sits above the screen: the claim on the left, the summary and the link
 * on the right. No hover behaviour on the artwork by design, so everything the
 * section has to say is on screen at rest, including on touch.
 */
export function CaseStudy() {
  return (
    <section
      id="work"
      className="flex flex-col items-center gap-6 bg-[#FFFBF8] px-6 py-12 sm:px-10 lg:px-[50px]"
    >
      <div className="flex w-full max-w-[1180px] flex-col items-start justify-between gap-10 pb-6 lg:flex-row lg:gap-[120px]">
        <div className="flex flex-col gap-5 lg:flex-1">
          <h2 className="max-w-[620px] text-[clamp(28px,3.2vw,40px)] leading-[1.2] font-bold tracking-[-0.025em] text-[#15181F]">
            Vantage reads a company&apos;s job posts, reviews and tools, and tells it which work AI should take over first.
          </h2>
        </div>

        <div className="flex flex-col items-start justify-end gap-6 lg:flex-1">
          <p className="max-w-[600px] self-stretch text-[17px] leading-7 text-[#15181F]/70">
            Then AiDOOS builds it. Three decisions made a stranger trust it: show the value before
            asking, let them watch the research happen, and say plainly what it cannot know.
          </p>

          <Link
            href="/case-studies/vantage"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#989898] px-7 py-3.5 text-[15px] font-semibold text-[#15181F] transition-colors hover:bg-[#15181F]/5"
          >
            Read the case study
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <Link
        href="/case-studies/vantage"
        aria-label="Read the Vantage case study"
        className="flex w-full max-w-[1180px] items-center justify-center rounded-[20px] p-5 sm:p-9 lg:p-12"
        style={{ backgroundImage: MAT }}
      >
        <Image
          src="/vantage/loops-hero.webp"
          alt="The Vantage landing page: a headline reading 85% of leaders are spending more on AI, only 22% have scaled it, and a panel where public signals and connected tools feed into one suggested loop."
          width={2560}
          height={2081}
          priority
          sizes="(max-width: 1090px) 92vw, 1090px"
          className="h-auto w-full max-w-[1090px] rounded-[12px]"
        />
      </Link>
    </section>
  );
}
