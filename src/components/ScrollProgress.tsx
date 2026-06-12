import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Brutalist scroll-progress bar pinned under the navbar.
 * Reads page scroll and renders a coral fill with a hard ink edge.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-40 h-1 origin-left border-b-2 border-ink bg-coral"
      aria-hidden
    />
  );
}
