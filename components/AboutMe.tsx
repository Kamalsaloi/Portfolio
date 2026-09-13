import Image from 'next/image';
import { Grain } from '@/components/case-study/Grain';

/**
 * The positioning statement, given a dark full-bleed band. This is the one
 * place on the site making an argument rather than showing work, so it gets
 * weight and a reading column instead of the scroll-reveal that preceded it:
 * that effect suits a single punchy line, not 250 words of substance.
 */
export function AboutMe() {
  return (
    <section id="about" className="relative overflow-hidden bg-void">
      <Grain opacity={0.05} />

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] lg:gap-16">
          {/* The portrait takes the left rail rather than sitting beside the
              prose: this section argues in the first person, so a face belongs
              at the start of it, not floating alongside. */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] w-[150px] shrink-0 overflow-hidden rounded-2xl bg-void-line ring-1 ring-white/10 lg:w-full">
              <Image
                src="/Kamal.webp"
                alt="Kamal Saloi"
                fill
                sizes="(max-width: 1024px) 150px, 180px"
                className="object-cover"
              />
            </div>

            <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-500">
              About
            </p>
          </div>

          <div className="flex max-w-2xl flex-col gap-8">
            <p className="text-2xl leading-[1.4] tracking-tight text-white sm:text-3xl sm:leading-[1.35]">
              I&apos;m a product designer who works differently from most: I design in the production
              codebase, not just in Figma.
            </p>

            <div className="flex flex-col gap-6 text-lg leading-relaxed text-slate-400">
              <p>
                That means I don&apos;t hand off static mockups and hope they survive the build. I
                design the flow, then ship the frontend myself.
              </p>
              <p>
                Over the last year I&apos;ve done this on a real B2B platform, taking products from a
                blank canvas to live, working software. Multiple landing pages, two full platform
                dashboards, and the flows connecting them. I make the calls most designers never
                touch: not just how a screen looks, but why a user moves through it the way they do,
                where they&apos;ll get stuck, and what a design decision costs or earns the business.
              </p>
              <p>
                The visual layer is table stakes now. What I actually do is the judgment underneath
                it. Deciding what&apos;s worth building, understanding the person who&apos;ll use it,
                and knowing enough about the code to build it right the first time.
              </p>
            </div>

            <p className="border-t border-void-line pt-8 text-lg leading-relaxed text-slate-200">
              If you&apos;re a founder who needs someone who can think about the product, design the
              experience, and ship it, that&apos;s the whole job I do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
