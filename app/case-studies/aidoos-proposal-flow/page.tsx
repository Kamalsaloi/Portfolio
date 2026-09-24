import Image from 'next/image';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { Grain } from '@/components/case-study/Grain';
import { Section } from '@/components/case-study/Section';
import { BeforeAfter } from '@/components/case-study/BeforeAfter';
import { AidoosHeroReplica } from '@/components/case-study/aidoos-hero/AidoosHeroReplica';
import { ScaledFrame } from '@/components/case-study/aidoos-hero/ScaledFrame';
import { MiroEmbed } from '@/components/case-study/MiroEmbed';
import { VideoEmbed } from '@/components/case-study/VideoEmbed';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "Aidoos Proposal Flow: Case Study",
  description:
    "How I redesigned Aidoos' AI-generated proposal flow, from a homepage chat input to outcome-based pricing.",
};

/** Everything after a client accepts the proposal, designed in Paper. */
const AFTER_ACCEPT_FLOW = 'https://app.paper.design/file/01M38PC46GZWZ15TAPT5QW4MFW/p-1-0';

/* Three of the 21 screens in that file, exported at 1x from Paper, one per
   stage so they read as a sequence rather than three views of one page. */
const AFTER_ACCEPT_SHOTS = [
  {
    src: '/Aidoos_screenshots/after-accept/sign-sow.webp',
    width: 1440,
    height: 986,
    caption: 'Sign the Statement of Work',
    alt: 'Project formation: the matched team of four experts and three AI agents, with a stepper at SOW signing and a button to proceed',
  },
  {
    src: '/Aidoos_screenshots/after-accept/fund-wallet.webp',
    width: 1440,
    height: 996,
    caption: 'Fund the wallet',
    alt: 'The fund-your-wallet drawer: a progress bar toward the 48 DUs the project needs, and three DU packs with the minimum to start marked',
  },
  {
    src: '/Aidoos_screenshots/after-accept/workspace-board.webp',
    width: 1440,
    height: 790,
    caption: 'Run the project from the workspace',
    alt: 'The project workspace board: tasks across Backlog, To Do, In Progress, In Review and Done, each with DUs, priority and due date',
  },
];

