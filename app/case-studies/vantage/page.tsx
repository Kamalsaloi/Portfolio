import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { SectionNav } from '@/components/vantage/SectionNav';
import { ReportViewer } from '@/components/vantage/ReportViewer';
import { ThinkingScreen } from '@/components/vantage/ThinkingScreen';
import { Mat, MatSlot } from '@/components/vantage/Mat';
import { FitWidth } from '@/components/redesigns/FitWidth';
import {
  LandingHeroVisual,
  LANDING_HERO_WIDTH,
  LANDING_HERO_HEIGHT,
} from '@/components/vantage/visuals/LandingHeroVisual';
import {
  HowItWorksVisual,
  HOW_IT_WORKS_WIDTH,
  HOW_IT_WORKS_HEIGHT,
} from '@/components/vantage/visuals/HowItWorksVisual';
import {
  RingVisual,
  TrailVisual,
  TrackVisual,
  LOOP_TRY_WIDTH,
} from '@/components/vantage/visuals/LoopTries';
import {
  LoopSectionVisual,
  LOOP_SECTION_WIDTH,
  LOOP_SECTION_HEIGHT,
} from '@/components/vantage/visuals/LoopSectionVisual';
import {
  IndustriesRailVisual,
  INDUSTRIES_RAIL_WIDTH,
  INDUSTRIES_RAIL_HEIGHT,
} from '@/components/vantage/visuals/IndustriesRailVisual';
import { ReportGated, REPORT_WIDTH } from '@/components/vantage/visuals/ReportGated';
import { ReportCase } from '@/components/vantage/visuals/ReportCase';
import { CTA } from '@/components/CTA';
import { PERSON_ID, SITE_URL, jsonLd } from '@/lib/site';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Vantage: finding the one process worth fixing',
  description:
    'Designing Vantage, an AI that finds a broken process in a company and suggests a loop that fixes it, and the decisions that made a stranger believe it.',
  alternates: { canonical: '/case-studies/vantage' },
};

const CASE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Vantage: finding the one process worth fixing',
  headline: 'Vantage case study by Kamal Saloi',
  description: metadata.description,
  url: `${SITE_URL}/case-studies/vantage`,
  author: { '@id': PERSON_ID, '@type': 'Person', name: 'Kamal Saloi' },
  about: {
    '@type': 'SoftwareApplication',
    name: 'Vantage by AiDOOS',
    url: 'https://aidoos.com/vantage',
    applicationCategory: 'BusinessApplication',
  },
  keywords: ['product design', 'AI product', 'landing page', 'case study', 'UX'],
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'change', label: 'What changed' },
  { id: 'landing', label: 'The first screen' },
  { id: 'loop', label: 'Drawing a loop' },
  { id: 'industries', label: 'Industries' },
  { id: 'wait', label: 'The wait' },
  { id: 'report', label: 'The report' },
  { id: 'learned', label: 'What I learned' },
];

/* Where each report is cut before it is expanded, in the report's own
   pixels: the Paper crop height divided by its zoom (888 / 1280), so the cut
   lands where the design puts it. Slots that show a whole visual are given
   its full height instead, so they hold their shape before it measures. */
/** Gated report, collapsed just past the start of the second, locked loop. */
const REPORT_GATED_CROP = 1930.5;
/** One loop's case, collapsed partway into "How it runs". */
const REPORT_CASE_CROP = 1152.6;

/** Two column widths. Text-led bands use the wider one, visual-led bands
    the narrower, which leaves the mats a little air at the sides. */
const COLUMN = 'mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-[50px]';
const VISUAL_COLUMN = 'mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-[62px]';

/** Body copy under the visual sections. */
const BODY = 'text-[18px] leading-[1.66] text-v-ink/78';

