import type { CSSProperties, ReactNode } from 'react';
import { inter } from './fonts';
import { FILL, FRAME_BASE, geistText, interText } from './base';
import { HubSpotLogo, SnowflakeLogo, StripeLogo } from './logos';

/** Native size of the AiDOOS "How it works" section (Paper 1LQF). */
export const HOW_IT_WORKS_WIDTH = 1280;
export const HOW_IT_WORKS_HEIGHT = 768.5;

/**
 * "From your domain to your first loop": four step cards, each a small
 * screen over a photo. True size, no breakpoints; scaled by FitWidth.
 */
export function HowItWorksVisual() {
  return (
    <div
      className={inter.variable}
      style={{
        ...FRAME_BASE,
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        width: HOW_IT_WORKS_WIDTH,
        height: HOW_IT_WORKS_HEIGHT,
        paddingBlock: 96,
        paddingInline: 104,
        backgroundColor: '#FCFAF8',
        borderTop: '1px solid #E3E1DE',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <div style={geistText(40, 48, '#17191C', { letterSpacing: '-0.022em' })}>From your domain to your first loop</div>
        <div style={interText(14, 22, '#5F6976', 450, { maxWidth: 520 })}>
          Vantage starts with what is public about your company, then gets sharper with what only you know.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, width: '100%' }}>
        <Step title="1. Enter your domain" body="We read what is public about you." screen={{ padding: 24 }}>
          <DomainScreen />
        </Step>
        <Step title="2. See your loop opportunities" body="Each with the evidence behind it." screen={{ padding: 20 }}>
          <LoopsScreen />
        </Step>
        <Step title="3. Connect your tools" body="Read-only, for sharper numbers." screen={{ alignItems: 'center' }}>
          <ToolsScreen />
        </Step>
        <Step title="4. Approve, and we build it" body="AiDOOS builds and runs the loop." screen={{ alignItems: 'center', padding: 24 }}>
          <BuildScreen />
        </Step>
      </div>
    </div>
  );
}

function Step({ title, body, screen, children }: { title: string; body: string; screen: CSSProperties; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '0%', minWidth: 0, gap: 16 }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          justifyContent: 'center',
          height: 360,
          overflow: 'clip',
          backgroundColor: '#2A2724',
          borderRadius: 16,
          ...screen,
        }}
      >
        {children}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={geistText(17, 24, '#17191C', { fontWeight: 500 })}>{title}</div>
        <div style={interText(13.5, 20, '#5F6976')}>{body}</div>
      </div>
    </div>
  );
}

function photo(name: string): CSSProperties {
  return { backgroundImage: `url(/vantage/visuals/${name}.webp)`, backgroundPosition: '50%', backgroundSize: 'cover' };
}

/** The small white tooltip with a downward caret used on two screens. */
function Caret() {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
      <path d="M0 0 L5 5 L10 0 Z" fill="#FFFFFF" />
    </svg>
  );
}

/* ------------------------------------------------------------- 1. domain */

function DomainScreen() {
  return (
    <>
      <div style={{ ...FILL, ...photo('how-domain') }} />
      <div
        style={{
          ...FILL,
          backgroundImage:
            'radial-gradient(ellipse 120% 80% at 10% 5% in oklab, oklab(22.2% 0.023 0.026 / 55%) 0%, oklab(22.2% 0.023 0.026 / 15%) 60%, oklab(22.2% 0.023 0.026 / 0%) 100%), linear-gradient(in oklab 180deg, oklab(16.4% 0.011 0.012 / 20%) 0%, oklab(16.4% 0.011 0.012 / 10%) 50%, oklab(16.4% 0.011 0.012 / 25%) 100%)',
        }}
      />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, width: 212 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={geistText(26, 32, '#FFFFFF', { letterSpacing: '-0.02em', width: 'max-content' })}>tessaro.com</div>
            <div style={{ flexShrink: 0, width: 1.5, height: 28, backgroundColor: '#FFFFFF' }} />
          </div>
          <div style={{ flexShrink: 0, width: '100%', height: 1, backgroundColor: '#FFFFFFB3' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flexShrink: 0, width: 6, height: 6, backgroundColor: '#FFFFFF', borderRadius: 3, boxShadow: '#FFFFFF38 0px 0px 0px 3px' }} />
          <div style={interText(12.5, 18, '#FFFFFFDB', undefined, { width: 'max-content' })}>Reading 42 public pages</div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- 2. loops */

const LOOP_BARS = [38, 29, 96, 19, 22, 13, 16];

function LoopsScreen() {
  return (
    <>
      <div style={{ ...FILL, ...photo('how-loops') }} />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          paddingTop: 16,
          paddingBottom: 14,
          paddingInline: 16,
          backgroundColor: '#14161A8C',
          backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 10%) 0%, oklab(100% 0 0 / 0%) 40%)',
          backgroundOrigin: 'border-box',
          border: '1px solid #FFFFFF2E',
          borderRadius: 14,
          boxShadow: '#0A282D8C 0px 14px 30px -18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <div style={geistText(13, 18, '#FFFFFF', { fontWeight: 500, width: 'max-content' })}>7 loops found</div>
          <div style={interText(11.5, 16, '#FFFFFFB8', undefined, { width: 'max-content' })}>hrs a week</div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexShrink: 0,
            alignItems: 'end',
            justifyContent: 'space-between',
            height: 150,
            borderBottom: '1px solid #FFFFFF1F',
          }}
        >
          {LOOP_BARS.map((h, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 14,
                height: h,
                backgroundColor: i === 2 ? '#2D5BFF' : '#FFFFFF0F',
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }}
            />
          ))}
          <div style={{ position: 'absolute', left: 4, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'stretch',
                gap: 1,
                paddingBlock: 7,
                paddingInline: 10,
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
              }}
            >
              <div style={geistText(12, 16, '#17191C', { fontWeight: 500, width: 'max-content' })}>Invoice matching</div>
              <div style={interText(11.5, 15, '#5F6976', undefined, { width: 'max-content' })}>30 hrs a week</div>
            </div>
            <Caret />
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- 3. tools */

