import Image from 'next/image';
import { CaseStudyNav } from '@/components/case-study/CaseStudyNav';
import { Grain } from '@/components/case-study/Grain';
import { Section } from '@/components/case-study/Section';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { PERSON_ID, SITE_URL, jsonLd } from '@/lib/site';

export const metadata = {
  title: 'Zenzio Checkout Redesign: Case Study',
  description:
    'How I redesigned the Zenzio food delivery cart so the first total you see is the total you pay, with every fee and its reason shown before you tap Pay.',
  alternates: { canonical: '/case-studies/zenzio' },
};

const CASE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: metadata.title,
  headline: 'Zenzio checkout redesign case study by Kamal Saloi',
  description: metadata.description,
  url: `${SITE_URL}/case-studies/zenzio`,
  author: { '@id': PERSON_ID, '@type': 'Person', name: 'Kamal Saloi' },
  about: { '@type': 'Organization', name: 'Zenzio' },
  keywords: ['product design', 'checkout', 'food delivery', 'pricing transparency', 'case study', 'UX'],
};

const LOOM_ID = 'bed821b2a2bb4430a25d3438ef3957f2';

/* Screens from the Paper file, exported at 2x. Widths and heights are the
   real pixel sizes: change them with the file. */
const SHOTS = {
  cart: { src: '/zenzio/cart.webp', width: 780, height: 2468 },
  noAddressRain: { src: '/zenzio/no-address-rain.webp', width: 780, height: 2444 },
  noAddress: { src: '/zenzio/no-address.webp', width: 780, height: 2264 },
  addAddress: { src: '/zenzio/add-address.webp', width: 780, height: 1688 },
  priceChanged: { src: '/zenzio/price-changed.webp', width: 780, height: 1688 },
  bill: { src: '/zenzio/bill.webp', width: 716, height: 744 },
  nudge: { src: '/zenzio/nudge.webp', width: 716, height: 228 },
  payBar: { src: '/zenzio/pay-bar.webp', width: 780, height: 306 },
};

type Shot = (typeof SHOTS)[keyof typeof SHOTS];

/**
 * A phone screen on a quiet well. `cropTo` shows only the top of a tall
 * screen, in the screen's own 1x points, with a fade so the cut reads as
 * deliberate.
 */
function Screen({ shot, alt, caption, cropTo }: { shot: Shot; alt: string; caption?: string; cropTo?: number }) {
  const ratio = cropTo ? `${shot.width / 2}/${cropTo}` : `${shot.width}/${shot.height}`;
  return (
    <figure className="flex w-full max-w-[300px] flex-col gap-3">
      <div className="rounded-[26px] bg-bone-deep p-2.5">
        <div className="relative overflow-hidden rounded-[20px] bg-white" style={{ aspectRatio: ratio }}>
          <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} sizes="300px" className="w-full" />
          {cropTo && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
            />
          )}
        </div>
      </div>
      {caption && <figcaption className="text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

/** A part of a screen, on the same well, for the decision that changed it. */
function Detail({ shot, alt }: { shot: Shot; alt: string }) {
  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-bone-deep p-4">
      <Image
        src={shot.src}
        alt={alt}
        width={shot.width}
        height={shot.height}
        sizes="420px"
        className="w-full rounded-xl bg-white"
      />
    </div>
  );
}

/** Text beside its visual on a wide screen, stacked on a phone. */
function Split({ children, visual }: { children: React.ReactNode; visual: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex max-w-xl flex-col gap-5 lg:flex-1">{children}</div>
      <div className="flex flex-wrap gap-6 lg:shrink-0">{visual}</div>
    </div>
  );
}

