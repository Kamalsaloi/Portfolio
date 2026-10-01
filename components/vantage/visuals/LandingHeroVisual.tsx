import type { CSSProperties } from 'react';
import { inter } from './fonts';
import { FRAME_BASE, geistText, interText } from './base';
import { HubSpotLogo, SnowflakeLogo, StripeLogo } from './logos';

/** Native size of the AiDOOS landing page top ("Landing v2 · top" in Paper),
    which the "first screen" hero mat shows whole. */
export const LANDING_HERO_WIDTH = 1280;
export const LANDING_HERO_HEIGHT = 1040.5;

const EDGE = '#17191C17';
const HATCH = 'rgb(23 25 28 / 8%)';

/**
 * The AiDOOS landing page as it first loads: nav, the 85% headline, the
 * domain field and the "public signals and your tools into one loop" panel,
 * with the page's edge rules and hatching. Rendered at its true size with no
 * breakpoint classes; the host scales it with FitWidth.
 */
export function LandingHeroVisual() {
  return (
    <div
      className={inter.variable}
      style={{
        ...FRAME_BASE,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: LANDING_HERO_WIDTH,
        height: LANDING_HERO_HEIGHT,
        overflow: 'clip',
        backgroundColor: '#FCFAF8',
      }}
    >
      <Nav />
      <Copy />
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'start',
          justifyContent: 'center',
          width: '100%',
          paddingTop: 24,
          paddingBottom: 72,
          paddingInline: 104,
        }}
      >
        <Panel />
      </div>
      <EdgeLines />
    </div>
  );
}

/* -------------------------------------------------------------------- nav */

const NAV = [
  { label: 'VDC', menu: true },
  { label: 'Pricing', menu: false },
  { label: 'Resources', menu: true },
  { label: 'Tools', menu: true },
  { label: 'For Talent', menu: false },
  { label: 'RAMP', menu: false },
  { label: 'Vantage', menu: false },
];

const NAV_TEXT = geistText(13, 19.5, '#404040', { letterSpacing: '-0.13px' });

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
      <path d="M3 4.5l3 3 3-3" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Nav() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBlock: 24,
        paddingInline: 104,
        borderBottom: '1px solid #E3E1DE',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <AidoosMark />
        <div style={geistText(16, 24, '#2D5BFF', { fontWeight: 700, letterSpacing: '-0.02em' })}>AiDOOS</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {NAV.map((it) => (
          <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 4, paddingBlock: 6, paddingInline: 8 }}>
            <div style={NAV_TEXT}>{it.label}</div>
            {it.menu && <Chevron />}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', paddingBlock: 6, paddingInline: 12 }}>
          <div style={NAV_TEXT}>Login</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBlock: 4,
            paddingInline: 16,
            border: '1px solid #DADEE6',
            borderRadius: 6,
            boxShadow: '#0F172A0A 0px 1px 2px',
          }}
        >
          <div style={geistText(12, 18, '#434851', { fontWeight: 500, letterSpacing: '-0.152px' })}>Free Trial</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 64, top: 0, width: 1, height: '100%', backgroundColor: EDGE }} />
      <div style={{ position: 'absolute', left: 1215, top: 0, width: 1, height: '100%', backgroundColor: EDGE }} />
    </div>
  );
}

