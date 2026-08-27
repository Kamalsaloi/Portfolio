'use client';

import { useEffect, useRef } from 'react';

/**
 * Faithful port of the Aidoos hero's isometric "VDC" animation
 * (hero_vdc_animation_v3.html in /public — the original source, kept for
 * reference). Same procedural SVG build + rAF loop, just scoped to a ref
 * instead of document.getElementById, with cleanup on unmount so dev-mode
 * remounts don't stack duplicate animation loops or observers.
 *
 * Sequence: a project block lands on the engine as one piece, splits into
 * three modules, and the modules descend through the open top of a
 * transparent glass box into a tray, where human + AI agent desks fill them
 * with progress. One block then leaves the box, is stamped on a
 * verification plate, and lands on a delivered pad. 13.6s loop, pauses
 * off-screen via IntersectionObserver, holds the delivered frame under
 * prefers-reduced-motion.
 */
export function VDCAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const svg = stage.querySelector<SVGSVGElement>('svg');
    const main = stage.querySelector<SVGGElement>('g[data-main]');
    if (!svg || !main) return;

    const NS = 'http://www.w3.org/2000/svg';
    function el<K extends keyof SVGElementTagNameMap>(
      n: K,
      a?: Record<string, string | number>
    ): SVGElementTagNameMap[K] {
      const e = document.createElementNS(NS, n) as SVGElementTagNameMap[K];
      if (a) for (const k in a) e.setAttribute(k, String(a[k]));
      return e;
    }

    const K = 42,
      KZ = 42;
    function iso(x: number, y: number, z?: number): [number, number] {
      return [(x - y) * K, (x + y) * K * 0.5 - (z || 0) * KZ];
    }
    function pts(a: [number, number][]) {
      return a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    }
    function faces(x: number, y: number, z: number, w: number, d: number, h: number) {
      return {
        top: [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)],
        left: [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)],
        right: [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)],
      };
    }
    const MAT = {
      neutral: { t: 'url(#v3Top)', l: 'url(#v3Left)', r: 'url(#v3Right)' },
      mid: { t: 'url(#v3MidTop)', l: 'url(#v3MidLeft)', r: 'url(#v3MidRight)' },
      tint: { t: 'url(#v3TintTop)', l: 'url(#v3TintLeft)', r: 'url(#v3TintRight)' },
      accent: { t: 'url(#v3AccTop)', l: 'url(#v3AccLeft)', r: 'url(#v3AccRight)' },
      verify: { t: 'url(#v3VerTop)', l: 'url(#v3VerLeft)', r: 'url(#v3VerRight)' },
    };
    function solid(
      parent: SVGElement,
      x: number,
      y: number,
      z: number,
      w: number,
      d: number,
      h: number,
      mat?: { t: string; l: string; r: string },
      opt?: { sw?: number; strokeOpacity?: number; bevel?: number }
    ) {
      opt = opt || {};
      mat = mat || MAT.neutral;
      const g = el('g');
      const fp = faces(x, y, z, w, d, h);
      const sw = opt.sw == null ? 0.9 : opt.sw;
      const so = opt.strokeOpacity == null ? 0.2 : opt.strokeOpacity;
      const left = el('polygon', {
        points: pts(fp.left),
        fill: mat.l,
        stroke: 'var(--sc-stroke)',
        'stroke-width': sw,
        'stroke-opacity': so,
        'stroke-linejoin': 'round',
      });
      const right = el('polygon', {
        points: pts(fp.right),
        fill: mat.r,
        stroke: 'var(--sc-stroke)',
        'stroke-width': sw,
        'stroke-opacity': so,
        'stroke-linejoin': 'round',
      });
      const top = el('polygon', {
        points: pts(fp.top),
        fill: mat.t,
        stroke: 'var(--sc-stroke)',
        'stroke-width': sw,
        'stroke-opacity': so,
        'stroke-linejoin': 'round',
      });
      g.appendChild(left);
      g.appendChild(right);
      g.appendChild(top);
      if (opt.bevel !== 0) {
        const A = fp.top[0],
          B = fp.top[1],
          D = fp.top[3];
        g.appendChild(
          el('polyline', {
            points: pts([D, A, B]),
            fill: 'none',
            stroke: 'rgba(255,255,255,0.85)',
            'stroke-width': 1.0,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            opacity: opt.bevel == null ? 0.7 : opt.bevel,
          })
        );
      }
      parent.appendChild(g);
      return { g, top, left, right };
    }
    function setPts(o: ReturnType<typeof solid>, x: number, y: number, z: number, w: number, d: number, h: number) {
      const f = faces(x, y, z, w, d, h);
      o.top.setAttribute('points', pts(f.top));
      o.left.setAttribute('points', pts(f.left));
      o.right.setAttribute('points', pts(f.right));
    }
    function contact(parent: SVGElement, x: number, y: number, w: number, d: number, z?: number, op?: number) {
      const c = iso(x + w / 2, y + d / 2, z || 0);
      parent.appendChild(
        el('ellipse', {
          cx: c[0],
          cy: c[1] + 3,
          rx: (w + d) * K * 0.3,
          ry: (w + d) * K * 0.15,
          fill: 'url(#v3Contact)',
          opacity: op == null ? 0.5 : op,
        })
      );
    }
    function tr(node: SVGElement, x: number, y: number, z?: number) {
      const q = iso(x, y, z);
      node.setAttribute('transform', 'translate(' + q[0].toFixed(1) + ',' + q[1].toFixed(1) + ')');
    }

    const gShadow = el('g'),
      gBack = el('g'),
      gRoom = el('g'),
      gDesks = el('g'),
      gCore = el('g'),
      gGlass = el('g'),
      gFlow = el('g'),
      gLbl = el('g');
    [gShadow, gBack, gRoom, gDesks, gCore, gGlass, gFlow, gLbl].forEach((g) => main.appendChild(g));

    // One vertical axis: everything sits on x == y, so (x - y) is constant and
    // the whole flow reads as a single column: engine, box, verification
    // plate, delivered pad.
    const RX = 3.0,
      RY = 3.0,
      RW = 2.45,
      RD = 2.45,
      FLOOR = 0.24,
      WALL = 0.88;
    const BOXCX = RX + RW / 2,
      BOXCY = RY + RD / 2,
      TOPZ = FLOOR + WALL;

    const EX = 0.62,
      EY = 0.62,
      EW = 0.92,
      ED = 0.92;
    const VX = 6.17,
      VY = 6.17,
      VW = 0.74,
      VD = 0.74,
      VPED = 0.18;
    const OX = 7.57,
      OY = 7.57,
      OW = 0.8,
      OD = 0.8,
      OPED = 0.18;

    function panel(parent: SVGElement, ax: number, ay: number, bx: number, by: number, z0: number, z1: number, op: number) {
      parent.appendChild(
        el('polygon', {
          points: pts([iso(ax, ay, z0), iso(bx, by, z0), iso(bx, by, z1), iso(ax, ay, z1)]),
          fill: 'oklch(88% 0.010 264)',
          opacity: op,
          stroke: 'var(--sc-stroke)',
          'stroke-width': 0.9,
          'stroke-opacity': 0.18,
          'stroke-linejoin': 'round',
        })
      );
    }
    function edge(parent: SVGElement, ax: number, ay: number, az: number, bx: number, by: number, bz: number, op?: number) {
      const a = iso(ax, ay, az),
        b = iso(bx, by, bz);
      parent.appendChild(
        el('line', {
          x1: a[0],
          y1: a[1],
          x2: b[0],
          y2: b[1],
          stroke: 'var(--sc-stroke)',
          'stroke-width': 1.1,
          'stroke-linecap': 'round',
          opacity: op == null ? 0.34 : op,
        })
      );
    }

    contact(gShadow, RX, RY, RW, RD, 0, 0.55);
    panel(gBack, RX, RY, RX + RW, RY, FLOOR, TOPZ, 0.42);
    panel(gBack, RX, RY, RX, RY + RD, FLOOR, TOPZ, 0.3);
    solid(gRoom, RX, RY, 0, RW, RD, FLOOR, MAT.neutral, { sw: 1, strokeOpacity: 0.3 });
    {
      const i = 0.16,
        fp = faces(RX + i, RY + i, FLOOR - 0.001, RW - 2 * i, RD - 2 * i, 0.001);
      gRoom.appendChild(
        el('polygon', { points: pts(fp.top), fill: 'none', stroke: 'var(--sc-ink-2)', 'stroke-width': 1, opacity: 0.12 })
      );
    }

    const DW = 0.68,
      DD = 0.6,
      DH = 0.11;
    const CW = 0.74,
      CD = 0.74,
      CBASE = 0.11;
    const CX = RX + (RW - CW) / 2,
      CY = RY + (RD - CD) / 2;
    const MW = 0.5,
      MD = 0.15,
      MH = 0.32,
      MG = 0.02;
    const MSPAN = 3 * MD + 2 * MG,
      MZ = FLOOR + CBASE;
    function slotY(i: number) {
      return CY + (CD - MSPAN) / 2 + MD / 2 + i * (MD + MG);
    }

    const STATIONS = [
      { x: RX + 0.2, y: RY + 0.24, kind: 'human' as const },
      { x: RX + 0.2, y: RY + 1.62, kind: 'human' as const },
      { x: RX + 1.7, y: RY + 0.24, kind: 'agent' as const },
      { x: RX + 1.7, y: RY + 1.62, kind: 'agent' as const },
    ];

    const coreTopMid = iso(CX + CW / 2, CY + CD / 2, MZ);
    STATIONS.forEach((st) => {
      const a = iso(st.x + DW / 2, st.y + DD / 2, FLOOR + DH);
      gRoom.appendChild(
        el('line', {
          x1: a[0],
          y1: a[1],
          x2: coreTopMid[0],
          y2: coreTopMid[1],
          stroke: 'var(--sc-ink-2)',
          'stroke-width': 1.1,
          'stroke-dasharray': '3 4',
          'stroke-linecap': 'round',
          opacity: 0.36,
        })
      );
    });

    const props: { d: number; draw: () => void }[] = [];
    function prop(depth: number, draw: () => void) {
      props.push({ d: depth, draw });
    }
    function laptop(parent: SVGElement, x: number, y: number, z: number) {
      solid(parent, x, y, z, 0.4, 0.14, 0.03, MAT.mid, { sw: 0.7, strokeOpacity: 0.24, bevel: 0.25 });
      solid(parent, x, y + 0.14, z, 0.4, 0.05, 0.2, MAT.mid, { sw: 0.7, strokeOpacity: 0.24, bevel: 0.3 });
    }
    function human(parent: SVGElement, x: number, y: number, z: number) {
      solid(parent, x, y, z, 0.32, 0.32, 0.28, MAT.mid, { sw: 0.7, strokeOpacity: 0.26, bevel: 0.35 });
      const c = iso(x + 0.16, y + 0.16, z + 0.4);
      parent.appendChild(
        el('circle', { cx: c[0], cy: c[1], r: 8.6, fill: 'url(#v3MidTop)', stroke: 'var(--sc-stroke)', 'stroke-width': 0.9, 'stroke-opacity': 0.3 })
      );
    }
    function agent(parent: SVGElement, x: number, y: number, z: number) {
      solid(parent, x, y, z, 0.32, 0.32, 0.22, MAT.tint, { sw: 0.7, strokeOpacity: 0.24, bevel: 0.35 });
      solid(parent, x + 0.02, y + 0.02, z + 0.22, 0.28, 0.28, 0.22, MAT.tint, { sw: 0.7, strokeOpacity: 0.24, bevel: 0.45 });
      const a0 = iso(x + 0.16, y + 0.16, z + 0.44),
        a1 = iso(x + 0.16, y + 0.16, z + 0.62);
      parent.appendChild(
        el('line', { x1: a0[0], y1: a0[1], x2: a1[0], y2: a1[1], stroke: 'var(--sc-accent)', 'stroke-width': 1.3, 'stroke-linecap': 'round', opacity: 0.55 })
      );
      parent.appendChild(el('circle', { cx: a1[0], cy: a1[1], r: 3.0, fill: 'var(--sc-accent)' }));
      const e0 = iso(x + 0.04, y + 0.3, z + 0.34),
        e1 = iso(x + 0.26, y + 0.3, z + 0.34);
      parent.appendChild(
        el('line', { x1: e0[0], y1: e0[1], x2: e1[0], y2: e1[1], stroke: 'var(--sc-accent)', 'stroke-width': 2.4, 'stroke-linecap': 'round', opacity: 0.85 })
      );
    }
    STATIONS.forEach((st) => {
      prop(st.x + st.y, () => {
        const g = el('g');
        gDesks.appendChild(g);
        contact(g, st.x, st.y, DW, DD, FLOOR, 0.26);
        solid(g, st.x, st.y, FLOOR, DW, DD, DH, MAT.neutral, { sw: 0.8, strokeOpacity: 0.22 });
        const z = FLOOR + DH;
        (st.kind === 'human' ? human : agent)(g, st.x + 0.12, st.y + 0.04, z);
        laptop(g, st.x + 0.17, st.y + 0.37, z);
      });
    });
    prop(CX + CY, () => {
      const g = el('g');
      gCore.appendChild(g);
      contact(g, CX, CY, CW, CD, FLOOR, 0.32);
      solid(g, CX, CY, FLOOR, CW, CD, CBASE, MAT.neutral, { sw: 1, strokeOpacity: 0.26 });
    });
    props
      .sort((p, q) => p.d - q.d)
      .forEach((x) => x.draw());

    const mods: { g: SVGGElement; fill: ReturnType<typeof solid>; shell: ReturnType<typeof solid> }[] = [];
    for (let si = 0; si < 3; si++) {
      const mg = el('g');
      gCore.appendChild(mg);
      mods.push({
        g: mg,
        fill: solid(mg, -MW / 2, -MD / 2, 0, MW, MD, 0.001, MAT.accent, { sw: 0.7, strokeOpacity: 0.18, bevel: 0.35 }),
        shell: solid(mg, -MW / 2, -MD / 2, 0, MW, MD, MH, MAT.mid, { sw: 0.7, strokeOpacity: 0.26, bevel: 0.4 }),
      });
    }
    const pulses = STATIONS.map((st) => {
      const c = el('circle', { r: 3.4, fill: 'var(--sc-accent)', opacity: 0 });
      gCore.appendChild(c);
      return { node: c, from: iso(st.x + DW / 2, st.y + DD / 2, FLOOR + DH), fast: st.kind === 'agent' };
    });

    panel(gGlass, RX, RY + RD, RX + RW, RY + RD, FLOOR, TOPZ, 0.13);
    panel(gGlass, RX + RW, RY, RX + RW, RY + RD, FLOOR, TOPZ, 0.1);
    edge(gGlass, RX, RY, FLOOR, RX, RY, TOPZ);
    edge(gGlass, RX + RW, RY, FLOOR, RX + RW, RY, TOPZ);
    edge(gGlass, RX, RY + RD, FLOOR, RX, RY + RD, TOPZ);
    edge(gGlass, RX + RW, RY + RD, FLOOR, RX + RW, RY + RD, TOPZ, 0.22);
    edge(gGlass, RX, RY, TOPZ, RX + RW, RY, TOPZ);
    edge(gGlass, RX, RY, TOPZ, RX, RY + RD, TOPZ);
    edge(gGlass, RX, RY + RD, TOPZ, RX + RW, RY + RD, TOPZ, 0.22);
    edge(gGlass, RX + RW, RY, TOPZ, RX + RW, RY + RD, TOPZ, 0.22);

    const PW = 0.54,
      SD = 0.18,
      PH = 0.2,
      GAPY = 0.13;
    const PX = EX + EW / 2,
      PY = EY + ED / 2,
      PZ = 0.95;
    const gMono = el('g');
    gFlow.appendChild(gMono);
    solid(gMono, -PW / 2, (-(SD * 3)) / 2, 0, PW, SD * 3, PH, MAT.mid, { sw: 0.8, strokeOpacity: 0.26, bevel: 0.45 });

    contact(gShadow, VX, VY, VW, VD, 0, 0.45);
    solid(gFlow, VX, VY, 0, VW, VD, VPED, MAT.neutral, { sw: 1, strokeOpacity: 0.28 });
    const vC = iso(VX + VW / 2, VY + VD / 2, VPED),
      S = 17;
    const SHX = vC[0] - 54,
      SHY = vC[1] + 13;
    const SHT = 'translate(' + SHX.toFixed(1) + ',' + SHY.toFixed(1) + ')';
    gFlow.appendChild(
      el('path', {
        d:
          'M0,' +
          -S * 1.55 +
          ' L' +
          S * 0.62 +
          ',' +
          -S * 1.26 +
          ' L' +
          S * 0.62 +
          ',' +
          -S * 0.6 +
          ' Q' +
          S * 0.62 +
          ',' +
          -S * 0.16 +
          ' 0,0 Q' +
          -S * 0.62 +
          ',' +
          -S * 0.16 +
          ' ' +
          -S * 0.62 +
          ',' +
          -S * 0.6 +
          ' L' +
          -S * 0.62 +
          ',' +
          -S * 1.26 +
          ' Z',
        transform: SHT,
        fill: '#fff',
        stroke: 'var(--sc-verify)',
        'stroke-width': 1.6,
        'stroke-linejoin': 'round',
        opacity: 0.55,
      })
    );
    const shieldTick = el('path', {
      d: 'M' + -S * 0.26 + ',' + -S * 0.82 + ' L' + -S * 0.05 + ',' + -S * 0.58 + ' L' + S * 0.3 + ',' + -S * 1.05,
      transform: SHT,
      fill: 'none',
      stroke: 'var(--sc-verify)',
      'stroke-width': 2.6,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-dasharray': 44,
      'stroke-dashoffset': 44,
    });
    gFlow.appendChild(shieldTick);

    contact(gShadow, OX, OY, OW, OD, 0, 0.45);
    solid(gFlow, OX, OY, 0, OW, OD, OPED, MAT.neutral, { sw: 1, strokeOpacity: 0.28 });
    const oC = iso(OX + OW / 2, OY + OD / 2, OPED + 0.62);
    const outTick = el('path', {
      d: 'M-9,1 L-3,7 L9,-6',
      transform: 'translate(' + oC[0] + ',' + oC[1] + ')',
      fill: 'none',
      stroke: 'var(--sc-verify)',
      'stroke-width': 2.8,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-dasharray': 30,
      'stroke-dashoffset': 30,
    });
    gFlow.appendChild(outTick);

    (function () {
      function link(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) {
        const a = iso(x0, y0, z0),
          b = iso(x1, y1, z1);
        gBack.appendChild(
          el('line', {
            x1: a[0],
            y1: a[1],
            x2: b[0],
            y2: b[1],
            stroke: 'var(--sc-ink-2)',
            'stroke-width': 1.1,
            'stroke-dasharray': '4 5',
            'stroke-linecap': 'round',
            opacity: 0.3,
          })
        );
      }
      link(PX, PY, PZ - 0.14, RX, RY, FLOOR);
      link(RX + RW, RY + RD, FLOOR, VX + VW / 2, VY + VD / 2, VPED);
      link(VX + VW / 2, VY + VD / 2, 0, OX + OW / 2, OY + OD / 2, OPED);
    })();

    const gUnit = el('g');
    gFlow.appendChild(gUnit);
    const unitSolid = solid(gUnit, -0.23, -0.23, 0, 0.46, 0.46, 0.3, MAT.accent, { sw: 0.9, strokeOpacity: 0.2, bevel: 0.4 });

    function makeLabel(text: string) {
      const g = el('g');
      gLbl.appendChild(g);
      const r = el('rect', { rx: 8, ry: 8, fill: '#ffffff', stroke: 'var(--sc-stroke)', 'stroke-width': 1, 'stroke-opacity': 0.32 });
      const tx = el('text', {
        'font-family': 'Geist, system-ui, sans-serif',
        'font-size': 12,
        'font-weight': 600,
        fill: 'var(--sc-ink)',
        'dominant-baseline': 'middle',
      });
      tx.textContent = text;
      g.appendChild(r);
      g.appendChild(tx);
      return {
        place(anchor: [number, number], dx: number, dy: number, align?: 'left' | 'center' | 'right') {
          const w = tx.getComputedTextLength ? tx.getComputedTextLength() : text.length * 7.3;
          const padX = 10,
            h = 25,
            bw = w + padX * 2;
          let x = anchor[0] + dx;
          const y = anchor[1] + dy;
          if (align === 'center') x -= bw / 2;
          else if (align === 'right') x -= bw;
          r.setAttribute('x', String(x));
          r.setAttribute('y', String(y - h / 2));
          r.setAttribute('width', String(bw));
          r.setAttribute('height', String(h));
          tx.setAttribute('x', String(x + padX));
          tx.setAttribute('y', String(y + 0.5));
          return this;
        },
        opacity(o: number) {
          g.style.opacity = String(o);
        },
      };
    }

    const lblProject = makeLabel('Your project');
    const lblSplit = makeLabel('Broken into modules and tasks');
    const lblTeam = makeLabel('Human + AI agents executing together');
    const lblVerify = makeLabel('Verified');
    const lblDone = makeLabel('Delivered');

    const PLACEMENTS: [ReturnType<typeof makeLabel>, [number, number], number, number, 'left' | 'center' | 'right'][] = [
      [lblProject, iso(PX, PY, PZ), 30, -2, 'left'],
      [lblSplit, iso(PX, PY, PZ), 30, -2, 'left'],
      [lblTeam, iso(RX, RY, TOPZ), 0, -36, 'center'],
      [lblVerify, iso(VX + VW, VY, VPED + 0.3), 14, 0, 'left'],
      [lblDone, iso(OX + OW, OY, OPED + 0.3), 14, 0, 'left'],
    ];
    function applyPlacements() {
      PLACEMENTS.forEach((a) => {
        a[0].place(a[1], a[2], a[3], a[4]);
      });
    }
    applyPlacements();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(applyPlacements);
    [lblProject, lblSplit, lblTeam, lblVerify, lblDone].forEach((l) => l.opacity(0));

    const pct = el('text', {
      'font-family': 'Geist, system-ui, sans-serif',
      'font-size': 14,
      'font-weight': 700,
      fill: 'var(--sc-accent)',
      'text-anchor': 'middle',
      opacity: 0,
    });
    gLbl.appendChild(pct);
    const pctAt = iso(RX + RW + 0.1, RY - 0.1, TOPZ + 0.34);
    pct.setAttribute('x', String(pctAt[0]));
    pct.setAttribute('y', String(pctAt[1]));

    const LOOP = 13600;
    const T = {
      arrive: [0, 1400],
      separate: [1400, 2500],
      load: [2500, 3800],
      build: [3800, 9000],
      toVerify: [9000, 9900],
      verify: [9900, 11100],
      deliver: [11100, 12100],
      hold: [12100, 13600],
    };
    function pr(t: number, r: number[]) {
      return Math.min(1, Math.max(0, (t - r[0]) / (r[1] - r[0])));
    }
    function ease(u: number) {
      return 1 - Math.pow(1 - u, 3);
    }
    function lerp(a: number, b: number, u: number) {
      return a + (b - a) * u;
    }
    const DROPZ = TOPZ + 0.85;

    function frame(t: number) {
      const ap = ease(pr(t, T.arrive));
      const glide = lerp(1.5, 0, ap);
      const gap = ease(pr(t, T.separate));
      const showMono = t < T.separate[0] || gap < 0.02;
      gMono.style.opacity = showMono ? '1' : '0';
      if (showMono) tr(gMono, PX - glide, PY - glide, PZ + lerp(0.6, 0, ap));

      const moving = t >= T.toVerify[0];
      const verified = t >= T.verify[0] + 420;
      const exit = moving ? ease(pr(t, [T.toVerify[0], T.toVerify[0] + 340])) : 0;

      let sum = 0;
      mods.forEach((m, i) => {
        const ld = ease(Math.min(1, Math.max(0, pr(t, T.load) * 1.45 - i * 0.2)));
        let mx: number, my: number, mz: number;
        if (ld < 0.55) {
          const a = ld / 0.55;
          mx = lerp(PX, CX + CW / 2, a);
          my = lerp(PY + (i - 1) * (SD + gap * GAPY), slotY(i), a);
          mz = lerp(PZ, DROPZ, a);
        } else {
          const b = (ld - 0.55) / 0.45;
          mx = CX + CW / 2;
          my = slotY(i);
          mz = lerp(DROPZ, MZ, b);
        }
        tr(m.g, mx, my, mz);

        const f = t < T.build[0] ? 0 : t >= T.build[1] ? 1 : Math.min(1, Math.max(0, pr(t, T.build) * 1.5 - i * 0.25));
        sum += f;
        const h = MH * f;
        setPts(m.fill, -MW / 2, -MD / 2, 0, MW, MD, Math.max(0.001, h));
        setPts(m.shell, -MW / 2, -MD / 2, h, MW, MD, Math.max(0.001, MH - h));
        m.fill.g.style.opacity = h < 0.006 ? '0' : '1';
        m.shell.g.style.opacity = MH - h < 0.006 ? '0' : '1';
        m.g.style.opacity = showMono ? '0' : String(1 - exit);
      });

      const bpct = sum / 3;
      pct.setAttribute('opacity', t >= T.build[0] && t < T.toVerify[1] ? '1' : '0');
      pct.textContent = Math.round(bpct * 100) + '%';
      pct.setAttribute('fill', verified ? 'var(--sc-verify)' : 'var(--sc-accent)');

      const building = t >= T.build[0] && t < T.build[1];
      pulses.forEach((p, i) => {
        if (!building) {
          p.node.setAttribute('opacity', '0');
          return;
        }
        const speed = p.fast ? 1500 : 2600,
          u = (((t - T.build[0]) / speed + i * 0.27) % 1);
        p.node.setAttribute('cx', String(lerp(p.from[0], coreTopMid[0], u)));
        p.node.setAttribute('cy', String(lerp(p.from[1], coreTopMid[1], u)));
        p.node.setAttribute('opacity', (0.9 * Math.sin(u * Math.PI)).toFixed(2));
        p.node.setAttribute('r', String(p.fast ? 3.0 : 3.8));
      });

      gUnit.style.opacity = moving ? '1' : '0';
      if (moving) {
        let ux: number, uy: number, uz: number;
        if (t < T.verify[0]) {
          const a2 = ease(pr(t, T.toVerify));
          ux = lerp(CX + CW / 2, VX + VW / 2, a2);
          uy = lerp(CY + CD / 2, VY + VD / 2, a2);
          uz = lerp(MZ, VPED, a2) + Math.sin(a2 * Math.PI) * 0.85;
        } else if (t < T.deliver[0]) {
          ux = VX + VW / 2;
          uy = VY + VD / 2;
          uz = VPED;
        } else {
          const c2 = ease(pr(t, T.deliver));
          ux = lerp(VX + VW / 2, OX + OW / 2, c2);
          uy = lerp(VY + VD / 2, OY + OD / 2, c2);
          uz = lerp(VPED, OPED, c2) + Math.sin(c2 * Math.PI) * 0.4;
        }
        tr(gUnit, ux, uy, uz);
        const m2 = verified ? MAT.verify : MAT.accent;
        unitSolid.top.setAttribute('fill', m2.t);
        unitSolid.left.setAttribute('fill', m2.l);
        unitSolid.right.setAttribute('fill', m2.r);
      }

      shieldTick.setAttribute('stroke-dashoffset', String(44 * (1 - ease(pr(t, [T.verify[0] + 120, T.verify[0] + 820])))));
      outTick.setAttribute('stroke-dashoffset', String(30 * (1 - ease(pr(t, [T.deliver[1] - 200, T.hold[0] + 300])))));

      lblProject.opacity(t < T.separate[0] ? 1 : 0);
      lblSplit.opacity(t >= T.separate[0] && t < T.build[0] ? 1 : 0);
      lblTeam.opacity(t >= T.build[0] && t < T.toVerify[1] ? 1 : 0);
      lblVerify.opacity(t >= T.verify[0] && t < T.deliver[0] ? 1 : 0);
      lblDone.opacity(t >= T.deliver[0] ? 1 : 0);
    }

    frame(T.arrive[1] - 1);

    let rafId = 0;
    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    rafId = requestAnimationFrame(function fit() {
      if (cancelled) return;
      const prev = gLbl.style.display;
      gLbl.style.display = 'none';
      const b = main.getBBox();
      gLbl.style.display = prev;
      const pad = 26;
      svg.setAttribute('viewBox', [b.x - pad, b.y - pad, b.width + pad * 2, b.height + pad * 2].join(' '));
      frame(0);

      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      if (reduce) {
        frame(T.hold[0] + 200);
        return;
      }

      let t0: number | null = null;
      let vis = true;
      if (window.IntersectionObserver) {
        observer = new IntersectionObserver((es) => {
          vis = es[0].isIntersecting;
        }, { threshold: 0.05 });
        observer.observe(svg);
      }
      rafId = requestAnimationFrame(function loop(ts) {
        if (cancelled) return;
        if (t0 === null) t0 = ts;
        if (vis) frame((ts - t0) % LOOP);
        rafId = requestAnimationFrame(loop);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      while (main.firstChild) main.removeChild(main.firstChild);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      style={{ position: 'relative', width: '100%', aspectRatio: '5 / 7', overflow: 'visible' }}
    >
      <svg
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="v3Top" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="oklch(99.4% 0.002 264)" />
            <stop offset="100%" stopColor="oklch(96.2% 0.004 264)" />
          </linearGradient>
          <linearGradient id="v3Left" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(95.6% 0.005 264)" />
            <stop offset="100%" stopColor="oklch(91.4% 0.007 264)" />
          </linearGradient>
          <linearGradient id="v3Right" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(91.8% 0.007 264)" />
            <stop offset="100%" stopColor="oklch(87.0% 0.009 264)" />
          </linearGradient>
          <linearGradient id="v3MidTop" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="oklch(94.5% 0.006 264)" />
            <stop offset="100%" stopColor="oklch(91.5% 0.007 264)" />
          </linearGradient>
          <linearGradient id="v3MidLeft" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(89.0% 0.008 264)" />
            <stop offset="100%" stopColor="oklch(85.0% 0.009 264)" />
          </linearGradient>
          <linearGradient id="v3MidRight" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(85.0% 0.009 264)" />
            <stop offset="100%" stopColor="oklch(80.5% 0.010 264)" />
          </linearGradient>
          <linearGradient id="v3TintTop" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="oklch(93.5% 0.042 264)" />
            <stop offset="100%" stopColor="oklch(90.0% 0.055 264)" />
          </linearGradient>
          <linearGradient id="v3TintLeft" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(87.5% 0.062 264)" />
            <stop offset="100%" stopColor="oklch(83.5% 0.072 264)" />
          </linearGradient>
          <linearGradient id="v3TintRight" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(83.0% 0.072 264)" />
            <stop offset="100%" stopColor="oklch(78.5% 0.080 264)" />
          </linearGradient>
          <linearGradient id="v3AccTop" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="oklch(70% 0.175 264)" />
            <stop offset="100%" stopColor="oklch(60% 0.205 264)" />
          </linearGradient>
          <linearGradient id="v3AccLeft" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(58% 0.205 264)" />
            <stop offset="100%" stopColor="oklch(51% 0.215 264)" />
          </linearGradient>
          <linearGradient id="v3AccRight" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(52% 0.210 264)" />
            <stop offset="100%" stopColor="oklch(45% 0.200 264)" />
          </linearGradient>
          <linearGradient id="v3VerTop" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="oklch(72% 0.130 152)" />
            <stop offset="100%" stopColor="oklch(62% 0.140 152)" />
          </linearGradient>
          <linearGradient id="v3VerLeft" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(60% 0.140 152)" />
            <stop offset="100%" stopColor="oklch(53% 0.135 152)" />
          </linearGradient>
          <linearGradient id="v3VerRight" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="oklch(54% 0.135 152)" />
            <stop offset="100%" stopColor="oklch(47% 0.125 152)" />
          </linearGradient>
          <radialGradient id="v3Contact" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(30,38,60,0.30)" />
            <stop offset="100%" stopColor="rgba(30,38,60,0)" />
          </radialGradient>
        </defs>
        <g
          data-main
          style={
            {
              '--sc-stroke': 'oklch(58% 0.016 264)',
              '--sc-ink': 'oklch(30% 0.016 264)',
              '--sc-ink-2': 'oklch(46% 0.014 264)',
              '--sc-accent': 'oklch(55% 0.230 264)',
              '--sc-verify': 'oklch(56% 0.135 152)',
            } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
}
