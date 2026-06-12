import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GLYPHS = "01アカサタナハマヤラ<>[]{}/\\=+*ZA7741CE";

/**
 * Full-screen "digital rain" — summoned by the terminal `matrix` command
 * (or the secret event). Click or press any key to exit the construct.
 */
export function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const trigger = () => setActive(true);
    window.addEventListener("matrix", trigger);
    return () => window.removeEventListener("matrix", trigger);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor((window.innerHeight / fontSize) * -0.5 - (columns ? 0 : 0)));
      // randomize start heights using index-based offset (no Math.random dependence on first frame)
      drops = drops.map((_, i) => -((i * 7) % 40));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(21, 50, 63, 0.18)"; // navy fade -> trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // leading glyph bright mint, trail coral-ish
        ctx.fillStyle = Math.random() > 0.975 ? "#FF5C46" : "#B2D8A6";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const exit = () => setActive(false);
    window.addEventListener("click", exit);
    window.addEventListener("keydown", exit);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", exit);
      window.removeEventListener("keydown", exit);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[65] cursor-pointer bg-navy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />
          <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-mint/70">
            click anywhere to wake up
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
