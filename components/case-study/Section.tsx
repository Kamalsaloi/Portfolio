export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-slate-100 py-16 last:border-b-0">
      <div className="flex flex-col gap-3 pb-6">
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      </div>
      <div className="space-y-5 leading-7 text-slate-600">{children}</div>
    </section>
  );
}
