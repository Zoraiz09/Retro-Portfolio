export type AccentKey = "coral" | "mustard" | "sky" | "bubble" | "mint";

export const accentBg: Record<AccentKey, string> = {
  coral: "bg-coral",
  mustard: "bg-mustard",
  sky: "bg-sky",
  bubble: "bg-bubble",
  mint: "bg-mint",
};

export const accentText: Record<AccentKey, string> = {
  coral: "text-coral",
  mustard: "text-mustard",
  sky: "text-sky",
  bubble: "text-bubble",
  mint: "text-mint",
};

export const profile = {
  name: "ZORAIZ ARSHAD",
  role: "Computer Engineering Undergraduate",
  headline: "Bridging silicon, intelligence, and distributed infrastructure.",
  tagline:
    "Researcher, engineer, and creative building distributed systems, intelligent infrastructure, and the occasional beautiful interface.",
  school: "Ghulam Ishaq Khan Institute (GIKI)",
  schoolShort: "GIKI",
  semester: "6th Semester",
  bio: [
    "I'm a Computer Engineering student at the Ghulam Ishaq Khan Institute (GIKI), currently stepping out of my 6th semester with a deep fascination for how software interacts with physical and distributed systems. My engineering philosophy is built on three core pillars: architecting resilient backend infrastructure, training intelligent models, and writing tight hardware firmware.",
    "On the infrastructure side, I focus on distributed systems — designing high-availability, partition-tolerant infrastructure that handles consensus, replication, and fault recovery at scale. I pair this with AI engineering: training and deploying models for real-world inference, taking systems all the way from raw data pipelines to low-latency serving.",
    "My roots, however, remain deeply tied to embedded & hardware. I love working with bare-metal firmware, RTL design, and building the physical bridge between silicon and software. Whether I'm building cloud-connected IoT devices or simulating custom computer architectures, I look at engineering as a blend of logic, performance, and scale.",
    "Beyond the technical terminal, I bring a strong layer of global collaboration. I operate fluidly across multicultural environments, backed by professional fluency in English and native mastery of Urdu and Pashto.",
  ],
  location: "Peshawar, PK",
  status: "AVAILABLE FOR WORK",
  email: "zoraizarshad987@gmail.com",
  github: "https://github.com/Zoraiz09",
  githubHandle: "@Zoraiz09",
  linkedin: "https://linkedin.com/in/zoraiz-arshad",
  linkedinHandle: "in/zoraiz-arshad",
  systemId: "ZA-7741-CE",
  photo: "/media/zoraiz.webp",
  photoSquare: "/media/zoraiz-square.webp",
};

export type Tool = { name: string; accent: AccentKey };
export const toolbox: Tool[] = [
  { name: "C / C++", accent: "coral" },
  { name: "Python", accent: "mustard" },
  { name: "Rust", accent: "sky" },
  { name: "JavaScript", accent: "mustard" },
  { name: "React.js", accent: "sky" },
  { name: "Node.js", accent: "mint" },
  { name: "Verilog", accent: "bubble" },
  { name: "RISC-V", accent: "coral" },
  { name: "Assembly", accent: "mint" },
  { name: "PyTorch", accent: "mint" },
  { name: "Docker", accent: "sky" },
  { name: "Linux", accent: "mustard" },
  { name: "Git", accent: "coral" },
  { name: "FastAPI", accent: "bubble" },
  { name: "PostgreSQL", accent: "mint" },
];

export type Capability = {
  id: string;
  title: string;
  accent: AccentKey;
  body: string;
  hashtag: string;
  related: { label: string; to: string }[];
};

