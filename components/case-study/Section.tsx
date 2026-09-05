/**
 * One decision, as a white card on the bone ground. The card edge is what
 * makes the article scannable: on a flat white page the sections ran together
 * and the eye had nothing to catch.
 *
 * The card spans the full content width while paragraphs stay capped at a
 * reading measure, so wide visuals sit flush inside it and no child needs a
 * viewport-width breakout hack to escape a narrow text column.
 *
 * Continuity between decisions is carried by the body copy itself, which
 * opens with what the next screen is. A separate lead-in only restated it.
 */
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
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-bone-line bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      <div className="flex flex-col gap-3 pb-8">
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      </div>

      <div className="flex flex-col gap-8 leading-7 text-slate-600 [&>p]:max-w-2xl">{children}</div>
    </section>
  );
}
