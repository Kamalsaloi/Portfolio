import { notFound } from 'next/navigation';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { Grain } from '@/components/case-study/Grain';
import { Section } from '@/components/case-study/Section';
import { BeforeAfter } from '@/components/case-study/BeforeAfter';
import { HeroVisual } from '@/components/redesigns/HeroVisual';
import { OtherRedesigns } from '@/components/redesigns/OtherRedesigns';
import { ImageSlot, TextSlot } from '@/components/redesigns/Placeholder';
import { REDESIGNS, getRedesign } from '@/components/redesigns/data';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

type Props = { params: Promise<{ slug: string }> };

/* Only the three in data.ts exist; anything else is a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return REDESIGNS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const item = getRedesign((await params).slug);
  if (!item) return {};
  return {
    title: `${item.name} hero redesign`,
    description: `The ${item.name} hero, before and after the redesign.`,
  };
}

export default async function RedesignPage({ params }: Props) {
  const item = getRedesign((await params).slug);
  if (!item) notFound();

  const { before, after } = item;

  return (
    <div className="min-h-screen bg-white">
      <CaseStudyNav />

      {/* Same cover as the Aidoos case study, cut down: a redesign has no
          role or focus list worth a column, just what the product is. */}
      <div className="relative overflow-hidden bg-bone">
        <Grain />
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 px-5 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-18">
          <div className="flex flex-col items-start gap-5 py-12 lg:border-r lg:border-bone-line lg:pr-16">
            <div className="flex flex-col items-start gap-3">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                Hero redesign
              </p>
              <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 sm:text-[40px] sm:leading-[50px]">
                {item.name}
              </h1>
            </div>
            <div className="max-w-[650px] leading-7 text-slate-500">
              {item.context ?? <TextSlot>One line on what {item.name} is and who it is for.</TextSlot>}
            </div>
          </div>

          {item.site && (
            <div className="flex flex-col gap-1.5 border-t border-bone-line py-12 lg:border-t-0 lg:pl-16 lg:text-right">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                Live site
              </p>
              <a
                href={item.site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium leading-5 text-[#2D5BFF] transition-colors hover:text-[#1E3FCC]"
              >
                {item.site.label}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="bg-bone">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-10 lg:px-18">
          <Section id="before-after" title="Before and after">
            <BeforeAfter
              before={
                before.reasoning ?? (
                  <TextSlot>Reasoning: what was wrong with the old hero.</TextSlot>
                )
              }
              beforeImages={before.images}
              beforeContent={
                before.images?.length ? undefined : (
                  <ImageSlot
                    className="aspect-[16/9]"
                    label={`Screenshot of the original ${item.name} hero`}
                  />
                )
              }
              after={
                after.reasoning ?? (
                  <TextSlot>Reasoning: the thinking behind the redesign.</TextSlot>
                )
              }
              afterContent={<HeroVisual item={item} />}
            />
          </Section>
        </div>
      </div>

      <section className="px-5 py-24 sm:px-10 lg:px-18">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Other redesigns
          </h2>
          <OtherRedesigns tone="light" exclude={item.slug} />
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
