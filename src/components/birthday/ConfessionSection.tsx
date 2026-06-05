import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

const lines = [
  "Through every conversation, every smile, every memory, my feelings kept growing.",
  "You became someone incredibly special to me.",
  "And today, on your birthday, I want to tell you something from my heart...",
];

export function ConfessionSection({
  onYes,
  onTalk,
  onBack,
  onHome,
}: {
  onYes: () => void;
  onTalk: () => void;
  onBack: () => void;
  onHome?: () => void;
}) {
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (stage >= lines.length) return;
    setTyped("");
    const line = lines[stage];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
        setTimeout(() => setStage((s) => s + 1), 1600);
      }
    }, 45);
    return () => clearInterval(id);
  }, [stage]);

  const showLove = stage >= lines.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden text-white"
      style={{ background: "var(--gradient-night)" }}
    >
      <StarsDeep />
      <FloatingParticles variant="petals" count={14} />

      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-sm glass-dark px-3 py-1.5 rounded-full text-white/80"
      >
        ←
      </button>

      {onHome && (
        <button
          onClick={onHome}
          className="absolute left-6 bottom-6 text-sm glass-dark px-3 py-1.5 rounded-full text-white/80"
          aria-label="Go to home page"
        >
          ⤺ Home
        </button>
      )}

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!showLove ? (
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-display text-2xl sm:text-3xl italic min-h-[120px] leading-relaxed"
            >
              {typed}
              <span className="inline-block w-[2px] h-6 bg-accent ml-1 animate-pulse align-middle" />
            </motion.p>
          ) : (
            <motion.div
              key="love"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="font-display text-6xl sm:text-8xl font-semibold text-gradient-gold"
                style={{ filter: "drop-shadow(0 0 30px oklch(0.85 0.14 85 / 0.6))" }}
              >
                I Love You ❤
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-10 text-lg sm:text-xl font-display italic text-white/90 leading-relaxed"
              >
                Will you make me the happiest person and give us a chance to
                create even more beautiful memories together?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={onYes}
                  className="px-8 py-4 rounded-full font-medium text-white text-base"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.2 10), oklch(0.6 0.22 350))",
                    boxShadow: "0 0 40px oklch(0.7 0.2 10 / 0.6)",
                  }}
                >
                  💖 Yes
                </button>
                <button
                  onClick={onTalk}
                  className="px-8 py-4 rounded-full font-medium text-base glass-dark text-white"
                >
                  😊 Let&apos;s Talk About It
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function StarsDeep() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 6px white",
          }}
        />
      ))}
    </div>
  );
}