import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag, Reveal, Arrow } from "../components/ui";
import { riseItem, staggerParent } from "../components/motion";
import { projects, accentBg } from "../lib/data";

const statusColor: Record<string, string> = {
  SHIPPED: "bg-mint",
  ONGOING: "bg-mustard",
  ARCHIVED: "bg-sky",
};

export function Projects() {
  return (
    <Page>
      <Container className="py-12 sm:py-16">
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={riseItem}>
            <Tag dot="bg-coral" className="text-ink/60">
              FILE_02 // ARCHIVE
            </Tag>
            <h1 className="display mt-4 text-5xl sm:text-7xl">
              PROJECT <span className="italic text-rust">ARCHIVE</span>
            </h1>
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
              A catalog of systems built to survive contact with reality. Each entry is a
              real artifact — click through for specs, decisions, and the things that broke.
            </p>
          </motion.div>

          {/* legend */}
          <motion.div variants={riseItem} className="mt-7 flex flex-wrap gap-2">
            {Object.entries(statusColor).map(([k, c]) => (
              <span key={k} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                <span className={`h-3 w-3 border-2 border-ink ${c}`} />
                {k}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="h-full">
                <Link to={`/projects/${p.slug}`} className="panel noise group flex h-full flex-col overflow-hidden">
                  {/* preview header */}
                  <div className="relative grid h-44 place-items-center overflow-hidden border-b-2 border-ink bg-navy">
                    {p.image && p.mobile ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center gap-3"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 30% 20%, rgba(124,110,230,.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(90,140,230,.4), transparent 50%), linear-gradient(#1b1530, #1b1530)",
                        }}
                      >
                        {(p.gallery ?? [p.image]).slice(0, 2).map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={p.title}
                            className="h-[86%] w-auto rounded-xl border-2 border-ink/70 object-contain shadow-brutal-sm transition-transform duration-500 group-hover:-translate-y-1"
                          />
                        ))}
                      </div>
                    ) : p.image ? (
                      <>
                        <img
                          src={p.image}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      </>
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(244,241,232,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(244,241,232,.25) 1px,transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                        <span className="font-display text-7xl font-900 text-cream/15">{p.index}</span>
                      </>
                    )}
                    <span className={`sticker absolute right-3 top-3 ${statusColor[p.status]} text-ink`}>
                      {p.status}
                    </span>
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-cream/70">
                      PROJ_{p.index} // {p.year}
                    </span>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="display text-2xl transition-colors group-hover:text-rust">{p.title}</h2>
                    <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink/70">{p.blurb}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t, ti) => (
                        <span key={t} className={`sticker ${accentBg[(["coral", "mustard", "sky", "bubble", "mint"] as const)[ti % 5]]} text-ink`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="dotted mt-auto h-0.5 w-full opacity-40" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/45">
                        {p.stack.slice(0, 3).join(" / ")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-rust">
                        Open <Arrow className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Page>
  );
}
