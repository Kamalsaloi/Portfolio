'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OtherRedesigns } from '@/components/redesigns/OtherRedesigns';

interface Feature {
  title: string;
  body: string;
  /** The button: an internal page opens in place, anything else in a new tab. */
  link: { href: string; label: string; external?: boolean };
  loomId: string;
  videoTitle: string;
  playLabel: string;
}

/* Zenzio leads: a full case study. Landeed follows: a teardown and a live prototype. */
const FEATURES: Feature[] = [
  {
    title: 'Zenzio, where the first total is the total you pay.',
    body: 'A food delivery app in Puducherry. Its cart said ₹66, then asked for ₹129.30 after Checkout. I redesigned the cart so every fee, and the reason for it, shows before you tap Pay.',
    link: { href: '/case-studies/zenzio', label: 'Read the case study' },
    loomId: 'bed821b2a2bb4430a25d3438ef3957f2',
    videoTitle: 'Walkthrough of the Zenzio checkout redesign',
    playLabel: 'Watch the redesign walkthrough',
  },
  {
    title: 'Landeed, rebuilt to pay out before it asks.',
    body: 'A property intelligence platform for India: ownership records, encumbrance certificates, sale deeds. I recorded a teardown of the flow a new user meets, then redesigned it so search is the front door and you see what is on record for a property before anyone asks for your phone number.',
    link: { href: 'https://landeed-omega.vercel.app/', label: 'Open the redesign', external: true },
    loomId: '0113df9eb41e44be9771f0b15041b72c',
    videoTitle: "Audit of Landeed's property search and onboarding flow",
    playLabel: 'Watch the audit and the redesign',
  },
];

const BUTTON =
  'mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-cobalt-deep transition-colors hover:bg-white/88';

/**
 * One piece of work on somebody else's product: the argument on the left, the
 * walkthrough on the right.
 *
 * The video is a facade until it is asked for: nothing loads from Loom until
 * the play button is pressed, so a homepage most people scroll straight past
 * does not pay for a player embed.
 */
function FeatureRow({ feature, label }: { feature: Feature; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const { link } = feature;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
      <div className="flex flex-col gap-4 lg:w-[420px] lg:shrink-0">
        {label && <p className="text-[15px] text-white/60">{label}</p>}
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{feature.title}</h2>
        <p className="text-lg leading-relaxed text-white/72">{feature.body}</p>

        {link.external ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={BUTTON}>
            {link.label}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        ) : (
          <Link href={link.href} className={BUTTON}>
            {link.label}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
      </div>

      {/* Deep ink rather than a tint of the blue: the player needs to read as
          a well cut into the band, not a panel floating on it. */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#0b1233] ring-1 ring-white/12 shadow-[0_30px_70px_-30px_rgba(5,12,45,0.85)]">
        {playing ? (
          <iframe
            src={`https://www.loom.com/embed/${feature.loomId}?autoplay=1`}
            title={feature.videoTitle}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="aspect-video w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${feature.playLabel}: ${feature.videoTitle}`}
            className="group relative flex aspect-video w-full flex-col items-center justify-center gap-5"
          >
            <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-white group-focus-visible:scale-105 group-focus-visible:bg-white">
              {/* Nudged right: a triangle centred on its bounding box reads
                  as sitting left of centre inside a circle. */}
              <svg
                className="ml-1 h-6 w-6 fill-white transition-colors group-hover:fill-slate-950 group-focus-visible:fill-slate-950"
                viewBox="0 0 24 24"
              >
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="px-6 text-center text-[15px] text-white/55">{feature.playLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Work done on somebody else's product. */
export function Redesigns() {
  return (
    /* The cold open's cobalt, carried down the page: the intro is the only
       other place the site goes fully saturated, so the two read as a pair. */
    <section
      id="redesigns"
      className="bg-[linear-gradient(180deg,var(--color-cobalt),var(--color-cobalt-deep))] px-5 py-24 sm:px-10 lg:px-18"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20">
        {FEATURES.map((feature, i) => (
          <FeatureRow key={feature.loomId} feature={feature} label={i === 0 ? 'Redesigns' : undefined} />
        ))}

        {/* Smaller work on the same footing as the features above: someone
            else's live product, redesigned. A hairline rather than a new band,
            so it reads as more of this section, not the start of the next one. */}
        <div className="flex flex-col gap-10 border-t border-white/15 pt-16">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Other redesigns</h3>
          <OtherRedesigns tone="cobalt" />
        </div>
      </div>
    </section>
  );
}
