import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

type Card = {
  id: number;
  title: string;
  hint: string;
  emoji: string;
  accent: string;
};

const CARDS: Card[] = [
  { id: 0, title: "Our Beautiful Journey", hint: "moments we made together", emoji: "🌷", accent: "oklch(0.78 0.16 350)" },
  { id: 1, title: "100 Reasons Why You're Special", hint: "everything I adore about you", emoji: "💗", accent: "oklch(0.82 0.14 85)" },
  { id: 2, title: "My Wishes For You", hint: "a letter under the stars", emoji: "🌙", accent: "oklch(0.78 0.1 300)" },
  { id: 3, title: "The Secret I've Been Waiting To Tell You", hint: "from the deepest part of my heart", emoji: "💖", accent: "oklch(0.7 0.2 10)" },
  { id: 4, title: "Photo Story", hint: "a moment frozen in time", emoji: "📸", accent: "oklch(0.78 0.12 330)" },
  { id: 5, title: "Please Give Me Another Chance", hint: "an apology from my heart", emoji: "✉️", accent: "oklch(0.75 0.18 20)" },
];

export function MemoryVault({
  unlocked,
  onOpen,
  onHome,
  onBack,
}: {
  unlocked: Set<number>;
  onOpen: (id: number) => void;
  onHome?: () => void;
  onBack?: () => void;
}) {
  const total = CARDS.length;
  const count = unlocked.size;
  const allUnlocked = count === total;

  return (
    <section className="relative min-h-screen px-5 py-12 overflow-hidden">
      {/* Bottom-left Home (black text) and bottom-right Back buttons - page-local */}
      {onHome && (
        <button
          onClick={onHome}
          className="absolute left-4 bottom-6 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium hover:bg-white/30"
          aria-label="Go to home"
          style={{ color: "#000000" }}
        >
          ⤺ Home
        </button>
      )}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute right-4 bottom-6 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium hover:bg-white/30"
          aria-label="Go back"
          style={{ color: "#000000" }}
        >
          ← Back
        </button>
      )}
      <FloatingParticles variant="hearts" count={10} />
      <FloatingParticles variant="sparkles" count={10} />

      <div className="max-w-md mx-auto text-center mb-10 relative z-10">
        <p className="font-script text-xl text-primary">the memory vault</p>
        <h2 className="font-display text-4xl sm:text-5xl mt-2 text-gradient-rose">
          Unlock Your Surprises
        </h2>
        <p className="text-sm text-muted-foreground mt-3 italic">
          Open them one by one — there&apos;s magic in every card.
        </p>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span className="font-medium text-primary">{count}/{total}</span>
          </div>
          <div className="h-2 rounded-full bg-white/60 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${(count / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 80 }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.18 350), oklch(0.82 0.14 85))",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto relative z-10">
        {CARDS.map((c, i) => {
          const isUnlocked = unlocked.has(c.id);
          const isLast = c.id === 3;
          const lockedByGate = isLast && unlocked.size < 3;
          const canOpen = !lockedByGate || isUnlocked;
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={canOpen ? { y: -4, scale: 1.01 } : {}}
              whileTap={canOpen ? { scale: 0.97 } : {}}
              onClick={() => canOpen && onOpen(c.id)}
              disabled={!canOpen}
              className="relative text-left rounded-3xl p-6 glass overflow-hidden disabled:opacity-60"
              style={{
                boxShadow: isUnlocked
                  ? `0 0 40px ${c.accent}`
                  : "var(--shadow-soft)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-50"
                style={{ background: c.accent }}
              />
              <div className="relative flex items-start justify-between mb-3">
                <span className="text-4xl">{c.emoji}</span>
                <span className="text-xl">
                  {isUnlocked ? "✓" : lockedByGate ? "✨🔒" : "🔒"}
                </span>
              </div>
              <h3 className="relative font-display text-xl font-semibold leading-tight">
                {c.title}
              </h3>
              <p className="relative text-xs text-muted-foreground mt-2 italic">
                {lockedByGate && !isUnlocked
                  ? "unlock the others first…"
                  : c.hint}
              </p>
            </motion.button>
          );
        })}
      </div>

      {allUnlocked && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10 font-script text-2xl text-primary relative z-10"
        >
          every secret is yours now ✨
        </motion.p>
      )}
    </section>
  );
}