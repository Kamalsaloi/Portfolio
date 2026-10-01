'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Calendar, Check, ChevronDown, Network, Route, ScrollText, Sparkles } from 'lucide-react';
import { EASE, T } from './theme';
import { DONE_JOB, DWELL, FIELDS, JOB, LOADING, sleep, type Stage } from './sequence';
import { Canvas, ModuleHeader, Rail, ReadyCaption, Ring, TitleBar, VeloPanel } from './workspace';

// Self-hosted, see app/layout.tsx for why.
const schibsted = localFont({ src: '../../app/fonts/schibsted-grotesk-latin.woff2', weight: '400 900' });

/** Native width. The velociti repo's page chrome is fluid, with every clamp()
    resolving to the 1280 design at a 1280 viewport; those resolved values are
    written in directly here, because inside a scaled frame `vw` would measure
    the portfolio's viewport rather than the hero's. */
export const VELOCITI_WIDTH = 1280;

/**
 * The redesigned Velociti hero, ported from github.com/Kamalsaloi/velociti.
 * Rendered at its true size and scaled by the host (see FitWidth), so there
 * are no breakpoint prefixes anywhere below: a `lg:` here would react to the
 * portfolio's viewport and reflow a frame that is meant to be a picture.
 */
export function VelocitiHero() {
  return (
    <div className={`${schibsted.className} bg-white`} style={{ width: VELOCITI_WIDTH, color: T.ink }}>
      <Nav />
      <Copy />
      <section className="px-14 pb-16">
        <div
          className="rounded-[14px] bg-cover bg-center p-10"
          style={{ backgroundImage: 'url(/redesigns/velociti/hero-sky.jpg)' }}
        >
          <Demo />
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------- nav */

/** Matches the live velocitipm.com navigation. */
const NAV_ITEMS = [
  { label: 'Features', menu: false },
  { label: 'Pricing', menu: false },
  { label: 'Services', menu: true },
  { label: 'Industries', menu: true },
  { label: 'Resources', menu: true },
  { label: 'Contact', menu: false },
];

function Nav() {
  return (
    <header className="flex h-[72px] items-center justify-between px-14 text-[13px]">
      <div className="flex items-center gap-9">
        <Image
          src="/redesigns/velociti/velociti-logo.png"
          alt=""
          width={612}
          height={120}
          className="h-[15px] w-auto shrink-0"
        />
        <nav className="flex items-center gap-7">
          {NAV_ITEMS.map((it) => (
            <span key={it.label} className="flex items-center gap-1.5 text-[#1A1A1A]">
              {it.label}
              {it.menu && <ChevronDown size={14} strokeWidth={1.8} className="text-[#8A8A93]" />}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-[#1A1A1A]">Log in</span>
        <span className="flex h-9 items-center rounded-lg border border-[#DCDCDC] px-4 text-[#0A0A0A]">
          Book a demo
        </span>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- copy */

function Copy() {
  return (
    <section className="flex flex-col gap-8 px-14 pt-16 pb-11">
      <div className="text-[56px] leading-[1.07] font-medium tracking-[-0.032em]">
        <span className="block">Your agents can build anything.</span>
        <span className="block">They still don&apos;t know why.</span>
      </div>

      <div className="flex items-end justify-between gap-7">
        <p className="max-w-[560px] text-[17px] leading-[1.53] tracking-[-0.005em] text-[#44444A]">
          Give Velociti an idea. It turns it into a product canvas, story maps, and initiatives,
          keeps the reasoning connected, and passes real context to the people and AI agents who
          build it.
        </p>
        <div className="flex shrink-0 items-start gap-4 text-[16px]">
          <span className="flex items-center gap-2.5 rounded-lg bg-[#1E2C8A] px-5 py-2.5 font-medium tracking-[-0.01em] text-white">
            Book a demo
            <Calendar size={16} strokeWidth={1.5} />
          </span>
          <span className="flex items-center gap-2.5 rounded-lg border border-[#DCDCDC] px-5 py-2.5 tracking-[-0.01em] text-[#0A0A0A]">
            See how it works
            <ArrowDown size={16} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- the window + sequence */

function Demo() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>('overview');
  const [typed, setTyped] = useState({ solution: '', industry: '', problem: '' });
  const [focus, setFocus] = useState<keyof typeof FIELDS | null>(null);
  const [pressed, setPressed] = useState(false);
  const [reveal, setReveal] = useState(0);
  const [task, setTask] = useState(0);
  const [sub, setSub] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    /* Local, not a ref: Strict Mode mounts twice, and a shared ref would be
       flipped back to true by the second mount while the first loop is still
       sleeping, leaving two loops fighting over the same state. */
    let alive = true;

    if (reduce) {
      /* Asked for less motion: show the finished workspace and stop. */
      const id = requestAnimationFrame(() => {
        setStage('live');
        setReveal(99);
      });
      return () => cancelAnimationFrame(id);
    }

    const type = async (key: keyof typeof FIELDS, speed = 48) => {
      setFocus(key);
      const text = FIELDS[key];
      for (let i = 1; i <= text.length; i++) {
        if (!alive) return false;
        setTyped((t) => ({ ...t, [key]: text.slice(0, i) }));
        await sleep(speed);
      }
      return true;
    };

    /** `total` is the real on-screen time for the module: the reveal stagger
        is spent inside it, and the panel's steps divide up whatever is left,
        so the last step lands exactly as the screen changes. */
    const LEAD = 380;
    const STAGGER = 180;

    const run = async (next: Stage, count: number, total: number) => {
      if (!alive) return false;
      setStage(next);
      setReveal(0);
      setStep(0);

      await sleep(LEAD);
      for (let i = 1; i <= count; i++) {
        await sleep(STAGGER);
        if (!alive) return false;
        setReveal(i);
      }

      const job = JOB[next];
      const left = Math.max(0, total - (LEAD + count * STAGGER));

      if (job) {
        const each = left / job.steps.length;
        for (let s = 0; s < job.steps.length; s++) {
          if (!alive) return false;
          setStep(s);
          await sleep(each);
        }
      } else {
        await sleep(left);
      }
      return alive;
    };

    /* Every state write sits after an await, so none of it runs in the
       effect body itself. The reset lives at the end of the loop: the first
       pass starts from the initial state. */
    async function play() {
      while (alive) {
        await sleep(1100);

        if (!(await type('solution'))) return;
        await sleep(260);
        if (!(await type('industry'))) return;
        await sleep(260);
        if (!(await type('problem', 40))) return;
        setFocus(null);
        await sleep(520);

        if (!alive) return;
        setPressed(true);
        await sleep(240);
        if (!alive) return;
        setPressed(false);

        setStage('generating');
        setTask(0);
        setSub(0);
        await sleep(400);
        for (let i = 0; i < LOADING.length; i++) {
          if (!alive) return;
          setTask(i);
          for (let s = 0; s < LOADING[i].subs.length; s++) {
            if (!alive) return;
            setSub(s);
            await sleep(380);
          }
        }
        if (!alive) return;
        setTask(LOADING.length);
        await sleep(650);

        if (!(await run('canvas', 9, DWELL.canvas))) return;
        if (!(await run('problem', 4, DWELL.problem))) return;
        if (!(await run('story', 4, DWELL.story))) return;
        if (!(await run('live', 4, 1200))) return;
        await sleep(3500);
        if (!alive) return;

        setStage('overview');
        setTyped({ solution: '', industry: '', problem: '' });
        setFocus(null);
        setReveal(0);
      }
    }

    play();
    return () => {
      alive = false;
    };
  }, [reduce]);

  const bare = stage === 'overview' || stage === 'generating';
  const job = stage === 'live' ? DONE_JOB : JOB[stage];

  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        border: '1px solid #D9D9DE',
        boxShadow: '0 2px 6px rgba(16,18,28,0.08), 0 28px 60px -22px rgba(16,18,28,0.40)',
      }}
    >
      <TitleBar />
      <div className="flex h-[600px]" style={{ backgroundColor: T.shell }}>
        <AnimatePresence>
          {!bare && (
            <motion.div
              key="rail"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 164, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="shrink-0 overflow-hidden"
            >
              <Rail stage={stage} />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="flex min-w-0 flex-1 flex-col self-stretch"
          style={
            bare
              ? { backgroundColor: T.surface }
              : {
                  backgroundColor: T.surface,
                  borderLeft: `1px solid ${T.line}`,
                  borderRight: `1px solid ${T.line}`,
                  boxShadow: '0 10px 30px -18px rgba(16,23,51,0.22)',
                }
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.36, ease: EASE }}
              className="flex h-full flex-col"
            >
              {stage === 'overview' && <Overview typed={typed} focus={focus} pressed={pressed} />}
              {stage === 'generating' && <Generating task={task} sub={sub} />}
              {stage === 'canvas' && <Canvas reveal={reveal} />}
              {stage === 'problem' && <ProblemMap reveal={reveal} />}
              {stage === 'story' && <StoryMap reveal={reveal} />}
              {stage === 'live' && <Live reveal={reveal} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!bare && job && (
            <motion.div
              key="panel"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 264, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="shrink-0 overflow-hidden"
            >
              <VeloPanel
                title={job.title}
                steps={job.steps}
                at={step}
                finished={stage === 'live'}
                produced={job.produced}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- overview */

function Slot({ value, active }: { value: string; active: boolean }) {
  if (!value && !active) return null;
  return (
    <span
      className="inline-flex items-center rounded px-[13px] py-[3px] text-[34px] font-medium tracking-[-0.02em]"
      style={
        active
          ? { borderBottom: `2px solid ${T.ink}`, padding: '3px 2px', color: T.ink }
          : { backgroundColor: '#FFE86B', color: '#11110F' }
      }
    >
      {value}
      {active && (
        <motion.span
          className="ml-[3px] h-[34px] w-[2px]"
          style={{ backgroundColor: T.ink }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.05, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: 'linear' }}
        />
      )}
    </span>
  );
}

function Overview({
  typed,
  focus,
  pressed,
}: {
  typed: { solution: string; industry: string; problem: string };
  focus: string | null;
  pressed: boolean;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[72px]">
      <div className="w-full max-w-[860px]">
        <span className="block text-[11px] font-semibold tracking-[0.15em]" style={{ color: '#A3A39A' }}>
          TELL US ABOUT YOUR PRODUCT
        </span>

        <div className="flex flex-wrap items-center gap-x-[9px] gap-y-3 pt-7">
          <span className="text-[34px] tracking-[-0.02em]" style={{ color: '#11110F' }}>
            We&apos;re building
          </span>
          <Slot value={typed.solution} active={focus === 'solution'} />
          {(typed.industry || focus === 'industry' || typed.problem) && (
            <span className="text-[34px] tracking-[-0.02em]" style={{ color: '#11110F' }}>
              in the
            </span>
          )}
          <Slot value={typed.industry} active={focus === 'industry'} />
          {(typed.problem || focus === 'problem') && (
            <span className="text-[34px] tracking-[-0.02em]" style={{ color: '#11110F' }}>
              industry, because
            </span>
          )}
          <Slot value={typed.problem} active={focus === 'problem'} />
        </div>

        <div className="mt-10 h-px w-full" style={{ backgroundColor: '#E6E6E0' }} />

        <div className="mt-6 flex items-center justify-between gap-10">
          <span className="max-w-[400px] text-[14px] leading-[21px]" style={{ color: '#6F6F68' }}>
            Velo AI turns this into your canvas, problem map, story map and strategy.
          </span>
          <span
            className="flex h-[50px] shrink-0 items-center rounded-lg px-7 text-[15px] font-semibold text-white transition-transform duration-150"
            style={{ backgroundColor: T.navy, transform: pressed ? 'scale(0.97)' : 'scale(1)' }}
          >
            Build my workspace
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- generating */

function Generating({ task, sub }: { task: number; sub: number }) {
  const pct = Math.round((Math.min(task, LOADING.length) / LOADING.length) * 40);
  return (
    <div className="flex h-full flex-col items-center justify-center px-9">
      <div className="w-full max-w-[520px]">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: T.blue }}
          >
            <Sparkles size={15} strokeWidth={2} />
          </motion.span>
          <span className="text-[14px] font-semibold" style={{ color: T.blue }}>
            Velo AI
          </span>
          <span className="text-[13px]" style={{ color: T.muted }}>
            is running your product discovery
          </span>
        </div>

        <ol className="mt-6">
          {LOADING.map((t, i) => {
            const done = i < task;
            const active = i === task;
            return (
              <li
                key={t.label}
                className="flex h-9 items-center gap-3 border-b last:border-0"
                style={{ borderColor: T.lineFaint }}
              >
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  {done ? (
                    <Check size={13} strokeWidth={2.8} style={{ color: T.blue }} />
                  ) : active ? (
                    <Ring />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                  )}
                </span>
                <span className="text-[13px]" style={{ color: done || active ? T.ink : T.dim }}>
                  {t.label}
                </span>
                {active && (
                  <span className="ml-auto truncate text-[12px]" style={{ color: T.dim }}>
                    {t.subs[sub]}
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-7 flex items-center gap-3">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-neutral-200">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: T.blue }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>
          <span className="w-9 shrink-0 text-right text-[12px]" style={{ color: T.muted }}>
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ remaining modules */

function Block({ label, body, indent }: { label: string; body: string; indent: number }) {
  return (
    <div style={{ paddingLeft: indent * 26 }}>
      <div className="rounded-xl px-4 py-3" style={{ border: `1px solid ${T.lineSoft}` }}>
        <div className="text-[9.5px] font-semibold tracking-[0.12em]" style={{ color: T.dim }}>
          {label}
        </div>
        <p className="mt-1.5 text-[12.5px] leading-[18px]" style={{ color: T.ink }}>
          {body}
        </p>
      </div>
    </div>
  );
}

const PM = [
  { label: 'PROBLEM', body: 'Families cannot tell which caregivers have been checked, so they abandon the booking at the last step.', indent: 0 },
  { label: 'OUTCOME', body: 'Families complete bookings with confidence because vetting is visible before they commit.', indent: 0 },
  { label: 'OPPORTUNITY #1', body: 'Offer a certification badge backed by a multi-stage vetting process, shown on every profile.', indent: 1 },
  { label: 'EXPERIMENT', body: 'Show the badge to 15 families mid-booking. Measure completion against the unbadged flow.', indent: 2 },
];

function ProblemMap({ reveal }: { reveal: number }) {
  return (
    <>
      <ModuleHeader icon={Network} title="Problem Map" breadcrumb="Map the Problem-Opportunity Space" />
      <ReadyCaption title="Problem Map is ready" note="Each problem traced to an outcome and an experiment." />
      <div className="flex flex-1 gap-6 overflow-hidden px-7 pt-4 pb-5">
        <div className="flex w-[170px] shrink-0 flex-col gap-1.5 pr-5" style={{ borderRight: `1px solid ${T.lineSoft}` }}>
          <div className="pb-1 text-[12.5px] font-semibold" style={{ color: T.ink }}>
            Problems
          </div>
          {['Families cannot verify…', 'Caregiver quality varies…', 'Bookings drop at payment…'].map((p, i) => (
            <div
              key={p}
              className="truncate rounded px-2 py-1.5 text-[11.5px]"
              style={{ backgroundColor: i === 0 ? '#F1F4FB' : 'transparent', color: i === 0 ? T.ink : T.dim }}
            >
              {p}
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {PM.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 8 }}
              animate={i < reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Block {...b} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

const TONES = {
  persona: { bg: T.tint.persona, fg: '#17402F', label: T.tint.personaInk },
  activity: { bg: T.tint.activity, fg: '#1E2455', label: T.tint.activityInk },
  step: { bg: T.tint.step, fg: '#463015', label: T.tint.stepInk },
  detail: { bg: T.tint.detail, fg: '#33214D', label: T.tint.detailInk },
};

function Tile({ tone, label, children }: { tone: keyof typeof TONES; label: string; children: React.ReactNode }) {
  const t = TONES[tone];
  return (
    <div className="rounded-md px-3 py-2" style={{ backgroundColor: t.bg }}>
      <div className="text-[9px] font-semibold tracking-[0.12em]" style={{ color: t.label }}>
        {label}
      </div>
      <div className="mt-1 text-[12px] leading-4 font-medium" style={{ color: t.fg }}>
        {children}
      </div>
    </div>
  );
}

const STEPS = [
  { step: 'Browsing Certified Caregiver Profiles', detail: 'Views detailed profiles of Kamal Certified Caregivers.' },
  { step: 'Requesting a Certified Caregiver Booking', detail: 'Selects a preferred caregiver based on profile information.' },
  { step: 'Confirming and Paying', detail: 'Reviews the certification record, then confirms the booking.' },
];

function StoryMap({ reveal }: { reveal: number }) {
  const rise = (on: boolean) => (on ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 });
  return (
    <>
      <ModuleHeader icon={ScrollText} title="Story Map" breadcrumb="Visualize and organize Initiatives into Epics and User Stories" />
      <ReadyCaption title="Story Map is ready" note="The persona and journey behind that experiment." />
      <div className="flex-1 overflow-hidden px-7 pt-4 pb-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: reveal > 0 ? 1 : 0 }}
          className="text-[13px] font-semibold"
          style={{ color: T.ink }}
        >
          Initiative: Launch the Kamal Certified Caregiver pilot
        </motion.div>
        <div className="mt-3 space-y-2.5">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={rise(reveal > 1)} transition={{ duration: 0.4, ease: EASE }} className="max-w-[420px]">
            <Tile tone="persona" label="PERSONA">Anjali Sharma, Daughter and Caregiver</Tile>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={rise(reveal > 2)} transition={{ duration: 0.4, ease: EASE }}>
            <Tile tone="activity" label="ACTIVITY">Discovering and Booking a Certified Caregiver</Tile>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={rise(reveal > 3)} transition={{ duration: 0.4, ease: EASE }} className="grid grid-cols-3 gap-2.5">
            {STEPS.map((s) => (
              <div key={s.step} className="space-y-2.5">
                <Tile tone="step" label="STEP">{s.step}</Tile>
                <Tile tone="detail" label="DETAIL">{s.detail}</Tile>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

const SUMMARY = [
  { k: 'Product canvas', v: '9 blocks, grounded in your overview' },
  { k: 'Problem map', v: '3 problems, 6 opportunities, 4 experiments' },
  { k: 'Story map', v: '1 persona, 4 activities, 12 steps' },
  { k: 'Strategy', v: '6 initiatives, sequenced and scored' },
];

function Live({ reveal }: { reveal: number }) {
  return (
    <>
      <ModuleHeader icon={Route} title="Strategy" breadcrumb="Refine and sequence what to build" />
      <div className="flex flex-1 flex-col px-7 py-6">
        <div className="flex items-baseline gap-3">
          <div className="text-[20px] font-semibold tracking-tight" style={{ color: T.ink }}>
            Your workspace is live.
          </div>
          <span className="text-[12.5px]" style={{ color: T.muted }}>
            Built from one sentence
          </span>
        </div>
        <div className="mt-5">
          {SUMMARY.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 8 }}
              animate={i < reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              className="flex items-center gap-4 py-3"
              style={{ borderTop: `1px solid ${T.line}` }}
            >
              <Check size={14} strokeWidth={2.4} style={{ color: T.blue }} />
              <span className="w-[130px] shrink-0 text-[13px] font-medium" style={{ color: T.ink }}>
                {s.k}
              </span>
              <span className="text-[12.5px]" style={{ color: T.muted }}>
                {s.v}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3">
          <span className="flex h-10 items-center rounded-md px-5 text-[13px] font-semibold text-white" style={{ backgroundColor: T.navy }}>
            Refine strategy
          </span>
          <span className="text-[12.5px]" style={{ color: T.muted }}>
            Everything is linked back to your one sentence. Adjust anything and the rest follows.
          </span>
        </div>
      </div>
    </>
  );
}
