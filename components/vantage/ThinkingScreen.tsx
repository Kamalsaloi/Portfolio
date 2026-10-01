'use client';

import { useEffect, useRef, useState } from 'react';
import { MAT_GRADIENT } from './Mat';

/* Timeline in seconds. Each step runs, then locks as done, and the whole
   thing restarts so a visitor always catches it working rather than landing
   on a frozen frame. */
const STEPS = [
  {
    title: 'Mapped your product surface',
    detail: '12 pages, 3 changelogs, 1 pricing table',
    start: 0,
    end: 2.4,
  },
  {
    title: 'Compared pricing across 38 rivals',
    sources: ['ramp.com/pricing', 'brex.com', 'navan.com'],
    start: 2.4,
    end: 6,
  },
  {
    title: 'Reading why your accounts churned',
    detail: '148 closed-lost notes in your CRM, 62 support threads',
    counter: { of: 148 },
    start: 6,
    end: 12.5,
  },
  { title: 'Sizing what each gap is worth', start: 12.5, end: 15 },
  { title: 'Ranking four opportunities by what they are worth', start: 15, end: 17.5 },
];

const LOOP = 19.5;
const DOMAINS = [
  'news.ycombinator.com',
  'g2.com/products/northwind',
  'stripe.com/docs/invoicing',
  'navan.com/careers',
];

const SWATCH = ['#B08968', '#7D93B8', '#7FA383'];

function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function mmss(total: number) {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * A live replay of the Vantage waiting screen, replacing the static export.
 *
 * The whole thing is derived from one elapsed clock rather than a stack of
 * timers: every step, counter and bar reads its state from the same number,
 * so nothing can drift out of sync and a restart is just setting it back to
 * zero.
 *
 * Pauses when scrolled out of view, and holds a representative frame for
 * anyone who has asked for reduced motion.
 */
export function ThinkingScreen() {
  const [t, setT] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let raf = 0;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      // Park on mid step three, the frame the design was drawn at. Scheduled
      // rather than set inline so it paints once instead of cascading a
      // render straight out of the effect.
      raf = requestAnimationFrame(() => setT(9));
      return () => cancelAnimationFrame(raf);
    }

    let started = 0;
    let running = false;

    const frame = (now: number) => {
      if (!started) started = now;
      setT((((now - started) / 1000) % LOOP));
      raf = requestAnimationFrame(frame);
    };

    // Offscreen it is invisible, so animating it is pure waste.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          started = 0;
          raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const overall = clamp01(t / STEPS[STEPS.length - 1].end);
  const sources = Math.min(127, Math.round(overall * 127));
  const domain = DOMAINS[Math.floor(t / 2.6) % DOMAINS.length];

  return (
    <div
      ref={hostRef}
      className="flex w-full items-center justify-center px-4 py-14 sm:px-10 sm:py-20"
      style={{ backgroundImage: MAT_GRADIENT }}
    >
      <div
        className="flex w-full max-w-[716px] flex-col gap-6 rounded-[22px] border px-6 py-7 sm:px-9 sm:py-8"
        style={{
          backgroundColor: '#FFFFFF9C',
          borderColor: '#FFFFFFEB',
          boxShadow: '0 30px 70px -30px #281E1966',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <span
              className="text-[10.5px] font-semibold tracking-[0.14em] capitalize"
              style={{ color: '#807973' }}
            >
              Analysing northwind.com
            </span>
            <span className="text-[11.5px] tabular-nums" style={{ color: '#918B86' }}>
              {mmss(t * 9.2)} elapsed
            </span>
          </div>
          <div
            className="h-1 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: '#E4E1DD' }}
          >
            <div
              className="h-1 rounded-full"
              style={{ width: `${overall * 100}%`, backgroundColor: '#B85207' }}
            />
          </div>
        </div>

        <ol className="flex flex-col">
          {STEPS.map((step, i) => {
            const done = t >= step.end;
            const active = t >= step.start && t < step.end;
            const progress = clamp01((t - step.start) / (step.end - step.start));
            const last = i === STEPS.length - 1;

            return (
              <li key={step.title} className="flex gap-3">
                {/* Rail: marker plus the connector down to the next step. */}
                <div className="flex w-4 shrink-0 flex-col items-center">
                  <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center">
                    {done ? (
                      <svg
                        viewBox="0 0 15 15"
                        className="h-[13px] w-[13px]"
                        fill="none"
                        stroke="#69625D"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8l3.2 3.2L12 4.4" />
                      </svg>
                    ) : active ? (
                      <span
                        className="block h-[11px] w-[11px] rounded-full border-[3px]"
                        style={{ borderColor: '#B85207' }}
                      />
                    ) : (
                      <span
                        className="block h-[9px] w-[9px] rounded-full border"
                        style={{ borderColor: '#CFC9C4' }}
                      />
                    )}
                  </span>
                  {!last && <span className="w-px flex-1" style={{ backgroundColor: '#DCD7D2' }} />}
                </div>

                <div className={`flex flex-col gap-1.5 ${last ? 'pb-0' : 'pb-5'} min-w-0 flex-1`}>
                  <span
                    className="text-[14px] leading-[18px]"
                    style={{
                      color: active ? '#1D1713' : done ? '#69625D' : '#B5B0AC',
                      fontWeight: active ? 550 : 450,
                    }}
                  >
                    {step.title}
                  </span>

                  {step.detail && (done || active) && (
                    <span className="text-[12.5px] leading-4" style={{ color: '#97918C' }}>
                      {step.detail}
                    </span>
                  )}

                  {/* Real domains, revealed as they are read. */}
                  {step.sources && (done || active) && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {step.sources.map((src, si) => {
                        const shown = done || progress > (si + 1) / (step.sources!.length + 1);
                        if (!shown) return null;
                        return (
                          <span
                            key={src}
                            className="inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[11.5px]"
                            style={{
                              borderColor: '#E4E1DD',
                              backgroundColor: '#FFFFFFB0',
                              color: '#69625D',
                            }}
                          >
                            <span
                              className="h-2 w-2 rounded-[2px]"
                              style={{ backgroundColor: SWATCH[si % SWATCH.length] }}
                            />
                            {src}
                          </span>
                        );
                      })}
                      {done && (
                        <span className="text-[11.5px]" style={{ color: '#97918C' }}>
                          and 35 more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Sub progress on the step that is running. */}
                  {step.counter && active && (
                    <div className="flex items-center gap-3 pt-1">
                      <div
                        className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full"
                        style={{ backgroundColor: '#E4E1DD' }}
                      >
                        <div
                          className="h-[3px] rounded-full"
                          style={{ width: `${progress * 100}%`, backgroundColor: '#B85207' }}
                        />
                      </div>
                      <span
                        className="shrink-0 text-[11.5px] tabular-nums"
                        style={{ color: '#97918C' }}
                      >
                        {Math.round(progress * step.counter.of)} of {step.counter.of}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: '#E4E1DD' }}>
          <span className="flex shrink-0 items-center gap-1">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-[5px] w-[5px] rounded-full transition-opacity duration-300"
                style={{
                  backgroundColor: '#B85207',
                  opacity: Math.floor(t * 2.5) % 3 === d ? 1 : 0.25,
                }}
              />
            ))}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12.5px]" style={{ color: '#7A736E' }}>
            Reading {domain}
          </span>
          <span
            className="shrink-0 text-[12.5px] font-medium tabular-nums"
            style={{ color: '#3D3732' }}
          >
            {sources} sources read
          </span>
        </div>
      </div>
    </div>
  );
}