const TOOL_DISC: CSSProperties = {
  position: 'absolute',
  top: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  backgroundColor: '#FFFFFF',
  border: '2px solid #FFFFFF',
  borderRadius: 999,
  boxShadow: '#00140AB3 0px 12px 24px -12px',
};

function ToolsScreen() {
  return (
    <>
      <div style={{ ...FILL, ...photo('how-tools') }} />
      <div style={{ position: 'relative', flexShrink: 0, width: 180, height: 100 }}>
        <div style={{ ...TOOL_DISC, left: 12 }}>
          <StripeLogo size={20} />
        </div>
        <div style={{ ...TOOL_DISC, left: 48 }}>
          <HubSpotLogo size={20} />
        </div>
        <div style={{ ...TOOL_DISC, left: 84 }}>
          <SnowflakeLogo size={20} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            border: '1.5px dashed #FFFFFFBF',
            borderRadius: 24,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
            <path d="M7 2v10M2 7h10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 7, top: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 130 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'center',
              gap: 6,
              paddingBlock: 5,
              paddingInline: 9,
              backgroundColor: '#FFFFFF',
              borderRadius: 7,
            }}
          >
            <div style={geistText(12, 16, '#17191C', { fontWeight: 500, width: 'max-content' })}>HubSpot</div>
            <div style={interText(11.5, 16, '#5F6976', undefined, { width: 'max-content' })}>read only</div>
          </div>
          <Caret />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- 4. build */

const TITLE = geistText(14, 18, '#FFFFFF', { fontWeight: 500, width: 'max-content' });
const NOTE = interText(12, 16, '#FFFFFF99', undefined, { width: 'max-content' });

function BuildScreen() {
  return (
    <>
      <div style={{ position: 'absolute', left: -14, top: -14, width: 284, height: 388, ...photo('how-build') }} />
      <div
        style={{
          ...FILL,
          backgroundColor: '#0C0E1E33',
          backgroundImage:
            'radial-gradient(ellipse 90% 60% at 45% 45% in oklab, oklab(18.2% 0.005 -0.037 / 42%) 0%, oklab(18.2% 0.005 -0.037 / 22%) 70%, oklab(18.2% 0.005 -0.037 / 0%) 100%), radial-gradient(ellipse 120% 80% at 15% 5% in oklab, oklab(19.4% 0.006 -0.044 / 45%) 0%, oklab(19.4% 0.006 -0.044 / 0%) 100%)',
        }}
      />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: 176 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, alignItems: 'center', gap: 4, width: 12, paddingTop: 4 }}>
            <div style={{ flexShrink: 0, width: 10, height: 10, backgroundColor: '#FFFFFF', borderRadius: 5 }} />
            <div style={{ flexGrow: 1, width: 1, backgroundColor: '#FFFFFF73' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingBottom: 22 }}>
            <div style={TITLE}>Approved</div>
            <div style={NOTE}>Monday, by Priya</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, alignItems: 'center', gap: 4, width: 12, paddingTop: 3 }}>
            <div
              style={{
                flexShrink: 0,
                width: 12,
                height: 12,
                backgroundColor: '#F4A340',
                borderRadius: 6,
                boxShadow: '#F4A34040 0px 0px 0px 4px',
              }}
            />
            <div style={{ flexGrow: 1, width: 0, borderLeft: '1px dashed #FFFFFF66' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingBottom: 22 }}>
            <div style={TITLE}>Building</div>
            <div style={NOTE}>Invoice matching, 64%</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, alignItems: 'center', width: 12, paddingTop: 4 }}>
            <div style={{ flexShrink: 0, width: 10, height: 10, border: '1.5px solid #FFFFFFB3', borderRadius: 5 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <div style={TITLE}>Live on Thursday</div>
            <div style={NOTE}>AiDOOS runs and checks it</div>
          </div>
        </div>
      </div>
    </>
  );
}