/** The three pictures I tried for "a loop", in the order I tried them. */
const LOOP_TRIES = [
  {
    Visual: RingVisual,
    label: 'A glowing ring on a soft gradient, with seven step names placed around it.',
    caption: 'First try: a ring with seven labels. Correct, but it read like a textbook diagram.',
  },
  {
    Visual: TrailVisual,
    label: 'A hiker on a zigzag mountain trail, with the steps of a loop pinned to points along the path.',
    caption: "Then photos: a boat, a trail, a runner on a bend. But it's one way, not a loop.",
  },
  {
    Visual: TrackVisual,
    label:
      'A running track seen from above at dusk, a single runner on it, with the steps of a loop placed around the lap and an amber line bringing the last steps back to the runner.',
    caption: 'The one that I picked: a runner on a closed track. It comes back to the start.',
  },
];

const LESSONS = [
  {
    n: '01',
    lesson: 'People do not distrust AI because it gets things wrong.',
    body: 'They distrust it because they cannot see how it got there. The waiting screen and the "built from outside" note did more for trust than a smarter answer would have.',
  },
  {
    n: '02',
    lesson: 'Ask what hurts, not what they want.',
    body: 'The first Vantage suggested big ideas. The calls with distributors asked for something smaller: fix this one process. The product got more useful when it got narrower.',
  },
  {
    n: '03',
    lesson: 'A picture of a loop has to come back to the start.',
    body: 'I made a boat, a trail and a runner on a bend before I noticed they all went one way. The idea only made sense once the picture closed.',
  },
  {
    n: '04',
    lesson: 'A range you can explain beats a number you cannot.',
    body: 'One exact number looks confident until someone checks it against their own records. A range with its reason written underneath still holds up after they check.',
  },
];

/** Carries the eye from one screen to the next. */
function StepArrow() {
  return (
    <div aria-hidden className="flex justify-center py-14">
      <svg
        className="h-[72px] w-5 text-v-warm"
        viewBox="0 0 20 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 0v60" />
        <path d="M3 54l7 7 7-7" />
      </svg>
    </div>
  );
}

/**
 * A section's heading, set flush left with the column. The kicker is the
 * step's plain name and is optional: sections whose heading already says
 * where you are go without one.
 */
function StepHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-3.5">
      {kicker && <p className="text-[15px] leading-[1.5] text-v-warm">{kicker}</p>}
      <h2 className="max-w-[760px] text-[clamp(26px,3.4vw,36px)] leading-[1.14] font-bold tracking-[-0.02em] text-balance text-v-ink">
        {title}
      </h2>
    </div>
  );
}

