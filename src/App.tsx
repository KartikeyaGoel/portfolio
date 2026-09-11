import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Plane,
} from 'lucide-react';
import './index.css';

const experiences = [
  {
    company: 'Apple',
    role: 'Software Engineering Intern, Marketing Communications',
    period: 'Jun 2026 — Present',
    location: 'Sunnyvale, CA',
    index: '01',
    summary: 'Building internal GenAI tooling that fits production screen workflows—not another chat box.',
    details: [
      'Wrap model calls in deterministic pre- and post-processing so outputs are schema-validated before entering production.',
      'Shipped an end-to-end localization tool replacing a manual per-screen process across 37 locales, now used by 50+ designers and producers.',
    ],
  },
  {
    company: 'Sago',
    role: 'Software Engineering Intern',
    period: 'Jan 2026 — Present',
    location: 'Remote',
    index: '02',
    summary: 'Owning an investment brief system from data ingestion through live, cited conversation.',
    details: [
      'Built a service that ingests company and market data, drafts structured briefs, and serves them as conversational reports in deal meetings.',
      'Built the retrieval and citation layer so every generated claim resolves to a source document.',
    ],
  },
  {
    company: 'MARi',
    role: 'Software Engineering Intern',
    period: 'Jun 2025 — Aug 2025',
    location: 'Remote',
    index: '03',
    summary: 'Made an automated decisioning pipeline measurable, then made it dramatically more reliable.',
    details: [
      'Built the internal evaluation harness and identified a prompt-injection failure mode.',
      'Raised pass rate from 23% to 95% on a 37-case suite and cut a multi-GB processing job from 17 hours to 30 minutes.',
    ],
  },
  {
    company: 'IQ Spectra',
    role: 'Software Engineering Intern',
    period: 'Mar 2023 — Apr 2025',
    location: 'Remote',
    index: '04',
    summary: 'Built resilient web automation and profiled systems until the bottlenecks gave way.',
    details: [
      'Extracted and normalized data across 10,000+ sources while handling pagination, rate limits, and inconsistent markup.',
      'Cut runtime 34%, roughly halved peak memory, and traced a parser memory leak with Valgrind and GDB.',
    ],
  },
];

const skillGroups = [
  ['Languages', 'Java · Python · C++ · Bash · C# · TypeScript'],
  ['Systems', 'Real-time control · Concurrency · State machines · Performance profiling'],
  ['Data + Infra', 'PostgreSQL · SQLite · Docker · Linux · AWS · Google Cloud'],
  ['AI + ML', 'PyTorch · scikit-learn · RAG · Multi-agent systems · Evaluation'],
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    ref.current.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={trackPointer} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Kartikeya Goel, home">
        KG<span>/26</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
      </nav>

      <div className="nav-actions">
        <a
          className="nav-social"
          href="https://github.com/KartikeyaGoel"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github size={15} />
        </a>
        <a
          className="nav-social"
          href="https://linkedin.com/in/kartgoel"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin size={15} />
        </a>
        <a className="nav-resume" href="/Kartikeya-Goel-Resume.pdf" target="_blank" rel="noreferrer">
          Resume <ArrowUpRight size={14} />
        </a>
      </div>

      <button
        className="menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {['Work', 'Experience', 'About'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
              >
                <span>0{index + 1}</span>{item}
              </motion.a>
            ))}
            <a className="mobile-resume" href="/Kartikeya-Goel-Resume.pdf" target="_blank" rel="noreferrer">
              Open résumé <ArrowUpRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 20 });
  const cardX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    mouseX.set(event.clientX / window.innerWidth - 0.5);
    mouseY.set(event.clientY / window.innerHeight - 0.5);
  };

  return (
    <section id="top" className="hero" onPointerMove={handlePointer}>
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.12 }}
      >
        <motion.div variants={reveal}>
          <Eyebrow>Software engineer · Stanford, CA</Eyebrow>
        </motion.div>
        <motion.h1 variants={reveal}>
          Software, systems,
          <span>&amp; other rabbit holes.</span>
        </motion.h1>
        <motion.div className="hero-bottom" variants={reveal}>
          <p>
            I’m Kartikeya. I study CS at Stanford and spend most of my time building production
            AI, systems, and robots. Currently at Apple.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              See what I’ve built <ArrowDown size={17} />
            </a>
            <a className="text-link" href="mailto:kartgoel@stanford.edu">
              kartgoel@stanford.edu <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero-object" style={{ x: cardX, y: cardY }} aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="core">
          <span className="core-label">FOCUS</span>
          <strong>Systems<br />× AI</strong>
          <span className="core-status"><i /> Building now</span>
        </div>
        <span className="orbit-tag tag-one">Reliability</span>
        <span className="orbit-tag tag-two">Performance</span>
        <span className="orbit-tag tag-three">Tooling</span>
      </motion.div>

      <div className="hero-index" aria-hidden="true">KG—01</div>
    </section>
  );
}

