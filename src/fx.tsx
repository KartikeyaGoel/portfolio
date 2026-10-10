import { useEffect, useRef } from 'react';

// One shared pointer, read by every interactive surface on each frame.
export const pointer = { x: -9999, y: -9999, active: false };

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = e.pointerType === 'mouse';
  }, { passive: true });
  document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(pointer: fine)').matches;

export function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// Ragged paper edge along the top of an element, as a clip-path polygon.
export function tornEdge(seed: number, steps = 90, depth = 14) {
  const rand = seeded(seed);
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const y = depth * (0.25 + rand() * 0.75) * (i % 7 === 0 ? 1.6 : 1);
    return `${((i / steps) * 100).toFixed(2)}% ${y.toFixed(1)}px`;
  });
  return `polygon(${pts.join(', ')}, 100% 100%, 0 100%)`;
}

type Field = (u: number, v: number, w: number, h: number) => number;

// A real halftone: dot radius follows a tone field, and dots swell near the cursor.
export function Halftone({
  field,
  text,
  color = 'currentColor',
  step = 8,
  reach = 120,
  live = false,
  className = '',
}: {
  field?: Field;
  text?: string;
  color?: string;
  step?: number;
  reach?: number;
  // redraw every frame while visible, for fields that change over time
  live?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let mask: Uint8ClampedArray | null = null;
    let raf = 0;
    let visible = false;
    let boost = 0; // eased 0..1 so the swell fades in and out
    const ease = { x: -9999, y: -9999 };
    const still = reducedMotion();

    const buildMask = () => {
      if (!text) return;
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const o = off.getContext('2d')!;
      const size = Math.min(h * 1.05, (w / text.length) * 1.55);
      o.font = `800 ${size}px 'Schibsted Grotesk', sans-serif`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText(text, w / 2, h / 2 + size * 0.04);
      mask = o.getImageData(0, 0, w, h).data;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = Math.max(1, Math.round(r.width));
      const nh = Math.max(1, Math.round(r.height));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMask();
      draw();
    };

    const tone = (x: number, y: number) => {
      if (mask) return mask[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] / 255;
      return field ? field(x / w, y / h, w, h) : 0.5;
    };

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const px = ease.x - r.left;
      const py = ease.y - r.top;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color === 'currentColor' ? getComputedStyle(canvas).color : color;
      const max = step * 0.58;
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          let t = tone(x, y);
          if (boost > 0.01) {
            const d = Math.hypot(x - px, y - py);
            t += boost * 0.85 * Math.exp(-(d * d) / (reach * reach)) * (mask ? (t > 0.05 ? 1 : 0.35) : 1);
          }
          const rad = max * Math.min(1, t);
          if (rad < 0.35) continue;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      const r = canvas.getBoundingClientRect();
      const near = pointer.active &&
        pointer.x > r.left - reach && pointer.x < r.right + reach &&
        pointer.y > r.top - reach && pointer.y < r.bottom + reach;
      const target = near ? 1 : 0;
      ease.x += (pointer.x - ease.x) * (ease.x < -9000 ? 1 : 0.18);
      ease.y += (pointer.y - ease.y) * (ease.y < -9000 ? 1 : 0.18);
      const prev = boost;
      boost += (target - boost) * 0.12;
      if (live || near || Math.abs(boost - prev) > 0.002) draw();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !still && (finePointer() || live) && !raf) raf = requestAnimationFrame(tick);
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    document.fonts?.ready.then(() => { w = 0; resize(); });
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [field, text, color, step, reach, live]);

  return <canvas ref={ref} className={`halftone ${className}`} aria-hidden="true" />;
}

// Ink-dot cursor with a springy tail; grows into a labelled disc over [data-cursor].
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const tail = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    document.documentElement.classList.add('has-cursor');
    const lag = { x: pointer.x, y: pointer.y };
    let raf = 0;
    let label = '';
    let ink = '';

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element;
      // each tone can recolor the cursor so it never disappears into its own color
      const nextInk = getComputedStyle(target).getPropertyValue('--cursor').trim();
      if (nextInk !== ink) {
        ink = nextInk;
        const root = document.documentElement.style;
        root.setProperty('--cursor-now', ink || 'var(--cobalt)');
        root.setProperty('--cursor-label-now', getComputedStyle(target).getPropertyValue('--cursor-label').trim() || 'var(--paper)');
      }
      const host = target.closest('[data-cursor]');
      const next = host?.getAttribute('data-cursor') ?? '';
      // over an instrument the label rides beside a small dot, so it never hides what you're steering
      const tag = Boolean(host?.hasAttribute('data-cursor-tag'));
      if ((next !== label || tag !== dot.current?.classList.contains('is-tag')) && dot.current) {
        label = next;
        dot.current.dataset.label = label;
        dot.current.classList.toggle('is-big', Boolean(label) && !tag);
        dot.current.classList.toggle('is-tag', tag);
      }
    };

    const loop = () => {
      lag.x += (pointer.x - lag.x) * 0.2;
      lag.y += (pointer.y - lag.y) * 0.2;
      if (dot.current) dot.current.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
      if (tail.current) {
        const show = (!label || dot.current?.classList.contains('is-tag')) && Math.hypot(pointer.x - lag.x, pointer.y - lag.y) > 6;
        tail.current.setAttribute('x1', String(lag.x));
        tail.current.setAttribute('y1', String(lag.y));
        tail.current.setAttribute('x2', String(pointer.x));
        tail.current.setAttribute('y2', String(pointer.y));
        tail.current.style.opacity = show ? '1' : '0';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointerover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <svg className="cursor-tail" aria-hidden="true"><line ref={tail} /></svg>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
