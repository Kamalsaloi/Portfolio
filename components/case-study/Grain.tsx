/**
 * A fine paper grain, rendered from an inline SVG fractal-noise filter so it
 * costs no network request and tiles seamlessly at any size. Deliberately at
 * a few percent opacity: it should read as the texture of the surface, never
 * as a visible pattern. Sits under content via a negative z-index sibling, so
 * put it inside a `relative` parent.
 */
export function Grain({ opacity = 0.055 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
