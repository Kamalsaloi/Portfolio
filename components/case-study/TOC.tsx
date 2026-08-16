'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'chat-input', label: 'Type Right There' },
  { id: 'reading-screen', label: 'Reading Your Brief' },
  { id: 'intake', label: 'Understanding, Not a Form' },
  { id: 'proposal-page', label: 'A Page, Not a Modal' },
  { id: 'title-refine', label: 'Title & Refine' },
  { id: 'modules', label: 'Delivery Modules' },
  { id: 'timeline', label: 'Visual Timeline' },
  { id: 'architecture', label: 'Technical Architecture' },
  { id: 'risks', label: 'Risks & Mitigations' },
  { id: 'pricing', label: 'Pricing & Delivery Units' },
];

export function TOC() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden h-fit lg:sticky lg:top-24 lg:block">
      <ul className="space-y-1 border-l border-slate-200">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                active === id
                  ? 'border-slate-950 font-medium text-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
