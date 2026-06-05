import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionShell({
  title,
  children,
  onBack,
  dark = false,
  onHome,
}: {
  title: string;
  children: ReactNode;
  onBack: () => void;
  onHome?: () => void;
  dark?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className={`relative min-h-screen px-5 py-16 ${dark ? "text-white" : ""}`}
      style={dark ? { background: "var(--gradient-night)" } : undefined}
    >
      <button
        onClick={onBack}
        className={`mb-8 text-sm font-medium px-4 py-2 rounded-full ${
          dark ? "glass-dark text-white/90" : "glass text-foreground/70"
        }`}
      >
        ← Back
      </button>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl sm:text-5xl text-center mb-12"
      >
        <span className={dark ? "text-gradient-gold" : "text-gradient-rose"}>{title}</span>
      </motion.h2>
      {children}
      {onHome && (
        <button
          onClick={onHome}
          className="absolute left-4 bottom-6 z-20 text-sm font-medium px-4 py-2 rounded-full glass"
          aria-label="Go to home page"
        >
          ⤺ Home
        </button>
      )}
    </motion.section>
  );
}

export function EndingQuote({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="font-script text-2xl sm:text-3xl text-center mt-16 text-primary px-4"
    >
      &ldquo;{text}&rdquo;
    </motion.p>
  );
}