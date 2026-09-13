'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Status = 'done' | 'active' | 'pending';

interface Row {
  label: string;
  status: Status;
  meta: string;
  progress?: number;
}

interface Step {
  title: [string, string];
  description: string;
  image: string;
  card: {
    badge: string;
    title: string;
    rows: Row[];
    stats: { label: string; value: string }[];
  };
}

const STEPS: Step[] = [
  {
    title: ['Understand', 'the real problem'],
    description:
      'I start by diving deep into your users, goals, and context to find what actually matters.',
    image: '/third.png',
    card: {
      badge: '01',
      title: 'Researching your product',
      rows: [
        { label: 'Mapping the current flow', status: 'done', meta: '12 screens' },
        { label: 'Analyzing user behavior', status: 'active', meta: '68%', progress: 68 },
        { label: 'Identifying core problems', status: 'pending', meta: 'Up next' },
      ],
      stats: [
        { label: 'Interviews', value: '8' },
        { label: 'Findings', value: '23' },
      ],
    },
  },
  {
    title: ['Design', 'the right solution'],
    description:
      'I sketch, wireframe, and refine the interface until the flow feels obvious, not just good-looking.',
    image: '/fourth.png',
    card: {
      badge: '02',
      title: 'Designing the flow',
      rows: [
        { label: 'Mapping user journeys', status: 'done', meta: '4 flows' },
        { label: 'Refining key interactions', status: 'active', meta: '45%', progress: 45 },
        { label: 'Building the design system', status: 'pending', meta: 'Queued' },
      ],
      stats: [
        { label: 'Components', value: '42' },
        { label: 'Iterations', value: '6' },
      ],
    },
  },
  {
    title: ['Build', 'it in real code'],
    description:
      'I build the interface myself: pixel-accurate and responsive, not just a static handoff file.',
    image: '/ChatGPT Image Aug 15, 2026, 03_25_44 PM.png',
    card: {
      badge: '03',
      title: 'Building the interface',
      rows: [
        { label: 'Implementing components', status: 'done', meta: '42/42' },
        { label: 'Wiring up interactions', status: 'active', meta: '72%', progress: 72 },
        { label: 'Polishing responsive states', status: 'pending', meta: 'Queued' },
      ],
      stats: [
        { label: 'Coverage', value: '94%' },
        { label: 'Bundle', value: '38kb' },
      ],
    },
  },
  {
    title: ['Ship it,', 'then watch it work'],
    description:
      'I deploy to production and keep watching how real users move through it, ready to refine.',
    image: '/ChatGPT Image Aug 15, 2026, 03_26_37 PM.png',
    card: {
      badge: '04',
      title: 'Shipping to production',
      rows: [
        { label: 'Running final checks', status: 'done', meta: 'All passed' },
        { label: 'Deploying to production', status: 'active', meta: '88%', progress: 88 },
        { label: 'Watching live traffic', status: 'pending', meta: 'Standing by' },
      ],
      stats: [
        { label: 'Lighthouse', value: '98' },
        { label: 'Uptime', value: '99.9%' },
      ],
    },
  },
];

const HOLD = 0.32; // share of each step's scroll spent holding still before the curtain moves
const TAIL = 0.4; // extra scroll so the final card holds before the section releases

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function StatusIcon({ status, active }: { status: Status; active: boolean }) {
  if (status === 'done') {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: active ? 'scale(1)' : 'scale(0.4)' }}
      >
        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-500 motion-reduce:animate-none" />
      </span>
    );
  }
  return (
    <span className="h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-slate-300" />
  );
}

