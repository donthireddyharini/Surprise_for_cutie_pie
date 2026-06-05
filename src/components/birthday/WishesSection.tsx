import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";

const letter = `My dearest,

On your special day, I wish you skies full of soft mornings and golden evenings. I wish you laughter that echoes, dreams that come true, and love that finds you in every season.

May your year be gentle where you need rest, brave where you need courage, and bright in every place that matters.

You deserve every beautiful thing this world can offer — and so much more.

— Always yours.`;

export function WishesSection({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(letter.slice(0, i));
      if (i >= letter.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionShell title="My Wishes For You" onBack={onBack} onHome={onHome} dark>
      <Stars />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative max-w-xl mx-auto glass-dark rounded-3xl p-7 sm:p-10"
        style={{ boxShadow: "0 0 50px oklch(0.7 0.15 280 / 0.4)" }}
      >
        <pre className="font-script text-xl sm:text-2xl leading-relaxed whitespace-pre-wrap text-white/95">
          {text}
          <span className="inline-block w-[2px] h-6 bg-accent ml-0.5 animate-pulse align-middle" />
        </pre>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="font-script text-2xl text-center mt-10 text-accent"
      >
        &ldquo;I hope every dream you have finds its way to you.&rdquo;
      </motion.p>
    </SectionShell>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 3,
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