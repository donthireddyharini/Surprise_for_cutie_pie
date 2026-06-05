import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, EndingQuote } from "./SectionShell";
import { FloatingParticles } from "./FloatingParticles";

const reasons = [
  "Your smile that lights up every room",
  "Your kindness, soft yet unstoppable",
  "The way your laugh becomes my favorite sound",
  "Your strength in moments no one sees",
  "How you care for everyone around you",
  "The way your eyes hold whole galaxies",
  "Your dreams, and how fiercely you chase them",
  "The little things only I notice you do",
  "How you make ordinary days feel like magic",
  "Just… you. Every part of you.",
  "Your courage to be yourself, always",
  "The warmth you bring into every moment",
];

export function ReasonsSection({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  return (
    <SectionShell title="100 Reasons Why You're Special" onBack={onBack} onHome={onHome}>
      <FloatingParticles variant="sparkles" count={14} />
      <div className="max-w-2xl mx-auto px-2 mb-8 rounded-2xl overflow-hidden shadow-lg">
        <img src="/images/reasons.png" alt="Reasons you're special" className="w-full h-auto object-contain" />
      </div>
      <p className="text-center text-muted-foreground mb-8 italic">
        Tap each heart to reveal a reason
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {reasons.map((r, i) => {
          const isOpen = revealed.has(i);
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                setRevealed((s) => {
                  const n = new Set(s);
                  n.add(i);
                  return n;
                })
              }
              className="relative aspect-square rounded-2xl glass p-3 flex items-center justify-center text-center overflow-hidden"
              style={{
                boxShadow: isOpen
                  ? "0 0 30px oklch(0.82 0.14 85 / 0.6)"
                  : "var(--shadow-soft)",
              }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.p
                    key="r"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs sm:text-sm font-display text-foreground/90 leading-snug"
                  >
                    {r}
                  </motion.p>
                ) : (
                  <motion.span
                    key="h"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 3, opacity: 0 }}
                    className="text-3xl"
                  >
                    💗
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <EndingQuote text="You make ordinary moments feel extraordinary." />
    </SectionShell>
  );
}