'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';
import { REDESIGNS } from './data';

/**
 * Mounts its children only while near the viewport. The two live heroes loop
 * forever; unmounted off screen they cost nothing, and each one restarts from
 * the top when it scrolls back in, which is the right place to start watching.
 */
function WhenVisible({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '200px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {visible && children}
    </div>
  );
}

/**
 * The hero redesigns as a row of cards, each opening its before/after page.
 * On the homepage it sits inside the cobalt Redesigns band; on a redesign
 * page it is the "more like this" rail on white, minus the current one.
 */
export function OtherRedesigns({
  tone,
  exclude,
}: {
  tone: 'cobalt' | 'light';
  exclude?: string;
}) {
  const items = REDESIGNS.filter((r) => r.slug !== exclude);
  const onCobalt = tone === 'cobalt';

  return (
    <div className={`grid grid-cols-1 gap-8 ${items.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'} md:gap-6`}>
      {items.map((item) => (
        <Link key={item.slug} href={`/redesigns/${item.slug}`} className="group flex flex-col gap-4">
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-xl [contain:paint] transition-all duration-200 group-hover:-translate-y-0.5 ${
              onCobalt
                ? 'ring-1 ring-white/15 shadow-[0_24px_50px_-28px_rgba(5,12,45,0.9)]'
                : 'border border-slate-200 shadow-sm group-hover:shadow-md'
            }`}
            style={{ backgroundColor: item.ground }}
          >
            <WhenVisible>
              <HeroVisual item={item} crop />
            </WhenVisible>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className={`text-sm font-semibold ${onCobalt ? 'text-white' : 'text-slate-950'}`}>
              {item.name}
            </p>
            <p className={`text-[13px] ${onCobalt ? 'text-white/60' : 'text-slate-400'}`}>
              Hero redesign, before and after
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