function AidoosMark() {
  return (
    <svg width="15" height="15" viewBox="-407.963 141.033 133.232 133.108" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
      <path
        transform="translate(-81.59 144.32) rotate(180) scale(1 -1)"
        d="M295.588 40.436C295.649 40.55 295.71 40.663 295.773 40.78 295.895 41.006 296.017 41.235 296.138 41.462 296.193 41.561 296.245 41.66 296.301 41.763 296.441 42.04 296.573 42.32 296.7 42.603 296.934 43.117 297.183 43.621 297.442 44.125 297.488 44.215 297.533 44.305 297.58 44.399 297.678 44.588 297.774 44.777 297.872 44.966 298.018 45.25 298.163 45.535 298.308 45.82 298.929 47.032 299.558 48.24 300.208 49.44 301.003 50.918 301.003 50.918 301.31 51.69 301.56 52.31 301.879 52.882 302.218 53.461 302.708 54.302 303.123 55.155 303.508 56.044 304.027 57.241 304.608 58.395 305.235 59.545 306.136 61.2 306.982 62.878 307.826 64.559 308.193 65.286 308.559 66.015 308.927 66.742 308.999 66.885 309.071 67.029 309.146 67.176 309.545 67.965 309.953 68.749 310.372 69.528 310.66 70.065 310.926 70.598 311.153 71.16 311.454 71.901 311.834 72.6 312.215 73.306 312.641 74.102 313.029 74.91 313.41 75.725 313.948 76.875 314.536 77.99 315.169 79.095 315.539 79.741 315.86 80.39 316.163 81.066 316.363 81.453 316.57 81.835 316.778 82.219 317.194 82.991 317.568 83.762 317.893 84.573 318.097 85.035 318.355 85.461 318.624 85.891 318.83 86.249 318.995 86.615 319.162 86.99 319.374 87.45 319.622 87.895 319.864 88.343 321.625 91.64 323.198 95.098 324.348 98.628 324.441 98.91 324.541 99.19 324.641 99.47 325.15 100.93 325.444 102.429 325.733 103.939 325.764 104.099 325.764 104.099 325.795 104.262 326.537 108.155 326.941 112.809 324.601 116.335 324.259 116.797 323.893 117.232 323.508 117.663 323.433 117.753 323.358 117.843 323.282 117.935 322.073 119.249 319.959 119.995 318.195 120.32 318.058 120.346 317.918 120.373 317.778 120.4 315.373 120.71 313.03 120.426 310.695 119.876 310.578 119.85 310.459 119.825 310.338 119.798 308.451 119.376 306.726 118.7 304.957 117.958 304.515 117.775 304.067 117.61 303.615 117.451 301.341 116.643 299.106 115.729 296.887 114.795 296.323 114.565 295.753 114.349 295.181 114.135 294.418 113.845 293.66 113.545 292.901 113.245 292.668 113.153 292.668 113.153 292.428 113.059 292.114 112.935 291.799 112.81 291.484 112.686 291.158 112.558 290.833 112.43 290.506 112.302 289.711 111.991 288.922 111.677 288.145 111.327 287.422 111.008 286.693 110.715 285.948 110.441 285.139 110.143 284.35 109.817 283.566 109.464 282.686 109.068 281.797 108.723 280.885 108.4 279.313 107.833 277.783 107.161 276.248 106.506 275.409 106.148 274.567 105.797 273.722 105.452 272.923 105.125 272.141 104.776 271.368 104.399 270.857 104.165 270.328 103.984 269.793 103.805 269.381 103.615 269.126 103.371 268.819 103.054 269.03 102.908 269.242 102.764 269.454 102.62 269.595 102.525 269.735 102.43 269.879 102.33 270.255 102.099 270.602 101.912 271.003 101.729 271.933 101.304 271.933 101.304 272.725 100.693 272.914 100.118 272.935 99.674 272.9 99.075 272.883 98.626 272.883 98.626 273.195 98.184 273.298 97.39 273.298 97.39 272.95 96.717 272.623 96.273 272.729 95.926 272.81 95.405 272.894 95.032 273.043 94.7 273.195 94.347 273.27 93.714 273.27 93.714 272.96 93.175 272.609 92.719 272.666 92.391 272.725 91.839 272.883 91.494 273.038 91.15 273.195 90.805 273.298 90.131 273.298 90.131 273.019 89.525 272.948 89.442 272.878 89.36 272.804 89.275 272.385 88.767 272.318 88.415 272.356 87.778 272.419 87.376 272.523 87 272.638 86.609 272.855 85.855 272.929 85.153 272.96 84.377 273.173 79.785 274.904 75.661 278.443 72.423 279.043 71.852 279.559 71.231 280.069 70.589 280.158 70.479 280.245 70.369 280.335 70.255 280.623 69.881 280.895 69.5 281.163 69.113 281.221 69.03 281.279 68.948 281.338 68.862 282.62 66.997 283.474 64.995 284.288 62.915 284.348 62.765 284.407 62.616 284.468 62.462 285.14 60.274 285.287 58.005 285.285 55.74 285.285 55.583 285.285 55.583 285.285 55.424 285.358 53.053 285.358 53.053 284.758 50.814 284.715 50.556 284.677 50.298 284.64 50.04 284.456 48.964 284.081 47.989 283.663 46.977 283.608 46.835 283.551 46.693 283.493 46.546 282.048 43.04 279.566 39.766 276.475 37.385 276.367 37.297 276.258 37.209 276.145 37.118 271.583 33.52 265.748 31.557 259.806 31.584 259.52 31.585 259.52 31.585 259.23 31.586 257.647 31.605 256.145 31.754 254.601 32.073 254.473 32.098 254.345 32.124 254.213 32.15 252.473 32.5 250.874 32.985 249.271 33.713 248.945 33.857 248.616 33.99 248.286 34.125 246.243 34.98 244.448 36.204 242.808 37.623 242.583 37.816 242.355 38.005 242.125 38.194 237.939 41.654 235.131 46.796 234.444 51.995 234.416 52.185 234.389 52.376 234.36 52.574 233.871 56.895 234.26 61.299 236.178 65.278 236.309 65.55 236.432 65.825 236.553 66.1 237.861 68.907 239.955 71.785 242.548 73.65 245.495 75.899 245.722 78.727 246.163 82.099 246.206 82.419 246.25 82.738 246.294 83.058 246.332 83.325 246.368 83.594 246.403 83.862 246.571 84.9 246.924 85.696 247.586 86.537 247.784 86.94 247.726 87.145 247.569 87.559 247.281 87.848 247.281 87.848 246.935 88.121 246.493 88.52 246.229 88.759 246.213 89.348 246.319 89.919 246.512 90.295 246.788 90.805 246.872 91.564 246.787 91.84 246.319 92.429 246.25 93.02 246.266 93.363 246.554 93.895 246.868 94.5 246.858 94.858 246.788 95.528 246.711 95.599 246.633 95.67 246.553 95.745 246.291 95.955 246.291 95.955 246.263 96.273 246.265 96.383 246.268 96.493 246.271 96.607 246.272 96.715 246.272 96.825 246.273 96.937 246.307 97.315 246.307 97.315 246.48 97.716 246.658 98.262 246.631 98.704 246.613 99.272 246.629 99.882 246.682 100.291 247.143 100.752 247.638 101.052 248.148 101.312 248.663 101.578 249.052 101.83 249.424 102.099 249.796 102.371 249.886 102.435 249.975 102.498 250.068 102.564 250.283 102.72 250.489 102.885 250.695 103.054 250.695 103.151 250.695 103.249 250.695 103.349 250.039 103.67 249.391 103.965 248.703 104.216 248.1 104.437 247.529 104.693 246.954 104.972 246.367 105.255 245.792 105.499 245.167 105.7 244.386 105.955 243.669 106.29 242.936 106.648 242.15 107.026 241.346 107.323 240.52 107.612 240.145 107.748 239.798 107.895 239.445 108.071 238.934 108.324 238.413 108.517 237.873 108.707 237.101 108.981 236.358 109.285 235.616 109.62 234.729 110.02 233.834 110.365 232.912 110.69 232.213 110.949 231.539 111.251 230.859 111.553 230.315 111.79 229.762 111.998 229.203 112.204 228.786 112.364 228.378 112.54 227.97 112.72 227.41 112.963 226.852 113.18 226.27 113.375 224.899 113.835 223.576 114.404 222.247 114.961 222.077 115.032 221.906 115.104 221.732 115.177 221.393 115.319 221.055 115.46 220.718 115.603 219.803 115.986 218.887 116.332 217.944 116.648 217.483 116.807 217.044 116.999 216.603 117.202 215.536 117.676 214.444 118.062 213.338 118.444 212.889 118.6 212.447 118.77 212.003 118.935 210.959 119.314 209.904 119.621 208.819 119.876 208.705 119.904 208.591 119.931 208.473 119.96 204.893 120.791 201.038 120.875 197.725 119.139 195.245 117.443 193.952 115.081 193.41 112.294 192.752 108.325 193.359 104.08 194.659 100.278 194.728 100.077 194.795 99.877 194.863 99.677 194.898 99.577 194.932 99.476 194.968 99.374 195.069 99.07 195.168 98.766 195.266 98.462 195.779 96.87 196.365 95.316 197.098 93.801 197.254 93.468 197.396 93.131 197.537 92.792 197.898 91.935 198.302 91.098 198.712 90.261 198.788 90.106 198.863 89.95 198.943 89.79 199.093 89.482 199.244 89.173 199.395 88.865 199.57 88.506 199.744 88.148 199.918 87.79 200.34 86.919 200.783 86.065 201.271 85.225 201.651 84.57 201.964 83.923 202.245 83.225 202.524 82.58 202.869 81.965 203.204 81.343 203.598 80.608 203.963 79.861 204.328 79.114 204.598 78.563 204.892 78.045 205.225 77.525 205.33 77.252 205.435 76.98 205.539 76.707 205.768 76.171 206.048 75.663 206.325 75.149 206.724 74.404 207.106 73.65 207.482 72.894 207.923 72.009 208.373 71.13 208.839 70.256 209.381 69.241 209.895 68.215 210.399 67.182 211.205 65.54 212.033 63.906 212.86 62.273 213.313 61.381 213.763 60.489 214.21 59.595 214.801 58.415 215.395 57.239 215.993 56.062 216.512 55.039 217.024 54.013 217.537 52.986 217.91 52.241 218.298 51.504 218.693 50.768 219.158 49.899 219.573 49.018 219.97 48.119 220.22 47.57 220.5 47.037 220.786 46.505 220.897 46.295 221.009 46.086 221.119 45.877 221.208 45.713 221.208 45.713 221.296 45.545 221.868 44.465 222.428 43.378 222.99 42.292 223.058 42.16 223.126 42.029 223.195 41.894 224.301 39.754 225.378 37.605 226.429 35.44 227.088 34.087 227.759 32.74 228.47 31.41 229.051 30.319 229.606 29.218 230.152 28.11 231.055 26.281 231.975 24.46 232.911 22.647 233.654 21.209 234.383 19.766 235.089 18.312 235.938 16.572 236.814 14.846 237.701 13.123 237.853 12.83 238.003 12.535 238.154 12.241 238.976 10.633 239.818 9.074 240.85 7.576 241.034 7.3 241.216 7.023 241.398 6.746 241.961 5.915 242.567 5.119 243.195 4.33 243.371 4.1 243.371 4.1 243.551 3.867 245.683 1.16 248.348-1.257 251.476-2.901 251.678-3.012 251.678-3.012 251.883-3.125 253.583-4.041 255.338-4.615 257.257-4.967 257.469-5.008 257.469-5.008 257.686-5.049 259.95-5.341 262.111-5.142 264.274-4.476 264.57-4.386 264.868-4.305 265.168-4.225 269.665-2.918 273.601 0.833 276.319 4.33 276.388 4.415 276.454 4.501 276.524 4.59 280.028 9.062 282.449 14.212 284.898 19.246 285.635 20.754 286.405 22.245 287.179 23.735 288.119 25.549 289.042 27.366 289.935 29.201 290.732 30.834 291.564 32.449 292.4 34.063 292.949 35.124 293.493 36.186 294.026 37.255 294.103 37.406 294.103 37.406 294.18 37.562 294.412 38.027 294.637 38.494 294.85 38.967 295.024 39.351 295.206 39.725 295.406 40.097 295.466 40.209 295.526 40.32 295.588 40.436Z"
        fill="#2D5BFF"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------- copy */

function Copy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, width: '100%', paddingTop: 72, paddingBottom: 52, paddingInline: 104 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', alignSelf: 'stretch', gap: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', alignSelf: 'stretch', gap: 24 }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <VantagePill />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 14, width: 920 }}>
            <div style={geistText(56, 60, '#1D1713', { fontWeight: 600, letterSpacing: '-0.028em' })}>
              85% of leaders are spending more on AI. Only 22% have scaled it.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={geistText(13, 18, '#8B8581')}>Source:</div>
              <div
                style={geistText(13, 18, '#554E4A', {
                  fontWeight: 500,
                  textDecoration: 'underline 1px #C9C3BF',
                  textUnderlineOffset: 3,
                })}
              >
                Gartner survey, September 2026
              </div>
              <svg width="12" height="12" viewBox="0 0 16 16" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
                <path d="M6 3.5h6.5V10M12.5 3.5 4 12" fill="none" stroke="#8B8581" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'start', gap: 72, width: '100%' }}>
          <div style={{ display: 'flex', flexGrow: 1, flexBasis: '0%', minWidth: 0, paddingTop: 2 }}>
            <div style={interText(16.5, 26.5, '#554E4A', 450)}>
              Vantage reads what&apos;s public about your company, then the data in your tools once you connect them,
              and finds the work AI can run as a loop.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, alignItems: 'end', justifyContent: 'center', gap: 12, width: 428 }}>
            <DomainField />
          </div>
        </div>
      </div>
    </div>
  );
}

