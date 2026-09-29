import Image from 'next/image';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { SectionNav } from '@/components/vantage/SectionNav';
import { ReportViewer } from '@/components/vantage/ReportViewer';
import { ThinkingScreen } from '@/components/vantage/ThinkingScreen';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Vantage: finding the one process worth fixing',
  description:
    'Designing Vantage, an AI that finds a broken process in a company and suggests a loop that fixes it, and the decisions that made a stranger believe it.',
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'change', label: 'What changed' },
  { id: 'landing', label: 'The first screen' },
  { id: 'loop', label: 'Drawing a loop' },
  { id: 'wait', label: 'The wait' },
  { id: 'report', label: 'The report' },
  { id: 'learned', label: 'What I learned' },
];

/** The three pictures I tried for "a loop", in the order I tried them. */
const LOOP_TRIES = [
  {
    src: '/vantage/loops-iteration-ring.webp',
    alt: 'A glowing ring on a soft gradient, with seven step names placed around it.',
    caption: 'First try: a ring with seven labels. Correct, but it read like a textbook diagram.',
  },
  {
    src: '/vantage/loops-iteration-trail.webp',
    alt: 'A hiker on a zigzag mountain trail, with the steps of a loop pinned to points along the path.',
    caption: 'Then photos: a boat, a trail, a runner on a bend. Every one went in one direction.',
  },
  {
    src: '/vantage/loops-iteration-track.webp',
    alt: 'A running track seen from above at dusk, a single runner on it, with the steps of a loop placed around the lap and an amber line bringing the last steps back to the runner.',
    caption: 'The one that shipped: a runner on a closed track. It comes back to the start.',
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

function StepHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex w-full max-w-[760px] flex-col items-center gap-3.5">
      <p className="text-[15px] text-v-warm">{kicker}</p>
      <h2 className="text-center text-[clamp(26px,3.4vw,36px)] leading-[1.14] font-bold tracking-[-0.02em] text-balance text-v-ink">
        {title}
      </h2>
    </div>
  );
}

