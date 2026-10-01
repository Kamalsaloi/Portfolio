'use client';

import { useId, useState, type ReactNode } from 'react';
import { FitWidth } from '@/components/redesigns/FitWidth';
import { Mat } from './Mat';

type ReportViewerProps = {
  /** The full report, drawn at `nativeWidth`. */
  children: ReactNode;
  /** The width the report is drawn at (1280 for both report visuals). */
  nativeWidth: number;
  /**
   * How much of the report shows before it is expanded, in the report's own
   * pixels. Tied to a section boundary in the design so the cut never lands
   * in the middle of a line of text.
   */
  collapsedHeight: number;
  /** What the report shows, for anyone who cannot see it. */
  label: string;
  expandLabel: string;
  collapseLabel: string;
};

/**
 * A tall product screen, cropped to its opening and genuinely expandable.
 *
 * The crop is an aspect ratio, not a pixel height, so the cut lands on the
 * same line of the design at every width. The cut is hard rather than faded:
 * the screen is light and the mat is not, so the edge already reads as a crop.
 * The control sits below on the mat, outlined, so it stays a quiet offer.
 */
export function ReportViewer({
  children,
  nativeWidth,
  collapsedHeight,
  label,
  expandLabel,
  collapseLabel,
}: ReportViewerProps) {
  const [open, setOpen] = useState(false);
  const slotId = useId();

  return (
    <Mat pad="report" className="gap-8">
      <div
        id={slotId}
        role="img"
        aria-label={label}
        className={`w-full max-w-[888px] overflow-clip rounded-[12px] bg-white ${open ? '' : 'relative'}`}
        style={open ? undefined : { aspectRatio: `${nativeWidth} / ${collapsedHeight}` }}
      >
        <div inert className={open ? undefined : 'contents'}>
          <FitWidth nativeWidth={nativeWidth} crop={!open}>
            {children}
          </FitWidth>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={slotId}
        className="inline-flex items-center gap-2 rounded-full border border-v-ink px-6.5 py-3.5 text-[15px] leading-[22.5px] font-semibold text-v-ink transition-colors hover:bg-v-ink hover:text-v-paper"
      >
        {open ? collapseLabel : expandLabel}
        <svg
          className="h-[15px] w-[15px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
        </svg>
      </button>
    </Mat>
  );
}