function VantagePill() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        gap: 8,
        width: 'fit-content',
        height: 32,
        paddingInline: 12,
        overflow: 'clip',
        border: '1px solid #FFFFFFBD',
        borderRadius: 9999,
        backgroundImage:
          'linear-gradient(in oklab 102deg, oklab(90% 0.068 0.050 / 92%) 0%, oklab(92% 0.028 0.038 / 80%) 30%, oklab(90% -0.026 -0.022 / 80%) 66%, oklab(82% -0.024 -0.052 / 92%) 100%)',
        backgroundOrigin: 'border-box',
        boxShadow: '#FFFFFF8C 0px 1px 0px inset, #281E1942 0px 3px 10px -7px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 200,
          height: 14,
          backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 88%) 0%, oklab(100% 0 0 / 0%) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -14,
          top: -24,
          width: 96,
          height: 72,
          rotate: '19deg',
          transformOrigin: '0% 0%',
          backgroundImage:
            'radial-gradient(ellipse 38% 63% at 50% 50% in oklab, oklab(100% 0 0 / 0%) 0%, oklab(100% 0 0 / 61%) 50%, oklab(100% 0 0 / 0%) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 200,
          height: 10,
          backgroundImage: 'linear-gradient(in oklab 0deg, oklab(100% 0 0 / 46%) 0%, oklab(100% 0 0 / 0%) 100%)',
        }}
      />
      <svg width="14" height="14" viewBox="0 0 18 18" style={{ position: 'relative', display: 'inline-block', flexShrink: 0 }} aria-hidden>
        <circle cx="9" cy="9" r="8" fill="none" stroke="oklch(30% 0.006 264)" strokeWidth="1.6" />
        <path d="M9 1.5 L12 11 L9 9 L6 11 Z" fill="#B85207" />
      </svg>
      <div style={geistText(13, 16, '#17181B', { position: 'relative', fontWeight: 600, letterSpacing: '-0.012em' })}>Vantage</div>
      <div style={{ position: 'relative', flexShrink: 0, width: 1, height: 12, backgroundColor: '#17191C29' }} />
      <div style={interText(12, 16, '#5C5E61', 450, { position: 'relative' })}>by AiDOOS</div>
    </div>
  );
}

