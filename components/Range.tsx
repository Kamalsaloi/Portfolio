function LandingMock() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
        <div className="h-2.5 w-20 rounded-full bg-slate-200" />
        <div className="h-4 w-32 rounded bg-slate-300" />
        <div className="h-2 w-24 rounded-full bg-slate-100" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-900" />
          <div className="h-6 w-16 rounded-full border border-slate-200" />
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="flex h-full w-full bg-white">
      <div className="flex w-9 shrink-0 flex-col gap-2 border-r border-slate-100 p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 rounded-md bg-slate-100" />
        ))}
      </div>
      <div className="flex-1 space-y-2 p-3">
        <div className="h-2.5 w-1/3 rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 rounded-md bg-slate-100" />
          <div className="h-8 rounded-md bg-slate-100" />
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100" />
        <div className="h-2 w-4/5 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

const items = [
  {
    type: 'landing',
    title: 'Marketing Site',
    caption: 'Split-tested the hero headline against three variants before launch.',
  },
  {
    type: 'landing',
    title: 'Pricing Page',
    caption: 'Led with social proof above the fold to cut early bounce rate.',
  },
  {
    type: 'dashboard',
    title: 'Client Dashboard',
    caption: 'Built around task status, not raw tables — clients scan it in seconds.',
  },
  {
    type: 'dashboard',
    title: 'Talent Dashboard',
    caption: 'One glance shows earnings and active work — the thing talents check daily.',
  },
  {
    type: 'landing',
    title: 'Signup Flow',
    caption: 'Cut onboarding from twelve fields to four to raise completion.',
  },
  {
    type: 'dashboard',
    title: 'Ops Console',
    caption: 'Internal tool so ops could resolve disputes without filing an engineering ticket.',
  },
] as const;

export function Range() {
  return (
    <section id="range" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
            Beyond the Core Product
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight mb-4">
            The range behind the depth
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Alongside the core platform, I designed and shipped the surrounding surfaces —
            landing pages, and both the client-side and talent-side dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item) => (
            <div key={item.title}>
              <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                {item.type === 'landing' ? <LandingMock /> : <DashboardMock />}
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
