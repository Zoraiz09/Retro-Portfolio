import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Wraps an element so it's gently pulled toward the cursor while hovered,
 * then springs back on leave. Great for hero CTAs and social tiles.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
