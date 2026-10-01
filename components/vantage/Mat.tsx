import type { ReactNode } from 'react';
import { FitWidth } from '@/components/redesigns/FitWidth';

/**
 * The one ground every product visual on the Vantage page sits on: warm at
 * the top left, cool at the bottom right, the product's own signature. Taken
 * from the Paper file ("Mild cloud", the hero, how it works, loop, industries
 * and report mats all share it). Exported so ThinkingScreen paints the same
 * backdrop rather than a near miss of it.
 */
export const MAT_GRADIENT =
  'linear-gradient(in oklab 135deg, oklab(73.7% 0.067 0.122) 0%, oklab(89.7% 0.023 0.028) 50%, oklab(65.9% -0.040 -0.086) 100%)';

/**
 * Mat padding. `screen` is the 44 x 56 the page's visuals use at desktop;
 * `report` is 56 all round, because the report mat also carries the expand
 * button and needs the extra room under it. Both drop to 32 on tablets and
 * 20 on phones, where the visual matters more than the frame around it.
 */
const PAD = {
  screen: 'p-5 sm:p-8 lg:px-14 lg:py-11',
  report: 'p-5 sm:p-8 lg:p-14',
} as const;

export function Mat({
  children,
  pad = 'screen',
  className = '',
}: {
  children: ReactNode;
  pad?: keyof typeof PAD;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-[20px] ${PAD[pad]} ${className}`}
      style={{ backgroundImage: MAT_GRADIENT }}
    >
      {children}
    </div>
  );
}

type MatSlotProps = {
  children: ReactNode;
  /** The width the visual is drawn at. FitWidth scales it to the slot. */
  nativeWidth: number;
  /**
   * Height of the window onto the visual, in the visual's own pixels. The
   * slot keeps this aspect ratio at every width and clips anything below it,
   * so the crop lands on the same line of the design everywhere and the page
   * does not jump when the visual measures itself. Leave it out to let the
   * slot grow to the visual's full height.
   */
  nativeHeight?: number;
  /** The slot's width at desktop. It shrinks with the mat below that. */
  maxWidth: number;
  /** A hairline around the slot, for visuals whose own edge is near white. */
  ring?: boolean;
  /** What the visual shows, for anyone who cannot see it. */
  label: string;
  /**
   * Set when the visual has controls of its own. Otherwise it is treated as a
   * picture: one labelled image to assistive tech, and nothing inside it can
   * take focus.
   */
  interactive?: boolean;
  className?: string;
};

/**
 * The white window inside a mat that a live visual is drawn into.
 *
 * Every visual here is a real piece of the AiDOOS product rebuilt at its true
 * width (usually 1280) and scaled down by FitWidth, so the type and spacing
 * inside it stay exactly as designed instead of reflowing at each breakpoint.
 */
export function MatSlot({
  children,
  nativeWidth,
  nativeHeight,
  maxWidth,
  ring = false,
  label,
  interactive = false,
  className = '',
}: MatSlotProps) {
  const cropped = nativeHeight !== undefined;

  return (
    <div
      role={interactive ? 'group' : 'img'}
      aria-label={label}
      className={`w-full overflow-clip rounded-[12px] bg-white ${cropped ? 'relative' : ''} ${
        ring ? 'shadow-[0_0_0_1px_#15181F14]' : ''
      } ${className}`}
      style={{
        maxWidth,
        aspectRatio: cropped ? `${nativeWidth} / ${nativeHeight}` : undefined,
      }}
    >
      {/* `inert` rather than aria-hidden: it also takes the visual's own
          links and buttons out of the tab order, which aria-hidden does not. */}
      <div inert={!interactive} className={cropped ? 'contents' : undefined}>
        <FitWidth nativeWidth={nativeWidth} crop={cropped}>
          {children}
        </FitWidth>
      </div>
    </div>
  );
}
