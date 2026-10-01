import type { CSSProperties } from 'react';

/* Shared bits for the AiDOOS product visuals. Every value in these components
   comes from Paper's get_jsx / get_computed_styles output, at the inner
   frame's native size; the page scales them with FitWidth. */

/** Geist is loaded by the root layout; Inter by ./fonts (its `variable` must
    be on the visual's root element for this to resolve). */
export const GEIST = 'var(--font-geist-sans), system-ui, sans-serif';
export const INTER = 'var(--font-inter), system-ui, sans-serif';

/** What Paper puts on every exported frame root. */
export const FRAME_BASE: CSSProperties = {
  boxSizing: 'border-box',
  fontSize: 12,
  lineHeight: '16px',
  fontSynthesis: 'none',
  overflowWrap: 'anywhere',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

/** A Geist text run. `lh` is the line height in px. */
export function geistText(size: number, lh: number, color: string, extra?: CSSProperties): CSSProperties {
  return { fontFamily: GEIST, fontSize: size, lineHeight: `${lh}px`, color, ...extra };
}

/** An Inter text run. Paper sets the variable weight on both properties. */
export function interText(size: number, lh: number, color: string, weight?: number, extra?: CSSProperties): CSSProperties {
  return {
    fontFamily: INTER,
    fontSize: size,
    lineHeight: `${lh}px`,
    color,
    ...(weight ? { fontWeight: weight, fontVariationSettings: `"wght" ${weight}` } : null),
    ...extra,
  };
}

/** A full-bleed absolutely positioned layer (image fills, scrims). */
export const FILL: CSSProperties = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' };
