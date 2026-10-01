import { inter } from './fonts';
import { TrackVisual } from './LoopTries';

/** Native size of the AiDOOS "Why AI stalls" section (Paper 1LOX): 96px of
    padding above and below the 560 track, plus its 1px top border. */
export const LOOP_SECTION_WIDTH = 1280;
export const LOOP_SECTION_HEIGHT = 753;

/**
 * The shipped loop section: the running track on the left, the headline and
 * its line of support on the right. Rendered at its true size and scaled by
 * the host (see FitWidth), so there are no breakpoint prefixes below.
 *
 * The copy on the Vantage page (Paper "Mild cloud") drops the two faint side
 * rules the AiDOOS original has at x 64 and x 1215, so they are off by
 * default; pass `rules` to draw them.
 */
export function LoopSectionVisual({ rules = false }: { rules?: boolean }) {
  return (
    <section
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: LOOP_SECTION_WIDTH,
        height: LOOP_SECTION_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        gap: 72,
        padding: '96px 104px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E3E1DE',
        fontSize: 12,
        lineHeight: '16px',
        fontSynthesis: 'none',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'anywhere',
      }}
    >
      {rules && (
        <>
          <div style={{ position: 'absolute', left: 64, top: 0, width: 1, height: '100%', backgroundColor: '#17191C17' }} />
          <div style={{ position: 'absolute', left: 1215, top: 0, width: 1, height: '100%', backgroundColor: '#17191C17' }} />
        </>
      )}

      <TrackVisual />

      <div style={{ display: 'flex', flex: '1 1 0%', minWidth: 0, flexDirection: 'column', gap: 12 }}>
        {/* A div, not a heading: this is a picture of another page, and its
            headline should not join the case study's outline. */}
        <div
          style={{
            margin: 0,
            color: '#17191C',
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: '-0.022em',
            lineHeight: '48px',
            textWrap: 'balance',
          }}
        >
          An automation does a task. A loop gets you the result.
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: 420,
            color: '#5F6976',
            fontFamily: `${inter.style.fontFamily}, system-ui, sans-serif`,
            fontSize: 14,
            fontWeight: 450,
            lineHeight: '22px',
          }}
        >
          A loop checks every outcome against your goal and adjusts until it gets there. It needs these seven
          parts, and it works first where results are quick to measure.
        </p>
      </div>
    </section>
  );
}
