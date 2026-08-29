import Image from 'next/image';

interface CompareImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  unoptimized?: boolean;
}

function ImageGallery({ images }: { images: CompareImage[] }) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {images.map((img) => (
        <figure key={img.src} className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              unoptimized={img.unoptimized}
              className="h-auto w-full"
              sizes="(max-width: 640px) 90vw, 45vw"
            />
          </div>
          {img.caption && <figcaption className="text-xs text-slate-400">{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/**
 * A before/decision pair. Deliberately unboxed: the label and a hairline carry
 * the structure, matching the case study hero's grid, so two stacked panels of
 * tinted background don't fight the screenshots for attention. The one accent
 * is the small emerald "Decision" label.
 */
export function BeforeAfter({
  before,
  after,
  beforeImages,
  afterImages,
  afterContent,
}: {
  before: string;
  after: string;
  beforeImages?: CompareImage[];
  afterImages?: CompareImage[];
  /** A live component instead of a static screenshot for the Decision side. */
  afterContent?: React.ReactNode;
}) {
  const hasVisuals =
    (beforeImages?.length ?? 0) > 0 || (afterImages?.length ?? 0) > 0 || !!afterContent;

  return (
    <div
      className="my-14 flex flex-col gap-14"
      style={hasVisuals ? { width: 'min(1088px, calc(100vw - 32px))', maxWidth: 'none' } : undefined}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
            Before
          </p>
          <p className="max-w-2xl leading-7 text-slate-500">{before}</p>
        </div>
        {beforeImages && beforeImages.length > 0 && <ImageGallery images={beforeImages} />}
      </div>

      <hr className="border-slate-200" />

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-emerald-600">
            Decision
          </p>
          <p className="max-w-2xl leading-7 text-slate-700">{after}</p>
        </div>
        {afterImages && afterImages.length > 0 && <ImageGallery images={afterImages} />}
        {afterContent && (
          <div className="overflow-hidden rounded-xl border border-slate-200">{afterContent}</div>
        )}
      </div>
    </div>
  );
}
