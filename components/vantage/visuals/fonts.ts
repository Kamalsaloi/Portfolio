import localFont from 'next/font/local';

/* Inter, as used inside the AiDOOS product designs these visuals reproduce.
   Self-hosted like every other font here (see app/layout.tsx). Geist comes
   from the root layout via var(--font-geist-sans). */
export const inter = localFont({
  src: '../../../app/fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-inter',
});
