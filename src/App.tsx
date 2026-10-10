import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import {
  cards,
  coursework,
  thisTerm,
  EMAIL,
  GITHUB,
  LINKEDIN,
  RESUME,
  sections,
  skills,
  topics,
  type Card as CardData,
  type Topic,
} from './data';
import { Cursor, Halftone, pointer, reducedMotion, seeded, tornEdge } from './fx';

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483646, 7) + 1;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Tone fields for the halftone surfaces (module-level so they stay referentially stable).
const heroField = (u: number, v: number, w: number, h: number) => {
  const d = Math.hypot((u - 0.82) * w, (v - 0.38) * h) / Math.min(w, h);
  return 0.55 * (1 - smooth(0.05, 0.62, d));
};
// Crucible: two agents' positions. Overlap = consensus (faint); the rest is disagreement (dense).
const debate = { sep: 0.55 };
const debateField = (u: number, v: number, w: number, h: number) => {
  const r = Math.min(w, h) * 0.42;
  const off = r * debate.sep;
  const a = Math.hypot(u * w - (w / 2 - off), v * h - h / 2);
  const b = Math.hypot(u * w - (w / 2 + off), v * h - h / 2);
  if (Math.abs(a - r) < 3 || Math.abs(b - r) < 3) return 0.75;
  const inA = a < r;
  const inB = b < r;
  if (inA && inB) return 0.16;
  return inA || inB ? 0.9 : 0.03;
};
// share of a circle covered by the other, for two unit circles d radii apart
const lens = (d: number) => (d >= 2 ? 0 : (2 * Math.acos(d / 2) - (d / 2) * Math.sqrt(4 - d * d)) / Math.PI);
const cornerField = (u: number, v: number) => 0.9 * (1 - smooth(0, 1.05, Math.hypot(1 - u, 1 - v)));

/* ---------------------------------------------------------------- header + menu */

const taglines = [
  'builds things that have to work',
  'makes slow things fast',
  'writes the evals first',
  'debugs at 50 Hz',
  'reads the stack trace',
];

function Header({ onMenu }: { onMenu: () => void }) {
  const [line, setLine] = useState(0);
  return (
    <motion.header
      className="header"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <a href="#top" className="wordmark" data-cursor="top" onPointerEnter={() => setLine((l) => (l + 1) % taglines.length)}>
        <strong>Kartikeya Goel</strong>
        <span className="tagline">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.em
              key={line}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              {taglines[line]}
            </motion.em>
          </AnimatePresence>
        </span>
      </a>
      <div className="header-actions">
        <a className="pill" href={RESUME} target="_blank" rel="noreferrer" data-cursor="pdf">Résumé</a>
        <button className="menu-button" onClick={onMenu} aria-label="Open menu" data-cursor="menu">
          <i /><i /><i />
        </button>
      </div>
    </motion.header>
  );
}

const menuItems = [
  { href: '#work', title: 'Work', rest: <>see <em>the cards</em></>, tone: 't-paper' },
  { href: RESUME, title: 'Résumé', rest: <>the <em>one-page</em> version</>, tone: 't-signal-tint', ext: true },
  { href: `mailto:${EMAIL}`, title: 'Email', rest: <>say <em>hello</em></>, tone: 't-cobalt' },
  { href: GITHUB, title: 'GitHub', rest: <>read <em>the code</em></>, tone: 't-cobalt-tint', ext: true },
  { href: LINKEDIN, title: 'LinkedIn', rest: <>the <em>formal</em> one</>, tone: 't-paper', ext: true },
];

function Menu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.25 } }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <Halftone className="menu-glyph" text="hello" step={14} reach={220} />
      <button className="pill close" onClick={onClose} data-cursor="close">Close ✕</button>
      <nav onClick={(e) => e.stopPropagation()}>
        {menuItems.map((item, i) => {
          const r = seeded(i + 3);
          return (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.ext ? '_blank' : undefined}
              rel={item.ext ? 'noreferrer' : undefined}
              className={`menu-card ${item.tone}`}
              onClick={() => !item.ext && onClose()}
              data-cursor="go"
              initial={{ y: -500, rotate: (r() - 0.5) * 24, opacity: 0 }}
              animate={{ y: 0, rotate: (r() - 0.5) * 3, opacity: 1 }}
              exit={{ y: 300, rotate: (r() - 0.5) * 30, opacity: 0, transition: { duration: 0.35, delay: i * 0.03 } }}
              transition={{ type: 'spring', stiffness: 160, damping: 19, delay: 0.05 + i * 0.07 }}
              whileHover={{ rotate: 0, x: 8 }}
            >
              <span className="arrow-disc">→</span>
              <span className="menu-text"><strong>{item.title}</strong> · {item.rest}</span>
            </motion.a>
          );
        })}
      </nav>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- hero + filter */

