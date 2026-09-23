/**
 * Hero redesigns of other people's products. One list feeds both the
 * homepage cards and the /redesigns/[slug] pages, so they can't drift apart.
 *
 * TO FILL IN: anything left undefined below renders as a visible placeholder
 * on the page, so a gap is obvious rather than silently missing.
 *   before.images     screenshots of the live hero as it was, in order. Drop
 *                     them in public/redesigns/<slug>/ with their real pixel
 *                     size. More than one renders as a sequence with arrows.
 *   before.reasoning  what was wrong with it.
 *   after.reasoning   what the redesign does about it.
 */

export interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Redesign {
  slug: string;
  name: string;
  /** What the product does, in a sentence. */
  context?: string;
  site?: { label: string; href: string };
  /** Ground behind the card while the hero is not mounted. */
  ground: string;
  /** A live, ported hero. Absent means the after state is a static image. */
  live?: 'velociti' | 'pull-logic';
  before: { images?: Shot[]; reasoning?: string };
  after: { image?: Shot; reasoning?: string };
}

export const REDESIGNS: Redesign[] = [
  {
    slug: 'velociti',
    name: 'Velociti',
    context:
      'Velociti turns a product idea into a canvas, story maps and initiatives, keeps the reasoning connected, and passes that context to the people and AI agents who build it.',
    site: { label: 'velocitipm.com', href: 'https://velocitipm.com' },
    ground: '#ffffff',
    live: 'velociti',
    before: {
      images: [
        {
          src: '/redesigns/velociti/before.webp',
          alt: 'The previous Velociti hero: a centred headline reading The AI Product Operating System, a paragraph and one Book a Demo button over a pale lavender gradient',
          width: 1894,
          height: 955,
        },
      ],
      reasoning:
        'Honestly, I only understood Velociti after I used the product. From the site alone I could not tell what it actually did. The opening sections explained the idea, but the product visual never showed how it works or what you get, and that is a reason to bounce. The UI also looked fairly standard next to how differentiated the product is, which made it feel less valuable than it is.',
    },
    after: {
      reasoning:
        `So the hero now shows the actual flow as a looped product demo: an idea goes in, and Velo AI turns it into a canvas, a problem map, a story map and a sequenced strategy. The headline, "Your agents can build anything. They still don't know why.", leads with the tension the whole product solves, and the visual shows how it solves it. I simplified the real UI for the marketing context, so it is not too much for someone seeing it for the first time.`,
    },
  },
  {
    slug: 'pull-logic',
    name: 'Pull Logic',
    context:
      'Pull Logic watches every SKU at every location, catches availability gaps days before they cost an order, then fixes them inside the ERP a distributor already runs.',
    site: { label: 'pulllogic.com', href: 'https://pulllogic.com' },
    ground: '#0d0d0c',
    live: 'pull-logic',
    before: {
      images: [
        {
          src: '/redesigns/pull-logic/before-1.webp',
          alt: 'The previous Pull Logic hero on its first message: Predictive. Autonomous. Always Available.',
          width: 1914,
          height: 939,
          caption: 'The first message',
        },
        {
          src: '/redesigns/pull-logic/before-2.webp',
          alt: 'The same hero two seconds later, rotated to the NAED announcement: NAED selects Pull Logic and IDEA to solve Where is My Stuff',
          width: 1758,
          height: 956,
          caption: 'Two seconds later, the announcement replaces it',
        },
      ],
      reasoning:
        'The live hero auto-rotated two messages every two seconds. You could not finish reading the headline, and you could not click a call to action before it left. And once it held still, it described the product in paragraphs.',
    },
    after: {
      reasoning:
        'This version is static. The NAED announcement is not deleted: it moves to a persistent, dismissible ribbon under the nav, where it stays readable and clickable. Below the headline the workflow replaces the paragraphs: four signal sources converge into one detected risk, three costed routes are weighed, one is chosen, and the transfer order is written back to the ERP. The decision card is the part that matters. It shows the two rejected options with the reason each one lost. An alerting dashboard can show you a problem. Only a decision engine can show you the options it ruled out. The product shot and the transfer scene are generated placeholders, to be swapped for real photography before this ships.',
    },
  },
  {
    slug: 'sahi',
    name: 'SAHI',
    context:
      'SAHI is a broking platform for active traders and investors, with in-house charts, real-time AI intelligence and a flat ₹10 per order brokerage.',
    ground: '#ffffff',
    before: {
      images: [
        {
          src: '/redesigns/sahi/before.webp',
          alt: 'The previous SAHI hero: a centred headline reading Built for active traders and investors, a pink Open FREE Demat button, a ratings line, and a trading terminal screenshot below',
          width: 1918,
          height: 958,
        },
      ],
    },
    /* The "Sahi Hero, Light" artboard from Paper file 01M1Y6TZJY8JQH7AA201T577WB,
       exported at 2x. The file also has a dark variant. */
    after: {
      image: {
        src: '/redesigns/sahi/after.webp',
        alt: 'The redesigned SAHI hero: Every trade, on one screen, beside a dark trading terminal with chart, option chain, order ticket and positions in one window',
        width: 2880,
        height: 1880,
      },
    },
  },
];

export function getRedesign(slug: string) {
  return REDESIGNS.find((r) => r.slug === slug);
}
