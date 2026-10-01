import type { CSSProperties, ReactNode } from 'react';
import { C, CheckIcon, Film, FitSignal, SHADE_PLATE, DarkButton, geist, interText } from './parts';

/**
 * One loop card of the gated report: the loop drawn on film at the left,
 * the case for it at the right. Locked cards blur exactly what Paper blurs:
 * the whole plate (10px, at 85%), and on the right the one-line outcome, the
 * evidence and the footer (6px, at 70%). Titles, fit and any number that is
 * shown openly stay sharp.
 */

const LOCK_PLATE: CSSProperties = { filter: 'blur(10px)', opacity: 0.85 };
const LOCK_TEXT: CSSProperties = { filter: 'blur(6px)', opacity: 0.7 };

export type Evidence = { icon: ReactNode; label: string; source: string };

export function LoopCard({
  locked = false,
  index,
  fit,
  title,
  line,
  impact,
  impactRow,
  evidence,
  runsOn,
  steps,
  chip,
}: {
  locked?: boolean;
  index: number;
  fit: { strong: boolean; label: string };
  title: string;
  line: string;
  /** Contents of the bordered numbers band. */
  impact: ReactNode;
  /** The numbers band is a column on the open card and a row on the locked ones. */
  impactRow: boolean;
  evidence: Evidence[];
  runsOn: ReactNode;
  steps: [string, string, string, string];
  chip: { title: string; line: string };
}) {
  return (
    <div
      style={{
        position: locked ? undefined : 'relative',
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        overflow: 'clip',
        borderRadius: 24,
        border: `1px solid ${C.line}`,
        backgroundColor: '#FFFFFF',
        boxShadow: '#0A282D73 0px 30px 60px -48px',
      }}
    >
      <LoopPlate steps={steps} chip={chip} style={locked ? LOCK_PLATE : undefined} />

      <div
        style={{
          flex: '1 1 0%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          padding: '40px 44px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={geist(13, 18, C.muted, 500)}>Loop {index} of 3</div>
            <FitSignal strong={fit.strong} label={fit.label} />
          </div>
          <div style={geist(30, 36, C.ink, 400, { letterSpacing: '-0.02em' })}>{title}</div>
          <div style={{ ...interText(15, 24, C.slateDark, 450), ...(locked ? LOCK_TEXT : undefined) }}>{line}</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: impactRow ? 'row' : 'column',
            alignItems: impactRow ? 'center' : undefined,
            gap: impactRow ? 32 : 14,
            padding: '20px 0',
            borderTop: `1px solid ${C.lineSoft}`,
            borderBottom: `1px solid ${C.lineSoft}`,
          }}
        >
          {impact}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, ...(locked ? LOCK_TEXT : undefined) }}>
          <div style={geist(14, 20, C.ink, 500)}>Why we think so</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {evidence.map((e, i) => (
              <div
                key={e.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderTop: `1px solid ${C.lineSoft}`,
                  borderBottom: i === evidence.length - 1 ? `1px solid ${C.lineSoft}` : undefined,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    backgroundColor: C.well,
                  }}
                >
                  {e.icon}
                </div>
                <div style={{ ...interText(14, 20, C.ink), flex: '1 1 0%' }}>{e.label}</div>
                <div style={interText(12, 16, C.muted, 400, { width: 'max-content' })}>{e.source}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, ...(locked ? LOCK_TEXT : undefined) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={interText(12, 16, C.muted)}>Runs on</div>
            <div style={{ display: 'flex', gap: 4 }}>{runsOn}</div>
          </div>
          <div style={{ ...interText(12, 16, C.muted), flexGrow: 1 }}>Live in about 2 weeks</div>
          <DarkButton label="See the case" />
        </div>
      </div>
    </div>
  );
}

/** A stat with its caption under it, as in "20–35 hrs / a week, estimated". */
export function Stat({ value, label, size, lh, tracking }: { value: string; label: string; size: number; lh: number; tracking: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={geist(size, lh, C.ink, 400, { letterSpacing: tracking })}>{value}</div>
      <div style={interText(13, 18, C.slate)}>{label}</div>
    </div>
  );
}

/* ----------------------------------------------------------- the plate */

const LABEL = geist(14, 20, C.ink, 500);

/** The 500-wide film plate with the loop ring, its four steps and the
    example chip in the middle. */
function LoopPlate({
  steps,
  chip,
  style,
}: {
  steps: [string, string, string, string];
  chip: { title: string; line: string };
  style?: CSSProperties;
}) {
  const [top, right, bottom, left] = steps;
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        width: 500,
        overflow: 'clip',
        backgroundColor: C.well,
        ...style,
      }}
    >
      <Film position="30%" shade={SHADE_PLATE} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 500, height: 608 }}>
        <svg width="500" height="608" viewBox="0 0 500 608" style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}>
          <circle cx="250" cy="304" r="138" fill="none" stroke="#FFFFFFE6" strokeWidth="1.5" />
          <path
            d="M344.5 202.5 L351 209.5 L341.5 211.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="250" cy="166" r="4" fill="#FFFFFF" />
          <circle cx="388" cy="304" r="4" fill="#FFFFFF" />
          <circle cx="250" cy="442" r="4" fill="#FFFFFF" />
          <circle cx="112" cy="304" r="4" fill="#FFFFFF" />
        </svg>

        <div style={{ position: 'absolute', left: 150, top: 124, width: 200, display: 'flex', justifyContent: 'center' }}>
          <div style={LABEL}>{top}</div>
        </div>
        <div style={{ position: 'absolute', left: 402, top: 284, width: 84, display: 'flex' }}>
          <div style={LABEL}>{right}</div>
        </div>
        <div style={{ position: 'absolute', left: 150, top: 462, width: 200, display: 'flex', justifyContent: 'center' }}>
          <div style={LABEL}>{bottom}</div>
        </div>
        <div style={{ position: 'absolute', left: 14, top: 284, width: 84, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ ...LABEL, textAlign: 'right' }}>{left}</div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 278,
            boxSizing: 'border-box',
            width: 200,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid #FFFFFFE6',
            backgroundColor: '#FFFFFFE0',
            backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 35%) 0%, oklab(100% 0 0 / 0%) 40%)',
            backgroundOrigin: 'border-box',
            boxShadow: '#0A282D8C 0px 14px 30px -18px',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 11,
              backgroundColor: '#E7F6EC',
            }}
          >
            <CheckIcon size={11} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={interText(10.5, 14, C.muted)}>Example</div>
            <div style={geist(13, 17, C.ink, 500)}>{chip.title}</div>
            <div style={interText(11.5, 15, C.slateDark)}>{chip.line}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
