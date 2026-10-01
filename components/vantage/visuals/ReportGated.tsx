import type { CSSProperties } from 'react';
import {
  AidoosMark,
  BriefcaseIcon,
  C,
  ChatIcon,
  LogoDot,
  MailIcon,
  NetSuiteMark,
  OutsideNote,
  ROOT,
  Rules,
  SnowflakeLine,
  SnowflakeMark,
  StripeMark,
  HubSpotMark,
  geist,
  interText,
} from './report/parts';
import { LoopCard, Stat } from './report/LoopCard';

/**
 * The Vantage report as a visitor first sees it: one loop open, the other two
 * blurred under the email gate. Ported from Paper. Everything down to the end
 * of the locked loops follows the copy on the Vantage page ("Mild cloud",
 * 1R9); "What we looked at", which that copy crops off, comes from the AiDOOS
 * original (1P4B). Only the film texture is an image.
 *
 * Rendered at its true size and scaled by the host (see FitWidth), so there
 * are no breakpoint prefixes below.
 */
export const REPORT_WIDTH = 1280;
/** 72 header + 340 title + 2546 loops (96 bottom padding, note 134, open
    card 681, locked pair 1256, "What we looked at" 307, three 24 gaps). */
export const REPORT_GATED_HEIGHT = 2958;

export function ReportGated() {
  return (
    <div
      style={{
        ...ROOT,
        width: REPORT_WIDTH,
        height: REPORT_GATED_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'clip',
        backgroundColor: C.paper,
      }}
    >
      <Header />
      <TitleBlock />
      <Loops />
    </div>
  );
}

/* --------------------------------------------------------------- header */

function Header() {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        width: '100%',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        padding: '0 104px',
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <AidoosMark />
        <div style={geist(20, 30, C.blue, 700, { letterSpacing: '-0.02em' })}>AiDOOS</div>
      </div>
      {/* Export is locked until the email gate is passed. */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          borderRadius: 9,
          border: '1px solid #DDDAD6',
          backgroundColor: '#FFFDFC',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
          <path
            d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v12M8 11l4 4 4-4"
            fill="none"
            stroke="#6B6259"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={interText(12.5, 16, '#3D3732', 550, { width: 'max-content' })}>Export report</div>
        <div style={{ flexShrink: 0, width: 1, height: 13, backgroundColor: '#E1DDDA' }} />
        <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
          <path
            d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z"
            fill="none"
            stroke="#B8845C"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Rules />
    </div>
  );
}

/* ---------------------------------------------------------------- title */

function TitleBlock() {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 48,
        padding: '72px 104px 56px',
      }}
    >
      <div style={{ flexShrink: 0, width: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              flexShrink: 0,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              backgroundColor: C.ink,
            }}
          >
            <div style={geist(12, 16, '#FFFFFF', 600)}>t</div>
          </div>
          <div style={geist(14, 20, C.ink, 500)}>tessaro.com</div>
          <div style={interText(13, 18, C.muted)}>Read on 29 September from 86 public signals</div>
        </div>
        <div style={geist(48, 54, C.ink, 400, { letterSpacing: '-0.025em' })}>
          Three loops Tessaro could run this quarter
        </div>
        <div style={interText(15, 24, C.slate, 450, { maxWidth: 520 })}>
          Ranked by impact. Each one comes with the evidence we found, and gets exact numbers once you connect your
          tools.
        </div>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={geist(56, 60, C.ink, 400, { letterSpacing: '-0.03em' })}>28–49 hrs</div>
        <div style={interText(13, 18, C.slate)}>a week, across the two loops we could estimate</div>
      </div>
      <Rules />
    </div>
  );
}

/* ---------------------------------------------------------------- loops */

function Loops() {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        flexShrink: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: '0 104px 96px',
      }}
    >
      <Rules />
      <OutsideNote
        padding="28px 32px"
        copyGap={6}
        logos={
          <>
            <LogoDot>
              <StripeMark />
            </LogoDot>
            <LogoDot>
              <HubSpotMark />
            </LogoDot>
            <LogoDot>
              <SnowflakeMark />
            </LogoDot>
          </>
        }
      />
      <OpenLoop />
      <LockedLoops />
      <LookedAt />
    </div>
  );
}

const DIVIDER: CSSProperties = { flexShrink: 0, width: 1, backgroundColor: C.lineSoft };