export default function AidoosCaseStudy() {
  return (
    <div className="min-h-screen bg-white">
      <CaseStudyNav />

      {/* Hero band — a warm, grained ground so the opening reads as a cover
          rather than more of the same white page */}
      <div className="relative overflow-hidden bg-bone">
        <Grain />
        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-10 lg:px-18">
          {/* An editorial grid: hairlines carry the structure, not spacing alone */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Row 1 · Eyebrow, title, deck */}
          <div className="flex flex-col items-start gap-5 py-12 lg:border-r lg:border-bone-line lg:pr-16">
            <div className="flex flex-col items-start gap-3">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                Case Study
              </p>
              <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 sm:text-[40px] sm:leading-[50px]">
                Designing Aidoos&apos; AI Proposal Flow
              </h1>
            </div>
            <p className="max-w-[650px] leading-6 text-slate-500">
              From a single line of text to a signed, priced proposal. Every screen in between exists
              because a screen before it was cut.
            </p>
          </div>

          {/* Row 1 · Role */}
          <div className="flex flex-col gap-1.5 border-t border-bone-line py-12 lg:border-t-0 lg:pl-16 lg:text-right">
            <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
              Role
            </p>
            <p className="text-sm font-medium leading-5 text-slate-900">
              Product Designer/Design engineer
            </p>
          </div>

          {/* Row 2 · What Aidoos is */}
          <div className="flex flex-col items-start gap-3 border-t border-bone-line py-12 lg:border-r lg:border-bone-line lg:pr-16">
            <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
              Product Context
            </p>
            <p className="leading-7 text-[#1A212C]">
              Aidoos builds software for companies without them having to hire a team. A client
              describes what they need, and Aidoos assembles a Virtual Delivery Center: certified
              specialists plus AI agents who run the build end to end. Clients pay for defined
              outcomes rather than headcount or hours.
            </p>
          </div>

          {/* Row 2 · Company and Focus */}
          <div className="flex justify-between gap-8 border-t border-bone-line py-12 lg:pl-16 lg:text-right">
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                Company
              </p>
              <a
                href="https://aidoos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 self-start rounded-md text-sm font-medium leading-5 text-[#2D5BFF] transition-colors hover:text-[#1E3FCC] lg:self-end"
              >
                Aidoos
                <svg
                  className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 8.5 8.5 3.5M8.5 3.5h-4.5M8.5 3.5v4.5" />
                </svg>
              </a>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-400">
                Focus
              </p>
              <div className="flex flex-col gap-1.5 text-sm font-medium leading-5 text-slate-900">
                <p>Intake</p>
                <p>Proposal</p>
                <p>Pricing</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* The thesis, as its own dark beat: the one claim the whole case study
          rests on, given the weight of a full-bleed band instead of being one
          more section in the white run */}
      <section id="overview" className="relative overflow-hidden bg-void">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-18">
          <div className="flex max-w-3xl flex-col gap-6">
            <p className="font-mono text-[11px] uppercase leading-[15px] tracking-wider text-slate-500">
              Why this flow matters
            </p>
            <p className="text-xl leading-relaxed text-slate-200 sm:text-2xl sm:leading-[1.55]">
              A client&apos;s first real interaction with us is an AI-generated proposal, built from a
              few sentences they type, with no sales call in between. That makes this flow the single
              highest-stakes surface we own: it either earns enough trust for someone to hand over
              their email, or it quietly loses them.
            </p>
            <p className="max-w-xl leading-7 text-slate-400">
              Everything below is a decision I made to close that gap, roughly in the order I made it.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-bone">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 lg:px-18">
          <article className="flex flex-col gap-6">
            <Section id="chat-input" eyebrow="Decision 01" title="Type right there">
              <BeforeAfter
                before="You landed on the homepage, clicked, and a modal opened just to ask what you wanted. Two screens before you could type a word, each click is a friction point, drop off rate was higher."
                after="The chat input sits in the hero. You land, you type right there."
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
                    caption: 'The modal it opened after clicking ChatGPT for Work',
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
                The next screen is a short one that narrates what the system is doing with what
                they wrote: reading the brief, pulling out modules, estimating time. Not a spinner.
                The first proof their words went somewhere, because they might be skeptical if it is
                just a template or an actual engine
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
                The next screen is where that trust is won or lost. Earlier, it used to generate
                the proposal with just the typed input.. a 100 char input is not enough to build a
                business plan, we needed more context.. This screen gets that context after making
                sure it provides value before asking, zoom in and out to read the thought behind
                each section...
              </p>
              <MiroEmbed
                src="https://miro.com/app/live-embed/uXjVHx2NjHA=/?embedMode=view_only_without_ui&moveToViewport=-1734,-922,3424,1706&embedId=239957103818"
                title="Annotated walkthrough of the intake screen"
                caption="Scroll or drag inside the board to explore each callout."
              />
            </Section>

            <Section
              id="proposal-page"
              eyebrow="Decision 04"
              title="A page, not a modal"
            >
              <p>
                The next screen is finally the proposal... It used to come as a modal but modal is
                for a decision you make and dismiss. A proposal is a document you read. So I moved
                it to its own page, with its own URL, and gave the sections a real order. The page
                is capped at a fixed width too, easier for the eye to read just like medium articles
              </p>
              <MiroEmbed
                src="https://miro.com/app/live-embed/uXjVHq7orEg=/?embedMode=view_only_without_ui&moveToViewport=-3666,-5600,4847,7043&embedId=33017458526"
                title="Map of the full proposal, annotated section by section"
                caption="Zoomed out on purpose: this is the ordering argument, not the copy."
                aspectRatio="4847/7043"
              />
            </Section>

            {/* The case study stops at the proposal; the rest of the flow lives
                in Paper. Three snapshots and a screen count set the expectation
                that the link opens a whole flow, not one more picture. */}
            <a
              href={AFTER_ACCEPT_FLOW}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-8 rounded-2xl border border-bone-line bg-white px-5 py-8 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.3)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  After the proposal is accepted
                </h2>
                <p className="max-w-2xl leading-7 text-slate-600">
                  Once a client says yes, the team is matched, the SOW is signed, the wallet is
                  funded, and the project goes live in its workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {AFTER_ACCEPT_SHOTS.map((shot, i) => (
                  <figure key={shot.src} className="flex flex-col gap-3">
                    <div className="rounded-xl bg-card p-2.5 outline outline-[0.5px] outline-card-line">
                      <div className="aspect-[16/10] overflow-hidden rounded-lg border border-bone-line bg-white">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          sizes="(max-width: 640px) 90vw, 30vw"
                          className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                    <figcaption className="text-sm text-slate-600">
                      <span className="text-slate-400 tabular-nums">0{i + 1}</span> {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-bone-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  21 screens in the full flow, desktop and mobile.
                </p>
                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white">
                  See them all in Paper
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3.5 8.5 8.5 3.5M8.5 3.5h-4.5M8.5 3.5v4.5" />
                  </svg>
                </span>
              </div>
            </a>
          </article>
        </div>
      </div>

      <CTA />

      <Footer />
    </div>
  );
}
