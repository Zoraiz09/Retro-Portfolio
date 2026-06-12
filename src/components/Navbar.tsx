import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { navLinks } from "../lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const logoControls = useAnimationControls();
  const taps = useRef(0);

  // Tapping the logo spins it; a quick 5-tap combo fires a confetti easter egg.
  const onLogoTap = () => {
    taps.current += 1;
    logoControls.start({ rotate: [0, 360], transition: { duration: 0.5, ease: "easeInOut" } });
    if (taps.current >= 5) {
      taps.current = 0;
      window.dispatchEvent(
        new CustomEvent("easteregg", { detail: "● YOU FOUND THE Z // KEEP DIGGING" }),
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5" onClick={onLogoTap}>
          <motion.span
            animate={logoControls}
            className="grid h-8 w-8 place-items-center border-2 border-ink bg-coral font-display text-base font-900 text-cream shadow-brutal-sm"
          >
            Z
          </motion.span>
          <span className="font-display text-sm font-800 uppercase tracking-[0.12em]">
            Zoraiz Arshad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  isActive ? "text-rust" : "text-ink hover:text-coral"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-rust"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden btn-coral sm:inline-flex">
            Let&apos;s Talk
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center border-2 border-ink bg-paper shadow-brutal-sm md:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-4 bg-ink transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-4 bg-ink transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t-2 border-ink bg-cream md:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-ink/10 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] ${
                      isActive ? "text-rust" : "text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-coral my-3 w-full"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
