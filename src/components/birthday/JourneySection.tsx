import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { SectionShell, EndingQuote } from "./SectionShell";

const memories = [
  { date: "The First Hello", caption: "The day our story quietly began.", emoji: "🌷", image: "/images/journey1.png" },
  { date: "Late Night Talks", caption: "Hours felt like minutes with you.", emoji: "🌙", image: "/images/journey2.png" },
  { date: "That One Laugh", caption: "I'll never forget how hard we laughed.", emoji: "🎀", image: "/images/journey3.png" },
  { date: "Little Moments", caption: "The ordinary days you made golden.", emoji: "✨", image: "/images/journey4.png" },
  { date: "Today", caption: "Another beautiful chapter, just for you.", emoji: "💖", image: "/images/journey5.png" },
];

export function JourneySection({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  return (
    <SectionShell title="Our Beautiful Journey" onBack={onBack} onHome={onHome}>
      <FloatingParticles variant="hearts" count={12} />
      <div className="relative max-w-2xl mx-auto px-2">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-rose/40 to-transparent" />
        <div className="space-y-8">
          {memories.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-16"
            >
              <div className="absolute left-2 top-2 h-8 w-8 rounded-full glass flex items-center justify-center text-base">
                {m.emoji}
              </div>
              <Polaroid date={m.date} caption={m.caption} rotation={i % 2 === 0 ? -2 : 2} image={m.image} />
            </motion.div>
          ))}
        </div>
        <EndingQuote text="Every memory with you became one of my favorite stories." />
      </div>
    </SectionShell>
  );
}

function Polaroid({ date, caption, rotation, image }: { date: string; caption: string; rotation: number; image: string }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.02 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="bg-white/90 p-3 pb-5 rounded-sm shadow-xl max-w-sm"
    >
      <div
        className="aspect-[4/3] rounded-sm overflow-hidden"
      >
        <img
          src={image}
          alt={date}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      </div>
      <p className="font-script text-xl text-center mt-3 text-foreground/80">{date}</p>
      <p className="text-xs text-center text-muted-foreground italic mt-1">{caption}</p>
    </motion.div>
  );
}