import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag, Sticker, Reveal, Arrow, RepoButton } from "../components/ui";
import { riseItem, staggerParent } from "../components/motion";
import { projects, accentBg } from "../lib/data";

const TABS = ["OVERVIEW", "TECH_SPEC", "ARCHITECTURE"] as const;
type TabKey = (typeof TABS)[number];

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [tab, setTab] = useState<TabKey>("OVERVIEW");

  if (!project) {
    return (
      <Page>
        <Container className="py-24 text-center">
          <h1 className="display text-4xl">404 // FILE NOT FOUND</h1>
          <Link to="/projects" className="btn-coral mt-6">
            Back To Archive
          </Link>
        </Container>
      </Page>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <Page>
      <Container className="py-12 sm:py-16">
        {/* back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-rust"
        >
          <Arrow className="rotate-180" /> Back To Archive
        </Link>

        {/* header */}
        <motion.div variants={staggerParent} initial="hidden" animate="show" className="mt-6">
          <motion.div variants={riseItem} className="flex flex-wrap items-center gap-2">
            <Sticker className={`${accentBg[project.accent]} text-ink`}>{project.status}</Sticker>
            <Sticker className="bg-paper text-ink">{project.year}</Sticker>
            <Sticker className="bg-paper text-ink">PROJ_{project.index}</Sticker>
          </motion.div>

          <motion.h1 variants={riseItem} className="display mt-5 text-5xl sm:text-6xl">
            {project.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="italic text-rust">{project.title.split(" ").slice(-1)}</span>
          </motion.h1>

          <motion.blockquote
            variants={riseItem}
            className={`mt-6 border-l-4 border-ink ${accentBg[project.accent]} p-5`}
          >
            <p className="font-display text-xl font-700 leading-snug text-ink">“{project.subtitle}”</p>
          </motion.blockquote>

          <motion.div variants={riseItem} className="mt-6 flex flex-wrap gap-3">
            <RepoButton repo={project.repo} />
            <Link to="/contact" className="btn-ghost">
              Discuss This <Arrow />
            </Link>
          </motion.div>
        </motion.div>

        {/* metrics strip */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-3 divide-x-2 divide-ink border-2 border-ink shadow-brutal">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-paper p-5 text-center">
                <div className="display text-3xl text-rust sm:text-4xl">{m.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* tabs */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap gap-0 border-2 border-ink bg-paper p-1 shadow-brutal-sm">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative flex-1 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  tab === t ? "text-cream" : "text-ink/60 hover:text-ink"
                }`}
              >
                {tab === t && (
                  <motion.span layoutId="tab-bg" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* tab panels */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              {tab === "OVERVIEW" && <Overview project={project} />}
              {tab === "TECH_SPEC" && <TechSpec project={project} />}
              {tab === "ARCHITECTURE" && <Architecture project={project} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next project */}
        <Reveal className="mt-16">
          <Link
            to={`/projects/${next.slug}`}
            className="panel group flex items-center justify-between bg-navy p-6 text-cream"
          >
            <div>
              <Tag className="text-mustard">NEXT_FILE //</Tag>
              <h3 className="display mt-2 text-2xl transition-colors group-hover:text-coral sm:text-3xl">
                {next.title}
              </h3>
            </div>
            <Arrow className="h-7 w-7 text-coral transition-transform group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </Container>
    </Page>
  );
}

/* ── Tab: Overview ──────────────────────────────────────── */
function Overview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div className="panel p-6">
        {project.gallery && project.gallery.length > 0 ? (
          <figure className="mb-6">
            <div
              className="flex flex-wrap justify-center gap-5 rounded-sm border-2 border-ink p-5"
              style={{
                backgroundColor: "#1b1530",
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(124,110,230,.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(90,140,230,.3), transparent 50%)",
              }}
            >
              {project.gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screen ${i + 1}`}
                  className="h-80 w-auto rounded-2xl border-2 border-ink/80 shadow-brutal"
                />
              ))}
            </div>
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
              FIG 0.1 — {project.title} app screens
            </figcaption>
          </figure>
        ) : (
          project.image && (
            <figure className="mb-6 overflow-hidden border-2 border-ink shadow-brutal-sm">
              <img src={project.image} alt={`${project.title} preview`} className="w-full" />
              <figcaption className="border-t-2 border-ink bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
                FIG 0.1 — {project.title} live dashboard
              </figcaption>
            </figure>
          )
        )}
        <Tag className="text-ink/50">SUMMARY</Tag>
        <p className="mt-4 font-mono text-sm leading-relaxed text-ink/80">{project.summary}</p>

        <div className="dotted my-6 h-0.5 w-full opacity-40" />
        <Tag className="text-ink/50">KEY_OUTCOMES</Tag>
        <ul className="mt-4 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 font-mono text-[13px] leading-relaxed text-ink/80">
              <span className="mt-1 h-2 w-2 shrink-0 border border-ink bg-coral" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <aside className="panel bg-mustard p-6 text-ink">
        <Tag className="text-ink/60">STACK // {project.stack.length}</Tag>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="border-2 border-ink bg-cream px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide shadow-brutal-sm">
              {s}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}

