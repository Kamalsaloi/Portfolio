'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Boxes,
  Calendar,
  Check,
  Eye,
  FileText,
  Home,
  LayoutPanelTop,
  Lightbulb,
  Map,
  Network,
  Route,
  ScrollText,
  Sparkles,
  Target,
  Ticket,
} from 'lucide-react';
import { EASE, T } from './theme';
import type { Stage } from './sequence';

/* ------------------------------------------------------------------ atoms */

export function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.74} viewBox="0 0 20 20" fill="none">
      <path
        d="M3.4 10C3.4 6.2 6.6 6.2 10 10C13.4 13.8 16.6 13.8 16.6 10C16.6 6.2 13.4 6.2 10 10C6.6 13.8 3.4 13.8 3.4 10Z"
        stroke={T.blue}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Ring({ size = 14 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="7" cy="7" r="5.5" stroke="#DBE2F5" strokeWidth="1.6" fill="none" />
      <path
        d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
        stroke={T.blue}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}

function Dot({ state }: { state: 'done' | 'active' | 'todo' }) {
  if (state === 'done')
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
        style={{ backgroundColor: T.blue }}
      >
        <Check size={9} strokeWidth={3.4} color="#fff" />
      </motion.span>
    );
  if (state === 'active') return <Ring size={13} />;
  return <span className="h-3.5 w-3.5 rounded-full border border-neutral-200" />;
}

/* ------------------------------------------------------------- mac chrome */