function DomainField() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        width: 'fit-content',
        paddingBlock: 6,
        paddingLeft: 14,
        paddingRight: 6,
        backgroundColor: '#FFFDFC',
        border: '1px solid #D4D0CD',
        borderRadius: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
          <path
            d="M12.749 22.5a9.75 9.75 0 1 0 0-19.5 9.75 9.75 0 0 0 0 19.5ZM3.649 9.5h18.2M3.649 16h18.2M12.749 3a15.167 15.167 0 0 1 0 19.5A15.167 15.167 0 0 1 12.749 3Z"
            fill="none"
            stroke="oklch(62% 0.009 55)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={geistText(15, 18, '#A39D9A', { flexShrink: 0 })}>yourcompany.com</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: 8,
          paddingBlock: 8,
          paddingInline: 12,
          backgroundColor: '#2D5BFF',
          borderRadius: 6,
        }}
      >
        <div style={geistText(14, 18, '#FCFAF8', { fontWeight: 500 })}>Find my loops</div>
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
            width: 18,
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
            <path d="M3.4 8h9.2M9.1 4.5 12.6 8l-3.5 3.5" fill="none" stroke="#2D5BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ panel */

const GLASS: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingBlock: 16,
  paddingInline: 18,
  backgroundColor: '#FFFFFFC7',
  backgroundImage: 'linear-gradient(in oklab 180deg, oklab(100% 0 0 / 35%) 0%, oklab(100% 0 0 / 0%) 40%)',
  backgroundOrigin: 'border-box',
  border: '1px solid #FFFFFFE6',
  borderRadius: 14,
  boxShadow: '#0A282D8C 0px 14px 30px -18px',
};

