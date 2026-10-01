import { inter } from './fonts';
import { FRAME_BASE, geistText, interText } from './base';

/** Native size of the AiDOOS industries section (Paper 1LY9). The track holds
    eight cards but the frame clips it, so only the first three ever show and
    only those three are rendered. */
export const INDUSTRIES_RAIL_WIDTH = 1280;
export const INDUSTRIES_RAIL_HEIGHT = 803;

const CARDS = [
  {
    image: 'industries-marketing',
    title: 'Ad budget that moves itself to what works',
    industry: 'Marketing',
    result: '18% lower cost per lead',
  },
  {
    image: 'industries-it-service-desk',
    title: 'Tickets routed, and the common ones fixed on the spot',
    industry: 'IT service desk',
    result: '45% solved without an agent',
  },
  {
    image: 'industries-distribution',
    title: 'Emailed orders entered and checked for you',
    industry: 'Distribution',
    result: '3x faster order entry',
  },
];

/**
 * "Loops that work in your industry": header with rail arrows, then the
 * photo cards running off the right edge. True size, no breakpoints.
 */
export function IndustriesRailVisual() {
  return (
    <div
      className={inter.variable}
      style={{
        ...FRAME_BASE,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        gap: 48,
        width: INDUSTRIES_RAIL_WIDTH,
        height: INDUSTRIES_RAIL_HEIGHT,
        paddingBlock: 96,
        paddingLeft: 104,
        overflow: 'clip',
        backgroundColor: '#FCFAF8',
        borderTop: '1px solid #E3E1DE',
      }}
    >
      <Header />
      <div style={{ display: 'flex', gap: 16, width: 'fit-content' }}>
        {CARDS.map((c) => (
          <Card key={c.industry} {...c} />
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 40, width: '100%', paddingRight: 104 }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexBasis: '0%', minWidth: 0, gap: 12 }}>
        <div style={geistText(40, 48, '#17191C', { letterSpacing: '-0.022em' })}>Loops that work in your industry</div>
        <div style={interText(14, 22, '#5F6976', 450, { maxWidth: 520 })}>
          Wherever work repeats and the result is easy to measure, a loop can run it.
        </div>
      </div>
      <div style={{ display: 'flex', flexShrink: 0, gap: 8 }}>
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E3E1DE',
            borderRadius: 999,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
            <path d="M12.6 8H3.4M6.9 4.5 3.4 8l3.5 3.5" fill="none" stroke="#A39D9A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            backgroundColor: '#17191C',
            borderRadius: 999,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
            <path d="M3.4 8h9.2M9.1 4.5 12.6 8l-3.5 3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const SHADE =
  'linear-gradient(in oklab 180deg, oklab(15.4% -0.0009 -0.009 / 46%) 0%, oklab(15.4% -0.0009 -0.009 / 0%) 34%, oklab(15.4% -0.0009 -0.009 / 0%) 62%, oklab(15.4% -0.0009 -0.009 / 52%) 100%)';

function Card({ image, title, industry, result }: (typeof CARDS)[number]) {
  return (
    <div
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 400,
        height: 480,
        overflow: 'clip',
        backgroundColor: '#E9E4DF',
        borderRadius: 18,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 400,
          height: 480,
          backgroundImage: `url(/vantage/visuals/${image}.webp)`,
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 400, height: 480, backgroundImage: SHADE }} />
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 28,
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: 20,
          width: 344,
        }}
      >
        <div style={geistText(22, 28, '#FFFFFF', { letterSpacing: '-0.012em', textWrap: 'balance' })}>{title}</div>
        <svg width="18" height="18" viewBox="0 0 16 16" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
          <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 422,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          width: 344,
        }}
      >
        <div style={geistText(15, 20, '#FFFFFF', { fontWeight: 500, width: 'max-content' })}>{industry}</div>
        <div style={geistText(14, 20, '#FFFFFFCC', { width: 'max-content' })}>{result}</div>
      </div>
    </div>
  );
}
