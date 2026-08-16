export function Hero() {
  return (
    <section className="pt-20 pb-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-600">
            Product Designer &middot; Builder &middot; Problem Solver
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-950 tracking-tight leading-[1.05] mb-8 text-balance">
          I design products from concept to shipped code.
        </h1>

        <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Helping founders move fast with clear design, strong user experience, and clean, scalable interfaces.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
            See My Work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
            Book a Call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
