function AppMock({ variant }: { variant: 'list' | 'grid' | 'chat' }) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      {variant === 'list' && (
        <div className="flex-1 space-y-2 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <div className="h-2 w-24 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {variant === 'grid' && (
        <div className="flex-1 p-4">
          <div className="mb-3 h-2.5 w-1/3 rounded bg-slate-200" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      )}

      {variant === 'chat' && (
        <div className="flex flex-1 flex-col justify-end gap-2 p-4">
          <div className="ml-auto h-6 w-32 rounded-2xl bg-slate-900" />
          <div className="h-6 w-40 rounded-2xl bg-slate-100" />
          <div className="ml-auto h-6 w-24 rounded-2xl bg-slate-900" />
        </div>
      )}
    </div>
  );
}

const products = [
  {
    title: 'Talent Matching Engine',
    caption: 'Surfaces the three best-fit specialists instead of a long list to compare.',
    variant: 'list',
  },
  {
    title: 'Notifications Center',
    caption: 'Grouped by project, not by timestamp, so nothing urgent gets buried.',
    variant: 'list',
  },
  {
    title: 'Admin Analytics',
    caption: 'One dashboard ops actually opens every morning, not just at reporting time.',
    variant: 'grid',
  },
  {
    title: 'Referral Program',
    caption: 'Turned a plain discount code into a trackable, shareable link.',
    variant: 'grid',
  },
  {
    title: 'In-App Messaging',
    caption: 'Clients and talent resolve scope questions without leaving the platform.',
    variant: 'chat',
  },
  {
    title: 'Public Roadmap',
    caption: 'Gave prospects a reason to check back before they were even a client.',
    variant: 'grid',
  },
] as const;

export function OtherProducts() {
  return (
    <section id="other-products" className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-mono uppercase tracking-wider text-slate-500">
            Beyond This Flow
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Other products built for Aidoos
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            The proposal flow was the centerpiece, not the whole job. Here&apos;s some of the rest of
            the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.title}>
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <AppMock variant={p.variant} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