export const capabilities: Capability[] = [
  {
    id: "DISTRIBUTED_SYSTEMS",
    title: "Distributed Systems",
    accent: "coral",
    body: "Designing high-availability, partition-tolerant infrastructure — consensus, replication, and fault recovery at scale.",
    hashtag: "#DistributedSystems",
    related: [
      { label: "DFSS", to: "/projects/distributed-storage-system" },
      { label: "Hermes", to: "/projects/hermes-messenger" },
    ],
  },
  {
    id: "AI_ENGINEERING",
    title: "AI Engineering",
    accent: "mustard",
    body: "Training and deploying models for real-world inference. From data pipelines to low-latency serving.",
    hashtag: "#AIEngineering",
    related: [
      { label: "CodeSage AI", to: "/projects/ai-code-review-assistant" },
      { label: "IRIS", to: "/startup" },
    ],
  },
  {
    id: "EMBEDDED_HW",
    title: "Embedded & HW",
    accent: "sky",
    body: "CPU microarchitecture, bare-metal firmware, and the bridge between silicon and software.",
    hashtag: "#Embedded-HW",
    related: [
      { label: "Silicon", to: "/projects/silicon-ooo-cpu" },
      { label: "IRIS", to: "/startup" },
    ],
  },
  {
    id: "CREATIVE_DIR",
    title: "Creative Direction",
    accent: "bubble",
    body: "Translating dense engineering into interfaces and stories people actually want to use.",
    hashtag: "#CreativeDirection",
    related: [{ label: "Dewy", to: "/projects/dewy-hydration-tracker" }],
  },
];

export type Stat = { label: string; value: string };
export const quickStats: Stat[] = [
  { label: "Education", value: "GIKI" },
  { label: "Semester", value: "6th" },
  { label: "Based In", value: "Peshawar, PK" },
  { label: "Focus", value: "Systems · AI · HW" },
];

export type Language = { name: string; level: number; note: string };
export const languages: Language[] = [
  { name: "English", level: 95, note: "Fluent" },
  { name: "Urdu", level: 100, note: "Native" },
  { name: "Pushto", level: 100, note: "Native" },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  blurb: string;
  year: string;
  status: "SHIPPED" | "ONGOING" | "ARCHIVED";
  accent: AccentKey;
  tags: string[];
  stack: string[];
  summary: string;
  highlights: string[];
  files: { name: string; note: string }[];
  metrics: Stat[];
  /** Data-flow nodes shown in the Architecture tab diagram. */
  arch?: string[];
  /** Optional preview image served from /public/media. */
  image?: string;
  /** True for mobile apps — portrait screenshots framed as phones instead of cropped. */
  mobile?: boolean;
  /** Extra portrait screenshots shown as a phone gallery on the detail page. */
  gallery?: string[];
  /** GitHub repository URL for the "View Code" button. "" = not yet provided. */
  repo: string;
};

