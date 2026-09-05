'use client';

import { useEffect, useRef } from 'react';

/**
 * The RAMP hero wordmark, ported from the production template at
 * templates/talent/ramp_framework.html (canvas#ramp-wordmark).
 *
 * "RAMP" is rendered to an offscreen canvas, the alpha channel is sampled on a
 * fixed pitch to get dot targets, those dots are scattered to random grid
 * cells, then eased home. A pointer field shoves them aside on hover and
 * springs them back. Dot radius climbs per letter, sparse R to dense P.
 *
 * Two changes from the original, both because this now lives in a card rather
 * than a full-bleed hero plate:
 *
 * 1. Glyph size fits width as well as height. The original assumed a ~3.3:1
 *    plate where 0.76 * height always cleared the per-letter cell; at 4:3 that
 *    sizing overlaps the letterforms badly.
 * 2. The baseline is derived from cap height rather than a hardcoded 0.77 *
 *    height, so the mark stays optically centred at any aspect ratio.
 */
export function RampWordmark({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !el.getContext) return;
    const g2d = el.getContext('2d');
    if (!g2d) return;

    // Explicit non-null types: TypeScript drops narrowing on captured consts
    // inside the hoisted frame functions below, so pin it at the declaration.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = g2d;

    const LETTERS = ['R', 'A', 'M', 'P'];
    const RADII = [1.4, 2.1, 2.8, 3.5]; // density climbs R to P
    const COLORS = ['#2D5BFF', '#2D5BFF', '#2D5BFF', '#1E3FCC'];
    const GRID = '#D7DFF0';
    const DURATION = 1500;
    const STAGGER = 520;

    // Pointer field. Dots shove away from the cursor, then spring home.
    const HOVER_R = 96;
    const PUSH = 2.6;
    const SPRING = 0.055;
    const DAMP = 0.86;
    const REST = 0.05;

    interface Dot {
      tx: number;
      ty: number;
      band: number;
      sx: number;
      sy: number;
      cx: number;
      cy: number;
      vx: number;
      vy: number;
      delay: number;
    }

    let PITCH = 8;
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let start = 0;
    let raf = 0;
    let px = -1e5;
    let py = -1e5;
    let over = false;
    let running = false;
    let settled = false;
    let disposed = false;
    const gridCv = document.createElement('canvas');

    /* Inherited from body, so the mark sets in Geist, not a fallback face. */
    const fontFamily = () => {
      const f = getComputedStyle(canvas).fontFamily;
      return f && f.trim() ? f : 'system-ui, sans-serif';
    };

    /* Fit the tighter of the two constraints: cell width or plate height. */
    const glyphSize = () => Math.min(H * 0.76, (W / 4) * 0.92);

    function sampleTargets(): Dot[] {
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const o = off.getContext('2d');
      if (!o) return [];

      const size = glyphSize();
      o.fillStyle = '#000';
      o.textAlign = 'center';
      o.textBaseline = 'alphabetic';
      o.font = `700 ${Math.round(size)}px ${fontFamily()}`;
      // Cap height runs about 0.7em, so this centres the caps in the plate.
      const baseline = H / 2 + size * 0.35;
      for (let i = 0; i < 4; i++) o.fillText(LETTERS[i], (W * (i + 0.5)) / 4, baseline);

      const d = o.getImageData(0, 0, W, H).data;
      const out: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = PITCH / 2 + c * PITCH;
          const y = PITCH / 2 + r * PITCH;
          if (d[((y | 0) * W + (x | 0)) * 4 + 3] > 128) {
            out.push({
              tx: x,
              ty: y,
              band: Math.min(3, Math.floor((x / W) * 4)),
              // Entropy, still on the grid: a plotter losing its place, not
              // particles drifting in space.
              sx: PITCH / 2 + Math.floor(Math.random() * cols) * PITCH,
              sy: PITCH / 2 + Math.floor(Math.random() * rows) * PITCH,
              cx: x,
              cy: y,
              vx: 0,
              vy: 0,
              delay: (x / W) * STAGGER + Math.random() * 140,
            });
          }
        }
      }
      return out;
    }

    // The faint grid never changes, so it is drawn once and blitted. Stroking
    // ~7000 arcs per frame alongside the physics would not hold 60fps.
    function buildGrid() {
      gridCv.width = W * dpr;
      gridCv.height = H * dpr;
      const g = gridCv.getContext('2d');
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = GRID;
      g.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = PITCH / 2 + c * PITCH;
          const y = PITCH / 2 + r * PITCH;
          g.moveTo(x + 0.95, y);
          g.arc(x, y, 0.95, 0, 6.284);
        }
      }
      g.fill();
    }

    function build() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(rect.width);
      H = Math.round(rect.height);
      if (!W || !H) return false;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      PITCH = Math.max(5, Math.min(8, Math.round(H / 48)));
      cols = Math.floor(W / PITCH);
      rows = Math.floor(H / PITCH);
      buildGrid();
      dots = sampleTargets();
      return dots.length > 0;
    }

    // One path per colour rather than per dot: four fills a frame, not two thousand.
    function paint(getX: (d: Dot) => number, getY: (d: Dot) => number) {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(gridCv, 0, 0, W, H);
      for (let b = 0; b < 4; b++) {
        let any = false;
        ctx.beginPath();
        for (const d of dots) {
          if (d.band !== b) continue;
          const x = getX(d);
          const y = getY(d);
          ctx.moveTo(x + RADII[b], y);
          ctx.arc(x, y, RADII[b], 0, 6.284);
          any = true;
        }
        if (!any) continue;
        ctx.fillStyle = COLORS[b];
        ctx.fill();
      }
    }

    const paintFinal = () =>
      paint(
        (d) => d.tx,
        (d) => d.ty,
      );

    /* Intro: scattered grid cells resolve into the letterforms. */
    function introFrame(now: number) {
      if (disposed) return;
      const t = now - start;
      let done = true;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(gridCv, 0, 0, W, H);
      for (let b = 0; b < 4; b++) {
        ctx.beginPath();
        for (const d of dots) {
          if (d.band !== b) continue;
          let p = (t - d.delay) / DURATION;
          p = p < 0 ? 0 : p > 1 ? 1 : p;
          if (p < 1) done = false;
          const e = 1 - Math.pow(1 - p, 3);
          d.cx = d.sx + (d.tx - d.sx) * e;
          d.cy = d.sy + (d.ty - d.sy) * e;
          ctx.moveTo(d.cx + RADII[b], d.cy);
          ctx.arc(d.cx, d.cy, RADII[b], 0, 6.284);
        }
        ctx.fillStyle = COLORS[b];
        ctx.globalAlpha = 0.25 + 0.75 * Math.min(1, t / (DURATION + STAGGER));
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!done) {
        raf = requestAnimationFrame(introFrame);
        return;
      }
      settled = true;
      paintFinal();
    }

    /* Pointer field: push away, spring home. */
    function fieldFrame() {
      if (disposed) return;
      let moving = false;
      for (const d of dots) {
        const dx = d.cx - px;
        const dy = d.cy - py;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < HOVER_R * HOVER_R) {
          const dist = Math.sqrt(dist2) || 0.001;
          const f = (1 - dist / HOVER_R) * PUSH;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx = (d.vx + (d.tx - d.cx) * SPRING) * DAMP;
        d.vy = (d.vy + (d.ty - d.cy) * SPRING) * DAMP;
        d.cx += d.vx;
        d.cy += d.vy;
        if (
          !moving &&
          (Math.abs(d.vx) > REST ||
            Math.abs(d.vy) > REST ||
            Math.abs(d.tx - d.cx) > REST ||
            Math.abs(d.ty - d.cy) > REST)
        ) {
          moving = true;
        }
      }
      paint(
        (d) => d.cx,
        (d) => d.cy,
      );
      if (over || moving) {
        raf = requestAnimationFrame(fieldFrame);
      } else {
        running = false;
        paintFinal();
      }
    }

    function kick() {
      if (running || !settled) return;
      running = true;
      raf = requestAnimationFrame(fieldFrame);
    }

    const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    function play() {
      if (disposed) return;
      cancelAnimationFrame(raf);
      settled = false;
      running = false;
      if (!build()) return;
      if (reduced) {
        settled = true;
        paintFinal();
        return;
      }
      start = performance.now();
      raf = requestAnimationFrame(introFrame);
    }

    // Hover only where there is a real pointer; on touch it would fire once on
    // tap and read as a glitch.
    const fine = !window.matchMedia || window.matchMedia('(pointer: fine)').matches;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      over = true;
      kick();
    };
    const onLeave = () => {
      over = false;
      px = -1e5;
      py = -1e5;
    };

    if (fine && !reduced) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
    }

    // Glyphs sample as the fallback face unless the webfont has landed.
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(play);

    // A ResizeObserver rather than a window resize listener: this sits in a
    // responsive grid cell that can change size while the window does not.
    let rt: ReturnType<typeof setTimeout>;
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (disposed) return;
        cancelAnimationFrame(raf);
        running = false;
        if (build()) {
          settled = true;
          paintFinal();
        }
      }, 150);
    });
    ro.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="RAMP, set in a grid of plotted dots that grows denser from R to P."
      className={`block h-full w-full bg-[#F8FAFE] ${className}`}
    />
  );
}
