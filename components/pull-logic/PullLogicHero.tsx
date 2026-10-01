'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';
import s from './PullLogicHero.module.css';

// Self-hosted, see app/layout.tsx for why.
const plex = localFont({
  src: [
    { path: '../../app/fonts/ibm-plex-mono-400-latin.woff2', weight: '400' },
    { path: '../../app/fonts/ibm-plex-mono-500-latin.woff2', weight: '500' },
  ],
  variable: '--pl-mono',
});

export const PULL_LOGIC_WIDTH = 1440;

/**
 * The redesigned Pull Logic hero, ported from github.com/Kamalsaloi/pull-logic.
 * Rendered at its 1440 design width and scaled by the host (see FitWidth).
 *
 * The flow animates left to right: four signal sources converge into one
 * detected risk, three costed routes are weighed, one is chosen, and the
 * transfer order is written back. Animation hooks are `data-a` attributes
 * rather than class names, because CSS module class names are hashed.
 */
export function PullLogicHero() {
  const panel = useRef<HTMLDivElement>(null);
  usePlayFlow(panel);

  return (
    <div className={`${s.root} ${plex.variable}`}>
      <div className={`${s.nav} ${s.gut}`}>
        <Image src="/redesigns/pull-logic/logo.png" alt="" width={166} height={28} className={s.brand} />
        <div className={s.links}>
          <span className={s.current}>Home</span>
          <span>About us</span>
          <span>Solutions</span>
          <span>Verticals</span>
          <span>Resources</span>
          <span>Careers</span>
        </div>
        <div className={s.navr}>
          <span className={s.login}>Log in</span>
          <span className={s.ghost}>Book a demo</span>
        </div>
      </div>

      <div className={s.ribbon}>
        <span>
          NAED selects Pull Logic and IDEA to build ProjectNexus, industry-owned order visibility for
          the electrical channel.
        </span>
        <span className={s.ribbonLink}>Read it &rarr;</span>
        <span className={s.dismiss}>&times;</span>
      </div>

      <div className={s.gut}>
        <div className={s.h1}>
          You have the inventory.
          <br />
          It&rsquo;s in the wrong place.
        </div>
        <div className={s.sub}>
          <p>
            Pull Logic watches every SKU at every location, catches the availability gaps days before
            they cost you an order, then fixes them inside the ERP you already run: replenish,
            rebalance, allocate, substitute.
          </p>
          <div className={s.ctas}>
            <span className={s.btn}>Book a demo</span>
            <span className={s.btnSec}>See how it works</span>
          </div>
        </div>
      </div>

      <div className={s.panelgut}>
        <div ref={panel} className={s.panel}>
          <div className={s.flow}>
            <div className={s.sources}>
              <div className={s.src} data-a="src">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><rect x="2" y="9" width="3" height="7" rx="1" /><rect x="7.5" y="4" width="3" height="12" rx="1" /><rect x="13" y="11" width="3" height="5" rx="1" /></svg>
                <div><b>Demand</b><i>POS and orders</i></div>
              </div>
              <div className={s.src} data-a="src">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 2.2 16.2 6v6.2L9 16 1.8 12.2V6L9 2.2Z" /><path d="M1.8 6 9 9.8 16.2 6" /></svg>
                <div><b>Inventory</b><i>every location</i></div>
              </div>
              <div className={s.src} data-a="src">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.4" y="5" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><path d="M10.4 7.4h3.2L16.6 10v2h-6.2V7.4Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="5" cy="13.4" r="1.5" fill="currentColor" /><circle cx="13" cy="13.4" r="1.5" fill="currentColor" /></svg>
                <div><b>Suppliers</b><i>lead times, ASNs</i></div>
              </div>
              <div className={s.src} data-a="src">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="4" cy="9" r="2.2" /><circle cx="14" cy="4.6" r="2.2" /><circle cx="14" cy="13.4" r="2.2" /><path d="M6 8 12 5.4M6 10 12 12.6" /></svg>
                <div><b>Network</b><i>lanes and capacity</i></div>
              </div>
            </div>

            <svg className={s.converge} data-a="converge" viewBox="0 0 120 222" fill="none" preserveAspectRatio="none">
              <path d="M0 24 C50 24 54 111 92 111" stroke="var(--signal-dim)" strokeWidth="1.2" />
              <path d="M0 82 C50 82 54 111 92 111" stroke="var(--signal-dim)" strokeWidth="1.2" />
              <path d="M0 140 C50 140 54 111 92 111" stroke="var(--signal-dim)" strokeWidth="1.2" />
              <path d="M0 198 C50 198 54 111 92 111" stroke="var(--signal-dim)" strokeWidth="1.2" />
              <circle cx="94" cy="111" r="8" fill="rgba(124,139,153,.18)" />
              <circle cx="94" cy="111" r="4" fill="var(--signal)" />
              <path d="M102 111 H118" stroke="var(--signal-dim)" strokeWidth="1.2" />
              <path d="M114 107.5 L118 111 L114 114.5" stroke="var(--signal)" strokeWidth="1.2" />
            </svg>

            <div className={`${s.card} ${s.risk}`} data-a="risk">
              <div className={s.chead} style={{ color: 'var(--risk)' }}>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none"><path d="M7 1.2 13 11.6H1L7 1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M7 5.2v2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="9.5" r=".8" fill="currentColor" /></svg>
                Risk detected
              </div>
              <div className={s.prod}>
                <Image src="/redesigns/pull-logic/product-breaker.jpg" alt="" width={136} height={136} className={s.prodImg} />
                <div>
                  <div className={s.prodTitle}>Breaker 4471-A</div>
                  <p>Likely stockout at Denver DC in 6 days</p>
                </div>
              </div>
              <svg width="254" height="52" viewBox="0 0 268 52" fill="none" data-a="spark" style={{ width: '100%', height: 'auto' }}>
                <path d="M0 34 L22 30 L44 37 L66 28 L88 33 L110 22 L132 27 L154 16 L176 21 L198 11 L220 15 L244 4 L268 9 L268 52 L0 52 Z" fill="rgba(227,89,75,.10)" />
                <path d="M0 34 L22 30 L44 37 L66 28 L88 33 L110 22 L132 27 L154 16 L176 21 L198 11 L220 15 L244 4 L268 9" stroke="var(--risk)" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <div className={s.meta}>
                <span>demand vs cover, 14 days</span>
                <b>41 orders</b>
              </div>
            </div>

            <Connector id="conn1" line="var(--signal-dim)" dot="var(--signal)" />

            <div className={`${s.card} ${s.decide}`} data-a="decide">
              <div className={s.chead} style={{ color: 'var(--amber)', marginBottom: 3 }} data-a="dhead">
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 .8 8.5 5.5 13.2 7 8.5 8.5 7 13.2 5.5 8.5.8 7 5.5 5.5Z" fill="currentColor" /></svg>
                Pull Logic decides
              </div>
              <div className={`${s.opt} ${s.optOn}`} data-a="opt">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="var(--amber)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M1 4.2h11M9 1.2l3 3-3 3" /><path d="M15 9.8H4M7 12.8l-3-3 3-3" /></svg>
                <div className={s.body}><b>Rebalance 340 units from Kansas City</b><i>on the shelf day 2 · $310 freight</i></div>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" style={{ flexShrink: 0 }}><path d="M1 5.2 4.2 8.4 11 1.4" stroke="var(--amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className={s.opt} data-a="opt">
                <div className={s.body}><b>Expedite from supplier SUP-2291</b><i>day 7 · $4,200 · still a day short</i></div>
              </div>
              <div className={s.opt} data-a="opt">
                <div className={s.body}><b>Substitute to 4471-B</b><i>2 accounts contract-blocked</i></div>
              </div>
              <p className={s.note} data-a="note">Ranked on cost to serve, then promise date.</p>
            </div>

            <Connector id="conn2" line="rgba(245,165,36,.40)" dot="var(--amber)" />

            <div className={`${s.card} ${s.act}`} data-a="act">
              <div className={s.chead} style={{ color: 'var(--ok)' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.8" fill="currentColor" /><path d="M4.4 7.7 6.6 9.9 10.8 5.3" stroke="#0B1310" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Executed <span className={s.time}>14:32:07 CT</span>
              </div>
              <Image src="/redesigns/pull-logic/transfer-scene.jpg" alt="" width={584} height={440} className={s.actImg} data-a="scene" />
              <div className={s.route} data-a="route">
                <span>Kansas City DC</span>
                <svg width="34" height="8" viewBox="0 0 34 8" fill="none"><path d="M0 4h28" stroke="var(--ok-line)" strokeWidth="1.2" /><path d="M26 1.2 30 4l-4 2.8" stroke="var(--ok)" strokeWidth="1.2" /></svg>
                <b>Denver DC</b>
              </div>
              <div className={s.rule} />
              <div className={s.tot} data-a="tot">
                <div><div className={s.id}>TO-88412</div><div className={s.lbl}>written to SAP</div></div>
                <div><div className={s.amt}>$84,200</div><div className={s.lbl}>orders held</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Connector({ id, line, dot }: { id: string; line: string; dot: string }) {
  return (
    <svg className={s.conn} data-a={id} viewBox="0 0 56 20" fill="none" preserveAspectRatio="none">
      <path d="M0 10H18" stroke={line} strokeWidth="1.2" />
      <circle cx="26" cy="10" r="7" fill={line} opacity=".30" />
      <circle cx="26" cy="10" r="3.4" fill={dot} />
      <path d="M34 10H54" stroke={line} strokeWidth="1.2" />
      <path d="M50 6.5 L54 10 L50 13.5" stroke={dot} strokeWidth="1.2" />
    </svg>
  );
}

/* ------------------------------------------------------------- the timeline */

const EASE = 'cubic-bezier(.22,.61,.36,1)';
/** Reveal, then a long hold so the finished decision stays readable. */
const RUN = 4400;
const HOLD = 6500;

/**
 * The original's Web Animations timeline, unchanged in its timings. Runs on
 * the DOM directly, not through React state, so a loop costs no renders.
 * Loops only while the panel is on screen and the tab is visible.
 */
function usePlayFlow(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;
    const root: HTMLDivElement = panel;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let running: Animation[] = [];
    let cycle: ReturnType<typeof setTimeout> | undefined;
    let guard: ReturnType<typeof setTimeout> | undefined;
    let onScreen = false;
    let started = false;

    const one = (sel: string, scope: ParentNode = root) => scope.querySelector<HTMLElement | SVGElement>(`[data-a="${sel}"]`);
    const all = (sel: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<HTMLElement | SVGElement>(sel));

    const enter = (el: Element | null, delay: number, dx = -14) =>
      el?.animate([{ opacity: 0, transform: `translateX(${dx}px)` }, { opacity: 1, transform: 'none' }], {
        duration: 440,
        delay,
        easing: EASE,
        fill: 'backwards',
      });

    const draw = (path: Element | undefined, delay: number, dur = 620) => {
      if (!(path instanceof SVGPathElement)) return undefined;
      const len = path.getTotalLength();
      if (!len) return undefined;
      return path.animate(
        [
          { strokeDasharray: `${len} ${len}`, strokeDashoffset: len },
          { strokeDasharray: `${len} ${len}`, strokeDashoffset: 0 },
        ],
        { duration: dur, delay, easing: EASE, fill: 'backwards' },
      );
    };

    const pop = (el: Element | null | undefined, delay: number) =>
      el?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, delay, easing: EASE, fill: 'backwards' });

    const pulse = (svg: Element | null, delay: number) =>
      svg?.querySelector('circle:last-of-type')?.animate(
        [
          { transform: 'translateX(-22px)', opacity: 0, offset: 0 },
          { transform: 'translateX(-14px)', opacity: 1, offset: 0.25 },
          { transform: 'translateX(16px)', opacity: 1, offset: 0.85 },
          { transform: 'translateX(22px)', opacity: 0, offset: 1 },
        ],
        { duration: 620, delay, easing: 'cubic-bezier(.4,0,.5,1)', fill: 'backwards' },
      );

    function play() {
      running.forEach((a) => a.cancel());
      running = [];
      const add = (a: Animation | undefined) => {
        if (a) running.push(a);
      };

      all('[data-a="src"]').forEach((el, i) => add(enter(el, i * 95)));

      const cv = one('converge');
      if (cv) {
        all('path', cv).forEach((p, i) => add(draw(p, 400 + i * 45, 640)));
        all('circle', cv).forEach((c) => add(pop(c, 1010)));
      }

      const risk = one('risk');
      if (risk) {
        add(enter(risk, 1120));
        const sp = all('path', one('spark', risk) ?? risk);
        add(pop(sp[0], 1520));
        add(draw(sp[1], 1380, 820));
      }

      const c1 = one('conn1');
      if (c1) {
        all('path', c1).forEach((p) => add(draw(p, 2060, 380)));
        add(pulse(c1, 2140));
      }

      const dec = one('decide');
      if (dec) {
        add(enter(dec, 2380));
        add(pop(one('dhead', dec), 2520));
        all('[data-a="opt"]', dec).forEach((o, i) => add(enter(o, 2620 + i * 110, -8)));
        add(pop(one('note', dec), 3000));
      }

      const c2 = one('conn2');
      if (c2) {
        all('path', c2).forEach((p) => add(draw(p, 3120, 380)));
        add(pulse(c2, 3200));
      }

      const act = one('act');
      if (act) {
        add(enter(act, 3440));
        add(pop(one('scene', act), 3580));
        add(enter(one('route', act), 3720, -8));
        add(enter(one('tot', act), 3860, -8));
      }

      /* Never leave the hero hidden if the timeline stalls. */
      clearTimeout(guard);
      guard = setTimeout(() => running.forEach((a) => a.finish()), RUN + 900);
      schedule();
    }

    function schedule() {
      clearTimeout(cycle);
      cycle = setTimeout(() => {
        if (!onScreen || document.hidden) return schedule();
        play();
      }, RUN + HOLD);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !started) {
          started = true;
          play();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      clearTimeout(cycle);
      clearTimeout(guard);
      running.forEach((a) => a.cancel());
    };
  }, [ref]);
}
