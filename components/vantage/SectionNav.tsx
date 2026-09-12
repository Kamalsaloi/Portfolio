'use client';

import { useEffect, useRef, useState } from 'react';

export interface NavSection {
  id: string;
  label: string;
}

/**
 * A slim scan aid under the page nav: five labels that tell a reader the whole
 * shape of the page before they scroll any of it, and jump them to a section
 * when clicked.
 *
 * A left rail would be the more elegant pattern, but the content column is
 * 1180px wide, which leaves 50px of margin at 1280 and 130px on a common
 * laptop. Labels need roughly 150px, so a rail would be hidden on nearly every
 * machine that opens this. A bar works at every width.
 */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;

    // Track how much of each section is on screen and pick the leader, rather
    // than firing on whichever boundary crossed last. Sections here vary from
    // one screen to several, so "most visible" is the honest answer.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.current.set(e.target.id, e.intersectionRatio);
        let best = '';
        let bestRatio = 0;
        for (const [id, r] of ratios.current) {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-96px 0px -40% 0px' },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-[57px] z-30 border-b border-v-ink/10 bg-v-paper/95 backdrop-blur-sm"
    >
      {/* Scrolls rather than wraps on narrow screens: a two-line nav bar would
          push the page content down and stop reading as chrome. */}
      <ul className="mx-auto flex max-w-[1180px] items-stretch gap-7 overflow-x-auto px-6 sm:gap-9 sm:px-10 lg:px-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="flex h-[52px] flex-col items-start justify-center gap-1.5 whitespace-nowrap"
              >
                <span
                  className={`text-[14px] transition-colors ${
                    isActive ? 'font-medium text-v-ink' : 'text-v-ink/48 hover:text-v-ink/75'
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`h-[2px] w-full rounded-full transition-colors ${
                    isActive ? 'bg-v-warm' : 'bg-transparent'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
