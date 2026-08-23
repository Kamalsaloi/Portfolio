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

