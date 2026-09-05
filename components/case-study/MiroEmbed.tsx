export function MiroEmbed({
  src,
  title,
  caption,
  aspectRatio,
}: {
  src: string;
  title: string;
  caption?: string;
  /**
   * CSS aspect-ratio (e.g. "8981/6491") matching this board's actual
   * moveToViewport region, so the iframe's shape fits the captured content
   * instead of letterboxing or cropping it. Defaults to the ratio tuned for
   * the intake board if omitted.
   */
  aspectRatio?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-bone-line bg-bone-deep shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
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

      {caption && <figcaption className="text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
