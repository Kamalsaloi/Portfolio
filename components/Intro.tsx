'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* Narrow screens cannot give eleven characters enough cells to stay legible,
   so the name stacks there. */
const NAME_WIDE = ['KAMAL SALOI'];
const NAME_NARROW = ['KAMAL', 'SALOI'];

/* Glyph ramp, light to heavy. Cells pick from it by how much of the letterform
   they cover, which gives the type soft edges instead of a hard bitmap. */
const RAMP = ['·', ':', '-', '=', '+', '*', '#', '%', '@', '█'];
const SCRAMBLE = '!<>-_/[]{}=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FIELD = '.·:,-_^~+';

/* Aidoos cobalt, a shade deeper than the #2D5BFF brand blue so it holds a
   full screen without glare. Deepens toward the bottom, which reads as the
   same light source the hero plate has. */
/* Mirrors --color-cobalt / --color-cobalt-deep in globals.css. Kept as literals
   because these are canvas fill strings, not CSS. */
const BG_TOP = '#2749e6';
const BG_BOTTOM = '#1a35a8';
const BG_CSS = `linear-gradient(180deg, ${BG_TOP}, ${BG_BOTTOM})`;
/* White on cobalt: a pale blue ink would sink into a ground this saturated. */
const FIELD_INK = 'rgba(255,255,255,0.13)';
const CYCLE_INK = 'rgba(255,255,255,0.5)';
const LOCK_INK = '#ffffff';

const T_FORM_START = 200;
const T_FORM_END = 1600;
const T_HOLD_END = 2100;
const T_EXIT_END = 2950;

/**
 * Cold open: the name assembles on an ASCII field, then the field clears in
 * horizontal bands that march inward from the top and bottom edges, so the
 * hero is already visible through the opening strips before the name itself
 * cuts out.
 *
 * Nothing moves. Cells cycle glyphs in place and lock column by column, the
 * way a split-flap board settles. That is deliberately a different mechanic
 * from the RAMP wordmark elsewhere on the site, which resolves by moving dots
 * through space.
 */
