'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A horizontal rail with its own paging controls.
 *
 * The heading is passed in rather than rendered by the caller so the arrows can
 * sit on the same baseline as it: they need the rail's ref, so they have to
 * live inside this client boundary, but they belong visually to the header row
 * rather than floating over the first card.
 *
 * Children stay server-rendered; they are only slotted in here.
 */
export function ScrollRow({
  heading,
  label,
  children,
}: {
  heading: ReactNode;
  /** Names the scrollable region for screen readers and the arrow buttons. */
  label: string;
  children: ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    function update() {
      const el = railRef.current;
      if (!el) return;
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
    }

    rail.addEventListener('scroll', update, { passive: true });
    // Fires once on observe, which covers the initial measurement without
    // setting state straight out of the effect body.
    const ro = new ResizeObserver(update);
    ro.observe(rail);

    return () => {
      rail.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  function page(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    // One card per click, measured from the gap between the first two rather
    // than hardcoded, so changing the card width or gap can't desync this.
    const kids = rail.children;
    const step =
      kids.length > 1
        ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
        : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <>
      <div className="flex items-end justify-between gap-10 pb-14">
        {heading}

        {/* Touch users swipe, so these are desktop only. */}
        <div className="hidden shrink-0 gap-2 lg:flex">
          {([-1, 1] as const).map((direction) => {
            const disabled = direction === -1 ? atStart : atEnd;
            return (
              <button
                key={direction}
                type="button"
                onClick={() => page(direction)}
                disabled={disabled}
                aria-label={`${direction === -1 ? 'Previous' : 'Next'} ${label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-950 hover:border-slate-950 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d={direction === -1 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bleeds off the right edge so a cut card, not a tidy margin, is what
          tells you there is more. tabIndex because a scroll container that
          keyboard users cannot reach is a scroll container they cannot use. */}
      <div
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="-mr-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pr-5 pb-2 sm:-mr-10 sm:gap-8 sm:pr-10 lg:-mr-18 lg:pr-18 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </>
  );
}
