import type { CSSProperties, ReactNode } from 'react';
import { inter } from './fonts';

/**
 * The three "tries" from the Drawing a loop section: the ring of light, the
 * mountain trail and the running track. Ported from the Paper loop visuals
 * (AiDOOS file: ring 1NTY, switchbacks 1NXS, track 1OQD), which all share one
 * 560 x 560 artboard. Rendered at that true size and scaled by the host (see
 * FitWidth), so there are no breakpoint prefixes anywhere below.
 *
 * Only the photographs are images. Every label, leader line, dot, chip, glow
 * and the amber feedback path is drawn here in HTML and SVG.
 *
 * Corners: the artboards are 24px round at native size. On the Vantage page
 * Paper clips each one again with a 16px radius at the scaled size, so a
 * host that wants that exact corner should clip its own wrapper.
 */
export const LOOP_TRY_WIDTH = 560;
export const RING_WIDTH = LOOP_TRY_WIDTH;
export const TRAIL_WIDTH = LOOP_TRY_WIDTH;
export const TRACK_WIDTH = LOOP_TRY_WIDTH;

const GEIST = 'var(--font-geist-sans), system-ui, sans-serif';
const INTER = `${inter.style.fontFamily}, system-ui, sans-serif`;

/** The text defaults Paper's artboards carry for everything inside them. */
const ROOT: CSSProperties = {
  fontSize: 12,
  lineHeight: '16px',
  fontSynthesis: 'none',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  overflowWrap: 'anywhere',
};

const FILL: CSSProperties = { position: 'absolute', left: 0, top: 0, width: 560, height: 560 };

const SHADOW = '0px 1px 10px #00000066';

