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
    <section id={id} className="scroll-mt-24 border-b border-slate-100 py-10 last:border-b-0">
      {eyebrow && <p className="mb-2 text-xs font-mono uppercase tracking-wider text-slate-400">{eyebrow}</p>}
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      <div className="space-y-4 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}
