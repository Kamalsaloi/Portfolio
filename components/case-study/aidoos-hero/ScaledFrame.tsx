'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scales a fixed-size child (given as nativeWidth x nativeHeight) down to
 * exactly fill this wrapper's width, via a CSS transform — so a component
 * built at one true pixel size (matching its design source 1:1) can be
 * dropped into a mockup card, a gallery cell, or anywhere else without
 * needing its own responsive logic.
 */
export function ScaledFrame({
  nativeWidth,
  nativeHeight,
  children,
  className = '',
}: {
  nativeWidth: number;
  nativeHeight: number;
  children: React.ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      setScale(el.offsetWidth / nativeWidth);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [nativeWidth]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: nativeHeight * scale, overflow: 'hidden' }}
    >
      <div style={{ width: nativeWidth, height: nativeHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  );
}