function OpenLoop() {
  return (
    <LoopCard
      index={1}
      fit={{ strong: true, label: 'Strong fit · 4 signals' }}
      title="Invoice matching"
      line="Every invoice is checked against its order. Only the ones that don't match reach your team."
      impactRow={false}
      impact={
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Stat value="20–35 hrs" label="a week, estimated" size={36} lh={42} tracking="-0.03em" />
            <div style={{ ...DIVIDER, height: 44 }} />
            <Stat
              value="$240–275k"
              label="a year in roles you may not need to fill"
              size={36}
              lh={42}
              tracking="-0.03em"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
              <circle cx="8" cy="8" r="6.3" fill="none" stroke={C.muted} strokeWidth="1.2" />
              <path d="M8 7.2v3.6M8 5.2v.1" fill="none" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div style={interText(12.5, 19, C.slate)}>
              Based on five open invoice clerk roles listed at $48–55k, at 4 to 7 hours of matching each. Ranges from
              public data; connect your tools for exact numbers.
            </div>
          </div>
        </>
      }
      evidence={[
        { icon: <BriefcaseIcon />, label: 'Hiring five invoice clerks', source: 'Careers page ↗' },
        { icon: <ChatIcon />, label: 'Reviews mention slow payments', source: 'Glassdoor ↗' },
        { icon: <MailIcon />, label: 'Invoices go to one shared inbox', source: 'Website ↗' },
      ]}
      runsOn={
        <>
          <LogoDot>
            <NetSuiteMark />
          </LogoDot>
          <LogoDot>
            <SnowflakeLine />
          </LogoDot>
        </>
      }
      steps={['Read each invoice', 'Match it to the order', 'Pay it, or flag it', 'Learn who bills what']}
      chip={{ title: 'Invoice 4823 matched', line: 'Paid, no one touched it' }}
    />
  );
}

const LOCKED_RUNS_ON = (
  <>
    <LogoDot>
      <StripeMark />
    </LogoDot>
    <LogoDot>
      <SnowflakeMark />
    </LogoDot>
  </>
);

function LockedLoops() {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <LoopCard
        locked
        index={2}
        fit={{ strong: false, label: 'Likely fit · 3 signals' }}
        title="Customer questions answered"
        line="Order and delivery questions get a reply in minutes. Anything unusual goes to a person."
        impactRow
        impact={
          <>
            <div style={{ flexShrink: 0 }}>
              <Stat value="8–14 hrs" label="a week, estimated" size={40} lh={44} tracking="-0.03em" />
            </div>
            <div
              style={{
                flex: '1 1 0%',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                filter: 'blur(6px)',
                opacity: 0.7,
              }}
            >
              <div style={interText(13, 20, C.slateDark)}>Based on two open support roles and a 48-hour reply promise.</div>
              <div style={interText(12, 18, C.muted)}>
                A range, from public data only. Connect your tools for an exact number.
              </div>
            </div>
          </>
        }
        evidence={[
          { icon: <BriefcaseIcon />, label: 'Replies promised within 48 hours', source: 'Help page ↗' },
          { icon: <ChatIcon />, label: 'Reviews mention slow replies', source: 'Trustpilot ↗' },
          { icon: <MailIcon />, label: 'Hiring two support agents', source: 'Careers page ↗' },
        ]}
        runsOn={LOCKED_RUNS_ON}
        steps={['Read each question', 'Find the answer', 'Reply, or hand it over', 'Learn from each reply']}
        chip={{ title: 'Order 7731 answered', line: 'Replied in 3 minutes' }}
      />
      <LoopCard
        locked
        index={3}
        fit={{ strong: false, label: 'Likely fit · 3 signals' }}
        title="Late payments chased"
        line="Overdue invoices get a friendly reminder on time. Any dispute goes to a person."
        impactRow
        impact={
          <>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 28 }}>
              <Stat value="High" label="impact" size={28} lh={34} tracking="-0.02em" />
              <div style={{ ...DIVIDER, height: 40 }} />
              <Stat value="Low" label="effort" size={28} lh={34} tracking="-0.02em" />
            </div>
            <div style={{ ...interText(13, 20, C.slate), flex: '1 1 0%', minWidth: 0 }}>
              Not enough public data for a time estimate. Connect your tools and we&apos;ll measure it.
            </div>
          </>
        }
        evidence={[
          { icon: <BriefcaseIcon />, label: 'Hiring a credit controller', source: 'Careers page ↗' },
          { icon: <ChatIcon />, label: 'Payment terms are 30 days', source: 'Website ↗' },
          { icon: <MailIcon />, label: 'Reviews mention billing mix-ups', source: 'Glassdoor ↗' },
        ]}
        runsOn={LOCKED_RUNS_ON}
        steps={['Spot the overdue ones', 'Send the reminder', 'Log what they say', 'Learn who pays late']}
        chip={{ title: 'Invoice 5120 paid', line: 'Two days after the reminder' }}
      />
      <EmailGate />
    </div>
  );
}

