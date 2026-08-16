'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="relative w-fit mx-auto flex items-center justify-center gap-8 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] px-3 py-2">
        <Link
          href="/"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white"
        >
          YN
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#work" className="hover:text-slate-950 transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-slate-950 transition-colors">
            About
          </a>
          <a href="#process" className="hover:text-slate-950 transition-colors">
            Process
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Book a call
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isOpen && (
          <div className="md:hidden absolute top-full right-0 mt-2 w-56 flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white shadow-lg p-3">
            <a href="#work" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Work
            </a>
            <a href="#about" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              About
            </a>
            <a href="#process" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Process
            </a>
            <a href="#contact" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Contact
            </a>
            <a
              href="#contact"
              className="mt-1 rounded-full bg-slate-950 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Book a call
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
