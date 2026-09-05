export function VideoEmbed({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-bone-line bg-bone-deep shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
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

      {caption && <figcaption className="text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
