/**
 * Visible stand-ins for content Kamal still has to supply. Deliberately
 * obvious (dashed, labelled) so an unfinished page can't pass for a finished
 * one, and so nothing plausible-sounding gets written in the meantime.
 */

export function TextSlot({ children }: { children: React.ReactNode }) {
  return (
    <span className="block rounded-lg border border-dashed border-slate-300 px-4 py-3 text-[15px] leading-6 text-slate-400 italic">
      {children}
    </span>
  );
}

export function ImageSlot({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-400 ${className}`}
    >
      {label}
    </div>
  );
}
