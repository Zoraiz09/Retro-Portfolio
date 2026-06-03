import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag, Sticker, Reveal, Arrow } from "../components/ui";
import { riseItem, staggerParent } from "../components/motion";
import { startup, accentBg } from "../lib/data";

export function Startup() {
  return (
    <Page>
      <Container className="py-12 sm:py-16">
        {/* header */}
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={riseItem} className="flex flex-wrap items-center gap-2">
            <Sticker className="bg-coral text-cream" rotate={-2}>
              ★ VENTURE_01
            </Sticker>
            <Sticker className={`${accentBg[startup.accent]} text-ink`}>{startup.status}</Sticker>
            <Sticker className="bg-paper text-ink">{startup.year}</Sticker>
          </motion.div>

          <motion.h1 variants={riseItem} className="display mt-5 text-5xl sm:text-7xl">
            PROJECT <span className="italic text-rust">IRIS</span>
          </motion.h1>

          <motion.p variants={riseItem} className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-ink/75">
            {startup.subtitle}
          </motion.p>

          <motion.div variants={riseItem} className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-coral">
              Talk Partnerships <Arrow />
            </Link>
          </motion.div>
        </motion.div>

        {/* hero image */}
        <Reveal className="mt-10">
          <figure className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                field_deployment.jpg
              </span>
              <span className="font-mono text-[10px] text-mint">● LIVE PILOT</span>
            </div>
            <div className="relative bg-steel">
              <img
                src={startup.image}
                alt="IRIS founding team at the field deployment"
                className="mx-auto h-[400px] w-full object-contain sm:h-[560px]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/90">
                  The IRIS founding team at the field deployment — pilot plot, Peshawar.
                </p>
              </div>
            </div>
          </figure>
        </Reveal>

        {/* the pitch */}
        <Reveal className="mt-12">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <div className={`panel ${accentBg[startup.accent]} p-7`}>
              <Tag className="text-ink/60">THE_THESIS</Tag>
              <p className="mt-4 font-display text-xl font-700 leading-snug text-ink sm:text-2xl">
                {startup.pitch}
              </p>
            </div>
            <aside className="panel p-7">
              <Tag className="text-ink/50">FOUNDING_TEAM // {startup.founders.length}</Tag>
              <ul className="mt-4 space-y-3">
                {startup.founders.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 border-2 border-ink p-2.5 shadow-brutal-sm ${
                      f.isMe ? "bg-coral text-cream" : "bg-cream text-ink"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center border-2 border-ink font-mono text-xs font-bold ${
                        f.isMe ? "bg-cream text-ink" : "bg-mustard text-ink"
                      }`}
                    >
                      {f.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-sm font-bold leading-tight">
                        {f.name}
                        {f.isMe && <span className="ml-1.5 text-[10px] opacity-80">(me)</span>}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                          f.isMe ? "text-cream/80" : "text-ink/55"
                        }`}
                      >
                        {f.role}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Reveal>

        {/* overview */}
        <Reveal className="mt-14">
          <Tag className="text-ink/50">PROJECT_OVERVIEW</Tag>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            WHAT <span className="italic text-rust">IRIS</span> IS
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {startup.overview.map((para, i) => (
              <div key={i} className="panel p-6">
                <span className="grid h-8 w-8 place-items-center border-2 border-ink bg-mustard font-mono text-xs font-bold shadow-brutal-sm">
                  0{i + 1}
                </span>
                <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-ink/80">{para}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* silicon -> cloud bridge */}
        <Reveal className="mt-14">
          <Tag className="text-ink/50">SYSTEM_ARCHITECTURE</Tag>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            SILICON <span className="italic text-rust">→</span> CLOUD
          </h2>
          <p className="mt-3 max-w-xl font-mono text-sm text-ink/65">
            How the physical world reaches the dashboard — raw soil telemetry, cleaned at the
            edge, streamed into a multi-tenant cloud.
          </p>
          <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <Layer layer={startup.hardware} variant="steel" />
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-1.5 py-1 lg:py-0">
                <span className="rotate-90 font-mono text-3xl font-bold leading-none text-coral lg:rotate-0">
                  →
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
                  telemetry
                </span>
              </div>
            </div>
            <Layer layer={startup.cloud} variant="navy" />
          </div>
        </Reveal>

        {/* key engineering */}
        <Reveal className="mt-14">
          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <div className="panel p-7">
              <Tag className="text-ink/50">KEY_ENGINEERING</Tag>
              <ul className="mt-5 space-y-4">
                {startup.highlights.map((h, i) => (
                  <li key={h} className="flex gap-3 font-mono text-[13px] leading-relaxed text-ink/80">
                    <span className="shrink-0 font-mono font-bold text-coral">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="panel bg-navy p-7 text-cream">
              <Tag className="text-mustard">CORE_FILES</Tag>
              <ul className="mt-4 space-y-3">
                {startup.files.map((f) => (
                  <li key={f.name} className="font-mono text-[12px]">
                    <p className="font-bold text-coral">{f.name}</p>
                    <p className="text-cream/60">{f.note}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Reveal>

        {/* traction metrics */}
        <Reveal className="mt-14">
          <Tag className="text-ink/50">AT_A_GLANCE</Tag>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {startup.traction.map((m, i) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -5 }}
                className={`panel p-5 text-center ${["bg-coral text-cream", "bg-mustard", "bg-sky", "bg-mint"][i % 4]}`}
              >
                <div className="display text-3xl sm:text-4xl">{m.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] opacity-80">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-14">
          <div className="panel noise flex flex-col items-start justify-between gap-5 bg-coral p-8 text-cream sm:flex-row sm:items-center">
            <div>
              <Tag className="text-cream/80">INVEST // PARTNER // PILOT</Tag>
              <h3 className="display mt-2 text-3xl">Want to grow IRIS with us?</h3>
            </div>
            <Link to="/contact" className="btn-ink shrink-0">
              Get In Touch <Arrow />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Page>
  );
}

/* ── A wireframe stack layer (hardware / cloud) ─────────── */
function Layer({
  layer,
  variant,
}: {
  layer: { label: string; tag: string; items: string[] };
  variant: "steel" | "navy";
}) {
  const bg = variant === "steel" ? "bg-steel" : "bg-navy";
  return (
    <div className={`panel ${bg} flex h-full flex-col p-6 text-cream`}>
      <div className="flex items-center justify-between">
        <Tag className="text-mustard">{layer.tag}</Tag>
        <span className="font-mono text-[10px] text-mint">● ONLINE</span>
      </div>
      <h3 className="display mt-3 text-2xl">{layer.label}</h3>
      <ul className="mt-4 space-y-2.5 font-mono text-[12.5px]">
        {layer.items.map((it) => (
          <li key={it} className="flex items-center gap-2.5 border-b border-cream/10 pb-2.5 text-cream/85">
            <span className="text-coral">▹</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
