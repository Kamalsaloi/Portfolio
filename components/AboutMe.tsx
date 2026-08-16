'use client';

import { useEffect, useRef, useState } from 'react';

const TEXT =
  "I'm a designer passionate about creating beautiful, functional digital experiences. With expertise in UI/UX design, branding, and design systems, I help businesses connect with their users through thoughtful design. When I'm not designing, you can find me exploring new design trends, mentoring junior designers, or working on personal creative projects.";

export function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = TEXT.split(' ');
  const activeCount = Math.round(progress * words.length);

  return (
    <section id="about" ref={containerRef} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-xs font-mono uppercase tracking-wider text-slate-400">About Me</p>
        <p className="max-w-3xl text-center text-2xl font-medium leading-relaxed sm:text-3xl lg:text-4xl">
          {words.map((word, i) => (
            <span
              key={i}
              className={`transition-colors duration-300 ${
                i < activeCount ? 'text-slate-950' : 'text-slate-300'
              }`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
