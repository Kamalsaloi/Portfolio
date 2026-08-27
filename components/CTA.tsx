'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

export function CTA() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '15min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-16 sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h7v8l10-12h-7z" />
                </svg>
                Get Started
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Let&apos;s build something worth shipping
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
                Pick a time below. No back-and-forth required.
              </p>
            </div>

            <div
              className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white"
              style={{ height: 600 }}
            >
              <Cal
                namespace="15min"
                calLink="kamal-saloi-gs6nq8/15min"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
