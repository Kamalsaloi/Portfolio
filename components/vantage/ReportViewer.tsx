'use client';

import Image from 'next/image';
import { useState } from 'react';

const MAT =
  'linear-gradient(140deg, oklch(0.88 0.085 60) 0%, oklch(0.96 0.02 90) 45%, oklch(0.87 0.055 245) 100%)';

/**
 * The report, cropped to its opening and genuinely expandable.
 *
 * Collapsed it stops just past the honesty band. The cut is hard rather than
 * faded: the crop is white and the mat behind it is not, so the edge already
 * reads as a crop and a gradient would only soften the one line of copy the
 * section is arguing for. The control sits below on the mat, outlined rather
 * than filled, so it stays a quiet offer instead of competing with the report.
 */
export function ReportViewer() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex w-full max-w-[1180px] flex-col items-center gap-8 rounded-[24px] p-5 sm:p-9 lg:p-14"
      style={{ backgroundImage: MAT }}
    >
      <div
        className={`w-full max-w-[1000px] overflow-hidden rounded-[12px] bg-white ${
          open ? '' : 'max-h-[920px]'
        }`}
      >
        <Image
          src="/vantage/report.webp"
          alt="The gated Vantage report: a headline reading your pricing model is what is costing you, three summary stats, and a band admitting the brief only saw public pages, above one full opportunity and three blurred ones."
          width={2560}
          height={4760}
          sizes="(max-width: 1000px) 92vw, 1000px"
          className="h-auto w-full"
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-v-ink px-6.5 py-3.5 text-[15px] font-semibold text-v-ink transition-colors hover:bg-v-ink hover:text-v-paper"
      >
        {open ? 'Collapse the report' : 'Expand the full report UI'}
        <svg
          className="h-[15px] w-[15px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
        </svg>
      </button>
    </div>
  );
}
