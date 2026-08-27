import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { Section } from '@/components/case-study/Section';
import { BeforeAfter } from '@/components/case-study/BeforeAfter';
import { AidoosHeroReplica } from '@/components/case-study/aidoos-hero/AidoosHeroReplica';
import { ScaledFrame } from '@/components/case-study/aidoos-hero/ScaledFrame';
import { MiroEmbed } from '@/components/case-study/MiroEmbed';
import { VideoEmbed } from '@/components/case-study/VideoEmbed';
import { OtherProducts } from '@/components/case-study/OtherProducts';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "Aidoos Proposal Flow: Case Study",
  description:
    "How I redesigned Aidoos' AI-generated proposal flow, from a homepage chat input to outcome-based pricing.",
};

export default function AidoosCaseStudy() {
  return (
    <div className="min-h-screen bg-white">
      <CaseStudyNav />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-mono uppercase tracking-wider text-slate-400">Case Study</p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Designing Aidoos&apos; AI Proposal Flow
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-500">
            From a single line of text to a signed, priced proposal. Every screen in between exists
            because a screen before it was cut.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <p className="mb-0.5 text-xs text-slate-400">Role</p>
              <p className="font-medium text-slate-900">Product Designer</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-slate-400">Company</p>
              <p className="font-medium text-slate-900">Aidoos</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs text-slate-400">Focus</p>
              <p className="font-medium text-slate-900">Intake, Proposal, Pricing</p>
            </div>
          </div>
        </div>

        <div>
          <article className="max-w-2xl">
            <Section id="overview" title="Overview">
              <p>
                At Aidoos, a client&apos;s first real interaction with us is an AI-generated proposal,
                built from a few sentences they type, with no sales call in between. That makes this
                flow the single highest-stakes surface we own: it either earns enough trust for someone
                to hand over their email, or it quietly loses them. Everything below is a decision I
                made to close that gap, roughly in the order I made it.
              </p>
            </Section>

            <Section id="chat-input" eyebrow="Decision 01" title="Type right there">
              <p>
                The flow used to open a modal before you could describe what you wanted: a screen
                whose only job was to ask you to open another screen. I removed it. The chat input now
                lives directly in the homepage hero: the moment someone has an idea, they&apos;re
                already typing it.
              </p>
              <BeforeAfter
                before="A modal stood between the homepage and the chat input: one extra click, one extra screen, before a user could say anything at all."
                after="The chat input sits directly in the hero. No modal, no in-between screen. You land, you type."
                beforeImages={[
                  {
                    src: '/Previous_hero_section.png',
                    alt: 'The previous homepage, a generic agency-style hero with no chat input in it',
                    width: 1849,
                    height: 917,
                    caption: 'The old homepage: no chat input on it',
                  },
                  {
                    src: '/Previous_modal_when_clicked_on_chat_input.png',
                    alt: 'The modal that used to open before someone could describe their project',
                    width: 1920,
                    height: 951,
                    caption: 'The modal it opened into first',
                  },
                ]}
                afterContent={
                  <ScaledFrame nativeWidth={1280} nativeHeight={712}>
                    <AidoosHeroReplica />
                  </ScaledFrame>
                }
              />
            </Section>

            <Section
              id="reading-screen"
              eyebrow="Decision 02"
              title="Show them you're actually reading it"
            >
              <p>
                Right after submit, before any questions, there&apos;s a short screen that narrates
                what the system is doing with what they just wrote: reading the brief, pulling out
                modules, estimating time. It&apos;s not a spinner. It&apos;s the first proof, before
                anything else is shown, that their words are actually going somewhere.
              </p>
              <VideoEmbed
                src="/Intake.mp4"
                caption="The actual screen: reading, then narrating what it found."
              />
            </Section>

            <Section
              id="intake"
              eyebrow="Decision 03: the single most important screen"
              title="Understanding, not a form"
            >
              <p>
                Every person typing into that box is silently asking the same question: did they get
                me? This screen answers it before asking anything else: the rest is what each part of
                it is actually doing.
              </p>
              <MiroEmbed
                src="https://miro.com/app/live-embed/uXjVHx2NjHA=/?embedMode=view_only_without_ui&moveToViewport=-1734,-922,3424,1706&embedId=239957103818"
                title="Annotated walkthrough of the intake screen"
                caption="Scroll or drag inside the board to explore each callout."
              />
            </Section>

            <Section id="proposal-page" eyebrow="Decision 04" title="A page, not a modal">
              <p>
                The proposal itself used to render inside a modal, and the structure inside it was
                broken: sections dumped with no clear order. I moved it to its own page, with its own
                URL. A modal is for a decision you make and dismiss. A proposal is a document you read,
                closer to an article than a dialog, and reading tools like Medium don&apos;t put long
                text inside a dialog box.
              </p>
              <p>
                That&apos;s also why the page has a fixed max-width instead of spanning the full
                viewport. Eyes track a narrow column far more comfortably than the full width of a
                screen: a full-width proposal would be genuinely tiring to read, not just less
                polished. This case study page uses the same constraint, for the same reason.
              </p>
              <MiroEmbed
                src="https://miro.com/app/live-embed/uXjVHx2NjHA=/?embedMode=view_only_without_ui&moveToViewport=2804,-1251,8981,6491&embedId=157172711105"
                title="Map of the full proposal, annotated section by section"
                caption="Zoomed out on purpose: this is the ordering argument, not the copy."
                aspectRatio="8981/6491"
              />
            </Section>
          </article>
        </div>
      </div>

      <OtherProducts />
      <CTA />

      <Footer />
    </div>
  );
}