export const projects: Project[] = [
  {
    slug: "ai-code-review-assistant",
    index: "01",
    title: "CodeSage AI",
    subtitle: "Upload a repo and get AI code review, bug & security analysis, docs, and chat-with-your-code.",
    blurb:
      "A blend of GitHub code review + SonarQube + an AI assistant: static analysis, AI reviews, documentation generation, and a RAG-powered chat over your repository with file/line citations.",
    year: "2025",
    status: "SHIPPED",
    accent: "sky",
    tags: ["AI", "RAG", "DEVTOOLS"],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "ChromaDB", "Celery", "OpenRouter"],
    summary:
      "Upload source code, a ZIP, or a public Git repo and CodeSage parses it, runs static analysis (code smells, cyclomatic + cognitive complexity, security scans), then drives an LLM via OpenRouter for statistics-based project reviews, per-file bug detection, and refactoring suggestions — never sending raw source to the model. Code is embedded locally with fastembed into ChromaDB so you can chat with the repo and get answers with file/line citations. Every finding auto-becomes a prioritized, trackable issue.",
    highlights: [
      "RAG chat over your repo with file/line citations — indexed a 487-chunk repo in ~2 min on CPU.",
      "Static analysis: code smells, cyclomatic + cognitive complexity, and security scans (secrets, SQLi, keys).",
      "Stats-driven AI reviews that never expose raw source to the model; exported as branded PDFs.",
      "Findings auto-convert into a prioritized, idempotent issue tracker — backed by 38 passing tests.",
    ],
    files: [
      { name: "services/llm/", note: "OpenRouter LLM client + review engine" },
      { name: "services/rag/", note: "ChromaDB embed + cited retrieval" },
      { name: "services/analysis/", note: "Static analysis + security scans" },
    ],
    metrics: [
      { label: "Pipeline", value: "12 phases" },
      { label: "Tests", value: "38" },
      { label: "Languages", value: "7" },
    ],
    arch: ["React Client", "API Gateway", "AI + Analyzer", "Postgres + ChromaDB"],
    image: "/media/codesage.webp",
    repo: "https://github.com/Zoraiz09/AI-Code-Reviewer",
  },
  {
    slug: "distributed-storage-system",
    index: "02",
    title: "Distributed File Storage System",
    subtitle: "A cloud-like storage platform that chunks, replicates, and self-heals files across a node cluster.",
    blurb:
      "A miniature Dropbox / HDFS: files are split into chunks, replicated across storage nodes, and automatically re-replicated when a node dies — with erasure coding, encryption, and a live cluster view.",
    year: "2025",
    status: "SHIPPED",
    accent: "coral",
    tags: ["DISTRIBUTED", "FASTAPI", "FAULT-TOLERANT"],
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Docker", "Reed-Solomon"],
    summary:
      "Files are chunked, checksummed with SHA-256, and replicated 3× across a cluster of FastAPI storage nodes coordinated by a master server. Heartbeats detect dead nodes within ~15s, and a background monitor re-replicates lost chunks onto a spare to restore the replication factor — all visible in an animated live topology view. Beyond the spec: AES-256-GCM at-rest encryption (nodes only ever hold ciphertext), Reed-Solomon RS(4,2) erasure coding, file versioning, tokenised public sharing, an RBAC admin console, and Prometheus + Grafana monitoring.",
    highlights: [
      "Replication factor 3 with automatic, live re-replication onto a spare node on failure.",
      "Reed-Solomon RS(4,2) erasure coding survives 2 simultaneous node losses at 1.5× storage.",
      "AES-256-GCM at-rest encryption — storage nodes only ever hold ciphertext.",
      "Parallel chunk downloads, SHA-256 integrity checks, and an animated live topology view.",
    ],
    files: [
      { name: "services/storage_service.py", note: "Chunk, replicate, parallel-fetch + merge" },
      { name: "services/recovery_service.py", note: "Node-failure detection + re-replication" },
      { name: "utils/erasure.py", note: "Reed-Solomon RS(4,2) erasure coding" },
    ],
    metrics: [
      { label: "Replication", value: "×3" },
      { label: "Storage Nodes", value: "6" },
      { label: "Failover", value: "~15s" },
    ],
    arch: ["React Client", "Master Server", "Storage Nodes", "PostgreSQL"],
    image: "/media/dfss.webp",
    repo: "https://github.com/Zoraiz09/Distributed-File-Storage-System",
  },
  {
    slug: "dewy-hydration-tracker",
    index: "03",
    title: "Dewy",
    subtitle: "A glassmorphic, mobile-first water-intake tracker with a periwinkle palette.",
    blurb:
      "A mobile-first React hydration app built pixel-faithfully from design screens — animated bottle fill, progress rings, smart reminders, and a frosted-glass UI throughout.",
    year: "2025",
    status: "SHIPPED",
    accent: "bubble",
    tags: ["REACT", "GLASSMORPHISM", "MOBILE"],
    stack: ["React", "Vite", "React Router", "lucide-react", "CSS"],
    summary:
      "Dewy is a mobile-first hydration logger built from custom design screens — a periwinkle/indigo palette with lavender→blue gradients and frosted-glass surfaces via backdrop-filter. Six screens (Login, Sign Up, Home, Insights, Reminders, Settings) cover an animated bottle fill with quick-add tiles, a progress ring + weekly bar chart, smart reminders with quiet hours, and a goal slider with metric/imperial units. All intake, goals, units, and reminder settings persist to localStorage across reloads.",
    highlights: [
      "Hand-built glassmorphism design system — frosted glass via backdrop-filter, no UI framework.",
      "Animated bottle fill, progress ring, and weekly intake bar chart.",
      "Smart reminders with frequency, quiet hours, and a streak counter.",
      "State (intake, goal, units, reminders) persisted to localStorage across reloads.",
    ],
    files: [
      { name: "context/AppContext.jsx", note: "Intake state, goal, units, streak" },
      { name: "components/BottleFill.jsx", note: "Animated bottle + progress ring" },
      { name: "index.css", note: "Design tokens + glassmorphism system" },
    ],
    metrics: [
      { label: "Screens", value: "6" },
      { label: "Persistence", value: "Local" },
      { label: "Style", value: "Glass" },
    ],
    arch: ["Login / Auth", "App Shell", "Screens", "localStorage"],
    image: "/media/dewy.webp",
    mobile: true,
    gallery: ["/media/dewy.webp", "/media/dewy2.webp"],
    repo: "https://github.com/Zoraiz09/DEWY-Water-Loger",
  },
  {
    slug: "hermes-messenger",
    index: "04",
    title: "Hermes - Messenger",
    subtitle: "A multi-threaded TCP chat system with a polished desktop GUI — direct + group messaging, zero dependencies.",
    blurb:
      "A client–server instant-messaging app in pure-Python stdlib: a length-prefixed JSON protocol over TCP, a multi-threaded server, and a dark-themed Tkinter GUI with whispers and live presence.",
    year: "2024",
    status: "SHIPPED",
    accent: "mint",
    tags: ["NETWORKING", "PYTHON", "TKINTER"],
    stack: ["Python", "Sockets / TCP", "Tkinter", "Threading", "JSON"],
    summary:
      "Built for a Computer Networks course with nothing but the Python standard library. A length-prefix framed JSON protocol rides on top of raw TCP to correctly handle partial reads and message boundaries; the multi-threaded server runs one daemon thread per client behind a shared, lock-guarded client table. It supports 1-to-1 direct messages and group broadcasts, enforces unique usernames, and pushes a live online-user list to every client on join/leave. The Tkinter GUI is fully thread-safe — all network I/O is queue-bridged to the Tk main loop so the UI never blocks — with message bubbles, a presence sidebar, and a direct/group send toggle. The server logs every CONN/LOGIN/MSG/GROUP/LOGOUT event to console and file.",
    highlights: [
      "Length-prefix framed JSON over raw TCP — correctly handles partial reads and message boundaries.",
      "Multi-threaded server: one daemon thread per client, shared state guarded by a threading.Lock.",
      "Direct (1-to-1) and group broadcast messaging with live presence pushed on join/leave.",
      "Thread-safe Tkinter GUI — network I/O queue-bridged to the Tk main loop so it never freezes.",
    ],
    files: [
      { name: "protocol.py", note: "Length-prefix framed JSON (send/recv)" },
      { name: "server.py", note: "TCP accept-loop + per-client threads" },
      { name: "client.py", note: "Thread-safe Tkinter GUI client" },
    ],
    metrics: [
      { label: "Dependencies", value: "0" },
      { label: "Protocol", value: "TCP/JSON" },
      { label: "Def. Port", value: "5555" },
    ],
    arch: ["Tkinter Client", "TCP Socket", "Threaded Server", "Client Table"],
    image: "/media/hermes.webp",
    repo: "https://github.com/Zoraiz09/Hermes-Messenger",
  },
  {
    slug: "cashdash-exchange",
    index: "05",
    title: "CashDash",
    subtitle: "A multi-currency exchange & counterparty ledger system for a retail money-exchange shop.",
    blurb:
      "Handles fiat exchange-rate math, physical vault stock, the daily transaction stream, and real-time debtor/creditor ledgers — who owes me vs. who I owe — on one platform.",
    year: "2025",
    status: "SHIPPED",
    accent: "mustard",
    tags: ["FINTECH", "NEXT.JS", "SUPABASE"],
    stack: ["Next.js 14", "React", "Supabase", "PostgreSQL", "Tailwind", "shadcn/ui"],
    summary:
      "A customized currency-exchange and ledger platform built to a System Requirements & Technical Architecture spec. It runs fiat exchange-rate calculations, tracks physical vault stock per currency, logs every BUY/SELL ticket, and manages real-time counterparty receivables and payables. Money columns use NUMERIC(18,4–6) so there are zero floating-point rounding errors, and all money movement lives in ACID Postgres functions (execute_exchange / settle_debt). Deferred trades route the unfunded leg to the ledger — keeping the vault equal to real cash on hand — and every screen subscribes to Postgres changes to re-render live across terminals.",
    highlights: [
      "Dual-action BUY/SELL tickets with instant amount × rate counter-value math and a live receipt preview.",
      "Counterparty credit ledger tracking receivables (“who owes me”) and payables (“who I owe”) per currency.",
      "Spot vs deferred settlement — unfunded legs route to the ledger, keeping the vault equal to real cash on hand.",
      "ACID Postgres functions for all money movement, with real-time multi-terminal sync via Supabase.",
    ],
    files: [
      { name: "migrations/0002_functions.sql", note: "execute_exchange + settle_debt (ACID)" },
      { name: "app/transactions/new", note: "BUY / SELL ticket + live receipt" },
      { name: "app/profiles/[id]", note: "Ledger detail + debt settlement" },
    ],
    metrics: [
      { label: "Settlement", value: "ACID" },
      { label: "Precision", value: "18,6" },
      { label: "Sync", value: "Realtime" },
    ],
    arch: ["Next.js App", "Supabase Client", "Postgres Functions", "Vault + Ledgers"],
    image: "/media/cashdash.webp",
    repo: "https://github.com/Zoraiz09/Money_Exchange",
  },
  {
    slug: "silicon-ooo-cpu",
    index: "06",
    title: "Silicon",
    subtitle: "A cycle-accurate Tomasulo out-of-order CPU simulator with an interactive, cycle-by-cycle web visualizer.",
    blurb:
      "A dynamically-scheduled processor model implementing Tomasulo's algorithm with a reorder buffer — plus an in-order baseline and an L1 cache — that you can watch execute, cycle by cycle, in the browser.",
    year: "2025",
    status: "SHIPPED",
    accent: "sky",
    tags: ["COMPUTER ARCH", "TOMASULO", "SIMULATOR"],
    stack: ["Python", "Tomasulo / ROB", "JavaScript", "SVG", "matplotlib"],
    summary:
      "Silicon is a cycle-accurate simulator for a dynamically-scheduled CPU built around Tomasulo's algorithm with a circular reorder buffer (ROB), register renaming over ROB tags, a Common Data Bus, and memory disambiguation with store-to-load forwarding. It pairs the out-of-order engine with a single-issue in-order baseline and a direct-mapped L1 D-cache so the two machines can be compared head-to-head across four benchmarks. A Python reference engine (CLI, batch runner, unit tests, matplotlib figures) is mirrored by a line-for-line JavaScript port that powers a zero-install web visualizer — animating the reservation stations, ROB, register-renaming tags, cache, and a Gantt timing chart so you can see exactly why out-of-order execution overlaps work the in-order machine is forced to serialize. Both engines are verified to produce identical cycle counts, IPC, cache hit rates, and branch statistics.",
    highlights: [
      "Full Tomasulo pipeline — issue → execute → write-back → commit — with register renaming and a circular ROB committing in program order.",
      "Memory disambiguation with store-to-load forwarding keeps loads correct when older stores are still in flight.",
      "Interactive cycle-by-cycle web visualizer: scrub any cycle and inspect RS pools, the ROB, renaming tags, the L1 cache, and a Gantt timing chart.",
      "Verified Python ⇆ JavaScript parity — identical cycles, IPC, cache hit rate, and branch stats across all four benchmarks (up to 1.5× OoO speedup on matmul).",
    ],
    files: [
      { name: "src/tomasulo.py", note: "Out-of-order engine: issue/exec/WB/commit + renaming" },
      { name: "src/reorder_buffer.py", note: "Circular ROB: allocate / commit / flush" },
      { name: "web/js/app.js", note: "Interactive cycle-by-cycle visualizer UI" },
    ],
    metrics: [
      { label: "Max Speedup", value: "1.5×" },
      { label: "ISA", value: "10 ops" },
      { label: "Engines", value: "2" },
    ],
    arch: ["Issue", "Execute", "Write-Back", "Commit"],
    image: "/media/silicon.webp",
    repo: "https://github.com/Zoraiz09/Silicon-Out-of-Order-CPU",
  },
];

