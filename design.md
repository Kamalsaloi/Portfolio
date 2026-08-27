# Design conventions

## Spacing: use gap/padding, not margin-top / margin-bottom

Never reach for `mb-*` / `mt-*` (or `margin-top` / `margin-bottom`) to space
elements apart when `gap` (on a flex/grid parent) or `padding` would do the
same job. Stacks of `mb-8`, `mb-10`, `mb-4` sprinkled across sibling elements
are exactly what makes a layout read as amateur:

- Margins on adjacent elements can collapse or double up in ways that are
  easy to get subtly wrong and hard to reason about at a glance.
- A `mb-*` on every child couples spacing to each individual element instead
  of to the relationship between them: moving, reordering, or removing one
  child silently breaks the rhythm.
- `gap` on the parent expresses "this is a stack with consistent rhythm" as
  a single, obvious value. It's also what production-grade component
  libraries and design tools (Figma, Paper) model spacing as; Paper's
  panel edits `gap` for a reason.

Prefer, in order:
1. `gap-*` on the flex/grid parent for spacing between siblings.
2. `padding` on a wrapping container when the space belongs to that
   container's edge, not the relationship between children.
3. Only fall back to `mt-*`/`mb-*` for a genuine one-off exception where
   there's no shared parent to put a `gap` on.

## Copy: never use em dashes

Don't write "—" in any copy on the site (headings, body text, captions,
button labels). Rewrite the sentence instead: use a period and start a new
sentence, a comma, a colon, or "and"/"but" depending on what the em dash was
doing. An em dash is a fast way to bolt a second thought onto a sentence
without deciding how the two halves actually relate; picking the real
connective is almost always clearer, and it's also become a visual tell for
AI-generated copy, which undermines a portfolio meant to show a designer's
own judgment.