export function TitleBar() {
  return (
    <div
      className="relative flex h-10 shrink-0 items-center px-4"
      style={{ backgroundColor: '#F2F2F4', borderBottom: '1px solid #DEDEE3' }}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F57', border: '0.5px solid #E0443E' }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FEBC2E', border: '0.5px solid #DEA123' }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28C840', border: '0.5px solid #1DAD2B' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-1.5">
        <Mark size={14} />
        <span className="text-[13px] font-medium" style={{ color: '#6B6B73' }}>
          Velociti
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- rail */

const RAIL = [
  { group: null, items: [{ icon: Home, label: 'Home', stage: null }] },
  {
    group: 'FIT',
    items: [
      { icon: LayoutPanelTop, label: 'Canvas', stage: 'canvas' as Stage },
      { icon: Network, label: 'Problem Map', stage: 'problem' as Stage },
      { icon: ScrollText, label: 'Story Map', stage: 'story' as Stage },
    ],
  },
  {
    group: 'BUILD',
    items: [
      { icon: Route, label: 'Strategy', stage: 'live' as Stage },
      { icon: Boxes, label: 'Initiatives', stage: null },
      { icon: Ticket, label: 'Tickets', stage: null },
      { icon: Calendar, label: 'Planning', stage: null },
      { icon: Map, label: 'Roadmap', stage: null },
    ],
  },
];

const ORDER: Stage[] = ['overview', 'canvas', 'problem', 'story', 'live'];

/** The original also let a viewer click a finished module to take over the
    loop. Here the window is a picture inside a page, so that hand-off is gone
    and the rail only reports progress. */
export function Rail({ stage }: { stage: Stage }) {
  const at = ORDER.indexOf(stage);
  const next = ORDER[at + 1];

  return (
    <div className="flex w-[164px] shrink-0 flex-col gap-0.5 px-3 pt-[18px] pb-4">
      <div className="flex items-center gap-2 pb-[18px] pl-2">
        <Mark size={19} />
        <span className="text-[15px] font-semibold tracking-tight" style={{ color: T.blue }}>
          velociti
        </span>
      </div>

      {RAIL.map((sec, si) => (
        <div key={si} className="flex flex-col gap-0.5">
          {sec.group && (
            <div className="px-2 pt-3 pb-1.5 text-[10px] font-semibold tracking-[0.12em]" style={{ color: T.dim }}>
              {sec.group}
            </div>
          )}
          {sec.items.map((it) => {
            const idx = it.stage ? ORDER.indexOf(it.stage) : -1;
            const active = it.stage === stage;
            const done = idx > -1 && idx < at;
            const building = Boolean(it.stage) && it.stage === next;
            return (
              <div
                key={it.label}
                className="flex h-8 shrink-0 items-center gap-2.5 rounded-md px-2 transition-colors duration-300"
                style={{
                  backgroundColor: active ? T.surface : 'transparent',
                  boxShadow: active ? '0 1px 2px rgba(16,23,51,0.07)' : undefined,
                  color: active ? T.blue : done ? T.ink : building ? T.railDone : T.railIdle,
                }}
              >
                <it.icon size={15} strokeWidth={1.7} />
                <span className="whitespace-nowrap text-[12.5px] font-medium">{it.label}</span>
                {building && (
                  <span className="ml-auto flex items-center">
                    <Ring size={11} />
                  </span>
                )}
                {done && !active && !building && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto"
                    style={{ color: T.blue }}
                  >
                    <Check size={12} strokeWidth={2.6} />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- module header */

export function ModuleHeader({
  icon: Icon,
  title,
  breadcrumb,
}: {
  icon: React.ElementType;
  title: string;
  breadcrumb: string;
}) {
  return (
    <div className="flex h-[58px] w-full shrink-0 items-center gap-4 px-7" style={{ borderBottom: '1px solid #E4E7EE' }}>
      <div className="flex items-center gap-2.5">
        <Icon size={18} strokeWidth={1.8} style={{ color: T.blue }} />
        <span className="text-[16px] font-semibold tracking-tight" style={{ color: T.ink }}>
          {title}
        </span>
      </div>
      <div className="h-5 w-px" style={{ backgroundColor: '#E4E7EE' }} />
      <span className="flex-1 truncate text-[12.5px]" style={{ color: T.muted }}>
        {breadcrumb}
      </span>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-[12.5px]" style={{ color: T.muted }}>
          Elderly care workspace
        </span>
        <span
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[10px] font-medium text-white"
          style={{ backgroundColor: T.ink }}
        >
          KA
        </span>
      </div>
    </div>
  );
}

export function ReadyCaption({ title, note }: { title: string; note: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex shrink-0 items-center gap-2 px-7 pt-4"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: 0.12 }}
        className="flex h-4 w-4 items-center justify-center rounded-full"
        style={{ backgroundColor: T.blue }}
      >
        <Check size={10} strokeWidth={3.4} color="#fff" />
      </motion.span>
      <span className="text-[13px] font-semibold" style={{ color: T.ink }}>
        {title}
      </span>
      <span className="truncate text-[13px]" style={{ color: T.muted }}>
        {note}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ canvas */

/** Each block carries the kind of content it would really hold. Three carry
    none, because a canvas block genuinely has nothing to count. */
const BLOCKS: {
  icon: React.ElementType;
  title: string;
  body: string;
  visual?: React.ReactNode;
}[] = [
  { icon: Eye, title: 'Product Vision', body: "India's most trusted caregiver network." },
  {
    icon: Target,
    title: 'North Star Metric',
    body: 'Monthly active care recipients.',
    visual: (
      <div className="flex w-full shrink-0 items-end gap-2.5">
        <span className="text-[14px] font-medium" style={{ color: T.body }}>1,240</span>
        <span className="pb-0.5 text-[11.5px]" style={{ color: T.dim }}>/ month</span>
        <div className="ml-auto flex items-end gap-[3px]">
          {[9, 14, 11, 19].map((h, i) => (
            <span
              key={i}
              className="w-[5px] rounded-sm"
              style={{ height: h, backgroundColor: i === 3 ? T.blue : '#DDE3F3' }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: AlertCircle,
    title: 'Problem',
    body: 'Vetting is invisible at booking.',
    visual: (
      <div className="flex w-full shrink-0 flex-col gap-[7px]">
        <div className="flex items-baseline gap-[7px]">
          <span className="text-[14px] font-medium" style={{ color: T.body }}>61%</span>
          <span className="text-[11.5px]" style={{ color: T.dim }}>of drop-offs</span>
        </div>
        <div className="h-1 w-full rounded-full" style={{ backgroundColor: T.lineSoft }}>
          <div className="h-1 rounded-full" style={{ width: '61%', backgroundColor: '#E2A05A' }} />
        </div>
      </div>
    ),
  },
  {
    icon: Eye,
    title: 'Personas',
    body: 'Anjali, daughter and caregiver.',
    visual: (
      <div className="flex w-full shrink-0 items-center gap-[7px]">
        {[
          { t: 'AS', bg: T.tint.persona, fg: T.tint.personaInk },
          { t: 'RK', bg: '#E6E3F6', fg: '#5B4E89' },
          { t: '+2', bg: '#F3F5F9', fg: T.dim },
        ].map((a) => (
          <span
            key={a.t}
            className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[10.5px] font-semibold"
            style={{ backgroundColor: a.bg, color: a.fg }}
          >
            {a.t}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Target,
    title: 'Market',
    body: 'Urban Indian families, 30 to 50.',
    visual: (
      <div className="flex w-full shrink-0 items-center gap-[3px]">
        <span className="h-[22px] flex-[5] rounded" style={{ backgroundColor: '#C9DDF3' }} />
        <span className="h-[22px] flex-[3] rounded" style={{ backgroundColor: '#DDE3F3' }} />
        <span className="h-[22px] flex-[2] rounded" style={{ backgroundColor: T.lineSoft }} />
      </div>
    ),
  },
  {
    icon: AlertCircle,
    title: 'Competition',
    body: 'Agencies with no vetting record.',
    visual: (
      <div className="flex w-full shrink-0 items-center gap-1.5">
        {['CareBridge', 'Emoha'].map((c) => (
          <span
            key={c}
            className="flex h-6 items-center rounded-md px-[9px] text-[11px] font-medium"
            style={{ backgroundColor: '#F3F5F9', color: T.railDone }}
          >
            {c}
          </span>
        ))}
        <span className="text-[11px]" style={{ color: T.dim }}>+4</span>
      </div>
    ),
  },
  { icon: Lightbulb, title: 'Solution', body: 'Certification shown on every profile.' },
  {
    icon: FileText,
    title: 'Product Principles',
    body: 'Dignity in every interaction.',
    visual: (
      <div className="flex w-full shrink-0 items-center gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className="flex h-[22px] w-[22px] items-center justify-center rounded-md text-[10.5px] font-semibold"
            style={{
              backgroundColor: n === 4 ? '#F3F5F9' : '#EEF1FB',
              color: n === 4 ? T.dim : '#3D4E9E',
            }}
          >
            {n}
          </span>
        ))}
      </div>
    ),
  },
  { icon: Network, title: 'Jobs To Be Done', body: 'Find someone I can trust with my parent.' },
];

export function Canvas({ reveal }: { reveal: number }) {
  return (
    <>
      <ModuleHeader icon={LayoutPanelTop} title="Canvas" breadcrumb="FIT  ›  BUILD  ›  LAUNCH Canvas" />
      <ReadyCaption title="Canvas is ready" note="Nine blocks, drafted from your one sentence." />
      <div className="flex flex-wrap content-start gap-3 px-7 pt-3.5">
        {BLOCKS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 8 }}
            animate={i < reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex h-[130px] w-[236px] shrink-0 flex-col gap-2 rounded-xl p-4"
            style={{ backgroundColor: T.surface, border: `1px solid ${T.lineSoft}` }}
          >
            <div className="flex items-center gap-2">
              <b.icon size={14} strokeWidth={1.9} style={{ color: T.blue }} />
              <span className="text-[15px] font-semibold tracking-[-0.012em]" style={{ color: T.ink }}>
                {b.title}
              </span>
            </div>
            <p className="flex-1 text-[12.5px] leading-[18px]" style={{ color: T.muted }}>
              {b.body}
            </p>
            {b.visual}
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------- velo panel */

export function VeloPanel({
  title,
  steps,
  at,
  finished,
  produced,
}: {
  title: string;
  steps: string[];
  at: number;
  finished: boolean;
  produced: { n: string; label: string; done: boolean }[];
}) {
  return (
    <div
      className="flex h-full w-[264px] shrink-0 flex-col"
      style={{ backgroundColor: T.surface, borderLeft: `1px solid ${T.line}` }}
    >
      <div className="flex shrink-0 items-start gap-2.5 p-4" style={{ borderBottom: `1px solid ${T.line}` }}>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: '#EDEFFC' }}
        >
          <Sparkles size={14} strokeWidth={2.2} style={{ color: T.blue }} />
        </span>
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold" style={{ color: T.ink }}>Velo AI</div>
          <div className="text-[11.5px]" style={{ color: T.muted }}>Your AI product manager</div>
        </div>
      </div>

      <div className="flex flex-col items-start px-4 pt-[18px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="text-[17px] leading-[23px] font-semibold tracking-tight"
            style={{ color: '#343C54' }}
          >
            {title}
          </motion.div>
        </AnimatePresence>

        <ul className="mt-5 flex flex-col">
          {steps.map((s, idx) => {
            const state = finished || idx < at ? 'done' : idx === at ? 'active' : 'todo';
            const last = idx === steps.length - 1;
            return (
              <li key={s} className="flex items-stretch gap-3">
                <div className="flex w-3.5 shrink-0 flex-col items-center">
                  <Dot state={state} />
                  {!last && (
                    <div
                      className="my-1 w-px flex-1 transition-colors duration-500"
                      style={{ backgroundColor: state === 'done' ? T.blue : '#E4E8F0' }}
                    />
                  )}
                </div>
                <span
                  className={`text-[12.5px] leading-[17px] transition-colors duration-300 ${last ? '' : 'pb-5'}`}
                  style={{ color: state === 'done' ? T.railDone : state === 'active' ? T.ink : T.dim }}
                >
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="min-h-0 flex-1" />

      <div className="flex shrink-0 flex-col p-4" style={{ borderTop: `1px solid ${T.line}` }}>
        <span className="pb-3 text-[10.5px] font-semibold tracking-[0.13em]" style={{ color: T.dim }}>
          PRODUCED SO FAR
        </span>
        {produced.map((p) => (
          <div key={p.label} className="flex items-baseline gap-2.5 pb-2.5 last:pb-0">
            <span className="w-6 text-[16px] font-semibold" style={{ color: p.done ? T.ink : '#C8CEDD' }}>
              {p.n}
            </span>
            <span className="text-[12.5px]" style={{ color: p.done ? T.railDone : T.dim }}>
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
