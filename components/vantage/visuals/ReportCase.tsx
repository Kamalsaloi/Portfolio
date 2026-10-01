import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowRight,
  BriefcaseIcon,
  C,
  ChatIcon,
  CheckIcon,
  DarkButton,
  FILM,
  FitSignal,
  LogoDot,
  MailIcon,
  NetSuiteMark,
  OutsideNote,
  ROOT,
  Rules,
  SHADE_NOTE,
  SHADE_PLATE,
  SnowflakeLine,
  StackIcon,
  geist,
  interText,
} from './report/parts';

/**
 * One loop's full case, opened from the report. Ported from Paper. The top
 * bar, the case header and "How it runs" follow the copy on the Vantage page
 * ("Mild cloud", 2O5); the sections that copy crops off (evidence,
 * assumptions, what it needs, approve) come from the AiDOOS original (1PSG).
 * Only the film texture is an image.
 *
 * Rendered at its true size (REPORT_WIDTH, 1280) and scaled by the host (see
 * FitWidth), so there are no breakpoint prefixes below.
 */
/** 68 top bar + 440 case header + 821 how it runs + 519 evidence + 341
    assumptions + 555 what it needs + 242 approve. */
export const REPORT_CASE_HEIGHT = 2986;

export function ReportCase() {
  return (
    <div
      style={{
        ...ROOT,
        width: 1280,
        height: REPORT_CASE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'clip',
        backgroundColor: C.paper,
      }}
    >
      <TopBar />
      <CaseHeader />
      <HowItRuns />
      <Evidence />
      <Assumptions />
      <Needs />
      <Approve />
    </div>
  );
}

/** A full-width band of the page with the side rules. */
function Band({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', boxSizing: 'border-box', flexShrink: 0, width: '100%', ...style }}>
      <Rules />
      {children}
    </div>
  );
}

const SECTION_TITLE = geist(32, 40, C.ink, 400, { letterSpacing: '-0.022em' });
const SECTION_LEAD = interText(14, 22, C.slate, 450);

/* -------------------------------------------------------------- top bar */

function TopBar() {
  return (
    <Band
      style={{
        height: 68,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 104px',
        borderBottom: '1px solid #EAE7E5',
      }}
    >
      <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
          <path d="M15 18l-6-6 6-6" fill="none" stroke="#6E6862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={interText(13, 20, '#64666A', 450)}>Loops for tessaro.com</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 36, padding: '0 12px', borderRadius: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
            <rect x="2.2" y="3" width="11.6" height="10" rx="2" fill="none" stroke="#7A736C" strokeWidth="1.4" />
            <path d="M2.2 6.4h11.6M6.2 13V6.4" fill="none" stroke="#7A736C" strokeWidth="1.4" />
          </svg>
          <div style={interText(13, 20, '#5C544C', 500)}>Workspace</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            height: 36,
            padding: '0 16px',
            borderRadius: 10,
            backgroundColor: C.blue,
          }}
        >
          <div style={interText(13, 20, '#FCFAF8', 550, { width: 'max-content' })}>Connect tools</div>
          <svg width="13" height="13" viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            height: 36,
            padding: '0 8px 0 5px',
            borderRadius: 999,
            border: `1px solid ${C.line}`,
            backgroundColor: '#FFFDFC',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 26,
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 13,
              backgroundColor: '#E9E2DB',
            }}
          >
            <div style={interText(11, 14, '#5C544C', 600)}>KS</div>
          </div>
          <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
            <path d="M4.5 6.5 8 10l3.5-3.5" fill="none" stroke="#8B857D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------- case header */

function RightStat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <div style={geist(36, 42, C.ink, 400, { letterSpacing: '-0.03em', width: 'max-content' })}>{value}</div>
      <div style={interText(13, 18, C.slate)}>{label}</div>
    </div>
  );
}

