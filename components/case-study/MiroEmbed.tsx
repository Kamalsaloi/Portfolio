export function MiroEmbed({
  src,
  title,
  caption,
  breakout = true,
  aspectRatio,
}: {
  src: string;
  title: string;
  caption?: string;
  /**
   * Widen past the article's narrow text column so the board fills the
   * page's content width. Capped with min() against 100vw so it can never
   * overflow the viewport, with no dependency on the article being centered
   * or left-aligned, unlike the old translate-based full-bleed trick.
   * Turn off when placed inside its own layout (e.g. a side-by-side grid).
   */
  breakout?: boolean;
  /**
   * CSS aspect-ratio (e.g. "8981/6491") matching this board's actual
   * moveToViewport region, so the iframe's shape fits the captured content
   * instead of letterboxing or cropping it. Defaults to the ratio tuned for
   * the intake board if omitted.
   */
  aspectRatio?: string;
}) {
  return (
    <figure
      className="my-12"
      style={breakout ? { width: 'min(1088px, calc(100vw - 32px))', maxWidth: 'none' } : undefined}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
        <div
          className={aspectRatio ? 'w-full' : 'aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[2/1]'}
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
            allow="fullscreen; clipboard-read; clipboard-write"
            allowFullScreen
          />
        </div>
      </div>

      {caption && <figcaption className="mt-3 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
