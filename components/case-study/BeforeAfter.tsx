import Image from 'next/image';
import { Fragment } from 'react';

interface CompareImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  unoptimized?: boolean;
}

function Figure({ img, className = '' }: { img: CompareImage; className?: string }) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="rounded-xl bg-bone-deep p-3 sm:p-4">
        <div className="overflow-hidden rounded-lg border border-bone-line bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.3)]">
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
      </div>
      {img.caption && <figcaption className="text-xs text-slate-400">{img.caption}</figcaption>}
    </figure>
  );
}

/** Points right between side-by-side steps, down once they stack on mobile. */
function StepArrow() {
  return (
    <div
      aria-hidden
      className="flex shrink-0 rotate-90 items-center self-center text-slate-300 sm:rotate-0"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10h13M11 5l5 5-5 5" />
      </svg>
    </div>
  );
}

function Gallery({ images, sequence }: { images: CompareImage[]; sequence?: boolean }) {
  /* A sequence reads as one screen leading to the next, so the frames get
     arrows between them rather than sitting in a neutral grid. */
  if (sequence && images.length > 1) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {images.map((img, i) => (
          <Fragment key={img.src}>
            {i > 0 && <StepArrow />}
            <Figure img={img} className="min-w-0 sm:flex-1" />
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {images.map((img) => (
        <Figure key={img.src} img={img} />
      ))}
    </div>
  );
}

/**
 * The change, stated exactly once. This used to repeat itself: the section
 * intro, the "Before" blurb and the "Decision" blurb all said the same thing
 * in three slightly different ways. Now a single two-row block carries what
 * used to happen and what changed, and the visuals below take bare labels.
 */
export function BeforeAfter({
  before,
  after,
  beforeImages,
  afterImages,
  afterContent,
}: {
  /** What used to happen. One or two sentences. */
  before: string;
  /** What changed. One or two sentences. */
  after: string;
  beforeImages?: CompareImage[];
  afterImages?: CompareImage[];
  /** A live component instead of a static screenshot for the after side. */
  afterContent?: React.ReactNode;
}) {
  const hasAfterVisual = (afterImages?.length ?? 0) > 0 || !!afterContent;

  return (
    <div className="flex flex-col gap-10">
      <div className="overflow-hidden rounded-xl border border-bone-line">
        <div className="flex flex-col gap-2 border-b border-bone-line bg-bone p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
            What used to happen
          </p>
          <p className="max-w-2xl leading-7 text-slate-500">{before}</p>
        </div>
        <div className="flex flex-col gap-2 p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-emerald-600">
            What I changed
          </p>
          <p className="max-w-2xl leading-7 text-slate-800">{after}</p>
        </div>
      </div>

      {beforeImages && beforeImages.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
            Before
          </p>
          <Gallery images={beforeImages} sequence />
        </div>
      )}

      {hasAfterVisual && (
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-emerald-600">
            After
          </p>
          {afterImages && afterImages.length > 0 && <Gallery images={afterImages} />}
          {afterContent && (
            <div className="rounded-xl bg-bone-deep p-3 sm:p-4">
              <div className="overflow-hidden rounded-lg border border-bone-line bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.3)]">
                {afterContent}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
