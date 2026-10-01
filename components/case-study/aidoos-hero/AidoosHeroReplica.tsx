import localFont from 'next/font/local';
import { VDCAnimation } from './VDCAnimation';

// Self-hosted, see app/layout.tsx for why.
const inter = localFont({ src: '../../../app/fonts/inter-latin.woff2', weight: '100 900' });

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" fill="none" stroke="#404040" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavItem({ label, chevron, dot }: { label: string; chevron?: boolean; dot?: boolean }) {
  return (
    <div className="flex items-center gap-[6px] rounded-[8px] px-[8px] py-[6px]">
      <div className="text-[13px] leading-[19.5px] text-[#404040]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        {label}
      </div>
      {chevron && <ChevronDown />}
      {dot && <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2D5BFF]" />}
    </div>
  );
}

/**
 * Faithful recreation of the Aidoos production hero — nav, headline, chat
 * input, chips, trust line, and the live VDC animation — replicated from the
 * Paper design file (exact colors/type/spacing pulled via its design
 * tokens) rather than a screenshot. Fixed at the artboard's native 1280x712;
 * wrap in a scaling container to display smaller.
 */
export function AidoosHeroReplica() {
  return (
    <div
      className={`${inter.className} relative flex h-[712px] w-[1280px] flex-col overflow-hidden bg-white`}
      style={{ fontFamily: 'var(--font-geist-sans)', paddingInline: '42px' }}
    >
      <div
        className="pointer-events-none absolute inset-0 top-0 left-0 h-[676px] w-[1280px]"
        style={{
          backgroundImage: 'url(/aidoos-hero-backdrop.svg)',
          backgroundSize: '100% 100%',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Nav bar */}
      <div className="relative flex w-full items-center justify-between py-[24px]">
        <div className="flex shrink-0 items-center gap-[6px]">
          <svg width="16" height="17" viewBox="0 0 33 35" style={{ flexShrink: 0 }}>
            <path
              d="M31.068 26.173L21.548 4.883C19.945 1.297 17.78 -0.311 15.672 0.049C13.949 0.344 12.264 1.953 10.954 4.883L1.435 26.173C-1.478 32.688 0.186 36.217 5.132 34.014C10.078 31.811 14.086 29.96 14.038 29.9C14.036 29.898 14.031 29.893 14.028 29.89C13.955 29.812 13.527 29.469 13.047 29.105C13.047 29.105 13.047 29.105 13.047 28.746C13.047 28.386 12.805 28.081 13.015 27.856C13.293 27.558 12.725 27.16 13.015 26.85C13.305 26.541 12.69 26.192 13.015 25.845C13.34 25.497 13.34 25.497 13.34 25.497C13.17 25.177 13.032 24.915 13.032 24.915C13.032 24.915 12.84 23.787 12.606 22.409C12.606 22.409 12.606 22.409 11.807 21.555C9.352 18.935 9.352 14.686 11.807 12.066C12.146 11.703 12.515 11.392 12.906 11.13C13.462 10.756 14.062 10.488 14.681 10.319C15.196 10.178 15.723 10.103 16.251 10.103C17.86 10.102 19.468 10.755 20.695 12.066C22.696 14.201 23.065 17.418 21.805 19.954C21.518 20.53 21.149 21.071 20.695 21.555C19.896 22.409 19.444 23.853 19.47 24.914C19.47 25.552 19.162 25.77 19.487 26.117C19.812 26.463 19.197 26.812 19.487 27.122C19.777 27.432 19.234 27.805 19.487 28.128C19.71 28.412 19.455 28.493 19.455 28.855C19.455 29.214 19.455 29.214 19.455 29.214C18.958 29.531 18.512 29.84 18.465 29.899C18.417 29.959 22.424 31.81 27.37 34.014C29.684 35.043 31.279 34.819 32.024 33.623C32.872 32.262 32.618 29.641 31.068 26.173Z"
              fill="#191970"
            />
          </svg>
          <div className={`${inter.className} text-[16.8px] font-bold leading-[17px] tracking-[-0.02em] text-[#191970]`}>
            AiDOOS
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <NavItem label="VDC" chevron />
          <NavItem label="Pricing" />
          <NavItem label="About" chevron />
          <NavItem label="Resources" chevron />
          <NavItem label="Tools" chevron />
          <NavItem label="For Talent" />
          <NavItem label="RAMP" dot />
        </div>

        <div className="flex shrink-0 items-center gap-[12px]">
          <div className="flex items-center rounded-[6px] px-[8px] py-[6px]">
            <div className="text-[13px] leading-[19.5px] text-[#404040]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Login
            </div>
          </div>
          <div className="flex items-center rounded-[6px] border border-solid border-[#DADEE6] px-[16px] py-[4px] shadow-[0_1px_2px_#0F172A0A]">
            <div className={`${inter.className} w-max shrink-0 text-[12px] font-medium leading-[20px] tracking-[-0.0127em] text-[#434851]`}>
              Free Trial
            </div>
          </div>
        </div>
      </div>

      {/* Hero row */}
      <div className="relative flex w-full items-center gap-[56px] pt-[70px] pb-[88px]">
        {/* Copy column */}
        <div className="flex w-[710px] shrink-0 flex-col items-start gap-[32px]">
          <div className="flex w-full flex-col gap-[12px]">
            <div
              className="text-[40px] font-semibold leading-[52px] tracking-[-0.0125em] text-black"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              AI-Native Virtual Delivery Center.
            </div>
            <div className="flex max-w-[720px] flex-col">
              <div className="flex flex-wrap items-baseline">
                <div className="text-[15px] leading-[22.5px] text-[#404040]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  Describe a project. Your VDC assembles{' '}
                </div>
                <div className="text-[15px] leading-[22.5px] text-[#2D5BFF]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  RAMP certified
                </div>
                <div className="text-[15px] leading-[22.5px] text-[#404040]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  {' '}
                  talent and AI agents,
                </div>
              </div>
              <div className="text-[15px] leading-[22.5px] text-[#404040]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                runs delivery end to end, and bills by outcome. Not headcount, not hours.
              </div>
            </div>
          </div>

          <div className="flex w-[500px] flex-col gap-[12px]">
            <div
              className="flex min-h-[44px] w-full items-center gap-[16px] rounded-[8px] bg-white py-[6px] pr-[6px] pl-[12px]"
              style={{ border: '0.5px solid rgb(189 190 194 / 70%)' }}
            >
              <div
                className={`${inter.className} min-w-0 grow basis-0 text-[14px] leading-[21px] text-[#82868E]`}
              >
                Describe a project
              </div>
              <div
                className="flex shrink-0 items-center gap-[6px] rounded-[6px] bg-[#2D5BFF] px-[16.667px] py-[8.667px]"
                style={{ boxShadow: '0 1px 0 #FFFFFF2E inset, 0 1px 1px #2D5BFF4D' }}
              >
                <div
                  className="text-[14px] font-semibold leading-[16.8px] tracking-[-0.01em] text-white"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Plan my project
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="flex w-full items-center gap-[8px]">
              {['SAP ECC to S4/HANA migration', '5 RAMP-certified backend engineers'].map((chip) => (
                <div
                  key={chip}
                  className="flex min-w-0 grow basis-0 items-center justify-center rounded-[8px] px-[12.667px] py-[6.667px]"
                  style={{ border: '0.667px solid #E3E5E9' }}
                >
                  <div className={`${inter.className} text-[11px] leading-[16.5px] text-[#545861]`}>{chip}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex max-w-[460px] border-l border-solid border-l-[#545861] pl-[8px]">
            <div
              className="text-[11px] leading-[16.5px] tracking-[0.0113em] text-[#515866]"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              No commitment &middot; No sales call &middot; See your team &amp; scope before you pay
            </div>
          </div>
        </div>

        {/* Visual column */}
        <div className="flex min-w-0 grow basis-0 items-center justify-end pr-[79px]">
          {/* No static label pill here: the animation draws its own
              "Human + AI agents executing together" chip as part of the
              sequence, and a second copy above it read as a duplicate. */}
          <div className="flex w-[351px] shrink-0 flex-col items-center">
            <div className="w-full">
              <VDCAnimation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