function Rise({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`rise ${className}`}>
      <motion.span
        initial={{ y: '110%', rotate: 4 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.2, 0.85, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Filter({ value, onChange, count }: {
  value: Topic | 'all';
  onChange: (t: Topic | 'all') => void;
  count: number;
}) {
  const [open, setOpen] = useState(false);
  const word = topics.find((t) => t.id === value)!.word;

  return (
    <motion.div
      className="filter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7 }}
    >
      <span className="filter-lead">Lately I’m deep in…</span>
      <button
        className={`filter-button ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-cursor="pick"
      >
        <span className="filter-disc">↓</span>
        <span className="filter-word">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.em
              key={word}
              initial={{ y: '-100%', rotateX: 70, opacity: 0 }}
              animate={{ y: '0%', rotateX: 0, opacity: 1 }}
              exit={{ y: '100%', rotateX: -70, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {word}
            </motion.em>
          </AnimatePresence>
        </span>
      </button>
      <span className="filter-count">{String(count).padStart(2, '0')} cards</span>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="filter-menu"
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {topics.map((t, i) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  role="option"
                  aria-selected={t.id === value}
                  data-cursor="pick"
                  onClick={() => { onChange(t.id); setOpen(false); }}
                >
                  <em>{t.word}</em>
                  <span>{t.id === 'all' ? cards.length : cards.filter((c) => c.topics.includes(t.id as Topic)).length}</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Hero({ filter, setFilter, count }: {
  filter: Topic | 'all';
  setFilter: (t: Topic | 'all') => void;
  count: number;
}) {
  return (
    <section className="hero" id="top">
      <Halftone className="hero-field" field={heroField} step={11} reach={170} />
      <h1>
        <Rise delay={0.35}>Hi,</Rise> <Rise delay={0.41}>I’m</Rise> <Rise delay={0.47}>Kartikeya.</Rise>
        <br />
        <Rise delay={0.6} className="serif">I tinker,</Rise> <Rise delay={0.68} className="serif">a little.</Rise>
      </h1>
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        I study computer science at Stanford. I like building things and figuring out how they
        work. Here’s what I’ve made so far, at internships and on my own time.
      </motion.p>
      <Filter value={filter} onChange={setFilter} count={count} />
    </section>
  );
}

/* ---------------------------------------------------------------- card faces */

const modules = [[150, 100], [270, 100], [150, 220], [270, 220]];
const CHASSIS = { x: 210, y: 160, half: 90 };

// Swerve kinematics, driven by the cursor: every module adds the drive vector (toward the
// cursor) to the rotation term ω × r (from circling the cursor around the robot), so the four
// wheels only agree when the robot is driving straight. Cursor on the chassis = X-lock.
function Robot() {
  const svg = useRef<SVGSVGElement>(null);
  const mods = useRef<(SVGGElement | null)[]>([]);
  const heading = useRef<SVGTextElement>(null);
  useTextScale(svg);

  useEffect(() => {
    const el = svg.current;
    if (!el || reducedMotion()) return;
    const angle = [0, 0, 0, 0];
    let raf = 0;
    let visible = false;
    let prev: number | null = null;
    let omega = 0;

    const tick = () => {
      raf = 0;
      if (!visible) return;
      const m = el.getScreenCTM();
      if (m && pointer.active && pointer.x > -9000) {
        el.classList.add('is-tracking');
        const cx = m.a * CHASSIS.x + m.c * CHASSIS.y + m.e;
        const cy = m.b * CHASSIS.x + m.d * CHASSIS.y + m.f;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const around = Math.atan2(dy, dx);
        const step = prev === null ? 0 : Math.atan2(Math.sin(around - prev), Math.cos(around - prev));
        prev = around;
        omega += (step * 60 - omega) * 0.08; // rad/s, smoothed
        const locked = Math.abs(dx) < CHASSIS.half * m.a && Math.abs(dy) < CHASSIS.half * m.d;
        modules.forEach(([mx, my], i) => {
          const rx = (mx - CHASSIS.x) / 85;
          const ry = (my - CHASSIS.y) / 85;
          const vx = dx / dist - omega * ry * 0.5;
          const vy = dy / dist + omega * rx * 0.5;
          const target = locked ? (i === 1 || i === 2 ? -45 : 45) : (Math.atan2(vy, vx) * 180) / Math.PI + 90;
          const delta = ((((target - angle[i]) % 360) + 540) % 360) - 180; // shortest way round, never unwinds
          angle[i] += delta * 0.16;
          mods.current[i]?.style.setProperty('transform', `rotate(${angle[i]}deg)`);
        });
        if (heading.current) {
          const deg = Math.round(((angle[0] % 360) + 360) % 360);
          heading.current.textContent = locked ? 'X-lock' : `θ ${String(deg).padStart(3, '0')}°  ω ${omega.toFixed(1)}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={svg} className="robot" viewBox="0 0 420 300" aria-hidden="true">
      <g className="ink">
        <rect x="108" y="58" width="204" height="204" rx="16" className="bumper" />
        <rect x="120" y="70" width="180" height="180" rx="10" />
        {modules.map(([cx, cy], i) => (
          <g
            key={i}
            ref={(n) => { mods.current[i] = n; }}
            className="module"
            style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${i * -0.4}s` }}
          >
            <circle cx={cx} cy={cy} r="20" />
            <rect x={cx - 6} y={cy - 14} width="12" height="28" rx="3" />
            <path d={`M${cx} ${cy - 14} v-4`} />
          </g>
        ))}
        <path d="M150 58 V40 H270 V58" />
        <path d="M165 40 V28 M195 40 V28 M225 40 V28 M255 40 V28" />
        <rect x="190" y="140" width="40" height="40" rx="6" className="fill" />
        <circle cx="210" cy="84" r="7" />
      </g>
      <g className="notes">
        <path d="M134 86 C110 74 86 60 70 50" />
        <text x="8" y="44">swerve ×4</text>
        <path d="M216 80 C244 50 300 30 330 26" />
        <text x="334" y="24">vision</text>
        <path d="M230 172 C270 186 292 220 296 262" />
        <text x="250" y="284">gyro + odometry</text>
        <path d="M180 28 C160 16 140 14 112 16" />
        <text x="44" y="20">intake</text>
        <text ref={heading} x="8" y="284" className="heading" />
      </g>
    </svg>
  );
}

// Apple: whole screens localize, not strings: copy, CTA and layout direction all change per locale.
const locales: [string, string, string, boolean?][] = [
  ['en-US', 'Hello', 'Learn more'], ['fr-FR', 'Bonjour', 'En savoir plus'], ['de-DE', 'Hallo', 'Weitere Informationen'],
  ['ar-SA', 'مرحبًا', 'اعرف المزيد', true], ['ja-JP', 'こんにちは', '詳しく見る'], ['es-ES', 'Hola', 'Más información'],
  ['ko-KR', '안녕하세요', '더 알아보기'], ['it-IT', 'Ciao', 'Scopri di più'], ['he-IL', 'שלום', 'למידע נוסף', true],
  ['pt-BR', 'Olá', 'Saiba mais'], ['hi-IN', 'नमस्ते', 'और जानें'], ['zh-CN', '你好', '了解更多'],
  ['sv-SE', 'Hej', 'Läs mer'], ['ru-RU', 'Привет', 'Подробнее'], ['tr-TR', 'Merhaba', 'Daha fazla bilgi'], ['nl-NL', 'Hoi', 'Meer informatie'],
];

function Screens() {
  const [pos, bind] = useScrub();
  const auto = useAutoplay(locales.length, 1800);
  const i = pos === null ? auto : Math.min(locales.length - 1, Math.floor(pos.u * locales.length));
  const [code, hello, cta, rtl] = locales[i];
  const spring = { type: 'spring', stiffness: 260, damping: 26 } as const;
  return (
    <div className="viz screens" data-cursor="locale" data-cursor-tag {...bind} aria-hidden="true">
      <div className="screen" />
      <div className="screen" />
      <div className="screen front" dir={rtl ? 'rtl' : 'ltr'} lang={code}>
        <span className="screen-bar"><i /><i /><i /></span>
        <motion.span layout transition={spring} className="screen-art" />
        <span className="screen-word">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.strong
              key={code}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={spring}
            >
              {hello}
            </motion.strong>
          </AnimatePresence>
        </span>
        <motion.span layout transition={spring} className="screen-cta">{cta}</motion.span>
      </div>
      <div className="screen-ticks">{locales.map(([c], k) => <i key={c} className={k === i ? 'on' : ''} />)}</div>
      <span className="viz-log">{code} · {rtl ? 'RTL' : 'LTR'} · <b>schema ✓</b></span>
    </div>
  );
}

// Sago: point at any claim in the brief and its citation resolves to the exact paragraph it came from.
const claims = [96, 112, 80, 104, 118, 70, 100, 88];
const citeOf = [0, 1, 0, 2, 1, 2, 0, 1]; // every claim has a source
const srcY = [20, 84, 148];
const paraOf = claims.map((_, i) => citeOf.slice(0, i).filter((c) => c === citeOf[i]).length);

function Brief() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const [pos, bind] = useScrub();
  const auto = useAutoplay(claims.length, 1500);
  const hovered = pos === null ? null : Math.round((pos.v * 226 - 28.5) / 20);
  const active = hovered === null ? auto : Math.min(claims.length - 1, Math.max(0, hovered));
  const src = citeOf[active];
  return (
    <div className="viz brief-viz" data-cursor="trace" data-cursor-tag {...bind}>
      <svg ref={svg} className="brief" viewBox="0 0 230 226" aria-hidden="true">
        <rect x="4" y="6" width="140" height="196" rx="5" className="doc" />
        {claims.map((w, i) => {
          const x = 18 + w + 7;
          const y = 28.5 + i * 20;
          const sy = srcY[citeOf[i]] + 12 + Math.min(paraOf[i], 2) * 8;
          const on = i === active;
          return (
            <g key={i} className={on ? 'claim on' : 'claim'}>
              <rect x="18" y={y - 2.5} width={w} height="5" rx="2.5" className="line" />
              <path className="thread" d={`M${x} ${y} C ${x + 36} ${y}, 150 ${sy}, 178 ${sy}`} />
              <circle cx={x} cy={y} r={on ? 4.5 : 3} />
            </g>
          );
        })}
        {srcY.map((y, k) => (
          <g key={k} className={k === src ? 'source on' : 'source'}>
            <path d={`M176 ${y} h36 l10 10 v32 h-46 z`} />
            {[0, 1, 2].map((r) => (
              <path key={r} className={k === src && r === Math.min(paraOf[active], 2) ? 'src-line hit' : 'src-line'} d={`M182 ${y + 12 + r * 8} h${[26, 30, 18][r]}`} />
            ))}
          </g>
        ))}
        <text x="4" y="222" className="viz-log">
          claim {String(active + 1).padStart(2, '0')} → <tspan className="hi">source {'ABC'[src]} ¶{paraOf[active] + 1}</tspan>
        </text>
      </svg>
    </div>
  );
}

// MARi: slide across to add workers; the multi-GB job's runtime falls from 17h toward 30m.
function Lanes() {
  const [pos, bind] = useScrub();
  const n = pos === null ? 23 : 1 + Math.round(pos.u * 22);
  const hours = 17 * Math.pow(0.5 / 17, (n - 1) / 22); // interpolated between the two measured runs
  const eta = hours >= 1 ? `${hours.toFixed(1)}h` : `${Math.round(hours * 60)}m`;
  return (
    <div className="lanes" data-cursor="workers" data-cursor-tag {...bind}>
      <span className="lanes-label">serial · 17h</span>
      <div className="lane slow"><i /></div>
      <span className="lanes-label">{n} worker{n > 1 ? 's' : ''} · ~{eta}</span>
      {Array.from({ length: 23 }, (_, i) => {
        const r = seeded(i + 40);
        return (
          <div key={i} className={i < n ? 'lane' : 'lane idle'} style={{ '--d': `${1.1 + r() * 0.7}s`, '--o': r() } as React.CSSProperties}>
            <i />
          </div>
        );
      })}
    </div>
  );
}

// IQ Spectra: pages are keyed by content hash; unchanged pages skip the parser. Hover to edit pages.
const knownPages = ['a3f9', '0c1e', '77b2', 'e4d0', '19aa', 'c58f'];

function CacheFlow() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const hovering = useRef(false);
  const [items, setItems] = useState<{ id: number; hash: string; hit: boolean }[]>([]);
  const [stats, setStats] = useState({ hit: 0, miss: 0 });
  useEffect(() => {
    if (reducedMotion()) return;
    const cache = new Set<string>();
    let id = 0;
    const t = window.setInterval(() => {
      const edited = hovering.current || Math.random() < 0.12;
      const hash = edited ? Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0') : knownPages[id % knownPages.length];
      const hit = cache.has(hash);
      cache.add(hash);
      id += 1;
      setItems((list) => [...list.slice(-5), { id, hash, hit }]);
      setStats((st) => (hit ? { ...st, hit: st.hit + 1 } : { ...st, miss: st.miss + 1 }));
    }, 700);
    return () => window.clearInterval(t);
  }, []);
  const total = stats.hit + stats.miss || 1;
  return (
    <div className="viz" data-cursor="edit" data-cursor-tag onPointerEnter={() => { hovering.current = true; }} onPointerLeave={() => { hovering.current = false; }}>
      <svg ref={svg} viewBox="0 0 300 180" aria-hidden="true">
        <path className="track" d="M8 84 H96 L124 34 H292" />
        <path className="track" d="M96 84 L124 134 H292" />
        <rect className="decide" x="86" y="74" width="20" height="20" rx="3" transform="rotate(45 96 84)" />
        <text x="96" y="122" className="viz-note mid">seen?</text>
        <text x="292" y="22" className="viz-note end">hit · skip parse</text>
        <rect className="parser" x="164" y="120" width="72" height="28" rx="4" />
        <text x="200" y="138" className="viz-note mid">parser</text>
        <AnimatePresence initial={false}>
          {items.map((it) => (
            <motion.g
              key={it.id}
              className={it.hit ? 'page hit' : 'page'}
              initial={{ x: 8, y: 84, opacity: 0 }}
              animate={it.hit
                ? { x: [8, 96, 124, 292], y: [84, 84, 34, 34], opacity: [0, 1, 1, 0] }
                : { x: [8, 96, 124, 200, 200, 292], y: [84, 84, 134, 134, 134, 134], opacity: [0, 1, 1, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: it.hit ? 1.4 : 2.6, ease: 'linear' }}
            >
              <rect x="-8" y="-10" width="16" height="20" rx="2" />
              <text y="-15" className="mid">{it.hash}</text>
            </motion.g>
          ))}
        </AnimatePresence>
        <text x="8" y="174" className="viz-log">
          hit <tspan className="hi">{Math.round((stats.hit / total) * 100)}%</tspan> · parsed {stats.miss} · skipped {stats.hit}
        </text>
      </svg>
    </div>
  );
}

// SVG text scales with its drawing; this pins it to real pixels so every label matches the type scale.
function useTextScale(ref: React.RefObject<SVGSVGElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const vb = el.viewBox.baseVal;
      const scale = Math.min(el.clientWidth / vb.width, el.clientHeight / vb.height) || 1;
      el.style.setProperty('--u', String(1 / scale));
    };
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
}

// Pointer position across a visual, 0..1 on each axis (mouse only; touch keeps the autoplay).
function useScrub() {
  const [pos, setPos] = useState<{ u: number; v: number } | null>(null);
  const bind = {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      const clamp = (n: number) => Math.min(1, Math.max(0, n));
      setPos({ u: clamp((e.clientX - r.left) / r.width), v: clamp((e.clientY - r.top) / r.height) });
    },
    onPointerLeave: () => setPos(null),
  };
  return [pos, bind] as const;
}

// Advances 0..steps-1 on a timer while nobody is scrubbing.
function useAutoplay(steps: number, ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setN((v) => (v + 1) % steps), ms);
    return () => window.clearInterval(id);
  }, [steps, ms]);
  return n;
}

// CAD: nudge the cover; the bolt holes either line up with the housing bores or they don't.
const bores = [-105, -35, 35, 105];

function CadCheck() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const [pos, bind] = useScrub();
  const raw = pos === null ? 0 : (pos.u - 0.5) * 80;
  const dx = Math.abs(raw) < 5 ? 0 : raw; // inside tolerance it seats
  const pass = dx === 0;
  return (
    <div className="viz" data-cursor="nudge" data-cursor-tag {...bind}>
      <svg ref={svg} viewBox="0 0 400 200" aria-hidden="true">
        {bores.map((b) => <line key={b} className="axis" x1={200 + b} x2={200 + b} y1="44" y2="168" />)}
        <g className="cad-housing">
          <rect x="56" y="108" width="288" height="48" rx="4" />
          {bores.map((b) => <rect key={b} className="bore" x={194 + b} y="108" width="12" height="26" />)}
        </g>
        <g className="cad-cover" style={{ transform: `translateX(${dx}px)` }}>
          <rect x="68" y="82" width="264" height="24" rx="3" />
          {bores.map((b) => <rect key={b} className="bore" x={194 + b} y="82" width="12" height="24" />)}
        </g>
        {bores.map((b) => (
          <text key={b} x={200 + b} y="34" className={`cad-mark ${pass ? 'ok' : 'bad'}`}>{pass ? '✓' : '×'}</text>
        ))}
        <text x="56" y="190" className="viz-log">
          fastener_alignment  <tspan className={pass ? 'ok' : 'bad'}>{pass ? 'PASS 4/4' : 'FAIL 0/4'}</tspan>
          {pass ? '' : `  Δx ${(dx / 4).toFixed(1)} mm`}
        </text>
      </svg>
    </div>
  );
}

// Beam: each market peaks in its own local evening; the beam goes wherever power is worth most.
const markets = [['CAISO', -8, 54], ['ERCOT', -6, 148], ['NYISO', -5, 252], ['OMIE', 1, 346]] as const;
const groundY = (x: number) => { const t = (x - 10) / 380; return 170 - 224 * t * (1 - t); }; // the Q-curve below
const price = (utc: number, tz: number) => {
  const h = (((utc + tz) % 24) + 24) % 24;
  return 0.18 + 0.8 * Math.exp(-((h - 19) ** 2) / 6) + 0.3 * Math.exp(-((h - 8) ** 2) / 5);
};

function BeamSteer() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const [pos, bind] = useScrub();
  const auto = useAutoplay(24, 650);
  const hour = pos === null ? auto : Math.min(23, Math.floor(pos.u * 24));
  const p = markets.map(([, tz]) => price(hour, tz));
  const best = p.indexOf(Math.max(...p));
  const bx = markets[best][2];
  return (
    <div className="viz" data-cursor="scrub" data-cursor-tag {...bind}>
      <svg ref={svg} viewBox="0 0 400 200" aria-hidden="true">
        <polygon className="beam" points={`200,34 ${bx - 16},${groundY(bx) - 4} ${bx + 16},${groundY(bx) - 4}`} />
        <path className="earth" d="M10 170 Q200 58 390 170" />
        <g className="sat">
          <rect x="192" y="20" width="16" height="14" rx="2" />
          <path d="M166 27 h24 M210 27 h24" />
        </g>
        {markets.map(([name], i) => {
          const gy = groundY(markets[i][2]);
          const x = markets[i][2];
          return (
            <g key={name} className={i === best ? 'market on' : 'market'}>
              <rect className="bar" x={x - 5} y={gy - 12 - p[i] * 56} width="10" height={p[i] * 56} rx="2" />
              <path className="rectenna" d={`M${x - 12} ${gy - 2} q12 -8 24 0`} />
              <text x={x} y={gy + 16}>{name}</text>
            </g>
          );
        })}
        <text x="10" y="196" className="viz-log">
          {String(hour).padStart(2, '0')}:00 UTC → <tspan className="hi">{markets[best][0]}</tspan>  · price shape schematic
        </text>
      </svg>
    </div>
  );
}

// Curriculum: the policy's embedding norm leaves the surrogate's training band and crosses the OOD gate.
const normAt = (s: number) => 8 + 37 * Math.pow(s, 1.25); // schematic, crosses 45 at ~1.0M as in seed 0
const px = (s: number) => 44 + (s / 2) * 340;
const py = (n: number) => 160 - (n / 100) * 136;
const normPath = Array.from({ length: 41 }, (_, i) => {
  const s = (i / 40) * 2;
  return `${i ? 'L' : 'M'}${px(s).toFixed(1)} ${py(normAt(s)).toFixed(1)}`;
}).join(' ');

function NormPlot() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const [pos, bind] = useScrub();
  const auto = useAutoplay(50, 140);
  const s = pos === null ? (auto / 49) * 2 : pos.u * 2;
  const n = normAt(s);
  const ood = n > 45;
  return (
    <div className="viz" data-cursor="scrub" data-cursor-tag {...bind}>
      <svg ref={svg} viewBox="0 0 400 200" aria-hidden="true">
        <rect className="band" x="44" y={py(17)} width="340" height={py(6) - py(17)} />
        <text x="50" y={py(17) - 5} className="viz-note">surrogate trained here (6–17)</text>
        <line className="gate" x1="44" x2="384" y1={py(45)} y2={py(45)} />
        <text x="380" y={py(45) - 6} className="viz-note end">OOD gate · 45</text>
        <path className="axis-line" d="M44 24 V160 H384" />
        <path className="norm" d={normPath} />
        <line className="scrub" x1={px(s)} x2={px(s)} y1="24" y2="160" />
        <circle className={ood ? 'probe bad' : 'probe'} cx={px(s)} cy={py(n)} r="5" />
        <text x="44" y="178" className="viz-note">0</text>
        <text x="384" y="178" className="viz-note end">2M steps</text>
        <text x="44" y="196" className="viz-log">
          {s.toFixed(1)}M · ‖e‖ {Math.round(n)} · <tspan className={ood ? 'bad' : 'hi'}>{ood ? 'OOD → uniform' : 'curriculum on'}</tspan>
        </text>
      </svg>
    </div>
  );
}

// BrainAgent: your own screen changes feed the capture clock; still frames dedupe before OCR.
function BrainClocks() {
  const svg = useRef<SVGSVGElement>(null);
  useTextScale(svg);
  const [frames, setFrames] = useState<{ id: number; dup: boolean }[]>([]);
  const [stats, setStats] = useState({ ocr: 0, dup: 0 });
  const [rank, setRank] = useState([0.92, 0.6, 0.34]);
  useEffect(() => {
    if (reducedMotion()) return;
    let id = 0;
    let last = { x: pointer.x, y: pointer.y, s: window.scrollY };
    const capture = window.setInterval(() => {
      const moved = pointer.x !== last.x || pointer.y !== last.y || window.scrollY !== last.s;
      last = { x: pointer.x, y: pointer.y, s: window.scrollY };
      const dup = pointer.active ? !moved : Math.random() < 0.6;
      id += 1;
      setFrames((f) => [...f.slice(-5), { id, dup }]);
      setStats((st) => (dup ? { ...st, dup: st.dup + 1 } : { ...st, ocr: st.ocr + 1 }));
    }, 480);
    const ranking = window.setInterval(() => {
      setRank([0.55 + Math.random() * 0.4, 0.3 + Math.random() * 0.3, 0.12 + Math.random() * 0.2]);
    }, 6000);
    return () => { window.clearInterval(capture); window.clearInterval(ranking); };
  }, []);
  return (
    <div className="viz" data-cursor="move" data-cursor-tag>
      <svg ref={svg} viewBox="0 0 400 200" aria-hidden="true">
        <rect className="screen-box" x="14" y="44" width="78" height="62" rx="5" />
        <path className="screen-txt" d="M24 60 h50 M24 72 h40 M24 84 h56 M24 96 h30" />
        <text x="14" y="124" className="viz-note">capture · OCR</text>
        <AnimatePresence initial={false}>
          {frames.map((f) => (
            <motion.g
              key={f.id}
              className={f.dup ? 'frame dup' : 'frame'}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: f.dup ? 46 : 92, opacity: f.dup ? 0.45 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            >
              <rect x="96" y="68" width="16" height="12" rx="2" />
              {f.dup && <path d="M96 80 L112 68" />}
            </motion.g>
          ))}
        </AnimatePresence>
        <g className="db">
          <path d="M196 56 v44 a22 7 0 0 0 44 0 v-44" />
          <ellipse cx="218" cy="56" rx="22" ry="7" />
        </g>
        <text x="218" y="124" className="viz-note mid">sqlite</text>
        <circle className="dial" cx="292" cy="78" r="24" />
        <line className="hand" x1="292" y1="78" x2="292" y2="58" />
        <text x="292" y="124" className="viz-note mid">rank / 4 h</text>
        {rank.map((w, i) => (
          <rect key={i} className={i === 0 ? 'digest top' : 'digest'} x="330" y={58 + i * 14} width={w * 58} height="8" rx="2" />
        ))}
        <text x="330" y="124" className="viz-note">digest</text>
        <text x="14" y="190" className="viz-log">
          ocr {stats.ocr} · dup {stats.dup} · <tspan className="hi">net 0</tspan>
        </text>
      </svg>
    </div>
  );
}

function Debate() {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const [r, setR] = useState(0);
  const [agree, setAgree] = useState(() => Math.round(6 * lens(2 * debate.sep)));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setR(Math.min(el.clientWidth, el.clientHeight) * 0.42));
    ro.observe(el);
    let raf = 0;
    const t0 = performance.now();
    const idle = (t: number) => {
      if (!hovering.current) {
        debate.sep = 0.55 + 0.3 * Math.sin((t - t0) / 1500);
        setAgree(Math.round(6 * lens(2 * debate.sep)));
      }
      raf = requestAnimationFrame(idle);
    };
    if (!reducedMotion()) raf = requestAnimationFrame(idle);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      className="debate"
      data-cursor="pull" data-cursor-tag
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        hovering.current = true;
        const b = e.currentTarget.getBoundingClientRect();
        debate.sep = 0.12 + Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)) * 0.9;
        setAgree(Math.round(6 * lens(2 * debate.sep)));
      }}
      onPointerLeave={() => { hovering.current = false; }}
    >
      <Halftone field={debateField} step={8} reach={90} live />
      <span className="debate-a" style={{ left: `calc(50% - ${r}px)` }}>pro</span>
      <span className="debate-b" style={{ left: `calc(50% + ${r}px)` }}>con</span>
      <span className="viz-log debate-log">agree {agree} · disagree {6 - agree} → <b>surfaced first</b></span>
    </div>
  );
}

function Sticker() {
  return (
    <div className="sticker" aria-label="1st of 50+ teams at the Claude Buildathon">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><path id="ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
        <text><textPath href="#ring" textLength="236" lengthAdjust="spacing">1ST OF 50+ TEAMS · CLAUDE BUILDATHON ·</textPath></text>
      </svg>
      <strong>1st</strong>
    </div>
  );
}

// Measured results, read like an instrument panel.
function Readout({ items }: { items: [string, string][] }) {
  return (
    <dl className="readout">
      {items.map(([value, unit]) => <div key={unit}><dt>{unit}</dt><dd>{value}</dd></div>)}
    </dl>
  );
}

function Face({ card }: { card: CardData }) {
  switch (card.id) {
    case 'crucible':
      return (
        <>
          <h3>Crucible</h3>
          <p className="lede">Two agents argue. You get the <em>disagreement,</em> not just an answer.</p>
          <Debate />
          <Sticker />
          <span className="card-foot">Apr 2026 · Claude Buildathon · Python</span>
        </>
      );
    case 'apple':
      return (
        <>
          <h3>Apple</h3>
          <p className="lede">Localizes entire screens and marketing assets, with GenAI inside <em>production</em> workflows.</p>
          <Screens />
          <Readout items={[['37', 'locales'], ['200+', 'designers']]} />
          <span className="card-foot">Jun – Sep 2026 · Sunnyvale</span>
        </>
      );
    case 'iq':
      return (
        <>
          <h3>IQ Spectra</h3>
          <p className="lede">A parser cache re-keyed on <em>content hash,</em> and a leak hunted down in GDB.</p>
          <CacheFlow />
          <Readout items={[['−34%', 'runtime'], ['10k+', 'sources']]} />
          <span className="card-foot">Mar 2023 – Apr 2025 · C/C++</span>
        </>
      );
    case 'frc':
      return (
        <>
          <h3>FRC 346 robot</h3>
          <p className="lede">Sole software lead for <em>four seasons:</em> state machines, autonomy, sensor fusion.</p>
          <Robot />
          <Readout items={[['50 Hz', 'control loop'], ['20 ms', 'cycle budget'], ['3', 'fused sensors']]} />
          <span className="card-foot">4 seasons · Java</span>
        </>
      );
    case 'mari':
      return (
        <>
          <h3>MARi</h3>
          <p className="lede">One job split across <em>23 workers,</em> and the eval harness that caught an injection.</p>
          <Lanes />
          <Readout items={[['17h → 30m', 'runtime'], ['22/23', 'evals']]} />
          <span className="card-foot">Jun – Aug 2025</span>
        </>
      );
    case 'sago':
      return (
        <>
          <h3>Sago</h3>
          <p className="lede">Investment briefs where <em>every claim</em> resolves to a source.</p>
          <Brief />
          <Readout items={[['Live', 'in deal meetings'], ['E2E', 'service owner']]} />
          <span className="card-foot"><i className="live" aria-hidden="true" />Jan 2026 – now</span>
        </>
      );
    case 'cad':
      return (
        <>
          <h3>CAD interface checks</h3>
          <p className="lede">An agent edits a part. Nothing checks it still fits. <em>This does.</em></p>
          <CadCheck />
          <Readout items={[['42% → 8%', 'run-to-run reversals'], ['24/24', 'broken parts caught']]} />
          <span className="card-foot">2026 · Python · OpenCascade</span>
        </>
      );
    case 'beam':
      return (
        <>
          <h3>Beam, wire, or battery?</h3>
          <p className="lede">What a steerable space solar beam is worth, priced on <em>real</em> power markets.</p>
          <BeamSteer />
          <Readout items={[['+16–39%', 'value of steering'], ['6', 'power markets']]} />
          <span className="card-foot">2026 · Paper + explorer</span>
        </>
      );
    case 'curriculum':
      return (
        <>
          <h3>Stale curricula</h3>
          <p className="lede">A learned RL curriculum, and an honest <em>negative result.</em></p>
          <NormPlot />
          <Readout items={[['1880 vs 2200', 'mean reward vs uniform'], ['2M', 'env steps']]} />
          <span className="card-foot">Oct 2026 · PPO · HalfCheetah</span>
        </>
      );
    case 'brain':
      return (
        <>
          <h3>BrainAgent</h3>
          <p className="lede">Reads your screen and ranks what matters, <em>entirely on-device.</em></p>
          <BrainClocks />
          <Readout items={[['0', 'network calls'], ['4 h', 'digest cadence']]} />
          <span className="card-foot">2026 · Swift · ScreenCaptureKit</span>
        </>
      );
    default:
      return null;
  }
}

// Color is information: hue = the card's first topic; projects are solid, work is tinted.
const hue: Record<Topic, string> = { ai: 'cobalt', systems: 'signal', robots: 'ink' };
const toneOf = (c: CardData) =>
  c.kind === 'project' ? `t-${hue[c.topics[0]]}` : `t-${hue[c.topics[0]]}-tint`;

/* ---------------------------------------------------------------- cards + deal */

type Deal = { dx: number; dy: number; r: number; s: number; delay: number };

type CardProps = {
  card: CardData;
  deal: Deal | null | undefined;
  wobble: MotionValue<number>;
  onOpen: (card: CardData, e: React.MouseEvent | React.KeyboardEvent) => void;
};

// forwardRef: AnimatePresence's popLayout measures the slot it pops out.
const CardItem = forwardRef<HTMLLIElement, CardProps>(function CardItem({ card, deal, wobble, onOpen }, slotRef) {
  const ref = useRef<HTMLDivElement>(null);
  const [lean] = useState(() => {
    const seed = seeded(hash(card.id));
    return { r: (seed() - 0.5) * 2, y: 0.4 + seed() };
  });
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const dr = useMotionValue(0);
  const ds = useMotionValue(1);
  const op = useMotionValue(deal === undefined ? 0 : 1);
  const rotate = useTransform([dr, wobble], ([r, w]: number[]) => r + w * lean.r * 5);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const dragTilt = useSpring(useTransform(useVelocity(dragX), [-1600, 1600], [-12, 12], { clamp: true }), { stiffness: 300, damping: 30 });
  const dragged = useRef(false);
  const y = useTransform([dy, wobble], ([d, w]: number[]) => d + w * lean.y * -26);

  useEffect(() => {
    if (deal === undefined) return; // not measured yet
    if (deal === null) { op.set(1); return; }
    dx.set(deal.dx); dy.set(deal.dy); dr.set(deal.r); ds.set(deal.s);
    const go = (spring: { type: 'spring'; stiffness: number; damping: number; delay?: number }) => {
      animate(dx, 0, spring);
      animate(dy, 0, spring);
      animate(dr, 0, spring);
      animate(ds, 1, spring);
    };
    if (deal.delay >= 0) {
      op.set(1);
      go({ type: 'spring', stiffness: 110, damping: 17, delay: deal.delay });
      return;
    }
    // below the fold: toss onto the table when it scrolls into view
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      animate(op, 1, { duration: 0.2 });
      go({ type: 'spring', stiffness: 140, damping: 16 });
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [deal, dx, dy, dr, ds, op]);

  const target = Boolean(card.detail);
  const openTarget = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (dragged.current) return;
    if (target) onOpen(card, e);
  };

  return (
    <motion.li
      ref={slotRef}
      layout
      className={`slot size-${card.size}`}
      style={{ x: dragX, y: dragY, rotate: dragTilt }}
      drag={!reducedMotion()}
      dragSnapToOrigin
      dragElastic={0.55}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
      whileDrag={{ scale: 1.05, zIndex: 30 }}
      onPointerDown={() => { dragged.current = false; }}
      onDragStart={() => { dragged.current = true; }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.35 } }}
      transition={{ type: 'spring', stiffness: 170, damping: 22 }}
    >
      <motion.div ref={ref} className="deal" style={{ x: dx, y, rotate, scale: ds, opacity: op }}>
        <div
          className={`card ${toneOf(card)} kind-${card.kind}`}
          data-id={card.id}
          data-cursor={target ? 'open' : undefined}
          role={target ? 'button' : undefined}
          tabIndex={target ? 0 : undefined}
          onClick={openTarget}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openTarget(e);
            }
          }}
        >
          <span className="vlabel">{card.topics.map((t) => topicWord[t]).join(' · ')}</span>
          <div className="card-body"><Face card={card} /></div>
          {target && <span className="card-arrow" aria-hidden="true">↗</span>}
        </div>
      </motion.div>
    </motion.li>
  );
});

const topicWord = Object.fromEntries(topics.map((t) => [t.id, t.word])) as Record<Topic, string>;

function Grid({ filter, onOpen }: {
  filter: Topic | 'all';
  onOpen: (c: CardData, e: React.MouseEvent | React.KeyboardEvent) => void;
}) {
  const list = cards.filter((c) => filter === 'all' || c.topics.includes(filter));
  const gridRef = useRef<HTMLElement>(null);
  const [deals, setDeals] = useState<Record<string, Deal | null> | null>(null);

  // Scroll velocity → shared wobble, so cards lean and lag like paper on a table.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const springy = useSpring(velocity, { stiffness: 140, damping: 26 });
  const wobble = useTransform(springy, [-2500, 0, 2500], [-1, 0, 1], { clamp: true });
  const still = useMotionValue(0);

  // Measure slots once, then deal the visible cards from a pile in the middle of the screen.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (reducedMotion()) {
      setDeals(Object.fromEntries(cards.map((c) => [c.id, null])));
      return;
    }
    const pileX = window.innerWidth / 2;
    const pileY = window.innerHeight * 0.96;
    const next: Record<string, Deal> = {};
    let order = 0;
    grid.querySelectorAll<HTMLElement>('.card').forEach((el) => {
      const id = el.dataset.id!;
      const r = el.getBoundingClientRect();
      const rand = seeded(hash(id) + 11);
      if (r.top < window.innerHeight * 1.05) {
        next[id] = {
          dx: pileX - (r.left + r.width / 2) + (rand() - 0.5) * 80,
          dy: pileY - (r.top + r.height / 2) + (rand() - 0.5) * 40,
          r: (rand() - 0.5) * 30,
          s: Math.min(1, 240 / r.width),
          delay: 1.15 + order++ * 0.075,
        };
      } else {
        next[id] = { dx: (rand() - 0.5) * 90, dy: -180, r: (rand() - 0.5) * 22, s: 1.04, delay: -1 };
      }
    });
    setDeals(next);
  }, []);

  return (
    <section
      ref={gridRef}
      className="table"
      id="work"
      aria-label="Work, projects and results"
    >
      <div className="rules" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <motion.i
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.1 + i * 0.06, ease: [0.3, 0.7, 0.2, 1] }}
          />
        ))}
      </div>
      {sections.map((sec, n) => {
        const items = list.filter((c) => c.kind === sec.kind);
        return (
          <div className="group" key={sec.kind}>
            <header className="group-head">
              <span className="group-index">{String(n + 1).padStart(2, '0')}</span>
              <h2>{sec.title}</h2>
              <span className="group-aside">{sec.aside}</span>
              <span className="group-count">{String(items.length).padStart(2, '0')}</span>
            </header>
            <ol className="grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.map((card) => (
                  <CardItem
                    key={card.id}
                    card={card}
                    deal={deals ? deals[card.id] : undefined}
                    wobble={reducedMotion() ? still : wobble}
                    onOpen={onOpen}
                  />
                ))}
              </AnimatePresence>
            </ol>
            {items.length === 0 && <p className="group-empty">Nothing here is tagged {topicWord[filter as Topic]}, yet.</p>}
          </div>
        );
      })}
    </section>
  );
}

/* ---------------------------------------------------------------- detail sheet */

function Sheet({ card, origin, onClose }: { card: CardData; origin: { x: number; y: number }; onClose: () => void }) {
  const d = card.detail!;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const at = `${origin.x}px ${origin.y}px`;
  return (
    <motion.div
      className={`sheet ${toneOf(card)}`}
      role="dialog"
      aria-modal="true"
      aria-label={d.heading}
      initial={{ clipPath: `circle(0px at ${at})` }}
      animate={{ clipPath: `circle(150vmax at ${at})` }}
      exit={{ clipPath: `circle(0px at ${at})` }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
    >
      <Halftone className="sheet-field" field={cornerField} step={13} reach={220} />
      <button className="pill close" onClick={onClose} data-cursor="close" autoFocus>Close ✕</button>
      <motion.div
        className="sheet-inner"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="vlabel static">{card.label}</span>
        <h2>{d.heading}</h2>
        <ul className="sheet-meta">{d.meta.map((m) => <li key={m}>{m}</li>)}</ul>
        <ol className="sheet-points">
          {d.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
            >
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{b}</span>
            </motion.li>
          ))}
        </ol>
        {d.link && (
          <a className="pill solid" href={d.link.href} target="_blank" rel="noreferrer" data-cursor="code">
            {d.link.label} ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- about + footer */

const aboutEdge = tornEdge(42);

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-2.5, 0]);

  return (
    <motion.section
      ref={ref}
      className="about t-cobalt"
      id="about"
      style={{ y, rotate: tilt, clipPath: aboutEdge }}
    >
      <div className="about-head">
        <span className="vlabel static">About</span>
        <h2>A bit <em>about me.</em></h2>
        <p>
          I study Computer Science with a Statistics minor at Stanford. I like systems, AI tooling,
          and hardware, especially when there’s a real technical puzzle hiding inside. Offline:
          hiking, reading, <em>lifting.</em>
        </p>
        <span className="about-meta">B.S. Computer Science · Class of 2029 · GPA 3.66</span>
      </div>
      <div className="about-cols">
        <div>
          <h4>Coursework <span className="legend"><i className="live" aria-hidden="true" />this term</span></h4>
          <ul>
            {[...thisTerm, ...coursework].map((c) => {
              const [code, title] = c.split(' — ');
              return <li key={c}><b>{code}</b><span>{title}{thisTerm.includes(c) && <i className="live" aria-label="this term" />}</span></li>;
            })}
          </ul>
        </div>
        <div>
          <h4>Toolkit</h4>
          <dl>
            {skills.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}

function Magnetic({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      className={className}
      href={href}
      style={{ x, y }}
      data-cursor="mail"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="footer t-ink">
      <div className="footer-top">
        <p className="footer-lead">
          <em>Building something cool?</em><br />
          I’d love to chat.
        </p>
        <Magnetic className="pill big" href={`mailto:${EMAIL}`}>{EMAIL} →</Magnetic>
      </div>
      <Halftone className="footer-glyph" text="KG" step={10} reach={160} />
      <div className="footer-bottom">
        <nav>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={RESUME} target="_blank" rel="noreferrer">Résumé</a>
        </nav>
        <span>© {new Date().getFullYear()} Kartikeya Goel · Stanford, CA · <em>(try your cursor on the dots)</em></span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- app */

function App() {
  const [filter, setFilter] = useState<Topic | 'all'>('all');
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState<{ card: CardData; origin: { x: number; y: number } } | null>(null);

  useEffect(() => {
    console.log(
      '%cHi, fellow engineer.%c\nThe source for this site is at github.com/KartikeyaGoel/portfolio, or just say hi: kartgoel@stanford.edu',
      'font: 700 16px sans-serif; color: #2c46f5',
      'font: 13px sans-serif',
    );
    const title = document.title;
    const onVis = () => { document.title = document.hidden ? 'The cards miss you ↩' : title; };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  const count = filter === 'all' ? cards.length : cards.filter((c) => c.topics.includes(filter)).length;

  const open = useCallback((card: CardData, e: React.MouseEvent | React.KeyboardEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const m = 'clientX' in e && e.clientX ? e : null;
    setSheet({ card, origin: { x: m ? m.clientX : r.left + r.width / 2, y: m ? m.clientY : r.top + r.height / 2 } });
  }, []);
  const closeSheet = useCallback(() => setSheet(null), []);
  const closeMenu = useCallback(() => setMenu(false), []);

  return (
    <>
      <Cursor />
      <Header onMenu={() => setMenu(true)} />
      <main>
        <Hero filter={filter} setFilter={setFilter} count={count} />
        <Grid filter={filter} onOpen={open} />
        <About />
      </main>
      <Footer />
      <AnimatePresence>{menu && <Menu onClose={closeMenu} />}</AnimatePresence>
      <AnimatePresence>
        {sheet && <Sheet key={sheet.card.id} card={sheet.card} origin={sheet.origin} onClose={closeSheet} />}
      </AnimatePresence>
    </>
  );
}

export default App;
