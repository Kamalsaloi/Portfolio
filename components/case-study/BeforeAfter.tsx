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
      {/* Tinted well with a hairline outline rather than a border: outline
          takes no layout space, so the frame inside keeps its exact size. */}
      <div className="rounded-xl bg-card p-4 outline outline-[0.5px] outline-card-line">
        <div className="overflow-hidden rounded-lg border border-bone-line bg-white">
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
      {img.caption && <figcaption className="text-xs text-slate-800">{img.caption}</figcaption>}
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
 * The old state, then the new one, each stated once. "What used to happen"
 * gets a tinted callout panel; the change itself is the lead-in to the After
 * visual, so the reader meets the claim immediately above its evidence.
 */
export function BeforeAfter({
  before,
  after,
  beforeImages,
  afterImages,
  afterContent,
}: {
  /** What used to happen. Goes in the callout panel. */
  before: string;
  /** What changed. Introduces the After visual. */
  after: string;
  beforeImages?: CompareImage[];
  afterImages?: CompareImage[];
  /** A live component instead of a static screenshot for the after side. */
  afterContent?: React.ReactNode;
}) {
  const hasAfterVisual = (afterImages?.length ?? 0) > 0 || !!afterContent;

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-xl bg-card p-6 outline outline-[0.5px] outline-card-line">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-card-label">
            What used to happen
          </p>
          <p className="max-w-2xl leading-7 text-card-body">{before}</p>
        </div>
      </div>

      {beforeImages && beforeImages.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-before">
            Before
          </p>
          <Gallery images={beforeImages} sequence />
        </div>
      )}

      {hasAfterVisual && (
        <>
          {/* Marks the turn from the old state to the new one. */}
          <hr className="border-bone-line" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 pb-2">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-emerald-600">
                After
              </p>
              <p className="max-w-2xl leading-7 text-slate-800">{after}</p>
            </div>

            {afterImages && afterImages.length > 0 && <Gallery images={afterImages} />}
            {afterContent && (
              <div className="rounded-xl bg-card p-4 outline outline-[0.5px] outline-card-line">
                <div className="overflow-hidden rounded-lg border border-bone-line bg-white">
                  {afterContent}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
