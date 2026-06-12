import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Page, Container } from "../components/Layout";
import { Tag } from "../components/ui";

export function NotFound() {
  return (
    <Page>
      <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <Tag dot="bg-coral" className="text-ink/60">
            ERROR // SIGNAL_LOST
          </Tag>
          <h1 className="display mt-5 text-[22vw] leading-none sm:text-9xl">
            4
            <motion.span
              className="inline-block cursor-grab italic text-rust"
              animate={{ x: [0, -2, 2, -1, 1, 0], opacity: [1, 0.6, 1, 0.8, 1] }}
              transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 2.4 }}
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.85, rotate: 12 }}
            >
              0
            </motion.span>
            4
          </h1>
          <p className="mt-4 font-mono text-sm text-ink/65">
            This file was never written, or has been purged from the archive.
          </p>
          <Link to="/" className="btn-coral mt-8">
            Return To Base
          </Link>
        </div>
      </Container>
    </Page>
  );
}
