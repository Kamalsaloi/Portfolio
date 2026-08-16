function MockFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function ChatInputMock() {
  return (
    <MockFrame>
      <div className="space-y-4 py-6 text-center">
        <div className="mx-auto h-3 w-40 rounded-full bg-slate-200" />
        <div className="mx-auto h-6 w-64 rounded bg-slate-300" />
        <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="flex-1 text-left text-sm text-slate-400">Describe what you want to build&hellip;</span>
          <span className="text-xs font-mono text-slate-300">42/100</span>
        </div>
      </div>
    </MockFrame>
  );
}

export function LoadingMock() {
  const steps = ['Reading your brief', 'Identifying modules', 'Estimating timeline'];
  return (
    <MockFrame>
      <div className="mx-auto max-w-sm space-y-4 py-6">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                i === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i === 0 ? '✓' : i + 1}
            </span>
            <span className={`h-2.5 rounded-full ${i === 0 ? 'w-40 bg-slate-300' : 'w-32 bg-slate-100'}`} />
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export function ProposalHeroMock() {
  return (
    <MockFrame>
      <div className="mx-auto max-w-md space-y-3 text-center">
        <div className="mx-auto h-5 w-64 rounded bg-slate-300" />
        <div className="mx-auto h-2.5 w-72 rounded-full bg-slate-100" />
        <div className="mx-auto h-2.5 w-56 rounded-full bg-slate-100" />
        <span className="mt-3 inline-block rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-500">
          Refine
        </span>
      </div>
    </MockFrame>
  );
}

export function ModuleMock() {
  const modules = [
    { title: 'User Authentication', time: '3 days' },
    { title: 'Payments Integration', time: '5 days' },
    { title: 'Admin Dashboard', time: '4 days' },
  ];
  return (
    <MockFrame>
      <div className="space-y-3">
        {modules.map((m) => (
          <div key={m.title} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
            <div className="space-y-1.5">
              <div className="h-2.5 w-32 rounded-full bg-slate-300" />
              <div className="h-2 w-48 rounded-full bg-slate-100" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">{m.time}</span>
              <span className="h-6 w-6 rounded-md border border-slate-200" />
              <span className="h-6 w-6 rounded-md border border-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export function GanttMock() {
  const bars = [
    { label: 'Auth', start: 0, span: 3 },
    { label: 'Payments', start: 2, span: 4 },
    { label: 'Dashboard', start: 3, span: 3 },
  ];
  const totalCols = 7;
  return (
    <MockFrame>
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-slate-400">{b.label}</span>
            <div className="relative h-6 flex-1 rounded-md bg-slate-50">
              <div
                className="absolute h-6 rounded-md bg-slate-900"
                style={{ left: `${(b.start / totalCols) * 100}%`, width: `${(b.span / totalCols) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export function ArchitectureMock() {
  const cards = [
    { title: 'Scales without a rewrite', desc: 'Handles 10x users without new infrastructure' },
    { title: 'Fails safely', desc: 'One module going down never takes the rest with it' },
    { title: 'Ships weekly, not monthly', desc: 'Independent modules deploy on their own schedule' },
    { title: 'Cheaper to run', desc: 'Pay for what is used, not for idle servers' },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((c) => (
        <div key={c.title} className="space-y-2 rounded-xl border border-slate-200 bg-white p-4">
          <span className="inline-block h-6 w-6 rounded-lg bg-slate-900" />
          <p className="text-sm font-semibold text-slate-900">{c.title}</p>
          <p className="text-xs leading-relaxed text-slate-500">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function RiskMock() {
  const rows = [
    { risk: 'Third-party API rate limits', mitigation: 'Cached fallback with queued retries' },
    { risk: 'Scope creep mid-build', mitigation: 'Locked module boundaries, refine before build starts' },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.risk} className="overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            <span className="text-sm text-slate-700">{r.risk}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-700">{r.mitigation}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PricingMock() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-5 text-center">
          <p className="mb-2 text-xs font-mono uppercase tracking-wider text-slate-400">Without AI Agents</p>
          <p className="text-2xl font-bold text-slate-300 line-through">$18,400</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 text-center">
          <p className="mb-2 text-xs font-mono uppercase tracking-wider text-emerald-600">With AI Agents</p>
          <p className="text-2xl font-bold text-slate-950">$11,200</p>
          <p className="mt-1 text-xs font-medium text-emerald-600">39% saved</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-950">1 Delivery Unit (DU) = $160.</span> Priced on
          outcome, not hours — a bug fix is 1 DU whether it takes 4 hours or 20.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {['Starter', 'Scale', 'Volume', 'Enterprise'].map((tier) => (
          <div key={tier} className="space-y-2 rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-sm font-semibold text-slate-950">{tier}</p>
            <div className="mx-auto h-2 w-12 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
