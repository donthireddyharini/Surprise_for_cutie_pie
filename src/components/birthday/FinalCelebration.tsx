import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function FinalCelebration({ message, onHome, onBack }: { message?: string; onHome?: () => void; onBack?: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden"
    >
      <FloatingParticles variant="hearts" count={26} />
      <FloatingParticles variant="sparkles" count={20} />
      <Fireworks />
      <Confetti />
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 font-display text-5xl sm:text-7xl font-semibold text-gradient-rose"
      >
        Best Birthday Ever ❤
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-6 font-script text-2xl sm:text-3xl text-primary max-w-xl"
      >
        {message ?? "Thank you for being the most beautiful part of my story."}
      </motion.p>
      {onHome && (
        <button
          onClick={onHome}
          className="absolute left-4 bottom-6 text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm z-20"
        >
          ⤺ Home
        </button>
      )}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute right-4 bottom-6 text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm z-20"
        >
          ← Back
        </button>
      )}
    </motion.section>
  );
}

function Fireworks() {
  const bursts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: 10 + Math.random() * 50,
    left: 10 + Math.random() * 80,
    color: ["oklch(0.78 0.18 350)", "oklch(0.82 0.14 85)", "oklch(0.78 0.1 300)"][i % 3],
    delay: i * 0.4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {bursts.map((b) => (
        <motion.div
          key={b.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 2], opacity: [1, 0.8, 0] }}
          transition={{ duration: 2, delay: b.delay, repeat: Infinity, repeatDelay: 2 }}
          className="absolute rounded-full"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: 120,
            height: 120,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 60%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const bits = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    color: ["oklch(0.78 0.18 350)", "oklch(0.82 0.14 85)", "oklch(0.78 0.1 300)", "oklch(0.88 0.06 340)"][i % 4],
    rotate: Math.random() * 360,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            top: "-20px",
            width: 8,
            height: 14,
            background: b.color,
            transform: `rotate(${b.rotate}deg)`,
            animation: `float-up ${b.duration}s linear ${b.delay}s infinite reverse`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}