const ROW_TEXT = interText(13, 18, '#332C27');
const HEAD_TEXT = geistText(13, 18, '#17191C', { flexGrow: 1, flexBasis: '0%', fontWeight: 500 });
const META_TEXT = interText(12, 16, '#4A525C', undefined, { width: 'max-content' });

function Rows({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((row, i) => (
        <div
          key={row}
          style={{
            display: 'flex',
            borderTop: '1px solid #17191C12',
            paddingTop: 7,
            paddingBottom: i === items.length - 1 ? 0 : 7,
          }}
        >
          <div style={ROW_TEXT}>{row}</div>
        </div>
      ))}
    </div>
  );
}

function ToolBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        backgroundColor: '#FFFFFF',
        border: '1px solid #EEEBE8',
        borderRadius: 999,
      }}
    >
      {children}
    </div>
  );
}

const BARS = [
  { h: 9, c: '#14505533' },
  { h: 15, c: '#14505552' },
  { h: 22, c: '#14505585' },
  { h: 30, c: '#176A6E' },
];

function Panel() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        gap: 32,
        width: '100%',
        height: 440,
        paddingBlock: 36,
        paddingInline: 32,
        overflow: 'clip',
        backgroundColor: '#F5F3F0',
        border: '1px solid #E3E1DE',
        borderRadius: 24,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1104,
          height: 440,
          backgroundImage: 'url(/vantage/visuals/hero-panel.webp)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1104,
          height: 440,
          backgroundImage:
            'linear-gradient(in oklab 148deg, oklab(100% 0 0 / 46%) 0%, oklab(100% 0 0 / 20%) 42%, oklab(96.3% -0.006 -0.010 / 34%) 100%)',
        }}
      />
      <svg width="1104" height="440" viewBox="0 0 1152 440" style={{ position: 'absolute', left: 0, top: 0, display: 'inline-block' }} aria-hidden>
        <defs>
          <pattern id="vantage-hero-grain" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.8" cy="0.8" r="0.62" fill="#FFFFFF" fillOpacity="0.34" />
            <circle cx="2.7" cy="2.3" r="0.55" fill="#0B2434" fillOpacity="0.22" />
            <circle cx="3.2" cy="0.6" r="0.4" fill="#FFFFFF" fillOpacity="0.18" />
            <circle cx="1.3" cy="3.1" r="0.42" fill="#0B2434" fillOpacity="0.14" />
          </pattern>
        </defs>
        <rect x="0.002" y="-9.739" width="1152" height="460.174" fill="url(#vantage-hero-grain)" />
      </svg>

      {/* Inputs: what's public, then your tools */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flexShrink: 0, justifyContent: 'center', gap: 16, width: 336 }}>
        <div style={GLASS}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
              <circle cx="7" cy="7" r="5.8" fill="none" stroke="#5F6976" strokeWidth="1.1" />
              <path
                d="M1.4 7H12.6M7 1.2C8.6 3 9.3 5 9.3 7S8.6 11 7 12.8M7 1.2C5.4 3 4.7 5 4.7 7S5.4 11 7 12.8"
                fill="none"
                stroke="#5F6976"
                strokeWidth="1.1"
              />
            </svg>
            <div style={HEAD_TEXT}>What&apos;s public</div>
            <div style={META_TEXT}>86 signals</div>
          </div>
          <Rows items={['5 open roles for invoice clerks', 'Reviews mention slow payments', 'Invoices sent to a shared inbox']} />
        </div>

        <div style={GLASS}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <ToolBadge>
                <StripeLogo size={14} />
              </ToolBadge>
              <ToolBadge>
                <HubSpotLogo size={14} />
              </ToolBadge>
              <ToolBadge>
                <SnowflakeLogo size={14} />
              </ToolBadge>
            </div>
            <div style={HEAD_TEXT}>Your tools</div>
            <div style={META_TEXT}>Read only</div>
          </div>
          <Rows items={['2,412 invoices last month', '1 in 4 paid after terms']} />
        </div>
      </div>

      {/* The two inputs joining into one loop */}
      <div style={{ position: 'relative', display: 'flex', flexShrink: 0, width: 112 }}>
        <svg width="112" height="388" viewBox="0 0 112 388" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
          <path d="M0 113 C 56 113, 56 194, 104 194" fill="none" stroke="#FFFFFFE6" strokeWidth="1.4" />
          <path d="M0 268 C 56 268, 56 194, 104 194" fill="none" stroke="#FFFFFFE6" strokeWidth="1.4" />
          <circle cx="104" cy="194" r="4.5" fill="#C2410C" />
          <circle cx="104" cy="194" r="10" fill="none" stroke="#C2410C59" />
        </svg>
      </div>

      {/* The loop card */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexBasis: '0%',
          minWidth: 0,
          paddingBlock: 30,
          paddingInline: 32,
          backgroundColor: '#FFFFFFC7',
          border: '1px solid #FFFFFFD9',
          borderRadius: 20,
          boxShadow: '#0A282D4D 0px 20px 50px -26px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', paddingBottom: 20 }}>
          <div
            style={geistText(13, 16, '#717D7D', {
              flexGrow: 1,
              flexBasis: '0%',
              minWidth: 0,
              fontWeight: 500,
              textTransform: 'capitalize',
            })}
          >
            Loop 1 Of 3
          </div>
          <div style={interText(11.5, 14, '#848E8F', 450)}>9 September</div>
        </div>
        <div style={{ display: 'flex', width: '100%', paddingBottom: 14 }}>
          <div style={geistText(23, 31, '#162222', { fontWeight: 500, letterSpacing: '-0.018em' })}>
            Match every invoice to its purchase order, without manual checks.
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', paddingBottom: 26 }}>
          <div style={interText(14, 24, '#4A5555', 450)}>
            Invoices arrive by email and get keyed in and checked by hand. The system reads each one, matches it to
            the PO and receipt, and flags only the mismatches.
          </div>
        </div>
        <div style={{ display: 'flex', flexGrow: 1, flexBasis: '0%', minHeight: 0 }} />
        <div style={{ display: 'flex', flexShrink: 0, width: '100%', height: 1, backgroundColor: '#143C3C24' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, width: '100%', paddingTop: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, gap: 3 }}>
            <div style={geistText(23, 28, '#162222', { fontWeight: 500, letterSpacing: '-0.025em' })}>30 hrs</div>
            <div style={interText(11.5, 14, '#778383', 450)}>saved a week</div>
          </div>
          <div style={{ display: 'flex', flexShrink: 0, alignItems: 'end', gap: 5, height: 30 }}>
            {BARS.map((b) => (
              <div key={b.h} style={{ flexShrink: 0, width: 4, height: b.h, backgroundColor: b.c, borderRadius: 2 }} />
            ))}
          </div>
          <div style={interText(11.5, 16, '#778383', 450, { flexShrink: 0, width: 116 })}>
            Matched without a person, by month
          </div>
          <div style={{ display: 'flex', flexGrow: 1, flexBasis: '0%', minWidth: 0 }} />
          <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 7 }}>
            <div style={interText(13.5, 18, 'oklch(38% 0.070 200)', 550, { width: 'max-content' })}>Approve and build</div>
            <svg width="15" height="15" viewBox="0 0 24 24" style={{ display: 'inline-block', flexShrink: 0 }} aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="oklch(38% 0.070 200)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- edge lines */