/* ── Tab: Tech Spec (terminal + critical files) ─────────── */
function TechSpec({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      {/* terminal */}
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
            technical_spec.md
          </span>
          <span className="font-mono text-[10px] text-mint">READ_ONLY</span>
        </div>
        <div className="space-y-2 bg-[#101820] p-5 font-mono text-[12.5px] leading-relaxed text-mint/90">
          <p><span className="text-cream/40">$</span> cat spec --project {project.index}</p>
          <p className="text-cream/80">{project.summary}</p>
          <p className="pt-2"><span className="text-cream/40">$</span> ls ./highlights</p>
          {project.highlights.map((h, i) => (
            <p key={i} className="text-mustard/90">
              <span className="text-cream/40">{String(i + 1).padStart(2, "0")} »</span> {h}
            </p>
          ))}
          <p className="pt-1">
            <span className="text-cream/40">$</span> <span className="animate-blink">▋</span>
          </p>
        </div>
      </div>

      {/* critical files */}
      <aside className="panel bg-coral p-6 text-cream">
        <Tag className="text-cream/80">CRITICAL_FILES</Tag>
        <ul className="mt-4 space-y-3">
          {project.files.map((f) => (
            <li key={f.name} className="border-2 border-ink bg-cream p-3 text-ink shadow-brutal-sm">
              <p className="font-mono text-[12px] font-bold">{f.name}</p>
              <p className="mt-1 font-mono text-[11px] leading-snug text-ink/65">{f.note}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

/* ── Tab: Architecture (blueprint diagram) ──────────────── */
function Architecture({ project }: { project: (typeof projects)[number] }) {
  const nodes = project.arch ?? ["CLIENT", "GATEWAY", "CORE ENGINE", "STORE"];
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-ink bg-navy px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream">
          {project.slug.replace(/-/g, "_")}_architecture
        </span>
        <span className="font-mono text-[10px] text-mint">v1.0</span>
      </div>
      <div
        className="relative p-6 sm:p-10"
        style={{
          backgroundColor: "#15323F",
          backgroundImage:
            "linear-gradient(rgba(164,199,232,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(164,199,232,.14) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <p className="mb-9 text-center font-display text-xl font-900 italic text-sky sm:text-2xl">
          {project.title} — Data Flow
        </p>

        <div className="flex flex-col items-stretch sm:flex-row sm:items-stretch">
          {nodes.map((n, i) => (
            <Fragment key={n}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-1 flex-col items-center justify-center gap-2 border-2 border-cream bg-steel px-3 py-5 text-center shadow-[5px_5px_0_0_#A4C7E8]"
              >
                <span className="absolute left-2 top-1.5 font-mono text-[9px] text-sky/60">
                  0{i + 1}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-sky/50 font-mono text-[11px] text-sky">
                  {["◇", "▤", "⚙", "▾", "✦"][i] ?? "•"}
                </span>
                <span className="font-mono text-[11px] font-bold uppercase leading-tight tracking-wider text-cream">
                  {n}
                </span>
              </motion.div>

              {i < nodes.length - 1 && (
                <div className="flex shrink-0 items-center justify-center py-2 sm:px-2 sm:py-0">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.08 }}
                    className="block rotate-90 font-mono text-2xl font-bold leading-none text-coral sm:rotate-0"
                  >
                    →
                  </motion.span>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <p className="mt-9 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          FIG 1.0 — Simplified request path through {project.stack.slice(0, 2).join(" + ")}
        </p>
      </div>
    </div>
  );
}
