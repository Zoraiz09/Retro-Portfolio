import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { revealOnScroll } from "./motion";

/* ── System label / eyebrow ─────────────────────────────── */
export function Tag({
  children,
  className = "",
  dot,
}: {
  children: ReactNode;
  className?: string;
  dot?: string;
}) {
  return (
    <span className={`tag ${className}`}>
      {dot && <span className={`h-2 w-2 ${dot} border border-ink`} />}
      {children}
    </span>
  );
}

/* ── Sticker badge ──────────────────────────────────────── */
export function Sticker({
  children,
  className = "",
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span className={`sticker ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

/* ── Generic brutalist panel ────────────────────────────── */
export function Panel({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  const Comp = motion[as];
  return <Comp className={`panel ${className}`}>{children}</Comp>;
}

/* ── Scroll reveal wrapper ──────────────────────────────── */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={revealOnScroll}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section header (label + display title) ─────────────── */
export function SectionHeader({
  label,
  title,
  accent = "text-rust",
}: {
  label: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="mb-8">
      <Tag className="text-ink/60">{label}</Tag>
      <h2 className="display mt-3 text-4xl sm:text-5xl">
        <span className={`italic ${accent}`}>{title}</span>
      </h2>
    </div>
  );
}

/* ── Link button (router-aware) ─────────────────────────── */
export function LinkButton({
  to,
  children,
  variant = "ink",
  external,
}: {
  to: string;
  children: ReactNode;
  variant?: "ink" | "coral" | "ghost";
  external?: boolean;
}) {
  const cls = variant === "coral" ? "btn-coral" : variant === "ghost" ? "btn-ghost" : "btn-ink";
  if (external) {
    return (
      <a href={to} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

/* ── Arrow glyph ────────────────────────────────────────── */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

/* ── GitHub mark ────────────────────────────────────────── */
export function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

/* ── LinkedIn mark ──────────────────────────────────────── */
export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ── Mail / envelope mark ───────────────────────────────── */
export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="0.5" strokeLinejoin="miter" />
      <path d="M3 6l9 7 9-7" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/* ── View-code button (handles repo not-yet-provided) ───── */
export function RepoButton({
  repo,
  variant = "ink",
  className = "",
}: {
  repo: string;
  variant?: "ink" | "coral";
  className?: string;
}) {
  const cls = variant === "coral" ? "btn-coral" : "btn-ink";
  if (!repo) {
    return (
      <button
        type="button"
        disabled
        title="Repository link coming soon"
        className={`${cls} cursor-not-allowed opacity-60 ${className}`}
      >
        <GitHubIcon /> Code Soon
      </button>
    );
  }
  return (
    <a href={repo} target="_blank" rel="noreferrer" className={`${cls} ${className}`}>
      <GitHubIcon /> View Code
    </a>
  );
}