function Frame({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div
      style={{
        ...ROOT,
        position: 'relative',
        width: LOOP_TRY_WIDTH,
        height: LOOP_TRY_WIDTH,
        flexShrink: 0,
        overflow: 'clip',
        borderRadius: 24,
        backgroundColor: bg,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ ring */

/** The seven node dots on the ring, centred on it (top-left of an 8px dot). */
const RING_NODES = [
  [276, 131],
  [389, 186],
  [417, 308],
  [339, 407],
  [213, 407],
  [135, 308],
  [163, 186],
];

/** left, top, slot width, and which way the label sits inside its slot. */
const RING_LABELS: { text: string; left: number; top: number; width: number; justify: CSSProperties['justifyContent'] }[] = [
  { text: 'Where you are', left: 210, top: 98, width: 140, justify: 'center' },
  { text: 'The goal', left: 410, top: 166, width: 120, justify: 'start' },
  { text: 'The rules', left: 440, top: 303, width: 100, justify: 'start' },
  { text: 'The levers', left: 358, top: 426, width: 120, justify: 'start' },
  { text: 'The result', left: 78, top: 426, width: 120, justify: 'end' },
  { text: 'The score', left: 20, top: 303, width: 100, justify: 'end' },
  { text: 'Next move', left: 30, top: 166, width: 120, justify: 'end' },
];

/** First try: a ring of light with the seven parts of a loop around it. The
    ring itself is part of the film still; the dots, chip and labels are not. */
export function RingVisual() {
  return (
    <Frame bg="#EFE7E1">
      <div
        style={{
          ...FILL,
          backgroundImage: 'url(/vantage/visuals/loop-ring-film.webp)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />

      <div style={FILL}>
        {RING_NODES.map(([left, top]) => (
          <div
            key={`${left}-${top}`}
            style={{
              position: 'absolute',
              left,
              top,
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 0px 12px 3px #FFECD6CC',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 190,
          top: 262,
          width: 180,
          height: 36,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          borderRadius: 999,
          border: '1px solid #FFFFFF47',
          backgroundColor: '#FFFFFF24',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden style={{ display: 'block', flexShrink: 0 }}>
          <path
            d="M20 6 9 17l-5-5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ color: '#FFFFFF', fontFamily: GEIST, fontSize: 13, fontWeight: 500, lineHeight: '16px' }}>
          Invoice matched in 3s
        </span>
      </div>

      {RING_LABELS.map((l) => (
        <div
          key={l.text}
          style={{ position: 'absolute', left: l.left, top: l.top, width: l.width, display: 'flex', justifyContent: l.justify }}
        >
          <span
            style={{
              width: 'max-content',
              color: '#FFFFFFEB',
              fontFamily: GEIST,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '18px',
            }}
          >
            {l.text}
          </span>
        </div>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------- shared label pair */

function Pair({
  title,
  note,
  titleLine,
  noteColor,
  style,
}: {
  title: string;
  note: string;
  titleLine: number;
  noteColor: string;
  style: CSSProperties;
}) {
  return (
    <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', ...style }}>
      <span
        style={{
          width: 'max-content',
          color: '#FFFFFF',
          fontFamily: GEIST,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: `${titleLine}px`,
          textShadow: SHADOW,
        }}
      >
        {title}
      </span>
      <span
        style={{
          width: 'max-content',
          color: noteColor,
          fontFamily: INTER,
          fontSize: 12,
          lineHeight: '16px',
          textShadow: SHADOW,
        }}
      >
        {note}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------- trail */

const TRAIL_LABELS: { title: string; note: string; style: CSSProperties }[] = [
  { title: 'The goal', note: 'The summit', style: { left: 292, top: 130 } },
  { title: 'Next move', note: 'The next bend', style: { left: 416, top: 282 } },
  { title: 'Where you are', note: 'Right now', style: { left: 230, top: 358, width: 98, alignItems: 'end' } },
  { title: 'The result', note: 'Ground covered', style: { left: 462, top: 402 } },
  { title: 'The rules', note: 'Stay on the trail', style: { left: 150, top: 396 } },
  { title: 'The levers', note: 'Pace and turns', style: { left: 56, top: 448 } },
  { title: 'The score', note: '260 m to go', style: { left: 410, top: 228, width: 98, alignItems: 'end' } },
];

const TRAIL_DOTS = [
  [281, 121],
  [404, 324],
  [338, 372],
  [470, 393],
  [200, 386],
  [96, 436],
];

/** Second try: a hiker on switchbacks, with the distance to the summit
    measured down the right edge. */
export function TrailVisual() {
  return (
    <Frame bg="#2A2724">
      {/* 588 square bleeding 14px past every edge, as in Paper. */}
      <div
        style={{
          position: 'absolute',
          left: -14,
          top: -14,
          width: 588,
          height: 588,
          backgroundImage: 'url(/vantage/visuals/loop-trail-photo.webp)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />

      <div style={FILL}>
        <div
          style={{
            ...FILL,
            backgroundImage:
              'radial-gradient(ellipse 120% 90% at 50% 45% in oklab, oklab(16.3% -.0009 -0.009 / 0%) 55%, oklab(16.3% -.0009 -0.009 / 35%) 100%), linear-gradient(in oklab 180deg, oklab(24.5% 0.012 0.014 / 30%) 0%, oklab(16.3% -.0009 -0.009 / 6%) 35%, oklab(16.3% -.0009 -0.009 / 8%) 65%, oklab(20% -0.002 -0.017 / 34%) 100%)',
          }}
        />

        <svg width="560" height="560" viewBox="0 0 560 560" aria-hidden style={{ ...FILL, display: 'block' }}>
          <path d="M296 121 H518" fill="none" stroke="#FFFFFF59" strokeDasharray="2 4" />
          <path d="M366 372 H518" fill="none" stroke="#FFFFFF59" strokeDasharray="2 4" />
          <path d="M518 121 V372" fill="none" stroke="#FFFFFFD9" strokeWidth="1.2" />
          <path d="M512 121 H524 M512 372 H524" fill="none" stroke="#FFFFFFD9" strokeWidth="1.2" />
          <path
            d="M360 356 Q378 334 400 326"
            fill="none"
            stroke="#FFFFFFE6"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          {TRAIL_DOTS.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#FFFFFF" />
          ))}
        </svg>

        {TRAIL_LABELS.map((l) => (
          <Pair key={l.title} title={l.title} note={l.note} titleLine={17} noteColor="#FFFFFFC7" style={l.style} />
        ))}
      </div>
    </Frame>
  );
}

/* ----------------------------------------------------------------- track */

/** Every label slot is 120 wide; `alignItems` says which edge it hugs. */
const TRACK_LABELS: { title: string; note: string; left: number; top: number; align: CSSProperties['alignItems'] }[] = [
  { title: 'Where you are', note: 'Lap 3', left: 229, top: 419, align: 'center' },
  { title: 'The rules', note: 'Stay in lane', left: 424, top: 166, align: 'end' },
  { title: 'Better or worse?', note: '4 s behind plan', left: 16, top: 166, align: 'start' },
  { title: 'The goal', note: '5 km under 25 min', left: 372, top: 419, align: 'center' },
  { title: 'Learn and adjust', note: 'Push harder on the bend', left: 83, top: 419, align: 'center' },
  { title: 'The levers', note: 'Pace and stride', left: 285, top: 110, align: 'center' },
  { title: 'What happened', note: 'Lap took 2:08', left: 138, top: 110, align: 'center' },
];

const WHITE_LEADER = '#FFFFFF8C';
const AMBER = '#F4A340';
const AMBER_LEADER = '#F4A340B3';

/** The film grade over the aerial photo: a warm sun in the top right, a cool
    cast top left, shade bottom left, and a vignette. */
const TRACK_GRADE =
  'radial-gradient(ellipse 70% 55% at 100% 0% in oklab, oklab(73.8% 0.079 0.095 / 30%) 0%, oklab(73.8% 0.079 0.095 / 10%) 40%, oklab(73.8% 0.079 0.095 / 0%) 70%), radial-gradient(ellipse 60% 45% at 0% 0% in oklab, oklab(56.7% 0.030 -0.071 / 16%) 0%, oklab(56.7% 0.030 -0.071 / 0%) 70%), radial-gradient(ellipse 90% 70% at 20% 105% in oklab, oklab(17.5% -0.013 -0.021 / 55%) 0%, oklab(17.5% -0.013 -0.021 / 0%) 70%), linear-gradient(in oklab 180deg, oklab(21.3% 0.002 -0.032 / 8%) 0%, oklab(18.2% -0.014 -0.013 / 22%) 100%), radial-gradient(ellipse 72% 72% at 50% 48% in oklab, oklab(0% 0 0 / 0%) 50%, oklab(0% 0 0 / 42%) 100%)';

/** Third try, the one that shipped: a runner's lap on a closed track. The
    first four parts are white; the feedback half of the loop (what happened,
    better or worse, learn and adjust) is amber and runs back to the start. */
export function TrackVisual() {
  return (
    <Frame bg="#2A2724">
      <div
        style={{
          ...FILL,
          backgroundImage: 'url(/vantage/visuals/loop-track-aerial.webp)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />
      <div style={{ ...FILL, backgroundImage: TRACK_GRADE }} />

      <div style={FILL}>
        <svg width="560" height="560" viewBox="0 0 560 560" aria-hidden style={{ ...FILL, display: 'block' }}>
          <path d="M289 391 L289 414" fill="none" stroke={WHITE_LEADER} />
          <path d="M432 370 L432 414" fill="none" stroke={WHITE_LEADER} />
          <path d="M470 232 L483 206" fill="none" stroke={WHITE_LEADER} />
          <path d="M345 174 L345 148" fill="none" stroke={WHITE_LEADER} />
          <path d="M198 174 L198 148" fill="none" stroke={AMBER_LEADER} />
          <path d="M84 249 L68 206" fill="none" stroke={AMBER_LEADER} />
          <path d="M143 378 L143 414" fill="none" stroke={AMBER_LEADER} />
          {/* Direction of travel on the home straight. */}
          <path
            d="M362 379 L367 383 L362 387"
            fill="none"
            stroke="#FFFFFFD9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* The runner: an open ring at the start line. */}
          <circle cx="289" cy="383" r="7" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="432" cy="366" r="3" fill="#FFFFFF" />
          <circle cx="468" cy="236" r="3" fill="#FFFFFF" />
          <circle cx="345" cy="178" r="3" fill="#FFFFFF" />
          <circle cx="198" cy="178" r="3" fill={AMBER} />
          <circle cx="86" cy="253" r="3" fill={AMBER} />
          <circle cx="143" cy="374" r="3" fill={AMBER} />
        </svg>

        {TRACK_LABELS.map((l) => (
          <Pair
            key={l.title}
            title={l.title}
            note={l.note}
            titleLine={18}
            noteColor="#FFFFFFB8"
            style={{ left: l.left, top: l.top, width: 120, alignItems: l.align }}
          />
        ))}

        {/* The feedback arc, drawn last so it sits over the labels as in Paper. */}
        <svg width="560" height="560" viewBox="0 0 560 560" aria-hidden style={{ ...FILL, display: 'block' }}>
          <path
            d="M198 178 L150 178 C 108 178, 84 212, 84 262 C 84 326, 108 372, 150 375 L 278 382"
            fill="none"
            stroke="#F4A340D9"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M268 377.5 L276 382 L268 386.5"
            fill="none"
            stroke={AMBER}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Frame>
  );
}