/** The email gate, floating over the two locked cards. */
function EmailGate() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 306,
        top: 300,
        boxSizing: 'border-box',
        width: 460,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 32,
        borderRadius: 20,
        border: '1px solid #FFFFFF',
        backgroundColor: '#FFFFFFF0',
        backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 50%) 0%, oklab(100% 0 0 / 0%) 40%)',
        backgroundOrigin: 'border-box',
        boxShadow: '#0A282D8C 0px 40px 80px -40px, #17191C0F 0px 0px 0px 1px',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          flexShrink: 0,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          border: `1px solid ${C.line}`,
          backgroundColor: C.paper,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
          <rect x="3" y="7" width="10" height="7" rx="1.8" fill="none" stroke={C.ink} strokeWidth="1.3" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke={C.ink} strokeWidth="1.3" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={geist(22, 28, C.ink, 500, { letterSpacing: '-0.015em' })}>See the other two loops</div>
        <div style={interText(14, 22, C.slate)}>
          Enter your work email and we&apos;ll send a six-digit code. It also opens the full case for every loop.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 6px 6px 14px',
          borderRadius: 12,
          border: '1px solid #D4D0CD',
          backgroundColor: '#FFFFFF',
        }}
      >
        <MailIcon size={16} color="#A39D9A" />
        <div style={{ ...geist(15, 18, '#A39D9A'), flex: '1 1 0%' }}>you@tessaro.com</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 8, backgroundColor: C.blue }}>
          <div style={geist(14, 18, '#FFFFFF', 500, { width: 'max-content' })}>Send code</div>
        </div>
      </div>
      <div style={interText(12, 18, C.muted)}>No password and no newsletter. We only use it to send your report.</div>
    </div>
  );
}

/* ----------------------------------------------------- what we looked at */

const AREAS: { name: string; result: string; loop?: boolean }[][] = [
  [
    { name: 'Invoice matching', result: 'Loop 1', loop: true },
    { name: 'Customer questions', result: 'Loop 2', loop: true },
    { name: 'Late payments', result: 'Loop 3', loop: true },
    { name: 'Order entry', result: 'Not enough signals' },
    { name: 'Expense claims', result: 'Not enough signals' },
    { name: 'Payroll', result: 'Already handled by a provider' },
  ],
  [
    { name: 'Hiring and onboarding', result: 'Not enough signals' },
    { name: 'Stock and inventory', result: "Doesn't apply" },
    { name: 'Marketing reports', result: 'Not enough signals' },
    { name: 'IT support', result: 'Too small to pay back' },
    { name: 'Contract renewals', result: 'Not enough signals' },
  ],
];

function LookedAt() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        gap: 64,
        padding: '40px 0 8px',
        borderTop: `1px solid ${C.line}`,
      }}
    >
      <div style={{ flexShrink: 0, width: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={geist(24, 30, C.ink, 400, { letterSpacing: '-0.02em' })}>What we looked at</div>
        <div style={interText(14, 22, C.slate)}>We checked 11 areas of Tessaro&apos;s work. Three cleared the bar.</div>
      </div>
      <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', gap: 40 }}>
        {AREAS.map((col, i) => (
          <div key={i} style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {col.map((a) => (
              <div
                key={a.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '11px 0',
                  borderBottom: `1px solid ${C.lineSoft}`,
                }}
              >
                <div style={a.loop ? geist(14, 20, C.ink, 500) : interText(14, 20, C.slateDark)}>{a.name}</div>
                <div style={interText(13, 20, a.loop ? C.blue : C.muted)}>{a.result}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
