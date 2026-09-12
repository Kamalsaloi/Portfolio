import Image from 'next/image';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { SectionNav } from '@/components/vantage/SectionNav';
import { ReportViewer } from '@/components/vantage/ReportViewer';
import { ThinkingScreen } from '@/components/vantage/ThinkingScreen';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Vantage: designing an AI that earns trust',
  description:
    'Designing Vantage, an AI opportunity engine that tells a company what to build next, and the decisions that made a stranger believe it.',
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research' },
  { id: 'landing', label: 'The first screen' },
  { id: 'wait', label: 'The wait' },
  { id: 'report', label: 'The report' },
  { id: 'learned', label: 'What I learned' },
];

const EVIDENCE = [
  {
    images: [
      { src: '/vantage/g2-1.webp', width: 760, height: 96 },
      { src: '/vantage/g2-2.webp', width: 760, height: 92 },
      { src: '/vantage/g2-3.webp', width: 760, height: 62 },
    ],
    alt: 'Three G2 reviews answering "what do you dislike about Klue", each describing the research stopping short of being useful.',
    caption: 'Their users, in their words....',
  },
  {
    images: [{ src: '/vantage/trial-gates.webp', width: 720, height: 202 }],
    alt: 'Two competitor free trial flows, both ending in a confirmation that someone will be in touch rather than access to the product.',
    caption:
      `The free trial that is not a trial... they say "We'll get back to you" when asked for report or free trial..`,
  },
  {
    images: [{ src: '/vantage/linkedin.webp', width: 616, height: 631 }],
    alt: 'A LinkedIn conversation with a founder about how they currently decide what to build next.',
    caption: 'Some insights from real users gained through linkedin messaging...',
  },
];

const LESSONS = [
  {
    n: '01',
    lesson: 'People do not distrust AI because it gets things wrong.',
    body: 'They distrust it because they cannot see how it got there. I spent longer on the four minutes of waiting than on the report itself, and the waiting did more for trust than a better answer would have.',
  },
  {
    n: '02',
    lesson: 'Asking for less only works if you admit what you gave up.',
    body: 'One field beats five. But a report built on one field cannot pretend it knows your revenue. The moment someone checks a number against their own dashboard and it does not match, you have lost them. Saying so first costs nothing.',
  },
  {
    n: '03',
    lesson: 'A number people can see beats a promise every time.',
    body: 'Blurring three opportunities but leaving the money readable changed what the email was buying. Not access to something vague. $820K they were already looking at.',
  },
  {
    n: '04',
    lesson: 'The screen nobody plans is often the one that matters.',
    body: 'The loading screen was meant to be a spinner and a progress bar. It ended up being the screen that decides whether anyone believes the rest of the product.',
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
            Vantage, an AI research intelligence system, reads a company&apos;s market, its rivals
            and its own numbers, then tells it what to build next. That is a large claim coming from
            a machine a stranger has never used. So the design problem was never the report. It was
            getting someone to believe the report before they had any reason to.
          </p>
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
              Landing, the wait, the gated report
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-[14px] text-v-ink/45">Grounded in</dt>
            <dd className="text-[15px] leading-[1.5] text-v-ink">
              Competitor research and designing for generative UI
            </dd>
          </div>
        </dl>
      </header>

      {/* Research */}
      <section id="research" className="scroll-mt-32 bg-v-sand">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-14 px-6 py-24 sm:px-10 lg:px-[50px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <h2 className="max-w-[16ch] text-[clamp(26px,3.2vw,34px)] leading-[1.14] font-bold tracking-[-0.02em] text-v-ink lg:w-[420px] lg:shrink-0">
              First I went and looked at what everyone else was doing.
            </h2>
            <div className="flex max-w-[620px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/75">
              <p>
                Every tool doing this already is built for companies with money. Enterprise pricing,
                or a competitive intelligence team on staff to actually run the thing. A startup of
                twenty to a hundred people has neither, and no spare afternoon to do it by hand
                either.
              </p>
              <p>
                Then I read their G2 reviews, and the same complaint kept surfacing. All of them
                stop at the report. They hand you a very good answer to &ldquo;what changed&rdquo;
                and then leave you exactly where you started, because knowing what to build is not
                the hard part. Building it is.
              </p>
              <p>
                And not one of them would let me actually try it. Every free trial ended the same
                way: a form, then &ldquo;we will get back to you.&rdquo; They all wanted to know who
                I was before showing me anything worth having.
              </p>
              <p className="text-v-ink">
                So there were two holes to build into. Nobody shows you the value before they ask
                for something. And nobody builds the thing they just found. Vantage does the first.
                AiDOOS does the second.
              </p>
            </div>
          </div>

          {/* Captions state what each crop has to prove, so they double as the
              test for whether it is the right screenshot. */}
          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3">
            {EVIDENCE.map((e) => (
              <figure key={e.caption} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 rounded-[12px] bg-v-paper p-3 ring-1 ring-v-ink/8">
                  {e.images.map((img) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={e.images.length > 1 ? '' : e.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 90vw, 33vw"
                      className="h-auto w-full rounded-[6px]"
                    />
                  ))}
                </div>
                <figcaption className="text-[14px] leading-[1.6] text-v-ink/60">
                  {e.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The first screen */}
      <section
        id="landing"
        className="mx-auto flex max-w-[1180px] scroll-mt-32 flex-col items-center gap-10 px-6 py-24 sm:px-10 lg:px-[50px]"
      >
        <StepHeading kicker="The first screen" title="They arrive knowing nothing about us." />

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
            src="/vantage/hero.webp"
            alt="The Vantage landing page: a headline reading research tells you what changed, we tell you what to build, one domain input, and a panel where market signals converge into a single opportunity."
            width={2560}
            height={1942}
            priority
            sizes="(max-width: 900px) 92vw, 900px"
            className="h-auto w-full rounded-[12px]"
          />
        </div>

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            So the page does two jobs at once. It tells them what they get, and it shows them. That
            panel is the whole product in one picture: a mess of signals on the left, one clear
            thing to build on the right.
          </p>
          <p>
            And we ask for a domain. That is it. No name, no email, no call. Every extra box on that
            form is another person who leaves.
          </p>
        </div>
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
          title="This is the part which gives value before it asks for your email."
        />

        <ReportViewer />

        <div className="flex w-full max-w-[760px] flex-col gap-5 text-[18px] leading-[1.66] text-v-ink/78">
          <p>
            We show them a summary and one opportunity first. The reasoning, the four sources it
            leaned on, the money, and what to actually build. The others sit right below it,
            blurred, with their numbers still readable.
          </p>
          <p>
            Now the email is not buying a promise. It is buying a revenue number they can already
            see. And at the very top the report owns up to something: it only read public pages, not
            their tools. No CRM, no Jira, no Slack. Saying that out loud costs nothing and buys
            everything.
          </p>
          <p>
            It also does the selling for us. If this much depth comes from public pages alone, the
            reader finishes the thought on their own: connect the tools and it gets sharper. The
            honest sentence and the persuasive one turn out to be the same sentence.
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