/** Paper draws the hatching as 83 parallel strokes, 7px apart, each running
    512px across; generated here rather than pasted. */
function hatch(y0: number, y1: number) {
  let d = '';
  for (let x = -512; x <= 62; x += 7) d += `M${x} ${y0}L${x + 512} ${y1}`;
  return d;
}

function EdgeLines() {
  return (
    <div style={{ position: 'absolute', left: 0, top: 80, width: 1280, height: 883 }}>
      <div style={{ position: 'absolute', left: 64, top: 0, width: 1, height: 955, backgroundColor: EDGE }} />
      <div style={{ position: 'absolute', left: 1215, top: 0, width: 1, height: 956, backgroundColor: EDGE }} />
      <div style={{ position: 'absolute', left: 0, top: 397, width: 1280, height: 1, backgroundColor: EDGE }} />
      <svg width="64" height="557" viewBox="0 35 64 557" style={{ position: 'absolute', left: 0, top: 398, display: 'inline-block' }} aria-hidden>
        <path d={hatch(35, 592)} fill="none" stroke={HATCH} />
      </svg>
      <svg width="64" height="593" viewBox="0 0 64 593" style={{ position: 'absolute', left: 1216, top: 363, display: 'inline-block' }} aria-hidden>
        <path d={hatch(0, 593)} fill="none" stroke={HATCH} />
      </svg>
    </div>
  );
}
