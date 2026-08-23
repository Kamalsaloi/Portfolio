export function VideoEmbed({
  src,
  caption,
  breakout = true,
}: {
  src: string;
  caption?: string;
  /**
   * Widen past the article's narrow text column so the recording plays at a
   * readable size. Same min()-clamped width as MiroEmbed — never overflows
   * the viewport, no dependency on the article being centered.
   */
  breakout?: boolean;
}) {
  return (
    <figure
      className="my-12"
      style={breakout ? { width: 'min(1088px, calc(100vw - 32px))', maxWidth: 'none' } : undefined}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
        <video
          src={src}
          className="h-full w-full"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      {caption && <figcaption className="mt-3 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
