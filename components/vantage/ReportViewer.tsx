'use client';

import Image from 'next/image';
import { useState } from 'react';

const MAT =
  'linear-gradient(140deg, oklch(0.88 0.085 60) 0%, oklch(0.96 0.02 90) 45%, oklch(0.87 0.055 245) 100%)';

type ReportViewerProps = {
  src: string;
  alt: string;
  /** Real pixel size of the export (Paper exports at 2x). */
  width: number;
  height: number;
  /**
   * How much of the screen shows before it is expanded, as a fraction of the
   * image height. Tied to a section boundary in the design so the cut never
   * lands in the middle of a line of text.
   */
  collapsedTo: number;
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
  src,
  alt,
  width,
  height,
  collapsedTo,
  expandLabel,
  collapseLabel,
}: ReportViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex w-full max-w-[1180px] flex-col items-center gap-8 rounded-[24px] p-5 sm:p-9 lg:p-14"
      style={{ backgroundImage: MAT }}
    >
      <div
        className="w-full max-w-[1000px] overflow-hidden rounded-[12px] bg-white"
        style={open ? undefined : { aspectRatio: `${width} / ${Math.round(height * collapsedTo)}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1000px) 92vw, 1000px"
          className="h-auto w-full"
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-v-ink px-6.5 py-3.5 text-[15px] font-semibold text-v-ink transition-colors hover:bg-v-ink hover:text-v-paper"
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
    </div>
  );
}
