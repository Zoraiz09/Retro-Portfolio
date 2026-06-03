import { Link } from "react-router-dom";
import { profile, navLinks } from "../lib/data";
import { Marquee } from "./Marquee";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export function Footer() {
  return (
    <footer className="mt-24">
      <Marquee
        items={["OPEN TO OPPORTUNITIES", "SYSTEMS ENGINEERING", "LET'S BUILD SOMETHING", "AI / ML", "DISTRIBUTED SYSTEMS"]}
        className="bg-mustard"
        speed="animate-marquee-slow"
      />
      <div className="bg-navy text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center border-2 border-cream bg-coral font-display text-base font-900">
                  Z
                </span>
                <span className="font-display text-lg font-900 uppercase tracking-tight">{profile.name}</span>
              </div>
              <p className="mt-4 max-w-xs font-mono text-sm leading-relaxed text-cream/70">
                Engineering things that hold up under load — and look good doing it.
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mustard">
                <span className="mr-2 inline-block h-2 w-2 animate-blink bg-mint align-middle" />
                {profile.status}
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">Sitemap</p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="font-mono text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-coral"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40">Channels</p>
              <ul className="mt-4 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-coral"
                    >
                      <span className="text-coral transition-transform group-hover:translate-x-0.5">→</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dotted mt-12 h-0.5 w-full opacity-20" />
          <div className="mt-6 flex flex-col items-start justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50 sm:flex-row sm:items-center">
            <span>© 2026 {profile.name} — Built for the chaos.</span>
            <span>SYS_ID // {profile.systemId}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
