import Image from 'next/image';
import { RampWordmark } from '@/components/case-study/RampWordmark';

type MockVariant = 'list' | 'feed' | 'grid';
/** 'ramp' renders the real production wordmark animation, not a placeholder. */
type Variant = MockVariant | 'ramp';

function Chrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-red-400" />
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
    </div>
  );
}

/**
 * Deliberately plain skeletons. Every item here is unwritten, so the
 * placeholder should signal "screens exist" without implying a level of
 * finish the write-up hasn't earned yet.
 */
function WorkMock({ variant }: { variant: MockVariant }) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <Chrome />

      {variant === 'list' && (
        <div className="flex flex-1 flex-col gap-2 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
            >
              <div className="h-2 w-24 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {variant === 'feed' && (
        <div className="flex flex-1 flex-col gap-3 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-7 w-7 shrink-0 rounded-full bg-slate-100" />
              <div className="flex flex-1 flex-col gap-1.5 pt-1">
                <div className="h-2 w-20 rounded-full bg-slate-200" />
                <div className="h-2 w-full rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {variant === 'grid' && (
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="h-2.5 w-1/3 rounded bg-slate-200" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkItem {
  title: string;
  status: string;
  /** A real screenshot. Falls back to a drawn skeleton when absent. */
  image?: { src: string; width: number; height: number };
  variant?: Variant;
}

const WORK: WorkItem[] = [
  {
    title: 'Talent onboarding flow',
    status: 'Case study coming soon',
    image: { src: '/talent-onboarding-flow.png', width: 2560, height: 1264 },
  },
  { title: 'RAMP course flow', status: 'Case study coming soon', variant: 'ramp' },
  { title: 'AiDOOS feed', status: 'Case study coming soon', variant: 'feed' },
  { title: 'Talent matching flow', status: 'Case study coming soon', variant: 'list' },
  { title: 'The execution platform', status: 'Case study coming soon', variant: 'grid' },
];

/**
 * The rest of the Aidoos work. One list, rendered on both the homepage and the
 * case study page with different framing copy, so the two can't drift apart.
 */
export function OtherWork({
  id,
  eyebrow,
  title,
  description,
  tone = 'bone',
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /**
   * Ground for the band. Set 'white' where a bone section already sits
   * directly below, so the two don't merge into one undifferentiated field.
   */
  tone?: 'bone' | 'white';
}) {
  return (
    <section
      id={id}
      className={`px-5 py-24 sm:px-10 lg:px-18 ${tone === 'bone' ? 'bg-bone' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex max-w-2xl flex-col gap-4 pb-14">
          <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-500">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
          <p className="text-lg leading-relaxed text-slate-500">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map((item) => (
            <div key={item.title} className="flex flex-col gap-4">
              <div
                className={`aspect-[4/3] overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  tone === 'bone' ? 'border-bone-line' : 'border-slate-200'
                } ${item.image ? 'bg-bone-deep' : 'bg-white'}`}
              >
                {item.image ? (
                  /* Anchored top at full width: cropping a wide page shot to 4:3
                     with object-cover would cut off the nav's outer edges. */
                  <Image
                    src={item.image.src}
                    alt={item.title}
                    width={item.image.width}
                    height={item.image.height}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                ) : item.variant === 'ramp' ? (
                  <RampWordmark />
                ) : (
                  <WorkMock variant={item.variant ?? 'list'} />
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
