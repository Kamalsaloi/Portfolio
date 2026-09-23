'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fits a fixed-width child to this wrapper's width.
 *
 * Uses CSS `zoom`, not `transform: scale()` like ScaledFrame. The heroes in
 * here animate constantly, and every animation start and stop promotes or
 * drops a compositor layer. Under a scale transform that churn made Chrome
 * paint whole broken frames (a white slab with fragments of the hero on it),
 * which read as the section flickering. `zoom` lays the child out at its final
 * size, so there is no transformed ancestor for the layers to go wrong under,
 * and the wrapper's height follows the content without being measured.
 *
 * `crop` lets a fixed-aspect parent clip the bottom instead of the wrapper
 * growing to the full height.
 */
export function FitWidth({
  nativeWidth,
  crop = false,
  children,
}: {
  nativeWidth: number;
  crop?: boolean;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    const o = outer.current;
    if (!o) return;
    /* ResizeObserver reports on observe, so this also covers the first
       measure without a setState in the effect body. The outer width never
       depends on the child, so this cannot feed back into itself. */
    const ro = new ResizeObserver(() => setZoom(o.clientWidth / nativeWidth));
    ro.observe(o);
    return () => ro.disconnect();
  }, [nativeWidth]);

  return (
    <div ref={outer} className={crop ? 'absolute inset-x-0 top-0' : 'w-full overflow-hidden'}>
      {/* Not rendered until measured, so the first paint is not a 1440px
          frame spilling out of a 400px card. */}
      <div style={zoom ? { width: nativeWidth, zoom } : { display: 'none' }}>{children}</div>
    </div>
  );
}
