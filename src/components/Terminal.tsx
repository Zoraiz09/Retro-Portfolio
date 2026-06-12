import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { profile, projects } from "../lib/data";

type Line = { kind: "in" | "out" | "sys" | "err" | "link"; text: string; href?: string };

const BANNER: Line[] = [
  { kind: "sys", text: "ZORAIZ.SYS // interactive shell v1.0" },
  { kind: "out", text: "Type 'help' for commands. Press Esc to close." },
];

/**
 * A real, navigable command terminal hidden behind the `/` key (or the ›_ launcher).
 * Routes around the site, prints info, and triggers the other easter eggs.
 */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Global hotkey to summon the shell.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (!open && (e.key === "/" || (e.key === "`" && !typing)) && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (open && e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, open]);

  const print = (...out: Line[]) => setLines((l) => [...l, ...out]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    print({ kind: "in", text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);

    const [name, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (name) {
      case "help":
        print(
          { kind: "out", text: "AVAILABLE COMMANDS" },
          { kind: "out", text: "  help        this list" },
          { kind: "out", text: "  whoami      who is this guy" },
          { kind: "out", text: "  ls          list projects" },
          { kind: "out", text: "  open <n>    open project n (e.g. open 2)" },
          { kind: "out", text: "  goto <pg>   home | about | projects | startup | contact" },
          { kind: "out", text: "  social      links to find me" },
          { kind: "out", text: "  resume      view background" },
          { kind: "out", text: "  matrix      enter the construct" },
          { kind: "out", text: "  confetti    you deserve it" },
          { kind: "out", text: "  coffee      fuel status" },
          { kind: "out", text: "  sudo        ...go on, try it" },
          { kind: "out", text: "  clear       wipe the screen" },
          { kind: "out", text: "  exit        close terminal" },
        );
        break;
      case "whoami":
        print(
          { kind: "out", text: `${profile.name} — ${profile.role}` },
          { kind: "out", text: profile.headline },
          { kind: "out", text: `@ ${profile.school} · ${profile.location}` },
        );
        break;
      case "ls":
      case "projects":
        print(...projects.map((p) => ({ kind: "out" as const, text: `  [${p.index}] ${p.title.padEnd(28)} ${p.status}` })));
        print({ kind: "out", text: "→ 'open 2' to launch one." });
        break;
      case "open": {
        const n = arg.replace(/^0+/, "");
        const p = projects.find((x) => x.index.replace(/^0+/, "") === n || x.slug === arg || x.title.toLowerCase() === arg);
        if (p) {
          print({ kind: "sys", text: `launching ${p.title}...` });
          setTimeout(() => { navigate(`/projects/${p.slug}`); setOpen(false); }, 450);
        } else {
          print({ kind: "err", text: `no project '${arg}'. try 'ls'.` });
        }
        break;
      }
      case "goto":
      case "cd": {
        const map: Record<string, string> = { home: "/", "~": "/", about: "/about", projects: "/projects", startup: "/startup", iris: "/startup", contact: "/contact" };
        const dest = map[arg];
        if (dest !== undefined) {
          print({ kind: "sys", text: `navigating → ${arg}` });
          setTimeout(() => { navigate(dest); setOpen(false); }, 350);
        } else {
          print({ kind: "err", text: `unknown page '${arg}'.` });
        }
        break;
      }
      case "social":
        print(
          { kind: "link", text: "GitHub   → " + profile.githubHandle, href: profile.github },
          { kind: "link", text: "LinkedIn → " + profile.linkedinHandle, href: profile.linkedin },
          { kind: "link", text: "Email    → " + profile.email, href: `mailto:${profile.email}` },
        );
        break;
      case "resume":
      case "about":
        print({ kind: "sys", text: "opening dossier..." });
        setTimeout(() => { navigate("/about"); setOpen(false); }, 350);
        break;
      case "matrix":
        print({ kind: "sys", text: "wake up, Neo... (click anywhere to exit)" });
        window.dispatchEvent(new CustomEvent("matrix"));
        setTimeout(() => setOpen(false), 600);
        break;
      case "confetti":
      case "party":
        window.dispatchEvent(new CustomEvent("easteregg", { detail: "● PARTY MODE // VIA TERMINAL" }));
        print({ kind: "out", text: "🎉 deployed." });
        break;
      case "coffee":
        print({ kind: "out", text: "☕ caffeine: ████████░░ 80% — sufficient for production." });
        break;
      case "sudo":
        print({ kind: "err", text: `${profile.githubHandle.replace("@", "")} is not in the sudoers file. This incident will be reported. 👀` });
        break;
      case "echo":
        print({ kind: "out", text: rest.length ? raw.slice(raw.indexOf(arg)) : "" });
        break;
      case "clear":
      case "cls":
        setLines(BANNER);
        break;
      case "exit":
      case "quit":
        setOpen(false);
        break;
      case "hire":
        print({ kind: "out", text: "excellent decision." }, { kind: "sys", text: "routing to contact..." });
        setTimeout(() => { navigate("/contact"); setOpen(false); }, 500);
        break;
      default:
        print({ kind: "err", text: `command not found: ${name}. try 'help'.` });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (history[next] !== undefined) { setHIdx(next); setValue(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      if (next < 0) { setHIdx(-1); setValue(""); } else { setHIdx(next); setValue(history[next]); }
    }
  };

  const color: Record<Line["kind"], string> = {
    in: "text-cream",
    out: "text-cream/80",
    sys: "text-mint",
    err: "text-coral",
    link: "text-sky underline",
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        title="Open terminal ( / )"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -3, rotate: -3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-[55] grid h-12 w-12 place-items-center border-2 border-ink bg-ink font-mono text-base font-bold text-mint shadow-brutal"
      >
        <span className="animate-pulse">›_</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              onMouseDown={(e) => e.stopPropagation()}
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="w-full max-w-xl border-2 border-ink bg-navy shadow-brutal-lg"
            >
              {/* title bar */}
              <div className="flex items-center justify-between border-b-2 border-cream/15 bg-ink px-3 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
                  zoraiz@portfolio: ~
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 border border-cream/40 bg-coral" />
                  <span className="h-2.5 w-2.5 border border-cream/40 bg-mustard" />
                  <button onClick={() => setOpen(false)} className="h-2.5 w-2.5 border border-cream/40 bg-mint" aria-label="Close" />
                </div>
              </div>

              {/* output */}
              <div ref={bodyRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
                {lines.map((l, i) =>
                  l.kind === "link" && l.href ? (
                    <a key={i} href={l.href} target="_blank" rel="noreferrer" className={`block whitespace-pre-wrap ${color[l.kind]} hover:text-coral`}>
                      {l.text}
                    </a>
                  ) : (
                    <div key={i} className={`whitespace-pre-wrap ${color[l.kind]}`}>
                      {l.kind === "in" ? <span className="text-mint">$ </span> : null}
                      {l.text}
                    </div>
                  ),
                )}
              </div>

              {/* input */}
              <div className="flex items-center gap-2 border-t-2 border-cream/15 px-4 py-2.5">
                <span className="font-mono text-sm font-bold text-mint">$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="type a command…"
                  className="w-full bg-transparent font-mono text-[13px] text-cream caret-coral outline-none placeholder:text-cream/30"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
