import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag, Sticker, Reveal } from "../components/ui";
import { riseItem, staggerParent } from "../components/motion";
import { profile, quickStats, capabilities, languages, accentBg } from "../lib/data";

export function About() {
  return (
    <Page>
      <Container className="py-12 sm:py-16">
        {/* ── HERO ──────────────────────────────────────── */}
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={riseItem}>
            <Tag dot="bg-coral" className="text-ink/60">
              FILE_01 // PROFILE
            </Tag>
            <h1 className="display mt-4 text-5xl sm:text-7xl">
              ABOUT <span className="italic text-rust">ME</span>
            </h1>
            <p className="mt-5 max-w-2xl font-display text-xl font-700 leading-snug text-ink/80 sm:text-2xl">
              {profile.headline}
            </p>
          </motion.div>

          {/* identity + quick stats */}
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <motion.article variants={riseItem} className="panel noise overflow-hidden">
              <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                  identity_card.dat
                </span>
                <span className="font-mono text-[10px] text-mint">● VERIFIED</span>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr]">
                <div className="relative grid h-40 w-40 shrink-0 place-items-center overflow-hidden border-2 border-ink bg-steel shadow-brutal-sm">
                  <img
                    src={profile.photoSquare}
                    alt="Zoraiz Arshad"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-ink/70 px-1 font-mono text-[9px] uppercase tracking-widest text-cream/90">
                    IMG_001
                  </span>
                </div>
                <div>
                  <Sticker className="bg-coral text-cream" rotate={-2}>
                    ENGINEER
                  </Sticker>
                  <h2 className="display mt-3 text-3xl">{profile.name}</h2>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-ink/75">
                    Computer Engineering student at {profile.school}, fascinated by the messy
                    space where hardware, distributed software, and human interfaces collide.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Researcher", "Builder", "Tinkerer"].map((r, i) => (
                      <span key={r} className={`sticker ${["bg-mustard", "bg-sky", "bg-mint"][i]} text-ink`}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.aside variants={riseItem} className="panel bg-mustard p-6 text-ink">
              <Tag className="text-ink/60">QUICK_STATS</Tag>
              <ul className="mt-5 space-y-4">
                {quickStats.map((s) => (
                  <li key={s.label} className="flex items-center justify-between border-b border-ink/20 pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                      {s.label}
                    </span>
                    <span className="font-display text-lg font-800">{s.value}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </motion.div>

        {/* ── NARRATIVE / BIO ───────────────────────────── */}
        <Reveal className="mt-16">
          <Tag className="text-ink/50">BIO // THE_LONG_VERSION</Tag>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            THE <span className="italic text-rust">STORY</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          {/* paragraphs */}
          <Reveal>
            <div className="panel space-y-5 p-7">
              {profile.bio.map((para, i) => (
                <p
                  key={i}
                  className={`font-mono text-sm leading-relaxed text-ink/80 ${
                    i === 0 ? "border-l-4 border-coral pl-4" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* education + facts side card */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              <div className="panel bg-navy p-6 text-cream">
                <Tag className="text-mustard">EDUCATION</Tag>
                <h3 className="display mt-3 text-2xl leading-tight">
                  Computer Engineering
                </h3>
                <p className="mt-2 font-mono text-sm text-cream/75">{profile.school}</p>
                <div className="dotted my-5 h-0.5 w-full opacity-20" />
                <div className="space-y-2.5 font-mono text-[12px]">
                  <Row k="STANDING" v={profile.semester} />
                  <Row k="DEGREE" v="B.Sc. CE" />
                  <Row k="BASED IN" v={profile.location} />
                </div>
              </div>
              <div className="panel bg-sky p-6 text-ink">
                <Tag className="text-ink/60">PHILOSOPHY</Tag>
                <p className="mt-3 font-display text-lg font-700 leading-snug">
                  Engineering as a blend of logic, performance, and scale.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── ENGINEERING PILLARS ───────────────────────── */}
        <Reveal className="mt-16">
          <Tag className="text-ink/50">CAPABILITY_MATRIX // 03 PILLARS</Tag>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            WHAT I <span className="italic text-rust">BRING</span>
          </h2>
          <p className="mt-3 max-w-xl font-mono text-sm text-ink/65">
            Three core pillars — each one wired to the projects that prove it out.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {capabilities.slice(0, 3).map((cap, i) => (
            <Reveal key={cap.id} delay={i * 0.08}>
              <motion.article whileHover={{ y: -6 }} className={`panel flex h-full flex-col ${accentBg[cap.accent]} p-6`}>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center border-2 border-ink bg-cream font-mono text-sm font-bold shadow-brutal-sm">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink/55">
                    {cap.hashtag}
                  </span>
                </div>
                <h3 className="display mt-5 text-2xl">{cap.title}</h3>
                <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/80">{cap.body}</p>

                {cap.related.length > 0 && (
                  <div className="mt-auto pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                      Proven in →
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cap.related.map((r) => (
                        <Link
                          key={r.to}
                          to={r.to}
                          className="border-2 border-ink bg-cream px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* ── COMMUNICATION PROTOCOLS ───────────────────── */}
        <Reveal className="mt-16">
          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-ink bg-navy px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream">
                Communication Protocols
              </span>
              <span className="font-mono text-[10px] text-mint">{languages.length} ACTIVE</span>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg font-800">{lang.name}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/55">
                      {lang.note}
                    </span>
                  </div>
                  <div className="mt-3 h-3 w-full border-2 border-ink bg-cream">
                    <motion.div
                      className="h-full bg-coral"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Page>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-cream/15 pb-1.5">
      <span className="uppercase tracking-[0.16em] text-cream/45">{k}</span>
      <span className="font-bold">{v}</span>
    </div>
  );
}
