import type { Variants } from "framer-motion";

/** Shared page transition — used by every route for consistency. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], when: "beforeChildren", staggerChildren: 0.07 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

/** Item reveal that snaps up with a brutalist overshoot. */
export const riseItem: Variants = {
  initial: { opacity: 0, y: 28 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/** Scroll-triggered reveal for sections further down the page. */
export const revealOnScroll: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