function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const impacts = [
    {
      company: 'Apple',
      title: 'Localization tooling',
      copy: 'Replaced a manual, per-screen workflow with one production tool for designers and producers.',
      range: [0, 0.04, 0.2, 0.27],
      visual: 'locales',
    },
    {
      company: 'MARi',
      title: 'Evaluation harness',
      copy: 'Found a prompt-injection failure mode and made an automated decisioning pipeline measurable.',
      range: [0.22, 0.29, 0.45, 0.52],
      visual: 'reliability',
    },
    {
      company: 'MARi',
      title: 'Parallel processing',
      copy: 'Reworked a Python pipeline so multi-gigabyte inputs could move concurrently instead of serially.',
      range: [0.47, 0.54, 0.7, 0.77],
      visual: 'speed',
    },
    {
      company: 'IQ Spectra',
      title: 'Web automation',
      copy: 'Built resilient extraction across pagination, rate limits, changing pages, and inconsistent markup.',
      range: [0.72, 0.79, 0.96, 1],
      visual: 'sources',
    },
  ];

  return (
    <section
      ref={ref}
      className={`impact-section ${reduceMotion ? 'reduce-motion' : ''}`}
      aria-label="Selected engineering work"
    >
      <div className="impact-sticky">
        <div className="impact-topline">
          <span>Selected engineering work</span>
          <span>Scroll through</span>
        </div>

        <div className="impact-slides">
          {impacts.map((impact) => (
            <ImpactSlide
              key={`${impact.company}-${impact.title}`}
              {...impact}
              progress={scrollYProgress}
              staticMode={Boolean(reduceMotion)}
            />
          ))}
        </div>

        <div className="impact-rail" aria-hidden="true">
          <motion.span style={{ height: progressHeight }} />
        </div>
        <div className="impact-scroll-note">Keep scrolling</div>
      </div>
    </section>
  );
}

function ImpactSlide({
  company,
  title,
  copy,
  range,
  visual,
  progress,
  staticMode,
}: {
  company: string;
  title: string;
  copy: string;
  range: number[];
  visual: string;
  progress: MotionValue<number>;
  staticMode: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [110, 0, 0, -110]);
  const scale = useTransform(progress, range, [0.82, 1, 1, 1.08]);
  const blur = useTransform(progress, range, [12, 0, 0, 12]);
  const filter = useTransform(blur, (amount) => `blur(${amount}px)`);

  return (
    <motion.article
      className="impact-slide"
      style={staticMode ? undefined : { opacity, y, scale, filter }}
    >
      <div className="impact-copy">
        <span className="impact-company">{company}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      <ImpactVisual type={visual} />
    </motion.article>
  );
}

