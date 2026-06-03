import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag, Reveal, Arrow, GitHubIcon, LinkedInIcon, MailIcon } from "../components/ui";
import { Marquee } from "../components/Marquee";
import { riseItem, staggerParent } from "../components/motion";
import { profile, toolbox, capabilities, projects, accentBg } from "../lib/data";

const socials = [
  { label: "GitHub", href: profile.github, external: true, Icon: GitHubIcon, hover: "hover:bg-ink hover:text-cream" },
  { label: "LinkedIn", href: profile.linkedin, external: true, Icon: LinkedInIcon, hover: "hover:bg-sky" },
  { label: "Email", href: `mailto:${profile.email}`, external: false, Icon: MailIcon, hover: "hover:bg-coral hover:text-cream" },
] as const;

export function Home() {
  const featured = projects[0];

  return (
    <Page>
      {/* ── HERO ─────────────────────────────────────────── */}
      <Container className="pt-12 pb-6 sm:pt-16">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr]"
        >
          {/* left */}
          <div>
            <motion.div variants={riseItem}>
              <Tag dot="bg-coral" className="text-ink/60">
                SYSTEM ONLINE // {profile.systemId}
              </Tag>
            </motion.div>

            <motion.h1 variants={riseItem} className="display mt-5 text-[13vw] leading-[0.86] sm:text-7xl lg:text-[5.4rem]">
              HELLO, I&apos;M
              <br />
              <span className="italic text-rust">ZORAIZ</span> ARSHAD
            </motion.h1>

            <motion.p variants={riseItem} className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink/75">
              I&apos;m a Computer Engineering student at {profile.schoolShort} ({profile.semester}),
              drawn to where software meets physical and distributed systems. I build across
              three areas — distributed infrastructure, applied AI, and embedded hardware —
              and care about making systems that are reliable, fast, and genuinely useful.
            </motion.p>

            <motion.div variants={riseItem} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-coral">
                View Projects <Arrow />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* right — profile / status card + quick contact */}
          <div>
          <motion.div variants={riseItem} className="panel noise overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                profile.sys
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 border border-cream bg-coral" />
                <span className="h-2.5 w-2.5 border border-cream bg-mustard" />
                <span className="h-2.5 w-2.5 border border-cream bg-mint" />
              </div>
            </div>
            <div className="relative grid h-52 place-items-center overflow-hidden border-b-2 border-ink bg-steel">
              <img
                src={profile.photoSquare}
                alt="Zoraiz Arshad"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(244,241,232,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(244,241,232,.5) 1px,transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-mint/40 to-transparent mix-blend-screen"
                animate={{ y: ["-100%", "320%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest text-cream/80">
                IMG_001 // OPERATOR
              </span>
            </div>
            <div className="space-y-2.5 p-4">
              {[
                ["NODE", profile.role],
                ["LOC", profile.location],
                ["UPTIME", "21 years"],
                ["STATUS", "● ONLINE"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between font-mono text-[11px]">
                  <span className="uppercase tracking-[0.16em] text-ink/45">{k}</span>
                  <span className="font-bold uppercase tracking-wide">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* quick contact — reach me directly without the contact page */}
          <motion.div variants={riseItem} className="mt-4 grid grid-cols-3 gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noreferrer" : undefined}
                aria-label={s.label}
                title={s.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className={`group flex flex-col items-center gap-2 border-2 border-ink bg-paper py-4 text-ink shadow-brutal-sm transition-colors ${s.hover}`}
              >
                <s.Icon className="h-5 w-5" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]">
                  {s.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="mt-10">
        <Marquee items={["DISTRIBUTED SYSTEMS", "AI ENGINEERING", "EMBEDDED", "RUST", "PYTHON", "RESEARCH"]} className="bg-coral text-cream" />
      </div>

      {/* ── TOOLBOX ──────────────────────────────────────── */}
      <Container className="mt-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="display text-4xl sm:text-5xl">
              TOOL<span className="italic text-rust">BOX</span>
            </h2>
            <Tag className="hidden text-ink/50 sm:flex">_</Tag>
          </div>
        </Reveal>
        <Reveal className="mt-6">
          <div className="flex flex-wrap gap-3">
            {toolbox.map((tool, i) => (
              <motion.span
                key={tool.name}
                whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
                className={`sticker ${accentBg[tool.accent]} cursor-default text-ink`}
              >
                {tool.name}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* ── CAPABILITIES ─────────────────────────────────── */}
      <Container className="mt-16">
        <Reveal>
          <Tag className="text-ink/50">WHAT I DO // CAPABILITIES</Tag>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            CORE <span className="italic text-rust">SYSTEMS</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -5 }}
                className={`panel h-full ${accentBg[cap.accent]} p-6 text-ink`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-cream font-mono text-sm font-bold shadow-brutal-sm">
                    0{i + 1}
                  </span>
                  <Tag className="text-ink/60">{cap.id}</Tag>
                </div>
                <h3 className="display mt-5 text-2xl">{cap.title}</h3>
                <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/80">{cap.body}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* ── PROJECT ARCHIVE TEASER ───────────────────────── */}
      <Container className="mt-20">
        <Reveal>
          <div className="panel noise overflow-hidden bg-navy text-cream">
            <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
              <div className="border-b-2 border-cream/20 p-8 md:border-b-0 md:border-r-2">
                <Tag className="text-mustard">PROJECT_ARCHIVE // {projects.length} ENTRIES</Tag>
                <h2 className="display mt-4 text-4xl sm:text-5xl">
                  ENTER THE
                  <br />
                  <span className="italic text-coral">VAULT</span>
                </h2>
                <p className="mt-4 max-w-sm font-mono text-sm leading-relaxed text-cream/70">
                  A curated archive of systems built, broken, and rebuilt — from
                  distributed storage engines to autonomous field robotics.
                </p>
                <Link to="/projects" className="btn-coral mt-7">
                  Browse Archive <Arrow />
                </Link>
              </div>

              {/* featured project preview */}
              <Link to={`/projects/${featured.slug}`} className="group relative block p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl font-900 text-cream/15">{featured.index}</span>
                  <span className={`sticker ${accentBg[featured.accent]} text-ink`}>{featured.status}</span>
                </div>
                <h3 className="display mt-4 text-3xl transition-colors group-hover:text-coral">
                  {featured.title}
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-cream/70">{featured.subtitle}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="border border-cream/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream/60">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  Open File <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Page>
  );
}
