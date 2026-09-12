import Link from 'next/link';

export function CaseStudyNav({
  /** Match the host page's content column so the back link lines up with it. */
  containerClassName = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
}: {
  containerClassName?: string;
} = {}) {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-sm">
      <div className={`flex items-center justify-between py-4 ${containerClassName}`}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Portfolio
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Book a call
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 18 18">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 5.25V2.25m6 3V2.25m-6.751 6h7.5M3.749 15.75h10.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.749a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
