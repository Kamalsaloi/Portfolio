@AGENTS.md

# Kamal Saloi's portfolio

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4. Deploys to Vercel
from `github.com/Kamalsaloi/Portfolio`. No test suite, no CMS, no database:
every page is hand-built React, and the content lives in the components.

Read `PRODUCT.md` (audience, voice, anti-references) before writing any copy,
and `DESIGN.md` (spacing conventions) before writing any layout. They are short
and they are the actual brief.

## Commands

```bash
npx tsc --noEmit                 # the fast correctness check, use this
npx eslint components app        # flat config in eslint.config.mjs
npm run dev                      # only if asked
npm run build                    # only if asked
```

**Do not start a dev server or run a production build unless asked.** Kamal
usually has one running and has turned these down before. `tsc --noEmit` plus
`eslint` catches almost everything here and costs a couple of seconds.

## Layout of the thing

```
app/
  page.tsx                            homepage composition (read this first)
  layout.tsx                          fonts, metadata, Vercel Analytics, Miro preconnect
  globals.css                         the entire token system, heavily commented
  case-studies/vantage/page.tsx       the lead case study
  case-studies/aidoos-proposal-flow/page.tsx
components/                           homepage sections, one file per band
  case-study/                         shared case study furniture
  vantage/                            Vantage-only components
```

Homepage section order, which is also the argument the page makes: `Intro`
(cold open) → `Hero` → `CaseStudy` (Vantage, featured) → `SecondaryCaseStudy`
(the Aidoos proposal flow, a quieter second feature) → `Redesigns` (Landeed,
click-to-play Loom, then the Other redesigns cards from `components/redesigns/`) →
`HowIWork` (scroll-pinned deck) → `AboutMe` → `CTA`.

Anchor ids in use: `#work`, `#range`, `#redesigns`, `#process`, `#about`,
`#contact`. The Vantage page has its own: `#overview`, `#change`,
`#landing`, `#loop`, `#wait`, `#report`, `#learned`.

## Two structural mechanisms worth understanding before editing

**The homepage wrapper.** `Hero` is a full-viewport `h-svh` section that scrolls
away normally (the old sticky-hero parallax was removed on purpose; don't add it
back). Everything after it sits in one sibling `<div>`.

That sibling panel is `overflow-clip`, **not** `overflow-hidden`, and this is
load-bearing. `overflow: hidden` makes an element a scroll container, which
would silently break the `position: sticky` inside `HowIWork` further down the
page. `overflow: clip` clips without becoming a scroll container. If you ever
need to clip an ancestor of a sticky element, `clip` is the only safe choice.

**The `HowIWork` deck.** A 440svh scroll track with a `sticky top-0 h-svh` pane
inside it. Card positions are computed from scroll and written **directly to the
DOM** via `data-card` / `data-img` / `data-text` attributes inside a
`requestAnimationFrame` loop. Only the discrete step counter goes through React
state.

Do not "simplify" this back into `setState` per frame. It was that way once: it
reconciled roughly 150 nodes every frame and the whole section felt laggy. Same
rule applies to any new scroll-driven animation here.

## Design tokens

All in `app/globals.css` under `@theme inline`, which generates Tailwind
utilities (`--color-v-ink` → `text-v-ink`, `bg-v-ink`). Every token carries a
comment explaining why it exists; keep that up when adding one.

Families: `bone*` (warm neutral grounds), `card*` (cool wells for white
screenshots), `v-*` (Vantage warm-to-cool, OKLCH), `void*` (near-black bands),
`cobalt*` (the intro animation's blue, reused by the Redesigns band).

`Intro.tsx` repeats the cobalt hexes as literals because it needs them as canvas
fill strings. If you change the tokens, change those too.

## Gotchas that have actually bitten

**Windows is case-insensitive, Vercel is not.** `/kamal.webp` resolved happily
to `public/Kamal.webp` locally and 404'd in production. Anything that works
locally but breaks only after deploy: check the capitalisation of the path
first.

**Fonts are self-hosted, not `next/font/google`.** On Vercel (CLI 61, Next
16.3.1) every `next/font/google` call failed the build with "next/font/google
queries have exactly one entry", while local builds passed. All fonts now load
with `next/font/local` from `app/fonts/` (latin woff2). Add new fonts the same way.

**React Strict Mode double-invokes effects.** The intro animation writes its
`sessionStorage` "already played" flag in its `finish()` handler, not at effect
start, because the second pass otherwise reads the flag and skips the whole
animation. Same trap awaits any other run-once effect.

**`react-hooks/set-state-in-effect`** will fail lint on a `setState` called
straight out of an effect body. Defer it into a `requestAnimationFrame`, or let
a `ResizeObserver`/`IntersectionObserver` callback do it — those fire
asynchronously and are fine.

**TypeScript loses narrowing inside hoisted closures.** In the canvas components
(`Intro`, `RampWordmark`, `VDCAnimation`), pin the ref with an explicit
annotation — `const canvas: HTMLCanvasElement = el;` — before the inner
functions close over it.

**Heredocs break on large files and on backticks** (command substitution). Use
the Write tool for anything non-trivial rather than `cat <<EOF`.

## Assets

Everything static is in `public/`, product shots under `public/vantage/`.

Exports come out of Paper at **2x**. When you replace one, read back the real
pixel dimensions and update the `width`/`height` props on the `next/image`
call — they are declared explicitly and a stale pair distorts the layout.
`ReportViewer` also crops the report with a fixed `max-h`, tied to the source
artboard's section boundaries; changing the image usually means re-deriving that
number.

## Working with Paper

Kamal designs in Paper (MCP server) and asks for designs to be synced into code,
in both directions. When porting *from* Paper, pull exact values with
`get_jsx` / `get_computed_styles` / `get_fill_image`. **Never read sizes or
colours off a screenshot** — screenshots are for verifying the result only.

Paper silently drops some CSS through `update_styles`: `repeating-linear-gradient`,
empty divs, `transform`, 3D `rotate`, and `position`. If you set one of these,
verify with `get_computed_styles` before reporting it as done. Claiming a 3D
tilt worked when Paper had dropped it is a mistake that has already been made
here once.

## Copy

`PRODUCT.md` governs. The rules that get broken most: **no em dashes** (and no
`--`), no restated headings, no monospace eyebrow labels, and no invented
research findings or metrics. If a number or a user quote is needed and does not
exist, leave a visible note asking for it rather than writing a plausible one.
