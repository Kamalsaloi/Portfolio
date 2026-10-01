'use client';

import { useEffect, useId, useRef, useState } from 'react';

export interface NavSection {
  id: string;
  label: string;
}

/**
 * A slim scan aid under the page nav: labels that tell a reader the whole
 * shape of the page before they scroll any of it, and jump them to a section
 * when clicked.
 *
 * A left rail would be the more elegant pattern, but the content column is
 * 1180px wide, which leaves 50px of margin at 1280 and 130px on a common
 * laptop. Labels need roughly 150px, so a rail would be hidden on nearly every
 * machine that opens this. A bar works at every width.
 *
 * On phones the bar becomes a dropdown. Eight tabs in a sideways scroll meant
 * most of them sat off screen, so the page's shape was the one thing the bar
 * failed to show. The dropdown names the section you are in, and one tap shows
 * all eight.
 */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const [open, setOpen] = useState(false);
  const ratios = useRef(new Map<string, number>());
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

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

  // While the dropdown is open, a tap anywhere else or Escape closes it.
  // Escape also hands focus back to the button so a keyboard user is not
  // dropped at the top of the document.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <nav
      aria-label="Sections"
      className="sticky top-[69px] z-30 border-b border-v-ink/10 bg-v-paper/95 backdrop-blur-sm"
    >
      {/* Phones: one bar naming the current section, opening a list of all of
          them. */}
      <div ref={menuRef} className="relative sm:hidden">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="flex h-[52px] w-full items-center justify-between gap-4 px-6 text-left"
        >
          <span className="text-[14px] leading-[21px] font-medium text-v-ink">
            <span className="sr-only">Section: </span>
            {current?.label}
          </span>
          <svg
            className="h-4 w-4 shrink-0 text-v-ink"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
          </svg>
        </button>

        {/* Hangs below the bar, over the page, so opening it does not shove
            the content down. */}
        <div
          id={panelId}
          hidden={!open}
          className="absolute inset-x-0 top-full px-2 pt-2"
        >
          <ul className="flex flex-col rounded-[12px] border border-v-ink/10 bg-white py-2 shadow-[0_16px_40px_-16px_#15181F33]">
            {sections.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex h-12 items-center justify-between gap-4 px-4 text-[14px] leading-[21px] ${
                      isActive ? 'font-medium text-v-ink' : 'text-v-ink/48'
                    }`}
                  >
                    {s.label}
                    {isActive && (
                      <svg
                        className="h-4 w-4 shrink-0 text-v-warm"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.25}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Tablets and up: the tab row. Scrolls rather than wraps where it runs
          out of room: a two-line nav bar would push the page content down and
          stop reading as chrome. */}
      <ul className="mx-auto hidden max-w-[1180px] items-stretch gap-9 overflow-x-auto px-10 pt-4 sm:flex lg:px-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="flex flex-col items-start gap-1.5 whitespace-nowrap"
              >
                <span
                  className={`text-[14px] leading-[21px] transition-colors ${
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
