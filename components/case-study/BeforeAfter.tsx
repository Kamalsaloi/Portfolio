import Image from 'next/image';

interface CompareImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  unoptimized?: boolean;
}

function ImageGallery({ images, tint }: { images: CompareImage[]; tint: 'slate' | 'emerald' }) {
  return (
    <div className={`mt-4 grid grid-cols-1 gap-3 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {images.map((img) => (
        <figure key={img.src}>
          <div
            className={`overflow-hidden rounded-lg border shadow-sm ${
              tint === 'emerald' ? 'border-emerald-200' : 'border-slate-200'
            }`}
          >
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
          {img.caption && (
            <figcaption className="mt-1.5 text-xs text-slate-400">{img.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
  beforeImages,
  afterImages,
}: {
  before: string;
  after: string;
  beforeImages?: CompareImage[];
  afterImages?: CompareImage[];
}) {
  const hasImages = (beforeImages?.length ?? 0) > 0 || (afterImages?.length ?? 0) > 0;

  return (
    <div
      className="my-6 space-y-3"
      style={hasImages ? { width: 'min(1088px, calc(100vw - 32px))', maxWidth: 'none' } : undefined}
    >
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex gap-3">
          <span className="shrink-0 pt-0.5 text-xs font-mono uppercase tracking-wider text-slate-400">
            Before
          </span>
          <p className="text-sm leading-relaxed text-slate-500">{before}</p>
        </div>
        {beforeImages && beforeImages.length > 0 && (
          <ImageGallery images={beforeImages} tint="slate" />
        )}
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex gap-3">
          <span className="shrink-0 pt-0.5 text-xs font-mono uppercase tracking-wider text-emerald-600">
            Decision
          </span>
          <p className="text-sm leading-relaxed text-slate-700">{after}</p>
        </div>
        {afterImages && afterImages.length > 0 && (
          <ImageGallery images={afterImages} tint="emerald" />
        )}
      </div>
    </div>
  );
}
