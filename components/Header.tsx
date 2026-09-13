'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

function CalendarIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 18 18">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 5.25V2.25m6 3V2.25m-6.751 6h7.5M3.749 15.75h10.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.749a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5z"
      />
    </svg>
  );
}

/**
 * Absolutely positioned rather than sticky: it sits over the hero plate so the
 * hero can fill the viewport, and it scrolls away as the next section rises
 * over the hero. Nothing here is in normal flow.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 py-5 sm:px-8 sm:py-6 lg:px-12">
      <nav className="relative flex items-center justify-between gap-4">
        {/* The link keeps a fixed 44px footprint in the nav; the photo inside it
            is out of flow, so growing it on hover moves nothing else on the
            page. Hover still registers while the pointer is out over the
            expanded photo, because an element matches :hover whenever the
            pointer is over any of its descendants. */}
        <Link
          href="/"
          aria-label="Kamal Saloi, home"
          className="group relative block h-11 w-11 shrink-0"
        >
          <span className="absolute top-0 left-0 z-50 block h-11 w-11 overflow-hidden rounded-full bg-slate-950 ring-1 shadow-lg ring-slate-950/8 shadow-slate-950/15 transition-[width,height,border-radius,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[228px] group-hover:w-[182px] group-hover:rounded-[20px] group-hover:shadow-2xl group-focus-visible:h-[228px] group-focus-visible:w-[182px] group-focus-visible:rounded-[20px] motion-reduce:transition-none">
            {/* At 44px the crop is biased above centre, because a face sits in
                the upper half of most portraits and a dead-centre circular crop
                takes the chin. Expanded there is room for the whole frame, so
                it eases back to centre. */}
            <Image
              src="/Kamal.webp"
              alt=""
              fill
              sizes="182px"
              className="object-cover object-[center_32%] transition-[object-position] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:object-center group-focus-visible:object-center motion-reduce:transition-none"
            />
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-normal text-slate-700 transition-colors hover:text-slate-950"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/10 backdrop-blur-sm transition-colors hover:bg-white sm:px-6 sm:py-3"
          >
            Book a call
            <CalendarIcon />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-white/60 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full right-4 flex w-56 flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