function TaskCard({ card, active }: { card: Step['card']; active: boolean }) {
  return (
    // Opaque, not translucent: this card moves every frame, and a
    // backdrop-filter makes the compositor re-sample what is behind it on each
    // one. At 95% white the blur was never visible anyway.
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.4)] ring-1 ring-slate-900/5">
      {/* Header — app chrome */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-950 font-mono text-[11px] font-bold text-white">
          {card.badge}
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">{card.title}</p>
      </div>

      {/* Task rows — staggered in as the card lands */}
      <div className="space-y-2 p-3 sm:p-4">
        {card.rows.map((row, i) => (
          <div
            key={row.label}
            className="rounded-xl bg-slate-50/80 px-3 py-2.5 transition-all duration-500 ease-out motion-reduce:transition-none"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: `${100 + i * 90}ms`,
            }}
          >
            <div className="flex items-center gap-3">
              <StatusIcon status={row.status} active={active} />
              <span
                className={`min-w-0 flex-1 truncate text-left text-sm ${
                  row.status === 'pending' ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                {row.label}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums ${
                  row.status === 'active'
                    ? 'bg-emerald-50 text-emerald-600'
                    : row.status === 'done'
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {row.meta}
              </span>
            </div>

            {row.progress !== undefined && (
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                  style={{
                    width: active ? `${row.progress}%` : '0%',
                    transitionDelay: `${300 + i * 90}ms`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer metrics */}
      <div className="flex items-center gap-6 border-t border-slate-100 px-4 py-3 sm:px-5">
        {card.stats.map((stat, i) => (
          <div
            key={stat.label}
            className="transition-all duration-500 ease-out motion-reduce:transition-none"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(6px)',
              transitionDelay: `${420 + i * 80}ms`,
            }}
          >
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{stat.label}</p>
            <p className="text-sm font-semibold tabular-nums text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Opacity is written straight to this node from the scroll loop, so there is
 * deliberately no CSS transition on it: a 200ms ease on a value that is already
 * being recomputed every frame just makes the fade trail the scroll.
 */
function TextBlock({ step, index }: { step: Step; index: number }) {
  const opacity = clamp01(1 - Math.abs(index) * 1.8);
  return (
    <div
      data-text={index}
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, pointerEvents: opacity > 0.5 ? 'auto' : 'none' }}
    >
      <p className="mb-3 text-xs font-mono uppercase tracking-wider text-slate-400">How I Work</p>
      <h2 className="mb-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
        {step.title[0]} {step.title[1]}
      </h2>
      <p className="max-w-md leading-relaxed text-slate-500">{step.description}</p>
    </div>
  );
}

/** Where each card sits for a given deck position. */
function cardTransform(rel: number) {
  // Cards not yet reached sit stacked in place underneath (a deck, slightly
  // inset and peeking at the bottom). Only the outgoing card lifts — the
  // curtain rising to reveal the one behind it.
  const lift = Math.min(0, rel);
  const depth = Math.min(Math.max(0, rel), 2.5);
  return `translateY(calc(${lift.toFixed(4)} * 130% + ${(depth * 14).toFixed(2)}px)) scale(${(1 - depth * 0.05).toFixed(4)})`;
}

/** The inner image lags its own frame — that speed gap is the parallax. */
function imageTransform(rel: number) {
  const lift = Math.min(0, rel);
  return `scale(1.22) translateY(${(-lift * 20).toFixed(3)}%)`;
}

export function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  // Only the discrete step counter lives in React. The continuous position is
  // written straight to the DOM below, because re-rendering four task cards and
  // six text blocks on every scroll frame is what made this feel laggy: it is
  // roughly 150 nodes of reconciliation per frame, and on a 120Hz display there
  // is no frame budget left for the compositor.
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pane = paneRef.current;
    if (!section || !pane) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-card]'));
    const images = Array.from(section.querySelectorAll<HTMLElement>('[data-img]'));
    // Odd steps render twice (left slot on mobile, right slot on desktop), so
    // this is a flat list keyed by index rather than one node per step.
    const texts = Array.from(section.querySelectorAll<HTMLElement>('[data-text]'));

    let raf = 0;
    let lastIndex = -1;

    function frame() {
      const rect = section!.getBoundingClientRect();
      // Measured against the pane's own height rather than window.innerHeight:
      // the two disagree on mobile while the URL bar animates, and that
      // disagreement showed up as the deck drifting against the scroll.
      const pinned = rect.height - pane!.offsetHeight;

      if (pinned > 0) {
        const progress = clamp01(-rect.top / pinned);
        const raw = progress * (STEPS.length - 1 + TAIL);

        // Hold each card still for the first slice of its scroll, then ease the
        // curtain across the rest — motion, pause, motion, rather than a
        // constant drift.
        const seg = Math.min(Math.floor(raw), STEPS.length - 2);
        const frac = clamp01((raw - seg - HOLD) / (1 - HOLD));
        const eased = frac * frac * (3 - 2 * frac);
        const pos = Math.min(seg + eased, STEPS.length - 1);

        for (const card of cards) card.style.transform = cardTransform(+card.dataset.card! - pos);
        for (const img of images) img.style.transform = imageTransform(+img.dataset.img! - pos);
        for (const text of texts) {
          const o = clamp01(1 - Math.abs(pos - +text.dataset.text!) * 1.8);
          text.style.opacity = String(o);
          text.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        }

        const index = Math.round(pos);
        if (index !== lastIndex) {
          lastIndex = index;
          setActiveIndex(index);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    // Driven by a frame loop rather than the scroll event. Scroll events are
    // coalesced and land after the frame they describe, so the deck was always
    // painting one position behind the page. Only runs while the section is on
    // screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !raf) {
          raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-[#f7f5f0]"
      style={{ height: `${(STEPS.length + TAIL) * 100}svh` }}
    >
      {/* svh on both the track and the pane, so a mobile URL bar sliding away
          cannot resize the scroll track underneath a scroll already in
          progress. */}
      <div
        ref={paneRef}
        className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden bg-[#f7f5f0] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
      >
        <span className="mb-8 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-mono text-slate-500 shadow-sm">
          0{activeIndex + 1} / 0{STEPS.length}
        </span>

        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 text-center lg:grid-cols-[1fr_minmax(0,42rem)_1fr] lg:gap-16 lg:text-left">
          {/* Left text slot — even steps on desktop, every step on mobile */}
          <div className="relative order-2 min-h-[13rem] lg:order-1">
            {STEPS.map((step, i) => (
              <div key={step.image} className={i % 2 === 1 ? 'lg:hidden' : undefined}>
                <TextBlock step={step} index={i} />
              </div>
            ))}
          </div>

          {/* The curtain: image cards stacked in one fixed centre slot.
              Earlier cards sit on top and lift away to reveal the next. */}
          <div className="relative order-1 aspect-[4/3] w-full sm:aspect-[16/10] lg:order-2">
            {/* Inline transforms are the position-0 frame, so the deck is
                already correctly stacked before hydration; the loop takes over
                from there. */}
            {STEPS.map((step, i) => (
              <div
                key={step.image}
                data-card={i}
                className="absolute inset-0 overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] will-change-transform"
                style={{ zIndex: STEPS.length - i, transform: cardTransform(i) }}
              >
                <div
                  data-img={i}
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: imageTransform(i) }}
                >
                  <Image
                    src={encodeURI(step.image)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 640px"
                    priority={i === 0}
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                  <TaskCard card={step.card} active={i === activeIndex} />
                </div>
              </div>
            ))}
          </div>

          {/* Right text slot — odd steps, desktop only */}
          <div className="relative order-3 hidden min-h-[13rem] lg:block">
            {STEPS.map((step, i) =>
              i % 2 === 1 ? <TextBlock key={step.image} step={step} index={i} /> : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