export default function VantageCaseStudy() {
  return (
    <div className="bg-v-paper">
      <CaseStudyNav containerClassName="mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-[50px]" />
      <SectionNav sections={SECTIONS} />

      {/* Overview */}
      <header
        id="overview"
        className="mx-auto flex max-w-[1180px] scroll-mt-32 flex-col gap-16 px-6 pt-24 pb-24 sm:px-10 lg:flex-row lg:gap-16 lg:px-[50px]"
      >
        <div className="flex flex-col gap-8 lg:flex-1">
          <h1 className="max-w-[16ch] text-[clamp(44px,7.2vw,84px)] leading-[0.98] font-bold tracking-[-0.035em] text-v-ink">
            Trust is the product.
          </h1>
          <p className="max-w-[64ch] text-[19px] leading-[1.62] text-v-ink/72">
            Vantage finds one process in a company that keeps breaking, and suggests an AI loop
            that fixes it. Then AiDOOS builds the loop. It works best from the company&apos;s own
            tools. But nobody connects their tools to a product they have never seen, so the first
            report uses only public data: the website, job posts and reviews. That gives value
            before we ask for anything. The hard part was getting a stranger to believe it.
          </p>

          {/* The shipped product, one click away, before a word of the story. */}
          <a
            href="https://aidoos.com/vantage"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-v-ink/15 bg-white py-2 pr-5 pl-2 transition-colors hover:border-v-ink/35"
          >
            <span className="flex items-center gap-2 rounded-full bg-v-ink px-3 py-1.5 text-[13px] font-medium text-v-paper">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
            <span className="text-[15px] font-medium text-v-ink">aidoos.com/vantage</span>
            <svg
              className="h-4 w-4 text-v-ink/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-v-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        <dl className="flex flex-col gap-6 border-t border-v-ink/12 pt-6 lg:w-[260px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] text-v-ink/45">Role</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Product design and frontend, end to end
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] text-v-ink/45">Scope</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Landing page, eight industry pages, the gated report
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] text-v-ink/45">Grounded in</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Competitor research, cold calls with distributors, and a past client
            </dd>
          </div>
        </dl>
      </header>

      {/* What changed: the pivot from "what to build" to "which loop to close". */}
      <section
        id="change"
        className="mx-auto flex max-w-[1180px] scroll-mt-32 flex-col gap-10 px-6 py-24 sm:px-10 lg:flex-row lg:gap-20 lg:px-[50px]"
      >
        <h2 className="max-w-[16ch] text-[clamp(26px,3.2vw,34px)] leading-[1.14] font-bold tracking-[-0.02em] text-v-ink lg:w-[420px] lg:shrink-0">
          Our customers told us what they actually needed.
        </h2>
        <div className="flex max-w-[620px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/75">
          <p>
            The first Vantage read a company and suggested new things to build. Then we cold
            called distributors, and a past client told us what they really wanted. Nobody asked
            for a new idea. They asked us to fix one process that kept going wrong.
          </p>
          <p>
            We call that closing a loop. A loop is work that checks its own result against a goal
            and keeps adjusting until it gets there. An automation does one task. A loop gets you
            the result.
          </p>
          <p className="text-v-ink">
            So Vantage now puts those loops first. If a distributor is hiring people to process
            orders, and its reviews mention wrong deliveries, Vantage connects the two and
            suggests a loop that fixes it.
          </p>
        </div>
      </section>

      {/* The first screen */}
      <section id="landing" className="scroll-mt-32 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-6 py-24 sm:px-10 lg:px-[50px]">
          <StepHeading kicker="The first screen" title="It opens with the problem, not the product." />

          {/* The saturated plate, not the soft one: this screen is mostly white
              paper, so it needs the ground to carry the colour. */}
          <div
            className="w-full max-w-[900px] rounded-[20px] p-5 sm:p-8 lg:px-14 lg:py-11"
            style={{
              backgroundImage:
                'linear-gradient(in oklab 135deg, oklab(73.7% 0.067 0.122) 0%, oklab(89.7% 0.023 0.028) 50%, oklab(65.9% -0.040 -0.086) 100%)',
            }}
          >
            <Image
              src="/vantage/loops-hero.webp"
              alt="The Vantage landing page: a headline reading 85% of leaders are spending more on AI, only 22% have scaled it, a Gartner source link, one domain input, and a panel where public signals and connected tools feed into one suggested loop."
              width={2560}
              height={2081}
              priority
              sizes="(max-width: 900px) 92vw, 900px"
              className="h-auto w-full rounded-[12px]"
            />
          </div>

          <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
            <p>
              The page starts with a number most leaders already feel: 85% are spending more on AI,
              but only 22% have scaled it. The Gartner source sits right under it, so it reads as a
              fact and not a sales line.
            </p>
            <p>
              Then one sentence on how it works. Vantage reads what is public about your company,
              then your tools once you connect them. The panel shows exactly that: public signals on
              top, your tools below, both feeding one loop. And we still only ask for a domain.
            </p>
          </div>

          <figure className="flex w-full max-w-[1000px] flex-col gap-4">
            <Image
              src="/vantage/loops-how-it-works.webp"
              alt="How it works: four steps, each on its own coloured tile with its own small screen. A domain typed in, a chart of loops found, tool logos being connected, and a timeline from approved to live."
              width={2560}
              height={1537}
              sizes="(max-width: 1000px) 92vw, 1000px"
              className="h-auto w-full rounded-[12px] ring-1 ring-v-ink/8"
            />
            <figcaption className="text-[15px] leading-[1.6] text-v-ink/60">
              How it works started as four matching cards. Each step now shows its own small screen,
              so you can follow the whole process from the pictures alone.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Drawing a loop */}
      <section
        id="loop"
        className="mx-auto flex max-w-[1180px] scroll-mt-32 flex-col items-center gap-10 px-6 py-24 sm:px-10 lg:px-[50px]"
      >
        <StepHeading kicker="Drawing a loop" title="The hardest thing to draw was the idea itself." />

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            &ldquo;Loop&rdquo; is a new word for most people who land here. The page needed one
            picture that explains it before anyone reads a sentence. It took a few tries.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {LOOP_TRIES.map((t) => (
            <figure key={t.src} className="flex flex-col gap-3">
              <Image
                src={t.src}
                alt={t.alt}
                width={1120}
                height={1120}
                sizes="(max-width: 640px) 90vw, 33vw"
                className="h-auto w-full rounded-[16px]"
              />
              <figcaption className="text-[14px] leading-[1.6] text-v-ink/65">{t.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            A loop has to come back around, so the runner goes on a full lap. The first steps are
            the plan: where you are, the goal, the rules, what you can change. The last three are
            the feedback: what happened, was it better or worse, and what to change next lap. That
            part is drawn in amber, so you can see the lesson going back to the start.
          </p>
        </div>

        <Image
          src="/vantage/loops-loop-section.webp"
          alt="The shipped section: the running track with its seven steps, next to the heading an automation does a task, a loop gets you the result."
          width={2560}
          height={1505}
          sizes="(max-width: 1180px) 92vw, 1180px"
          className="h-auto w-full max-w-[1000px] rounded-[12px] ring-1 ring-v-ink/8"
        />
      </section>

      <StepArrow />

      {/* The wait. White ground, because this screen is the colourful one. */}
      <section id="wait" className="scroll-mt-32 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-6 pt-16 pb-24 sm:px-10 lg:px-[50px]">
          <StepHeading
            kicker="Then they wait"
            title="Four minutes is a long time to stare at a spinner."
          />

          {/* The real thing, running, rather than a screenshot of it. The
              argument in this section is that watching it work is what earns
              trust, so a still would have undercut the point. */}
          <div className="w-full max-w-[1100px] overflow-hidden rounded-[18px] shadow-[0_30px_70px_-30px_oklch(0.3_0.06_55_/_40%)]">
            <ThinkingScreen />
          </div>

          <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
            <p>
              A spinner was the easy thing to build and the worst thing to show. Nobody trusts a box
              that goes quiet for four minutes and then hands back an answer.
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
        className="mx-auto flex max-w-[1180px] scroll-mt-32 flex-col items-center gap-10 px-6 pt-16 pb-24 sm:px-10 lg:px-[50px]"
      >
        <StepHeading
          kicker="And then the report"
          title="Before it shows a single loop, it says what it cannot know."
        />

        {/* Collapsed just past the start of the second, locked loop: the whole
            first loop and the blurred names below it are in view. */}
        <ReportViewer
          src="/vantage/loops-report-gated.webp"
          alt="The gated Vantage report: a headline naming three loops the company could run, a note saying it is an outside read with a button to connect their tools, one loop shown in full with its steps, estimate and evidence, two more loops blurred behind an email gate, and a list of the areas that were checked."
          width={2560}
          height={5894}
          collapsedTo={0.655}
          expandLabel="Expand the full report"
          collapseLabel="Collapse the report"
        />

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            The first thing under the headline is a short note. It says this is an outside read, so
            every number is a range. Next to it is one button: connect your tools. The public report
            is only a first taste. The real product runs on their own data, and the note says so
            before they read a single loop.
          </p>
          <p>
            One loop is open. The other two are blurred, but their names and numbers still show.
            So the email is not buying a promise. It is buying something they can already see.
          </p>
          <p>
            Numbers only appear when the evidence supports them, and only as a range. Five job
            posts for clerks with a listed salary gives a range, with the reason written under it.
            No evidence gives &ldquo;high impact, low effort&rdquo; and no number at all. Every part
            of the card comes from what the AI can honestly produce. If it cannot back something
            up, it is not on the screen.
          </p>
        </div>

        {/* The case page opens at the loop's own header and how it runs; the
            evidence and assumptions sit behind the expand. */}
        <ReportViewer
          src="/vantage/loops-report-case.webp"
          alt="One loop opened into its full case: the loop's name and estimate with its basis, a diagram of how it runs in four steps, every piece of evidence with where it was found, what the estimate assumes, the tools it reads, and a band to approve it."
          width={2560}
          height={5487}
          collapsedTo={0.42}
          expandLabel="Expand one loop's full case"
          collapseLabel="Collapse the case"
        />

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            Each loop opens into its full case: how it runs, every piece of evidence with where we
            found it, what it needs, and what we are assuming. The assumptions do the most work.
            &ldquo;We could not see your invoice volume&rdquo; is exactly what makes the rest of
            the page believable.
          </p>
        </div>

      </section>

      {/* What I learned */}
      <section id="learned" className="scroll-mt-32 bg-v-sand">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-6 py-24 sm:px-10 lg:px-[50px]">
          <h2 className="max-w-[18ch] text-[clamp(26px,3.2vw,34px)] leading-[1.14] font-bold tracking-[-0.02em] text-v-ink">
            What I learned
          </h2>

          <ol className="flex flex-col gap-10">
            {LESSONS.map((item) => (
              <li key={item.n} className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <span className="shrink-0 text-[28px] leading-none font-light tabular-nums text-v-warm sm:w-[60px]">
                  {item.n}
                </span>
                <div className="flex max-w-[68ch] flex-col gap-2.5">
                  <h3 className="text-[20px] leading-[1.35] font-semibold text-v-ink sm:text-[22px]">
                    {item.lesson}
                  </h3>
                  <p className="text-[17px] leading-[1.66] text-v-ink/72">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
