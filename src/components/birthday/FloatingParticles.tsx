import { useMemo } from "react";

type Variant = "hearts" | "sparkles" | "petals" | "stars";

const SYMBOLS: Record<Variant, string[]> = {
  hearts: ["❤", "💖", "💕", "💗"],
  sparkles: ["✨", "·", "✦", "✧"],
  petals: ["🌸", "🌹", "❀"],
  stars: ["✦", "✧", "★", "✩"],
};

export function FloatingParticles({
  variant = "hearts",
  count = 18,
  className = "",
}: {
  variant?: Variant;
  count?: number;
  className?: string;
}) {
  const items = useMemo(() => {
    const pool = SYMBOLS[variant];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: pool[i % pool.length],
      left: Math.random() * 100,
      size: 10 + Math.random() * 22,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      opacity: 0.4 + Math.random() * 0.5,
    }));
  }, [variant, count]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}
      aria-hidden
    >
      {items.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            bottom: "-40px",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            filter: "drop-shadow(0 0 6px rgba(255,182,193,0.6))",
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}