export function Intro() {
  const [gone, setGone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    // Recorded only once the intro has actually finished. Writing it at the
    // start meant React Strict Mode's second effect pass read it back and
    // skipped, so the intro disabled itself in development.
    try {
      sessionStorage.setItem('intro-played', '1');
    } catch {
      /* private mode: it will simply play again */
    }
    setGone(true);
  }, []);

  useEffect(() => {
    const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem('intro-played') === '1';
    } catch {
      /* private mode: just play it */
    }

    const el = canvasRef.current;
    const g2d = el?.getContext?.('2d') ?? null;

    // Skipped rather than shortened: someone who has asked for less motion, or
    // who is on their second page view this session, should not be made to
    // wait.
    if (reduced || seen || !el || !g2d) {
      setGone(true);
      return;
    }

    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = g2d;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let raf = 0;
    let startedAt = 0;
    let frame = 0;
    let disposed = false;

    /* Only the cells the letterforms touch are redrawn each tick. */
    let nCount = 0;
    let nX = new Int16Array(0);
    let nY = new Int16Array(0);
    let nRow = new Int16Array(0);
    let nRamp = new Uint8Array(0);
    let nLock = new Float32Array(0);
    let nGlyph = new Uint8Array(0);

    /* The static background field is drawn once and blitted. */
    let fieldCv: HTMLCanvasElement | null = null;
    /* Vertical sky gradient, built once the canvas has a height. */
    let bgFill: string | CanvasGradient = BG_TOP;

    const fontStack = () => {
      const f = getComputedStyle(canvas).fontFamily;
      return f && f.trim() ? f : 'ui-monospace, monospace';
    };

    function build() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(rect.width);
      H = Math.round(rect.height);
      if (!W || !H) return false;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Small cells: a letterform needs roughly a dozen columns across before
      // it reads, and the previous 13px type gave it about five.
      const fontSize = W < 700 ? 9 : 11;
      cellW = Math.max(5, Math.round(fontSize * 0.6));
      cellH = Math.max(9, Math.round(fontSize * 1.32));
      cols = Math.ceil(W / cellW);
      rows = Math.ceil(H / cellH);

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, BG_TOP);
      grad.addColorStop(1, BG_BOTTOM);
      bgFill = grad;

      const stack = fontStack();
      ctx.font = `${fontSize}px ${stack}`;
      ctx.textBaseline = 'top';

      // Rasterise at full screen resolution, then area-average down into the
      // cell grid. Drawing straight into a cols x rows bitmap treats cells as
      // square, and they are roughly twice as tall as they are wide, which is
      // what was distorting the letterforms.
      const lines = W < 700 ? NAME_NARROW : NAME_WIDE;
      const mask = document.createElement('canvas');
      mask.width = W;
      mask.height = H;
      const m = mask.getContext('2d', { willReadFrequently: true });
      if (!m) return false;

      const targetW = Math.min(W * 0.78, 1500);
      m.font = `700 100px ${stack}`;
      const widest = Math.max(...lines.map((l) => m.measureText(l).width));
      const size = Math.max(24, (100 * targetW) / widest);
      m.font = `700 ${size}px ${stack}`;
      m.fillStyle = '#fff';
      m.textAlign = 'center';
      m.textBaseline = 'middle';

      const lineH = size * 1.05;
      const top = H / 2 - ((lines.length - 1) * lineH) / 2;
      lines.forEach((line, i) => m.fillText(line, W / 2, top + i * lineH));

      const data = m.getImageData(0, 0, W, H).data;

      const cover = new Float32Array(cols * rows);
      let count = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * cellW;
          const y0 = r * cellH;
          let sum = 0;
          let n = 0;
          for (let y = y0; y < y0 + cellH && y < H; y += 2) {
            for (let x = x0; x < x0 + cellW && x < W; x++) {
              sum += data[(y * W + x) * 4 + 3];
              n++;
            }
          }
          const cv = n ? sum / (n * 255) : 0;
          cover[r * cols + c] = cv;
          if (cv > 0.08) count++;
        }
      }

      nCount = count;
      nX = new Int16Array(count);
      nY = new Int16Array(count);
      nRow = new Int16Array(count);
      nRamp = new Uint8Array(count);
      nLock = new Float32Array(count);
      nGlyph = new Uint8Array(count);

      // Everything the type does not touch is painted once into a static
      // field, so each frame only redraws the letterform cells.
      fieldCv = document.createElement('canvas');
      fieldCv.width = W * dpr;
      fieldCv.height = H * dpr;
      const f = fieldCv.getContext('2d');
      if (!f) return false;
      f.setTransform(dpr, 0, 0, dpr, 0, 0);
      f.font = `${fontSize}px ${stack}`;
      f.textBaseline = 'top';
      f.fillStyle = FIELD_INK;

      let k = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cv = cover[r * cols + c];
          const x = c * cellW;
          const y = r * cellH;
          if (cv > 0.08) {
            nX[k] = x;
            nY[k] = y;
            nRow[k] = r;
            // Gamma bias so mid coverage still reads as solid type.
            nRamp[k] = Math.min(
              RAMP.length - 1,
              Math.floor(Math.pow(cv, 0.55) * (RAMP.length - 1) + 0.5),
            );
            nLock[k] =
              T_FORM_START +
              (c / Math.max(1, cols - 1)) * (T_FORM_END - T_FORM_START) +
              Math.random() * 150;
            nGlyph[k] = (Math.random() * SCRAMBLE.length) | 0;
            k++;
          } else {
            f.fillText(FIELD[(Math.random() * FIELD.length) | 0], x, y);
          }
        }
      }
      return true;
    }

    function draw(now: number) {
      if (disposed) return;
      const t = now - startedAt;
      frame++;

      // Exit: bands clear from the top and bottom edges inward, so the middle
      // rows holding the name survive longest and the hero appears in strips.
      let cleared = 0;
      if (t > T_HOLD_END) {
        const p = Math.min(1, (t - T_HOLD_END) / (T_EXIT_END - T_HOLD_END));
        cleared = Math.floor(p * p * Math.ceil(rows / 2));
      }

      ctx.clearRect(0, 0, W, H);

      const yTop = cleared * cellH;
      const yBot = Math.max(yTop, (rows - cleared) * cellH);
      if (yBot > yTop) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, yTop, W, yBot - yTop);
        ctx.clip();

        ctx.fillStyle = bgFill;
        ctx.fillRect(0, yTop, W, yBot - yTop);
        if (fieldCv) ctx.drawImage(fieldCv, 0, 0, W, H);

        // Glyph churn at a third of the frame rate: at 60 it reads as static.
        const churn = frame % 3 === 0;
        for (let i = 0; i < nCount; i++) {
          const r = nRow[i];
          if (r < cleared || r >= rows - cleared) continue;
          if (t >= nLock[i]) {
            ctx.fillStyle = LOCK_INK;
            ctx.fillText(RAMP[nRamp[i]], nX[i], nY[i]);
          } else {
            if (churn) nGlyph[i] = (Math.random() * SCRAMBLE.length) | 0;
            ctx.fillStyle = CYCLE_INK;
            ctx.fillText(SCRAMBLE[nGlyph[i]], nX[i], nY[i]);
          }
        }
        ctx.restore();
      }

      if (t >= T_EXIT_END) {
        finish();
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    if (!build()) {
      document.body.style.overflow = prevOverflow;
      setGone(true);
      return;
    }

    startedAt = performance.now();
    // Paint frame zero synchronously, then hand the ground to the canvas.
    draw(startedAt);
    if (wrapRef.current) wrapRef.current.style.background = 'transparent';
    raf = requestAnimationFrame(draw);

    // A hard stop, so a stalled rAF (backgrounded tab) can never strand the
    // reader behind the overlay.
    const bail = window.setTimeout(finish, T_EXIT_END + 1500);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(bail);
      document.body.style.overflow = prevOverflow;
    };
  }, [finish]);

  useEffect(() => {
    if (gone) document.body.style.overflow = '';
  }, [gone]);

  if (gone) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ background: BG_CSS }}
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      <canvas ref={canvasRef} className="font-mono block h-full w-full" />
    </div>
  );
}
