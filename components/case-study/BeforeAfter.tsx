export function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="my-6 space-y-3">
      <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="shrink-0 pt-0.5 text-xs font-mono uppercase tracking-wider text-slate-400">Before</span>
        <p className="text-sm leading-relaxed text-slate-500">{before}</p>
      </div>
      <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <span className="shrink-0 pt-0.5 text-xs font-mono uppercase tracking-wider text-emerald-600">Decision</span>
        <p className="text-sm leading-relaxed text-slate-700">{after}</p>
      </div>
    </div>
  );
}