export default function VantageCaseStudy() {
  return (
    <div className="bg-v-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(CASE_JSON_LD) }} />
      <CaseStudyNav containerClassName="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-[50px]" />
      <SectionNav sections={SECTIONS} />

      {/* Overview */}
      <header
        id="overview"
        className={`${COLUMN} flex scroll-mt-32 flex-col gap-16 py-16 sm:py-24 lg:flex-row`}
      >
        <div className="flex flex-col gap-8 lg:flex-1">
          <h1 className="text-[clamp(44px,7.2vw,84px)] leading-[0.976] font-bold tracking-[-0.035em] text-v-ink">
            Trust is the product.
          </h1>
          <p className="max-w-[756px] text-[19px] leading-[1.62] text-v-ink/72">
            Vantage finds processes in a company that they do manually with humans, and suggests an
            AI loop that does it for them and also keeps improving itself based on results. Then
            AiDOOS builds the loop. It works best from the company&apos;s own tools like Sales or
            project management tools. But nobody connects their tools to a product they have never
            seen, so the first report uses only public data: the website, job posts and reviews.
            That gives value before we ask for anything. The hard part was getting a stranger to
            believe it.
          </p>

          {/* The shipped product, one click away, before a word of the story. */}
          <a
            href="https://aidoos.com/vantage"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-v-ink/15 bg-white px-4 py-2 transition-colors hover:border-v-ink/35"
          >
            <span className="text-[15px] leading-[1.5] font-medium text-v-ink">
              aidoos.com/vantage
            </span>
            <svg
              className="h-4 w-4 text-v-ink/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-v-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <dl className="flex flex-col gap-6 border-t border-v-ink/12 pt-6 lg:w-[260px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] leading-[1.5] text-v-ink/45">Role</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Product design and frontend, end to end
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] leading-[1.5] text-v-ink/45">Scope</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Landing page, eight industry pages, the actual report
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] leading-[1.5] text-v-ink/45">Grounded in</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Competitor research, user conversations
            </dd>
          </div>
        </dl>
      </header>

      {/* What changed: the pivot from "what to build" to "which loop to close". */}
      <section
        id="change"
        className={`${COLUMN} flex scroll-mt-32 flex-col gap-10 py-24 lg:flex-row lg:gap-20`}
      >
        <h2 className="text-[clamp(26px,3.2vw,34px)] leading-[1.14] font-bold tracking-[-0.02em] text-balance text-v-ink lg:w-[377px] lg:shrink-0">
          Our customers told us what they actually needed.
        </h2>
        <div className="flex max-w-[620px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/75">
          <p>
            The first version of Vantage read a company and suggested new things to build. Then we
            talked to distributors, and leaders from a past client... they told us what they really
            wanted. Nobody asked for a new idea. They were more worried about the automation they
            are building, is not proving its value.
          </p>
          <p>
            So, we decided to solve that problem, we call it closing a loop. A loop is an agent
            doing the work and keeps checking its own results against a goal and keeps improving
            and iterating until it gets there. An automation does one task. A loop gets you the
            result.
          </p>
          <p className="text-v-ink">
            So Vantage now puts those loops first. It starts with what a company shows in public,
            then reads its own tools once they are connected. If a distributor is hiring people to
            process orders, and its order records show the same mistakes again and again, Vantage
            connects the two and suggests a loop that fixes it. Once they approve, AiDOOS builds it.
          </p>
        </div>
      </section>

      {/* The first screen */}
      <section id="landing" className="scroll-mt-32 bg-white">
        <div
          className={`${VISUAL_COLUMN} flex flex-col items-center gap-14 py-24 sm:gap-16 lg:gap-[84px]`}
        >
          <div className="flex w-full flex-col gap-4 sm:gap-6">
            <StepHeading kicker="The first screen" title="It opens with the problem, not the product." />

            {/* The saturated plate, not the soft one: this screen is mostly white
                paper, so it needs the ground to carry the colour. */}
            <Mat>
              <MatSlot
                nativeWidth={LANDING_HERO_WIDTH}
                nativeHeight={LANDING_HERO_HEIGHT}
                maxWidth={788}
                label="The Vantage landing page: a headline reading 85% of leaders are spending more on AI, only 22% have scaled it, a Gartner source link, one domain input, and a panel where public signals and connected tools feed into one suggested loop."
              >
                <LandingHeroVisual />
              </MatSlot>
            </Mat>

            <p className={BODY}>
              The page starts with a number most leaders already feel: 85% are spending more on AI,
              but only 22% have scaled it. The Gartner source sits right under it, so it reads as a
              fact and not a sales line. Then one sentence on how it works.
            </p>
          </div>

          <figure className="flex w-full flex-col gap-4 sm:gap-6">
            <Mat>
              <MatSlot
                nativeWidth={HOW_IT_WORKS_WIDTH}
                nativeHeight={HOW_IT_WORKS_HEIGHT}
                maxWidth={888}
                ring
                label="How it works: four steps, each with its own small screen. A domain typed in, a chart of loops found, tool logos being connected, and a timeline from approved to live."
              >
                <HowItWorksVisual />
              </MatSlot>
            </Mat>
            <figcaption className="text-[15px] leading-6 text-[#02020499] sm:text-[18px]">
              How it works started as four matching cards. Each step now shows its own small screen,
              so you can follow the whole process from the pictures alone.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Drawing a loop */}
      <section
        id="loop"
        className={`${VISUAL_COLUMN} flex scroll-mt-32 flex-col items-center gap-12 py-24 sm:gap-14`}
      >
        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4">
            <StepHeading title="The hardest thing to draw was the idea itself." />
            <p className={BODY}>
              &ldquo;Loop&rdquo; is a new word for most people who land here. The page needed one
              picture that explains it before anyone reads a sentence. It took a few tries.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {LOOP_TRIES.map(({ Visual, label, caption }) => (
              <figure key={caption} className="flex flex-col gap-3">
                {/* Each try is drawn with its own 24px corners at full size;
                    Paper clips it again at 16px at the size it shows here. */}
                <div
                  role="img"
                  aria-label={label}
                  className="aspect-square w-full overflow-clip rounded-[16px]"
                >
                  <div inert>
                    <FitWidth nativeWidth={LOOP_TRY_WIDTH}>
                      <Visual />
                    </FitWidth>
                  </div>
                </div>
                <figcaption className="text-[14px] leading-[22px] text-v-ink/65">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
          <p className={BODY}>
            A loop has to come back around, so the runner goes on a full lap. The first steps are
            the plan: where you are, the goal, the rules, what you can change. The last three are
            the feedback: what happened, was it better or worse, and what to change next lap. That
            part is drawn in amber, so you can see the lesson going back to the start.
          </p>

          <Mat>
            <MatSlot
              nativeWidth={LOOP_SECTION_WIDTH}
              nativeHeight={LOOP_SECTION_HEIGHT}
              maxWidth={888}
              ring
              label="The shipped section: the running track with its seven steps, next to the heading an automation does a task, a loop gets you the result."
            >
              <LoopSectionVisual />
            </MatSlot>
          </Mat>
        </div>
      </section>

      {/* Who it's for: the same loop, told eight ways. */}
      <section id="industries" className="scroll-mt-32 bg-white">
        <div className={`${VISUAL_COLUMN} flex flex-col gap-6 py-24 sm:gap-8`}>
          <div className="flex flex-col gap-4">
            <StepHeading kicker="Who it's for" title="One loop, eight industries." />
            <p className={BODY}>
              The landing page lists eight industries, and each one opens its own page. Every page
              uses the same layout and the same loop picture. Only the work inside the loop
              changes: orders for a distributor, claims for a clinic, tickets for an IT desk.
            </p>
          </div>

          <Mat>
            <MatSlot
              nativeWidth={INDUSTRIES_RAIL_WIDTH}
              nativeHeight={INDUSTRIES_RAIL_HEIGHT}
              maxWidth={888}
              ring
              label="The industries rail on the Vantage landing page, headed loops that work in your industry: photo cards for marketing, an IT service desk and distribution, each naming one loop and its result, with more running off the edge."
            >
              <IndustriesRailVisual />
            </MatSlot>
          </Mat>
        </div>
      </section>

      <StepArrow />

      {/* The wait. White ground, because this screen is the colourful one. */}
      <section id="wait" className="scroll-mt-32 bg-white">
        <div className={`${VISUAL_COLUMN} flex flex-col items-center gap-10 pt-16 pb-24`}>
          <StepHeading title="Four minutes is a long time to stare at a spinner." />

          {/* The real thing, running, rather than a screenshot of it. The
              argument in this section is that watching it work is what earns
              trust, so a still would have undercut the point. */}
          <div className="w-full overflow-clip rounded-[20px]">
            <ThinkingScreen />
          </div>

          <div className={`flex w-full flex-col gap-5 ${BODY}`}>
            <p>
              Once they enter their domain, a spinner was the easy thing to build and the worst
              thing to show. Nobody trusts a box that goes quiet for four minutes and then hands
              back an answer.
            </p>
            <p>
              So we let them watch. Real sites go past, ramp.com, brex.com, navan.com. Counts climb
              against real totals, 94 of 148 notes, 127 sources read. The steps that have not run
              yet are listed too, greyed out, because that is what makes the finished ones
              believable. By the time the report lands they have already seen it do the work.
            </p>
          </div>
        </div>
      </section>

      <StepArrow />

      {/* The report */}
      <section
        id="report"
        className={`${VISUAL_COLUMN} flex scroll-mt-32 flex-col items-center gap-14 pt-16 pb-24 sm:gap-16 lg:gap-[84px]`}
      >
        <div className="flex w-full flex-col gap-8 lg:gap-10">
          <StepHeading
            kicker="And then the report"
            title="Before it shows a single loop, it says what it cannot know."
          />

          <div className="flex flex-col gap-6">
            <ReportViewer
              nativeWidth={REPORT_WIDTH}
              collapsedHeight={REPORT_GATED_CROP}
              label="The gated Vantage report: a headline naming three loops the company could run, a note saying it is an outside read with a button to connect their tools, one loop shown in full with its steps, estimate and evidence, two more loops blurred behind an email gate, and a list of the areas that were checked."
              expandLabel="Expand the full report"
              collapseLabel="Collapse the report"
            >
              <ReportGated />
            </ReportViewer>

            <div className={`flex flex-col gap-4 ${BODY}`}>
              <p>
                The first thing under the headline is a short note. It says this is an outside read,
                so every number is a range. Next to it is one button: connect your tools. The public
                report is only a first taste. The real product runs on their own data, and the note
                says so before they read a single loop.
              </p>
              <p>
                One loop is open. The other two are blurred, but their names and numbers still show.
                So the email is not buying a promise. It is buying something they can already see.
              </p>
              <p>
                Numbers only appear when the evidence supports them, and only as a range. Five job
                posts for clerks with a listed salary gives a range, with the reason written under
                it. No evidence gives &ldquo;high impact, low effort&rdquo; and no number at all.
                Every part of the card comes from what the AI can honestly produce. If it cannot
                back something up, it is not on the screen.
              </p>
            </div>
          </div>
        </div>

        {/* The case page opens at the loop's own header and how it runs; the
            evidence and assumptions sit behind the expand. */}
        <div className="flex w-full flex-col gap-6">
          <ReportViewer
            nativeWidth={REPORT_WIDTH}
            collapsedHeight={REPORT_CASE_CROP}
            label="One loop opened into its full case: the loop's name and estimate with its basis, a diagram of how it runs in four steps, every piece of evidence with where it was found, what the estimate assumes, the tools it reads, and a band to approve it."
            expandLabel="Expand one loop's full case"
            collapseLabel="Collapse the case"
          >
            <ReportCase />
          </ReportViewer>

          <p className={BODY}>
            Each loop opens into its full case: how it runs, every piece of evidence with where we
            found it, what it needs, and what we are assuming. The assumptions do the most work.
            &ldquo;We could not see your invoice volume&rdquo; is exactly what makes the rest of
            the page believable.
          </p>
        </div>
      </section>

      {/* What I learned */}
      <section id="learned" className="scroll-mt-32 bg-v-sand">
        <div className={`${COLUMN} flex flex-col gap-12 py-24`}>
          <h2 className="text-[clamp(26px,3.2vw,34px)] leading-[1.14] font-bold tracking-[-0.02em] text-v-ink">
            What I learned
          </h2>

          <ol className="flex flex-col gap-10">
            {LESSONS.map((item) => (
              <li key={item.n} className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <span className="shrink-0 text-[28px] leading-none font-light tabular-nums text-v-warm sm:w-[60px]">
                  {item.n}
                </span>
                <div className="flex max-w-[721px] flex-col gap-2.5">
                  <h3 className="text-[20px] leading-[1.35] font-semibold text-v-ink sm:text-[22px]">
                    {item.lesson}
                  </h3>
                  <p className="text-[17px] leading-[28px] text-v-ink/72">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* The working file behind the page, for anyone who wants the states and tries. */}
          <div className="flex flex-col gap-4 border-t border-v-ink/12 pt-10">
            <p className="max-w-[721px] text-[17px] leading-[28px] text-v-ink/72">
              Every screen, state and mobile view, plus the tries that didn&apos;t make it, are in
              the design file.
            </p>
            <a
              href="https://app.paper.design/file/01M3XW38NQ7NFJ2KJNDNTV0TCD"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-v-ink/15 bg-white px-4 py-2 transition-colors hover:border-v-ink/35"
            >
              <span className="text-[15px] leading-[1.5] font-medium text-v-ink">
                Open the design file in Paper
              </span>
              <svg
                className="h-4 w-4 text-v-ink/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-v-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