function ImpactVisual({ type }: { type: string }) {
  if (type === 'locales') {
    return (
      <div className="impact-visual locale-visual" aria-hidden="true">
        <div className="globe-ring ring-a" />
        <div className="globe-ring ring-b" />
        <div className="globe-ring ring-c" />
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.i
            key={index}
            style={{ rotate: `${index * 30}deg` }}
            animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, delay: index * 0.12, repeat: Infinity }}
          />
        ))}
        <span>Locale-ready output</span>
      </div>
    );
  }

  if (type === 'reliability') {
    return (
      <div className="impact-visual reliability-visual" aria-hidden="true">
        <div className="gauge">
          <div><Check size={52} /><span>Validated</span></div>
        </div>
        <span className="gauge-before">Model<br /><strong>Output</strong></span>
        <span className="gauge-after">Schema<br /><strong>Checked</strong></span>
      </div>
    );
  }

  if (type === 'speed') {
    return (
      <div className="impact-visual speed-visual" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.i
            key={index}
            animate={{ x: ['-20%', '130%'], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2 + index * 0.08, delay: index * 0.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <div className="speed-chip chip-old">Serial</div>
        <motion.div
          className="speed-chip chip-new"
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Parallel
        </motion.div>
      </div>
    );
  }

  return (
    <div className="impact-visual sources-visual" aria-hidden="true">
      {Array.from({ length: 88 }).map((_, index) => (
        <motion.i
          key={index}
          animate={{ opacity: [0.16, index % 5 === 0 ? 1 : 0.5, 0.16] }}
          transition={{ duration: 2 + (index % 7) * 0.2, delay: (index % 11) * 0.08, repeat: Infinity }}
        />
      ))}
      <div className="source-scan" />
      <span>Normalized / indexed / cached</span>
    </div>
  );
}

function AgentDiagram() {
  return (
    <div className="agent-diagram" aria-label="Visualization of competing agents deliberating">
      <motion.div className="agent-node agent-a" animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        A<span>PRO</span>
      </motion.div>
      <motion.div className="agent-node agent-b" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
        B<span>CON</span>
      </motion.div>
      <svg viewBox="0 0 560 300" role="presentation">
        <motion.path
          d="M145 90 C235 90 215 155 280 155 C345 155 325 90 415 90"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        />
        <motion.path
          d="M145 220 C235 220 215 155 280 155 C345 155 325 220 415 220"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
        />
      </svg>
      <div className="decision-node">
        <Check size={20} />
        <span>Synthesized<br />recommendation</span>
      </div>
      <div className="diagram-caption"><span>01</span> Deliberation topology</div>
    </div>
  );
}

function RobotDiagram() {
  return (
    <div className="robot-diagram" aria-label="Visualization of an autonomous robot path">
      <svg viewBox="0 0 560 300" role="presentation">
        <defs>
          <pattern id="field-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" />
          </pattern>
        </defs>
        <rect width="560" height="300" fill="url(#field-grid)" />
        <motion.path
          className="route"
          d="M55 245 C120 210 105 104 205 112 S315 250 380 185 S425 45 510 62"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
      <motion.div
        className="robot"
        animate={{ rotate: [0, 8, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <span />
        <span />
      </motion.div>
      <div className="coordinate coord-a">x 2.14 / y 4.08</div>
      <div className="coordinate coord-b">50 Hz control loop</div>
      <div className="diagram-caption"><span>02</span> Autonomous path</div>
    </div>
  );
}

function ProjectScene({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.91, 1, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [100, 0, 0, -70]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    index === 0 ? [-1.5, 0, 0, 1] : [1.5, 0, 0, -1],
  );

  return (
    <div ref={ref} className="project-pin">
      <motion.div
        className="project-stage"
        style={reduceMotion ? undefined : { scale, y, rotate }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="section work-section">
      <Reveal className="section-heading">
        <div>
          <Eyebrow>Projects</Eyebrow>
          <h2>A few things<br /><em>I’ve built.</em></h2>
        </div>
        <p>Two projects I keep coming back to.</p>
      </Reveal>

      <div className="project-stack">
        <ProjectScene index={0}>
          <SpotlightCard className="project project-dark">
            <div className="project-info">
              <span className="project-number">01 / 02</span>
              <div>
                <div className="project-kicker">Multi-agent systems · Python</div>
                <h3>Crucible</h3>
                <p>
                  A deliberation system that runs competing model agents against each other to
                  surface disagreement before committing to a recommendation.
                </p>
              </div>
              <div className="project-footer">
                <span className="award">1st of 50+ teams · Claude Buildathon</span>
                <a href="https://github.com/KartikeyaGoel/claude_buildathon" target="_blank" rel="noreferrer">
                  View repository <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <AgentDiagram />
          </SpotlightCard>
        </ProjectScene>

        <ProjectScene index={1}>
          <SpotlightCard className="project project-accent">
            <div className="project-info">
              <span className="project-number">02 / 02</span>
              <div>
                <div className="project-kicker">Java · Robotics · Real-time control</div>
                <h3>FRC Robot</h3>
                <p>
                  The complete control stack for a competition robot: subsystem state machines,
                  autonomous routines, driver controls, and fused localization.
                </p>
              </div>
              <div className="project-footer">
                <span className="award">Sole programmer · 2024 season</span>
                <a href="https://github.com/Robohawks-346-Programming/Team346_2024_Offseason" target="_blank" rel="noreferrer">
                  View repository <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <RobotDiagram />
          </SpotlightCard>
        </ProjectScene>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });
  const flightTop = useTransform(scrollYProgress, [0, 1], ['4%', '92%']);
  const routeScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="section experience-section">
      <Reveal className="experience-intro">
        <Eyebrow>Experience</Eyebrow>
        <h2>Places I’ve<br />worked.</h2>
        <p>What I worked on, what I learned, and what changed because of it.</p>
      </Reveal>

      <div className="experience-list">
        {!reduceMotion && (
          <div className="experience-route" aria-hidden="true">
            <motion.span style={{ scaleY: routeScale }} />
            <motion.div className="experience-flight" style={{ top: flightTop }}>
              <Plane size={20} strokeWidth={1.5} />
            </motion.div>
          </div>
        )}
        {experiences.map((item, index) => {
          const isActive = active === index;
          return (
            <Reveal key={item.company} delay={index * 0.05}>
              <article className={`experience-item ${isActive ? 'is-active' : ''}`}>
                <button onClick={() => setActive(isActive ? -1 : index)} aria-expanded={isActive}>
                  <span className="experience-index">{item.index}</span>
                  <span className="experience-title">
                    <strong>{item.company}</strong>
                    <small>{item.role}</small>
                  </span>
                  <span className="experience-period">{item.period}</span>
                  <ChevronDown className="experience-chevron" size={20} />
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className="experience-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="experience-body-inner">
                        <p>{item.summary}</p>
                        <ul>
                          {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                        </ul>
                        <span className="location"><MapPin size={13} /> {item.location}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-statement">
        <Reveal>
          <Eyebrow>About / toolkit</Eyebrow>
          <h2>
            A bit<br />
            <span>about me.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="about-copy">
          <p>
            I’m a Computer Science student at Stanford with a Statistics minor. I like working on
            systems, AI tools, and robots—especially when there’s a real technical puzzle involved.
          </p>
          <p>
            Away from my laptop, I’m usually hiking, reading, or lifting.
          </p>
        </Reveal>
      </div>

      <div className="about-grid">
        <Reveal className="education-card">
          <span className="card-label">Education</span>
          <div className="stanford-mark">S</div>
          <div>
            <h3>Stanford University</h3>
            <p>B.S. Computer Science · Minor in Statistics</p>
            <span>Expected June 2029 · GPA 3.66</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="skills-list">
          {skillGroups.map(([group, skills], index) => (
            <div className="skill-row" key={group}>
              <span>0{index + 1}</span>
              <strong>{group}</strong>
              <p>{skills}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <Reveal>
        <Eyebrow>Say hello</Eyebrow>
        <h2>Send me<br /><em>an email.</em></h2>
        <a className="contact-email" href="mailto:kartgoel@stanford.edu">
          <span>kartgoel@stanford.edu</span>
          <ArrowUpRight />
        </a>
      </Reveal>
      <div className="contact-orbit" aria-hidden="true">
        <div />
        <span>OPEN TO COLLABORATION · OPEN TO IDEAS · </span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">Kartikeya Goel</div>
      <div className="footer-links">
        <a href="https://github.com/KartikeyaGoel" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
        <a href="https://linkedin.com/in/kartgoel" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
        <a href="mailto:kartgoel@stanford.edu"><Mail size={15} /> Email</a>
      </div>
      <div className="footer-meta">Stanford, CA · © {new Date().getFullYear()}</div>
    </footer>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <div className="marquee" aria-hidden="true">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
            <span>APPLE</span><i>✦</i><span>SAGO</span><i>✦</i><span>MARI</span><i>✦</i><span>IQ SPECTRA</span><i>✦</i>
            <span>APPLE</span><i>✦</i><span>SAGO</span><i>✦</i><span>MARI</span><i>✦</i><span>IQ SPECTRA</span><i>✦</i>
          </motion.div>
        </div>
        <Metrics />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
