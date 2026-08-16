import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { Section } from '@/components/case-study/Section';
import { BeforeAfter } from '@/components/case-study/BeforeAfter';
import {
  ChatInputMock,
  LoadingMock,
  ProposalHeroMock,
  ModuleMock,
  GanttMock,
  ArchitectureMock,
  RiskMock,
  PricingMock,
} from '@/components/case-study/visuals';
import { MiroEmbed } from '@/components/case-study/MiroEmbed';
import { OtherProducts } from '@/components/case-study/OtherProducts';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "Aidoos Proposal Flow — Case Study",
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
            From a single line of text to a signed, priced proposal — every screen in between exists
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
                At Aidoos, a client&apos;s first real interaction with us is an AI-generated proposal —
                built from a few sentences they type, with no sales call in between. That makes this
                flow the single highest-stakes surface we own: it either earns enough trust for someone
                to hand over their email, or it quietly loses them. Everything below is a decision I
                made to close that gap, roughly in the order I made it.
              </p>
            </Section>

            <Section id="chat-input" eyebrow="Decision 01" title="Type right there">
              <p>
                The flow used to open a modal before you could describe what you wanted — a screen
                whose only job was to ask you to open another screen. I removed it. The chat input now
                lives directly in the homepage hero: the moment someone has an idea, they&apos;re
                already typing it.
              </p>
              <BeforeAfter
                before="A modal stood between the homepage and the chat input — one extra click, one extra screen, before a user could say anything at all."
                after="The chat input sits directly in the hero. No modal, no in-between screen — you land, you type."
              />
              <p>
                We also require at least 100 characters before submission. One-line inputs like
                &quot;build me an app&quot; were producing proposals with nothing real to say. Asking
                for a little more effort up front filters those out before they waste an AI generation
                or a reviewer&apos;s time.
              </p>
              <ChatInputMock />
            </Section>

            <Section
              id="reading-screen"
              eyebrow="Decision 02"
              title="Show them you're actually reading it"
            >
              <p>
                Right after submit, before any questions, there&apos;s a short screen that narrates
                what the system is doing with what they just wrote — reading the brief, pulling out
                modules, estimating time. It&apos;s not a spinner. It&apos;s the first proof, before
                anything else is shown, that their words are actually going somewhere.
              </p>
              <LoadingMock />
            </Section>

            <Section
              id="intake"
              eyebrow="Decision 03 — the single most important screen"
              title="Understanding, not a form"
            >
              <p>
                Every person typing into that box is silently asking the same question: did they get
                me? This screen answers it before asking anything else — the rest is what each part of
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
                broken — sections dumped with no clear order. I moved it to its own page, with its own
                URL. A modal is for a decision you make and dismiss. A proposal is a document you read,
                closer to an article than a dialog — and reading tools like Medium don&apos;t put long
                text inside a dialog box.
              </p>
              <p>
                That&apos;s also why the page has a fixed max-width instead of spanning the full
                viewport. Eyes track a narrow column far more comfortably than the full width of a
                screen — a full-width proposal would be genuinely tiring to read, not just less
                polished. This case study page uses the same constraint, for the same reason.
              </p>
            </Section>

            <Section id="title-refine" eyebrow="Decision 05" title="Title and refine, before anything else">
              <p>
                The first thing on the page is the proposal&apos;s title and a short brief of what the
                AI understood the project to be. That&apos;s on purpose — before someone invests time
                reading modules and pricing, they need to know the whole thing is even pointed at the
                right project. Right below it sits a Refine button. If the summary is off, they fix it
                there, before reading another word. Nobody should have to read five sections to realize
                the proposal was built around the wrong problem.
              </p>
              <ProposalHeroMock />
            </Section>

            <Section id="modules" eyebrow="Decision 06" title="Delivery modules, collapsed by default">
              <p>
                Before, every module was expanded and laid out with no refine option anywhere — a wall
                of information. Someone would look at the first module, see how much there was to read,
                and skip straight to the price. Now each module is collapsed by default, showing only a
                title, a one-line scope of work, and how long it will take. Every module carries its own
                Refine — and its own delete, for anything a client has already built and doesn&apos;t
                need built again.
              </p>
              <ModuleMock />
            </Section>

            <Section id="timeline" eyebrow="Decision 07" title="A Gantt chart, not a number">
              <p>
                The old version reduced weeks of planning to a single line: &quot;parallel execution —
                2 weeks.&quot; That line hides the actual insight — modules with no dependency on each
                other run at the same time, and a module can start the moment enough of an earlier one
                is done to unblock it. That&apos;s real time saved for the client, and it deserved to be
                seen, not stated. I replaced the line with a Gantt chart, so the whole timeline — and
                exactly how much overlap is buying them — is visible at a glance. The reaction I was
                designing for was &quot;this is smart,&quot; not &quot;okay, noted.&quot;
              </p>
              <GanttMock />
            </Section>

            <Section id="architecture" eyebrow="Decision 08" title="Architecture, translated into impact">
              <p>
                The previous version listed the tech stack as-is — framework, database, hosting. To a
                client, that&apos;s noise; it answers a question they didn&apos;t ask. What they
                actually want to know is why this architecture, and what it does for their business. So
                instead of a stack list, the section leads with four cards, each translating one
                architectural decision into a plain business outcome. Technical readers aren&apos;t
                ignored — an expand reveals the full stack underneath, it&apos;s just no longer the
                first thing anyone sees.
              </p>
              <ArchitectureMock />
            </Section>

            <Section id="risks" eyebrow="Decision 09" title="Risks, paired with mitigations">
              <p>
                Every real project has risk, and pretending otherwise reads as either naive or
                dishonest. This section names them — but never alone. Each risk sits directly next to
                the specific mitigation for it. It isn&apos;t there to reassure with a list; it&apos;s
                there to show the thinking already happened.
              </p>
              <RiskMock />
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="mb-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                  Why this approach
                </p>
                <p className="text-sm text-slate-600">
                  One line, directly beneath the risks, stating why this specific approach was chosen
                  for the project — a sentence of rationale, not a justification essay.
                </p>
              </div>
            </Section>

            <Section id="pricing" eyebrow="Decision 10" title="Pricing that proves the AI is real">
              <p>
                Every client today is asking the same question, whether they say it out loud or not: is
                this company actually using AI, or just marketing it? The pricing section answers that
                directly, showing two numbers side by side — what the project would cost without AI
                agents, and what we charge after using them. It&apos;s not a claim, it&apos;s a
                comparison, and the client can see exactly where the savings came from.
              </p>
              <p>
                Underneath that sits a bigger shift: we moved off hourly-adjacent pricing entirely, onto
                Delivery Units. A DU works like an Agile story point, but for pricing an outcome instead
                of estimating effort — a bug fix priced at one DU costs the client the same one DU
                whether a junior developer takes twenty hours or a senior takes four. They&apos;re
                paying for the outcome, not for however long it happened to take us — the actual promise
                behind calling ourselves an outcome-based delivery company, instead of saying it while
                quietly billing hours. One DU is priced at $160, sold through four standard plans —
                Starter, Scale, Volume, and Enterprise — replacing pricing that used to be negotiated
                case by case and read, to a client, as just another agency with no real model behind it.
              </p>
              <PricingMock />
            </Section>

            <div className="mt-4 pt-10">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-950">
                The thread through all of it
              </h2>
              <p className="leading-relaxed text-slate-600">
                Every change here follows the same rule: cut whatever makes someone wait before they
                feel understood, and add proof exactly where trust would otherwise be assumed. Fewer
                screens between an idea and a priced proposal in someone&apos;s inbox is the whole
                game.
              </p>
            </div>
          </article>
        </div>
      </div>

      <OtherProducts />
      <CTA />

      <Footer />
    </div>
  );
}
