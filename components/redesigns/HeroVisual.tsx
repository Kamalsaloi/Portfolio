'use client';

import Image from 'next/image';
import { VelocitiHero, VELOCITI_WIDTH } from '@/components/velociti/VelocitiHero';
import { PullLogicHero, PULL_LOGIC_WIDTH } from '@/components/pull-logic/PullLogicHero';
import { FitWidth } from './FitWidth';
import { ImageSlot } from './Placeholder';
import type { Redesign } from './data';

/**
 * The redesigned hero for one project, fitted to the available width: the
 * live port where there is one, the exported frame where it is static.
 *
 * The heroes are pictures of someone else's site, so their fake nav links
 * and buttons are made inert and hidden from assistive tech; the host gives
 * the picture its accessible name.
 */
export function HeroVisual({ item, crop = false }: { item: Redesign; crop?: boolean }) {
  if (item.live) {
    const [Hero, width] =
      item.live === 'velociti'
        ? [VelocitiHero, VELOCITI_WIDTH]
        : [PullLogicHero, PULL_LOGIC_WIDTH];
    return (
      <div role="img" aria-label={`The redesigned ${item.name} hero, animated`}>
        <div inert aria-hidden className="select-none">
          <FitWidth nativeWidth={width} crop={crop}>
            <Hero />
          </FitWidth>
        </div>
      </div>
    );
  }

  const shot = item.after.image;
  if (!shot) {
    return (
      <ImageSlot
        className={crop ? 'absolute inset-0' : 'aspect-[16/10]'}
        label={`${item.name} redesigned hero goes here`}
      />
    );
  }

  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={crop ? '(max-width: 768px) 90vw, 420px' : '(max-width: 1200px) 92vw, 1100px'}
      /* Anchored top-left when cropped: a hero's headline sits on the left, so
         trimming the right edge loses less than centring would. */
      className={crop ? 'h-full w-full object-cover object-left-top' : 'h-auto w-full'}
    />
  );
}
