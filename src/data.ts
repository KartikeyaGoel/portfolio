export type Topic = 'ai' | 'systems' | 'robots';
export type Kind = 'work' | 'project';

export type Detail = {
  heading: string;
  meta: string[];
  bullets: string[];
  link?: { href: string; label: string };
};

export type Card = {
  id: string;
  kind: Kind;
  label: string;
  size: 'sm' | 'wide' | 'tall' | 'lg';
  // the first topic sets the card's hue
  topics: Topic[];
  detail?: Detail;
};

export const EMAIL = 'kartgoel@stanford.edu';
export const RESUME = '/Kartikeya-Goel-Resume.pdf';
export const GITHUB = 'https://github.com/KartikeyaGoel';
export const LINKEDIN = 'https://linkedin.com/in/kartgoel';

export const topics: { id: Topic | 'all'; word: string }[] = [
  { id: 'all', word: 'everything' },
  { id: 'ai', word: 'AI tooling' },
  { id: 'systems', word: 'systems' },
  { id: 'robots', word: 'hardware' },
];

export const cards: Card[] = [
  {
    id: 'apple',
    kind: 'work',
    label: 'Work',
    size: 'tall',
    topics: ['ai'],
    detail: {
      heading: 'Apple',
      meta: ['Software Engineering Intern', 'Jun – Sep 2026', 'Sunnyvale, CA'],
      bullets: [
        'Shipped a localization tool replacing a manual per-screen process across 37 locales, owned from design through deployment; used by 200+ designers and producers.',
        'Built internal GenAI tooling embedded in production screen workflows, wrapping model calls in deterministic pre- and post-processing so every output is schema-validated before entering the pipeline.',
      ],
    },
  },
  {
    id: 'sago',
    kind: 'work',
    label: 'Work',
    size: 'tall',
    topics: ['ai'],
    detail: {
      heading: 'Sago',
      meta: ['Software Engineering Intern', 'Jan 2026 – present', 'Remote'],
      bullets: [
        'Own the brief-generation service end to end: ingests company and market data, drafts structured investment briefs, and serves them as reports queried live in deal meetings.',
        'Built the retrieval and citation layer that resolves each generated claim to a source document.',
      ],
    },
  },
  {
    id: 'mari',
    kind: 'work',
    label: 'Work',
    size: 'tall',
    topics: ['systems', 'ai'],
    detail: {
      heading: 'MARi',
      meta: ['Software Engineering Intern', 'Jun – Aug 2025', 'Remote'],
      bullets: [
        'Parallelized processing of multi-GB inputs across 23 worker processes, reducing a 17-hour job to 30 minutes.',
        'Built the eval harness for an automated decisioning pipeline; found a prompt-injection failure mode and raised the pass rate from 5/23 to 22/23 cases.',
      ],
    },
  },
  {
    id: 'iq',
    kind: 'work',
    label: 'Work',
    size: 'tall',
    topics: ['systems'],
    detail: {
      heading: 'IQ Spectra Inc.',
      meta: ['Software Engineering Intern', 'Mar 2023 – Apr 2025', 'Remote'],
      bullets: [
        'Traced and fixed a memory leak in the C/C++ parser using Valgrind and GDB.',
        'Re-keyed the HTML cache on content hash so unchanged pages skipped re-parsing, cutting end-to-end runtime 34% and roughly halving peak memory.',
        'Built web automation tooling that extracted and normalized data from 10,000+ sources, handling pagination, rate limits, and inconsistent markup.',
      ],
    },
  },
  {
    id: 'crucible',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['ai'],
    detail: {
      heading: 'Crucible',
      meta: ['1st of 50+ teams', 'Claude Buildathon', 'Apr 2026', 'Python · multi-agent systems'],
      bullets: [
        'Built a deliberation tool that runs competing model agents against each other and surfaces their disagreements before producing a recommendation.',
        'Placed 1st of 50+ teams.',
      ],
      link: { href: 'https://github.com/KartikeyaGoel/claude_buildathon', label: 'Read the code' },
    },
  },
  {
    id: 'frc',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['robots', 'systems'],
    detail: {
      heading: 'FRC Team 346 competition robot',
      meta: ['Sole software lead, 4 seasons', 'Java · real-time control · sensor fusion'],
      bullets: [
        'Wrote the full control stack in Java, including subsystem state machines, command scheduling, autonomous routines, and driver controls, running on a 50 Hz loop with a 20 ms per-cycle budget.',
        'Diagnosed dropped control cycles caused by blocking calls in the main loop; restructured the superstructure as a non-blocking state machine so per-cycle work stayed bounded.',
        'Implemented pose estimation fusing wheel odometry, gyroscope, and vision measurements for autonomous localization and path following.',
      ],
      link: { href: 'https://github.com/Robohawks-346-Programming/Team346_2024_Offseason', label: 'Read the code' },
    },
  },
  {
    id: 'cad',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['robots', 'ai'],
    detail: {
      heading: 'CAD interface checks',
      meta: ['2026', 'Python · OpenCascade · MCP'],
      bullets: [
        'Deterministic verification for CAD agents: derives what an assembly requires from the geometry of the parts around an edit, then checks a candidate against it. No vision model, no reference part, no declared mates.',
        'Every check returns PASS / FAIL / NOT_APPLICABLE with coordinates, so an agent can repair what failed; exposed as a CLI, a Python API and an MCP server.',
        'Verification cut run-to-run outcome reversals on the hard tier from 42% to 8%, and caught 24 of 24 real broken parts.',
      ],
      link: { href: 'https://github.com/KartikeyaGoel/cad', label: 'Read the code' },
    },
  },
  {
    id: 'beam',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['systems', 'robots'],
    detail: {
      heading: 'Beam, wire, or battery?',
      meta: ['2026', 'Paper + interactive explorer'],
      bullets: [
        'Prices a steerable space solar beam with real 2024–25 hourly day-ahead prices from six markets: CAISO, ERCOT, MISO, NYISO, ISO-NE and Spain.',
        'Models GEO geometry and eclipses, hourly revenue-maximizing dispatch across rectennas, and benchmarks against an HVDC line or a battery.',
        'Steering is worth +16% to +39% over the best single rectenna in a US slot; beyond roughly 900 km over land, a second rectenna is cheaper than an HVDC line.',
      ],
      link: { href: 'https://github.com/KartikeyaGoel/sbsp-beam-steering', label: 'Read the paper' },
    },
  },
  {
    id: 'curriculum',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['ai', 'robots'],
    detail: {
      heading: 'Stale curricula',
      meta: ['Oct 2026', 'PPO · HalfCheetah · PyTorch'],
      bullets: [
        'Trained a surrogate to predict how a PPO policy scores on HalfCheetah physics variants, then used it to pick training environments in a not-too-easy, not-too-hard band.',
        'It did not beat uniform domain randomization (≈1880 vs ≈2200 mean reward over 3 seeds, 2M steps).',
        'The logs show why: as the policy improved, its behavior left the surrogate’s training distribution, and the curriculum went stale.',
      ],
      link: { href: 'https://github.com/KartikeyaGoel/stale-difficulty-curriculum', label: 'Read the write-up' },
    },
  },
  {
    id: 'brain',
    kind: 'project',
    label: 'Project',
    size: 'lg',
    topics: ['systems', 'ai'],
    detail: {
      heading: 'BrainAgent',
      meta: ['2026', 'Swift · ScreenCaptureKit · Vision'],
      bullets: [
        'A headless macOS menu bar agent that OCRs what is already on screen and, a few times a day, ranks it into a short digest of what deserves attention.',
        'Two independent clocks, capture and ranking, that meet only in a local SQLite database; near-duplicate frames are skipped before OCR to hold a CPU and battery budget.',
        'Everything runs on-device, with no network call anywhere in the app by construction.',
      ],
      link: { href: 'https://github.com/KartikeyaGoel/brain', label: 'Read the code' },
    },
  },
];

export const thisTerm = [
  'CS 103 — Mathematical Foundations of Computing',
  'CS 109 — Probability for Computer Scientists',
  'CS 161 — Design & Analysis of Algorithms',
  'CS 229 — Machine Learning',
];

export const coursework = [
  'CS 107 — Computer Organization & Systems',
  'CS 106B — Data Structures & Algorithms',
  'MATH 104 — Matrix Theory',
  'MATH 51 — Linear Algebra & Multivariable Calculus',
  'STATS 117 — Probability',
];

export const skills: [string, string][] = [
  ['Languages', 'C++, C, Python, Java, Bash, TypeScript'],
  ['Systems & robotics', 'State machines, sensor fusion, concurrency, memory debugging, performance profiling'],
  ['Tools', 'Linux, GDB, Valgrind, Git, Make/CMake, Docker, PostgreSQL, SQLite, AWS, Google Cloud'],
  ['ML', 'PyTorch, scikit-learn, LLM evaluation, RAG, multi-agent pipelines'],
];

export const sections: { kind: Kind; title: string; aside: string }[] = [
  { kind: 'work', title: 'Work', aside: 'internships, newest first' },
  { kind: 'project', title: 'Projects', aside: 'built because I wanted the answer' },
];
