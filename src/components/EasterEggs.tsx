import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Brand palette for the confetti shards. */
const SHARD_COLORS = ["#FF5C46", "#F5C24B", "#A4C7E8", "#B2D8A6", "#F4B7C7", "#E23E22"];

/* The sacred sequence. */
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Shard = {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  rotate: number;
  drift: number;
  char: string | null;
};

let shardSeed = 0;
const GLYPHS = ["✳", "▰", "◆", "■", null, null, null, null];

function makeShards(count: number): Shard[] {
  return Array.from({ length: count }, () => {
    const i = shardSeed++;
    // Deterministic-enough pseudo-random spread without Math.random reliance issues.
    const r = (n: number) => ((Math.sin(i * 99.7 + n * 12.3) + 1) / 2);
    return {
      id: i,
      x: r(1) * 100,
      color: SHARD_COLORS[Math.floor(r(2) * SHARD_COLORS.length)],
      size: 10 + r(3) * 18,
      delay: r(4) * 0.5,
      rotate: (r(5) - 0.5) * 720,
      drift: (r(6) - 0.5) * 240,
      char: GLYPHS[Math.floor(r(7) * GLYPHS.length)],
    };
  });
}

/**
 * Site-wide easter eggs:
 *  - Konami code (↑↑↓↓←→←→ B A) → confetti burst + "cheat mode" toast.
 *  - Tab-blur title prank that flips back when you return.
 * Mounted once in the Layout so it covers every route.
 */
export function EasterEggs() {
  const [shards, setShards] = useState<Shard[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const idx = useRef(0);
  const toastTimer = useRef<number>();

  const celebrate = useCallback((message: string) => {
    setShards(makeShards(48));
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
    window.setTimeout(() => setShards([]), 3000);
  }, []);

  // Expose a manual trigger for other components (e.g. the logo secret).
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      celebrate(detail || "● SURPRISE UNLOCKED");
    };
    window.addEventListener("easteregg", handler);
    return () => window.removeEventListener("easteregg", handler);
  }, [celebrate]);

  // Konami listener.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx.current]) {
        idx.current += 1;
        if (idx.current === KONAMI.length) {
          idx.current = 0;
          celebrate("● CHEAT MODE ENGAGED // 30 LIVES GRANTED");
        }
      } else {
        idx.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [celebrate]);

  // Tab-blur title prank.
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? "// SYSTEM IDLE — come back :(" : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return (
    <>
      {/* Confetti burst */}
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
        <AnimatePresence>
          {shards.map((s) => (
            <motion.span
              key={s.id}
              initial={{ y: "-12vh", x: 0, opacity: 1, rotate: 0 }}
              animate={{ y: "112vh", x: s.drift, rotate: s.rotate, opacity: [1, 1, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4 + s.delay, delay: s.delay, ease: [0.3, 0.1, 0.6, 1] }}
              style={{
                position: "absolute",
                left: `${s.x}vw`,
                width: s.size,
                height: s.size,
                background: s.char ? "transparent" : s.color,
                color: s.color,
                border: s.char ? "none" : "2px solid #16140F",
                fontSize: s.size + 4,
                lineHeight: 1,
                display: "grid",
                placeItems: "center",
              }}
            >
              {s.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 60, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: -1.5 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed bottom-6 left-1/2 z-[61] -translate-x-1/2 border-2 border-ink bg-ink px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-mint shadow-brutal"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