function CaseHeader() {
  return (
    <Band style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '48px 104px 56px' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48 }}>
        <div style={{ flexShrink: 0, width: 540, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={geist(13, 18, C.muted, 500)}>Loop 1 of 3</div>
            <div style={{ flexShrink: 0, width: 1, height: 12, backgroundColor: C.line }} />
            <FitSignal strong label="Strong fit · 4 signals" />
          </div>
          <div style={geist(48, 54, C.ink, 400, { letterSpacing: '-0.025em' })}>Invoice matching</div>
          <div style={interText(16, 26, C.slateDark, 450)}>
            Every invoice is checked against its order. Only the ones that don&apos;t match reach your team.
          </div>
        </div>
        <div style={{ flexShrink: 0, width: 440, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <RightStat value="20–35 hrs" label="a week, estimated" />
            <RightStat value="$240–275k" label="a year in roles not filled" />
          </div>
          <div style={interText(12, 18, C.muted, 400, { textAlign: 'right' })}>
            Based on five open invoice clerk roles listed at $48–55k, at 4 to 7 hours of matching each. Ranges, from
            public data only.
          </div>
        </div>
      </div>
      <OutsideNote
        padding="32px"
        copyGap={8}
        logos={
          <>
            <LogoDot>
              <NetSuiteMark />
            </LogoDot>
            <LogoDot>
              <SnowflakeLine />
            </LogoDot>
          </>
        }
      />
    </Band>
  );
}

/* ---------------------------------------------------------- how it runs */

const STEP_LABEL = geist(15, 20, C.ink, 500);

const STEPS = [
  { title: 'Read each invoice', body: 'Invoices in the shared inbox are read as they land, scans included.' },
  { title: 'Match it to the order', body: 'Each line is checked against the purchase order and what arrived.' },
  { title: 'Pay it, or flag it', body: 'Clean matches are queued to pay. Mismatches reach your team with the reason.' },
  { title: 'Learn who bills what', body: 'Every correction your team makes tightens the next match.' },
];

function HowItRuns() {
  return (
    <Band
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '80px 104px',
        borderTop: `1px solid ${C.line}`,
        backgroundColor: '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={SECTION_TITLE}>How it runs</div>
        <div style={{ ...SECTION_LEAD, maxWidth: 520 }}>Four steps, on repeat. Every invoice goes round once.</div>
      </div>
      <RunPlate />
      <div style={{ width: '100%', display: 'flex', gap: 32 }}>
        {STEPS.map((s) => (
          <div
            key={s.title}
            style={{
              flex: '1 1 0%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              paddingTop: 16,
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <div style={STEP_LABEL}>{s.title}</div>
            <div style={interText(13.5, 21, C.slate)}>{s.body}</div>
          </div>
        ))}
      </div>
    </Band>
  );
}

/** The 1072 x 400 film plate with the stadium-shaped loop and its steps. */
function RunPlate() {
  const fill: CSSProperties = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' };
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        width: 1072,
        height: 400,
        overflow: 'clip',
        borderRadius: 24,
        border: `1px solid ${C.line}`,
        backgroundColor: C.well,
      }}
    >
      <div style={{ ...fill, backgroundImage: `url(${FILM})`, backgroundSize: 'cover', backgroundPosition: '30%' }} />
      <div style={{ ...fill, backgroundImage: SHADE_PLATE }} />
      <div
        style={{
          position: 'absolute',
          left: 300,
          top: 70,
          boxSizing: 'border-box',
          width: 472,
          height: 260,
          borderRadius: 130,
          border: '1.5px solid #FFFFFFE6',
        }}
      />
      <svg width="1072" height="400" viewBox="0 0 1072 400" style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}>
        <circle cx="536" cy="70" r="4" fill="#FFFFFF" />
        <circle cx="772" cy="200" r="4" fill="#FFFFFF" />
        <circle cx="536" cy="330" r="4" fill="#FFFFFF" />
        <circle cx="300" cy="200" r="4" fill="#FFFFFF" />
        <path d="M640 64 L648 70 L640 76" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div style={{ position: 'absolute', left: 386, top: 30, width: 300, display: 'flex', justifyContent: 'center' }}>
        <div style={STEP_LABEL}>1 Read each invoice</div>
      </div>
      <div style={{ position: 'absolute', left: 790, top: 190, width: 220, display: 'flex' }}>
        <div style={STEP_LABEL}>2 Match it to the order</div>
      </div>
      <div style={{ position: 'absolute', left: 386, top: 350, width: 300, display: 'flex', justifyContent: 'center' }}>
        <div style={STEP_LABEL}>3 Pay it, or flag it</div>
      </div>
      <div style={{ position: 'absolute', left: 62, top: 190, width: 220, display: 'flex', justifyContent: 'flex-end' }}>
        <div style={STEP_LABEL}>4 Learn who bills what</div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 411,
          top: 170,
          boxSizing: 'border-box',
          width: 250,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 14px',
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
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backgroundColor: '#E7F6EC',
          }}
        >
          <CheckIcon size={12} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={interText(11, 14, C.muted)}>Example</div>
          <div style={geist(14, 18, C.ink, 500)}>Invoice 4823 matched</div>
          <div style={interText(12, 16, C.slateDark)}>Paid, no one touched it</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- evidence */

