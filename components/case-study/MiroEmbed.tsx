'use client';

import { useEffect, useRef, useState } from 'react';

export function MiroEmbed({
  src,
  title,
  caption,
  aspectRatio,
}: {
  src: string;
  title: string;
  caption?: string;
  /**
   * CSS aspect-ratio (e.g. "8981/6491") matching this board's actual
   * moveToViewport region, so the iframe's shape fits the captured content
   * instead of letterboxing or cropping it. Defaults to the ratio tuned for
   * the intake board if omitted.
   */
  aspectRatio?: string;
}) {
  /** Has the iframe been put into the DOM yet (i.e. started loading)? */
  const [armed, setArmed] = useState(false);
  /** Has it finished loading, so the skeleton can go? */
  const [ready, setReady] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (armed) return;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setArmed(true);
    };

    // A Miro board needs several seconds to become interactive, so waiting for
    // it to scroll into view means the reader always waits. Idle time just
    // after first paint costs nothing and buys that head start: by the time
    // anyone scrolls this far, the board is already up.
    // Guarded at runtime for browsers without it (Safari shipped it late),
    // even though the DOM lib types it as always present.
    const canIdle = typeof window.requestIdleCallback === 'function';
    const idle = canIdle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    // Belt and braces: if someone jumps straight down (deep link, fast
    // flick, restored scroll position) start immediately rather than
    // waiting on idle.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) start();
      },
      { rootMargin: '1200px' },
    );
    if (holderRef.current) io.observe(holderRef.current);

    return () => {
      cancelled = true;
      io.disconnect();
      if (canIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [armed]);

  return (
    <figure className="flex flex-col gap-3">
      <div
        ref={holderRef}
        className="relative overflow-hidden rounded-2xl border border-bone-line bg-bone-deep shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]"
      >
        <div
          className={aspectRatio ? 'w-full' : 'aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[2/1]'}
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          {armed && (
            <iframe
              src={src}
              title={title}
              className="h-full w-full"
              onLoad={() => setReady(true)}
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            />
          )}
        </div>

        {/* Sits over the frame until it reports loaded, so the gap reads as a
            deliberate loading state rather than a broken embed. */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5 bg-bone-deep">
            <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-slate-300 border-t-slate-500" />
            <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
              Loading board
            </span>
          </div>
        )}
      </div>

      {caption && <figcaption className="text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