/* ── Startup: IRIS (its own page, not in the project archive) ── */
export type Founder = { name: string; role: string; isMe?: boolean };
export type StackLayer = { label: string; tag: string; items: string[] };
export type Startup = Project & {
  pitch: string;
  founders: Founder[];
  traction: Stat[];
  overview: string[];
  hardware: StackLayer;
  cloud: StackLayer;
};

export const startup: Startup = {
  slug: "iris",
  index: "S1",
  title: "Project IRIS",
  subtitle:
    "A scalable, multi-tenant IoT ecosystem delivering real-time soil-health analytics and predictive agricultural insights to optimize crop yield.",
  blurb:
    "An end-to-end Agri-Tech platform that bridges hardware telemetry and actionable agricultural data — delivered as a portable, on-field service.",
  pitch:
    "Most farms can't justify buying and maintaining fixed sensor hardware. IRIS flips the model — portable, deployable sensor rigs delivered as a service, giving farmers real-time soil diagnostics and AI-driven irrigation and fertilizer guidance without the capital cost.",
  year: "2024 — Present",
  status: "ONGOING",
  accent: "mustard",
  founders: [
    { name: "Firas", role: "Founder" },
    { name: "Zoraiz Arshad", role: "Co-Founder", isMe: true },
    { name: "Barlas", role: "Co-Founder" },
  ],
  tags: ["AGRITECH", "IOT", "MULTI-TENANT SAAS"],
  stack: ["ESP32", "Soil Sensors", "Node.js", "Supabase", "WebSockets", "React", "Tailwind"],
  overview: [
    "Project IRIS is an end-to-end Agri-Tech platform designed to bridge the gap between hardware telemetry and actionable agricultural data. Built around an ESP32-driven hardware architecture, the platform continuously captures vital soil-health metrics — including moisture retention, pH dynamics, and macronutrient (NPK) levels — streaming them directly to a centralized cloud interface.",
    "The project evolved from a standard hardware monitoring tool into a robust enterprise-grade SaaS platform. To ensure scalability, the entire backend was refactored from a single-tenant database into a secure, multi-tenant architecture featuring strict Row Level Security (RLS). This lets large-scale farm managers and agricultural service providers manage hundreds of isolated client profiles and sensor fleets from a single, unified admin panel.",
    "Strategically pivoting away from standard direct hardware sales, IRIS operates on a highly efficient portable service-provider model. This lowers the barrier to entry for farmers by using mobile, deployable sensor rigs that offer real-time on-field automated diagnostics and predictive AI recommendations for optimal irrigation and fertilizer usage.",
  ],
  hardware: {
    label: "Hardware / Embedded",
    tag: "PHYSICAL_LAYER",
    items: [
      "ESP32 Microcontrollers",
      "Soil Moisture Sensors",
      "NPK Macronutrient Sensors",
      "pH Sensors (analog/digital)",
      "Kalman-filtered sensor fusion",
    ],
  },
  cloud: {
    label: "Cloud / SaaS",
    tag: "DIGITAL_LAYER",
    items: [
      "Node.js ingestion service",
      "Supabase (PostgreSQL)",
      "Row Level Security (RLS)",
      "Real-time WebSockets",
      "React + Tailwind dashboard",
    ],
  },
  summary:
    "IRIS captures soil-health telemetry at the edge with ESP32 nodes and streams it through low-latency ingestion tunnels into a multi-tenant Supabase backend. Raw analog readings are stabilized with a Kalman filter before they ever hit the database, and a centralized admin panel turns the live data into fleet health, tenant management, and AI-driven agronomic recommendations.",
  highlights: [
    "Hardware-to-cloud pipeline: low-latency ingestion tunnels stream raw ESP32 analog telemetry straight to the cloud database.",
    "Kalman-filtered sensor fusion smooths noisy analog soil readings (moisture, pH, NPK) into stable, trustworthy telemetry.",
    "Scalable multi-tenancy: Supabase PostgreSQL rebuilt with fine-grained Row Level Security for absolute data isolation between clients.",
    "Centralized admin panel monitors sensor-fleet health, manages tenant subscriptions, and visualizes real-time analytics streams.",
    "Automated predictive diagnostics turn environmental trends into actionable irrigation and soil-treatment recommendations.",
  ],
  traction: [
    { label: "Tenancy", value: "Multi" },
    { label: "Sensors", value: "NPK·pH·H₂O" },
    { label: "Data Sync", value: "Realtime" },
    { label: "Isolation", value: "RLS" },
  ],
  files: [
    { name: "firmware/sensor_node.ino", note: "ESP32 sampling + Kalman filtering" },
    { name: "server/ingest.js", note: "Node.js WebSocket telemetry tunnel" },
    { name: "db/rls_policies.sql", note: "Multi-tenant Row Level Security" },
  ],
  metrics: [
    { label: "Tenancy", value: "Multi" },
    { label: "Data Sync", value: "Realtime" },
    { label: "Isolation", value: "RLS" },
  ],
  image: "/media/iris-team.webp",
  repo: "https://github.com/Zoraiz09",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Startup", to: "/startup" },
  { label: "Contact", to: "/contact" },
];