const EVIDENCE: { icon: ReactNode; title: string; body: string; source: string }[] = [
  {
    icon: <BriefcaseIcon size={15} />,
    title: 'Hiring five invoice clerks',
    body: '"Accounts payable clerk, x5, $48–55k. You\'ll match invoices to purchase orders by hand."',
    source: 'Careers page ↗',
  },
  {
    icon: <ChatIcon size={15} />,
    title: 'Reviews mention slow payments',
    body: 'Four reviews in the last year say invoices take weeks to be paid.',
    source: 'Glassdoor ↗',
  },
  {
    icon: <MailIcon size={15} />,
    title: 'Invoices go to one shared inbox',
    body: '"Send all invoices to invoices@tessaro.com." No portal or upload step.',
    source: 'Website ↗',
  },
  {
    icon: <StackIcon size={15} />,
    title: 'NetSuite and Snowflake in the stack',
    body: 'Both named in the finance job posts, so the loop can read your bills and orders directly.',
    source: 'Job posts ↗',
  },
];

/** The two-column sections: a 320 header at left, a ruled list at right. */
function SplitSection({
  title,
  lead,
  background,
  paddingBlock,
  children,
}: {
  title: string;
  lead: string;
  background: string;
  paddingBlock: number;
  children: ReactNode;
}) {
  return (
    <Band
      style={{
        display: 'flex',
        gap: 64,
        padding: `${paddingBlock}px 104px`,
        borderTop: `1px solid ${C.line}`,
        backgroundColor: background,
      }}
    >
      <div style={{ flexShrink: 0, width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={SECTION_TITLE}>{title}</div>
        <div style={SECTION_LEAD}>{lead}</div>
      </div>
      <div
        style={{
          flex: '1 1 0%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          borderTop: `1px solid ${C.line}`,
        }}
      >
        {children}
      </div>
    </Band>
  );
}

const ROW: CSSProperties = { display: 'flex', gap: 16, padding: '18px 0', borderBottom: `1px solid ${C.line}` };

function Evidence() {
  return (
    <SplitSection
      title="Why we think so"
      lead="What we read about Tessaro that points to this loop. Every item links to where we found it."
      background={C.paper}
      paddingBlock={80}
    >
      {EVIDENCE.map((e) => (
        <div key={e.title} style={ROW}>
          <div
            style={{
              boxSizing: 'border-box',
              flexShrink: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9,
              border: `1px solid ${C.lineSoft}`,
              backgroundColor: '#FFFFFF',
            }}
          >
            {e.icon}
          </div>
          <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={geist(15, 22, C.ink, 500)}>{e.title}</div>
            <div style={interText(13.5, 21, C.slate)}>{e.body}</div>
          </div>
          <div style={interText(12, 22, C.muted, 400, { width: 'max-content' })}>{e.source}</div>
        </div>
      ))}
    </SplitSection>
  );
}

/* ---------------------------------------------------------- assumptions */

const ASSUMPTIONS = [
  { label: 'Invoice volume', body: "We couldn't see it. The range assumes 2,000 to 3,000 invoices a month." },
  { label: 'Purchase orders', body: 'We assume most invoices have one. Invoices without an order still go to a person.' },
  { label: 'Time per invoice', body: "Taken from typical matching work, not your team's actual time." },
];

function Assumptions() {
  return (
    <SplitSection
      title="What we're assuming"
      lead="Public data only goes so far. These are the gaps, and each one closes when you connect your tools."
      background="#FFFFFF"
      paddingBlock={72}
    >
      {ASSUMPTIONS.map((a) => (
        <div key={a.label} style={ROW}>
          <div style={geist(14, 21, C.ink, 500, { flexShrink: 0, width: 180 })}>{a.label}</div>
          <div style={{ ...interText(14, 21, C.slateDark), flex: '1 1 0%' }}>{a.body}</div>
        </div>
      ))}
    </SplitSection>
  );
}

/* --------------------------------------------------------- what it needs */

const TOOLS: { mark: ReactNode; name: string; reads: string }[] = [
  { mark: <NetSuiteMark />, name: 'NetSuite', reads: 'Bills you receive and who approved them, read only' },
  { mark: <SnowflakeLine />, name: 'Snowflake', reads: 'Purchase orders and receipts, read only' },
];

function Needs() {
  return (
    <Band
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '80px 104px',
        borderTop: `1px solid ${C.line}`,
        backgroundColor: C.paper,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={SECTION_TITLE}>What it needs from you</div>
        <div style={{ ...SECTION_LEAD, maxWidth: 520 }}>Read-only access to two tools. That&apos;s all.</div>
      </div>
      <div style={{ width: '100%', display: 'flex', gap: 24 }}>
        <div
          style={{
            flex: '1 1 0%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            borderRadius: 20,
            border: `1px solid ${C.line}`,
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560 }}>
              <div style={geist(16, 22, C.ink, 500)}>Reads from</div>
              <div style={interText(13.5, 21, C.slate)}>
                Not connected yet, so every number on this page is a range from public data. Connect these two and
                Vantage measures your real ones.
              </div>
            </div>
            <DarkButton label="Connect your tools" style={{ flexShrink: 0 }} />
          </div>
          {TOOLS.map((t) => (
            <div
              key={t.name}
              style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 16, borderTop: `1px solid ${C.lineSoft}` }}
            >
              <LogoDot>{t.mark}</LogoDot>
              <div style={{ flex: '1 1 0%', display: 'flex', flexDirection: 'column' }}>
                <div style={geist(14, 20, C.ink, 500)}>{t.name}</div>
                <div style={interText(13, 18, C.slate)}>{t.reads}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    border: '1.5px solid #B7B1AC',
                  }}
                />
                <div style={interText(12, 16, C.muted)}>Not connected</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------- approve */

function Approve() {
  return (
    <Band style={{ display: 'flex', flexDirection: 'column', padding: '0 104px 96px', backgroundColor: C.paper }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          padding: 40,
          overflow: 'clip',
          borderRadius: 24,
          border: `1px solid ${C.line}`,
          backgroundColor: C.well,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${FILM})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 75%',
          }}
        />
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundImage: SHADE_NOTE }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 640 }}>
          <div style={geist(24, 32, C.ink, 400, { letterSpacing: '-0.015em' })}>Live in about two weeks</div>
          <div style={interText(14, 24, C.slateDark)}>
            Connect the tools, we test it on last month&apos;s invoices, then it runs with your approval.
          </div>
        </div>
        <div style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: 10,
              border: '1px solid #17191C3D',
              backgroundColor: '#FFFFFF66',
            }}
          >
            <div style={geist(14, 16, C.ink, 500, { width: 'max-content' })}>Talk to our team</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 16px',
              borderRadius: 10,
              backgroundColor: C.blue,
            }}
          >
            <div style={geist(14, 16, '#FFFFFF', 500, { width: 'max-content' })}>Approve and build</div>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Band>
  );
}