/** Role, platform and the like, under the title. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[13px] text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

export default function ZenzioCaseStudy() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(CASE_JSON_LD) }} />
      <CaseStudyNav />

      {/* The cover: title, one line of context, then the walkthrough, so a
          reviewer can watch before reading anything else. */}
      <div className="relative overflow-hidden bg-bone">
        <Grain />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 sm:px-10 lg:px-18 lg:py-20">
          <div className="flex max-w-3xl flex-col gap-5">
            <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-slate-950 sm:text-[40px] sm:leading-[50px]">
              Zenzio: the first total you see is the total you pay
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Zenzio is a food delivery app in Puducherry. I redesigned its cart and checkout so
              every fee, and the reason for it, shows up before you tap Pay.
            </p>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="relative w-full overflow-hidden rounded-2xl bg-void shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)]" style={{ paddingBottom: '52.5%' }}>
              <iframe
                src={`https://www.loom.com/embed/${LOOM_ID}`}
                title="Walkthrough of the Zenzio checkout redesign"
                allow="fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <figcaption className="text-sm text-slate-500">A 4 minute walkthrough of the redesign.</figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-6 border-t border-bone-line pt-8 sm:grid-cols-4">
            <Fact label="Role" value="Product designer" />
            <Fact label="Platform" value="Mobile app" />
            <Fact label="Scope" value="Cart, address and payment" />
            <Fact label="Status" value="Design, not shipped yet" />
          </div>
        </div>
      </div>

      <div className="bg-bone">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-10 lg:px-18">
          <article className="flex flex-col gap-6">
            <Section id="problem" title="The price almost doubled at the last step">
              <Split
                visual={
                  <div className="flex w-full max-w-[420px] flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-bone-deep p-5">
                      <p className="text-[13px] text-slate-500">Today</p>
                      <p className="text-xl font-bold tracking-tight text-slate-950">₹66 to ₹129.30</p>
                      <p className="text-sm leading-6 text-slate-600">
                        The cart shows the food price. Fees appear after Checkout.
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 rounded-2xl border-[1.5px] border-slate-950 bg-white p-5">
                      <p className="text-[13px] text-slate-500">Redesign</p>
                      <p className="text-xl font-bold tracking-tight text-slate-950">₹129.30</p>
                      <p className="text-sm leading-6 text-slate-600">
                        The same number in the cart, on the Pay button and on the receipt.
                      </p>
                    </div>
                  </div>
                }
              >
                <p>
                  In the Zenzio app today, the cart shows only the food price. Order one Sambar Idly
                  and the cart says ₹66. The delivery fee, rain fee, packing and taxes appear only
                  after you tap Checkout. Then the total is ₹129.30.
                </p>
                <p>
                  That is 96% more than the first number you saw. Each fee may be fair. But finding
                  them at the last step feels like a trick, right when you decide whether to pay.
                </p>
              </Split>
            </Section>

            <Section id="rule" title="So every fee moved onto the cart screen">
              <Split
                visual={
                  <Screen
                    shot={SHOTS.cart}
                    alt="The redesigned Zenzio cart: address and delivery time at the top, a rain notice, the order, a free delivery nudge, the full bill with a reason under each fee, and a Pay now button showing ₹129.30"
                  />
                }
              >
                <p>
                  I set one rule: one price, everywhere. The bill now lives on the cart screen, with
                  every fee and a short reason for it. The total you see there is the total on the
                  Pay button, and the total on your receipt.
                </p>
                <p>The six choices below all come from that rule.</p>
              </Split>
            </Section>

            <Section id="address" title="1. The address comes first">
              <Split
                visual={
                  <Screen
                    shot={SHOTS.cart}
                    cropTo={250}
                    alt="The top of the cart: delivering to Home, 25 to 30 minutes, with a Change button"
                  />
                }
              >
                <p>
                  A wrong address is the most costly mistake in food delivery. So the address and the
                  delivery time sit at the very top of the cart, where you check them first.
                </p>
                <p>Changing the address takes one tap, and the fees update right away.</p>
              </Split>
            </Section>

            <Section id="changing-fees" title="2. Fees that change are announced, not found">
              <Split
                visual={
                  <>
                    <Screen
                      shot={SHOTS.noAddressRain}
                      cropTo={250}
                      alt="A blue note at the top of the cart: It is raining near Sri Hari Bhavan. If it is also raining at your address, a ₹20 rain fee is added. It goes to your rider."
                      caption="Rain is flagged before you reach the bill"
                    />
                    <Screen
                      shot={SHOTS.priceChanged}
                      alt="A sheet titled Your total has changed: the total when you opened the cart, ₹109.30, plus a ₹20 rain fee, gives a new total of ₹129.30, with a Pay ₹129.30 button and Back to cart"
                      caption="If it changes later, you see it before you pay"
                    />
                  </>
                }
              >
                <p>
                  Some fees depend on conditions, like the rain fee. If it is raining near the
                  restaurant, a note at the top of the cart says so, before you reach the bill.
                </p>
                <p>
                  If the rain starts after you open the cart, a sheet shows the old total, the new
                  fee and the new total. You see the change before you are charged, not after.
                </p>
              </Split>
            </Section>

            <Section id="no-address" title="3. No address, no guessed total">
              <Split
                visual={
                  <>
                    <Screen
                      shot={SHOTS.noAddress}
                      alt="The cart with no address: the delivery fee row asks you to add an address, the bill shows a ₹79.30 subtotal without delivery, and the Pay button is locked"
                      caption="A subtotal, and Pay stays locked"
                    />
                    <Screen
                      shot={SHOTS.addAddress}
                      alt="The add delivery address sheet: a search field, Use my current location, and area chips for Puducherry such as White Town and Lawspet"
                      caption="Add address opens a short sheet"
                    />
                  </>
                }
              >
                <p>
                  A new user may not have an address saved yet. The delivery fee depends on how far
                  you are from the restaurant, so I did not guess it.
                </p>
                <p>
                  The bill shows a subtotal and says the delivery fee is not included yet. The Pay
                  button stays locked until there is an address. Tapping Add address opens a sheet:
                  search, use your current location, or pick your area in Puducherry.
                </p>
              </Split>
            </Section>

            <Section id="small-orders" title="4. Small orders get a nudge, not a hidden fee">
              <Split
                visual={
                  <Detail
                    shot={SHOTS.nudge}
                    alt="A progress bar in the cart: Add ₹84 more for free delivery, Save ₹30"
                  />
                }
              >
                <p>
                  On a ₹66 order, the fees add up to ₹63.30. Hiding them does not change that. A
                  bigger order does.
                </p>
                <p>
                  So the cart shows how much more to add for free delivery, and how much you save.
                  Zenzio earns more per order, and nothing is hidden.
                </p>
              </Split>
            </Section>

            <Section id="fee-reasons" title="5. Every fee says what it is for">
              <Split
                visual={
                  <Detail
                    shot={SHOTS.bill}
                    alt="The bill: item total ₹66, delivery fee ₹30 paid to your Rakshi rider, rain fee ₹20 for riding in the rain, packing ₹10 set by the restaurant, taxes ₹3.30, to pay ₹129.30"
                  />
                }
              >
                <p>
                  Each line in the bill has a short reason under it. The delivery fee says it is paid
                  to your Rakshi rider. The rain fee is extra pay for riding in the rain. Packing is
                  set by the restaurant.
                </p>
                <p>
                  This way Zenzio&apos;s mission explains the price, instead of sitting in a banner.
                  The fee split still needs confirming with Zenzio before this copy can ship.
                </p>
              </Split>
            </Section>

            <Section id="pay-button" title="6. The price on the button is the price you pay">
              <Split
                visual={
                  <Detail
                    shot={SHOTS.payBar}
                    alt="The bottom bar: pay using PhonePe UPI with a Change link, and a Pay now button showing a ₹129.30 total"
                  />
                }
              >
                <p>
                  Your last payment method is already picked, and the total sits on the Pay button.
                  There is no second Checkout screen, so the price cannot change between steps.
                </p>
              </Split>
            </Section>

            <Section id="removed" title="What I took out">
              <ul className="flex max-w-2xl flex-col gap-4">
                <li>
                  <span className="font-semibold text-slate-900">The separate Checkout screen.</span>{' '}
                  It was the step where the price jumped.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">The tip before ordering.</span> It now
                  comes after delivery, so it does not add to the price while you decide.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Search inside the cart,</span> and the
                  large Clear button.
                </li>
              </ul>
            </Section>

            <Section id="measure" title="How we would know it worked">
              <ul className="flex max-w-2xl list-disc flex-col gap-3 pl-5">
                <li>More carts turn into paid orders. That is the number to watch, not taps on Checkout.</li>
                <li>More repeat orders within 30 days.</li>
                <li>Fewer support tickets about fees.</li>
                <li>
                  Taps on the cart&apos;s main button may go down. That is expected, not a failure:
                  people now see the full price before they tap.
                </li>
              </ul>
              <p>This has not shipped yet, so there are no results to report.</p>
            </Section>
          </article>
        </div>
      </div>

      <CTA />

      <Footer />
    </div>
  );
}
