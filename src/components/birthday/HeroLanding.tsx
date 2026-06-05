import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function HeroLanding({ onOpen, onPropose }: { onOpen: () => void; onPropose: () => void }) {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/keerthi-bg.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <FloatingParticles variant="hearts" count={20} />
      <FloatingParticles variant="sparkles" count={14} />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-script text-2xl mb-3 relative z-10"
        style={{ color: "#FFFDD0" }}
      >
        a little something just for you
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-display text-5xl sm:text-7xl md:text-8xl font-semibold leading-tight relative z-10"
        style={{ color: "#FFFDD0" }}
      >
        Happy Birthday{" "}
        <span className="inline-block animate-heartbeat text-rose">❤</span>
        <br />
        <span className="text-4xl sm:text-6xl md:text-7xl" style={{ color: "#FFFDD0" }}>Keerthi</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-6 max-w-md text-base sm:text-lg italic font-display relative z-10"
        style={{ color: "#FFFDD0" }}
      >
        Today is not just your birthday, it&apos;s the day the world became
        more beautiful.
      </motion.p>



      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px -10px oklch(0.72 0.16 350 / 0.6)" }}
        whileTap={{ scale: 0.96 }}
        onClick={onOpen}
        className="relative z-10 px-8 py-4 rounded-full font-medium text-primary-foreground text-base tracking-wide"
        style={{
          background: "linear-gradient(135deg, oklch(0.75 0.18 350), oklch(0.7 0.15 320))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        Open Your Surprise ✨
      </motion.button>

      {/* Love Proposal Gift Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 mt-10 flex flex-col items-center"
      >
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            color: "#ffd6ec",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
            fontWeight: 500,
          }}
        >
          ✨ A special surprise just for you ✨
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={onPropose}
          className="flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer"
          aria-label="Open love proposal"
          style={{ background: "none" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 28px #f7258599) drop-shadow(0 0 12px #ffd16666)" }}
          >
            <ProposalGiftBoxMini />
          </motion.div>
          <span
            style={{
              background: "linear-gradient(135deg, #f72585, #7209b7)",
              color: "white",
              padding: "0.55rem 1.6rem",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              boxShadow: "0 6px 24px rgba(247,37,133,0.45)",
            }}
          >
            💍 Open the Proposal
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}

function GiftBox() {
  return (
    <div className="animate-bounce-gift">
      <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 350)" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 340)" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.14 355)" />
            <stop offset="100%" stopColor="oklch(0.7 0.18 345)" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.14 85)" />
            <stop offset="100%" stopColor="oklch(0.72 0.16 60)" />
          </linearGradient>
        </defs>
        {/* Box body */}
        <rect x="20" y="70" width="140" height="110" rx="8" fill="url(#boxGrad)" />
        {/* Lid */}
        <rect x="14" y="58" width="152" height="28" rx="6" fill="url(#lidGrad)" />
        {/* Vertical ribbon */}
        <rect x="82" y="58" width="16" height="122" fill="url(#ribbonGrad)" />
        {/* Horizontal ribbon */}
        <rect x="20" y="112" width="140" height="14" fill="url(#ribbonGrad)" />
        {/* Bow */}
        <ellipse cx="68" cy="50" rx="22" ry="16" fill="url(#ribbonGrad)" />
        <ellipse cx="112" cy="50" rx="22" ry="16" fill="url(#ribbonGrad)" />
        <circle cx="90" cy="52" r="9" fill="oklch(0.78 0.18 70)" />
        {/* Sparkles */}
        <circle cx="40" cy="40" r="2" fill="white" opacity="0.9" />
        <circle cx="150" cy="30" r="2.5" fill="white" opacity="0.8" />
        <circle cx="160" cy="100" r="2" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

function ProposalGiftBoxMini() {
  return (
    <svg width="120" height="130" viewBox="0 0 160 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pmb1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f72585" />
          <stop offset="100%" stopColor="#7209b7" />
        </linearGradient>
        <linearGradient id="pmb2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b5179e" />
          <stop offset="100%" stopColor="#560bad" />
        </linearGradient>
        <linearGradient id="pmr1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
      </defs>
      <rect x="15" y="65" width="130" height="95" rx="10" fill="url(#pmb1)" />
      <rect x="8" y="52" width="144" height="26" rx="7" fill="url(#pmb2)" />
      <rect x="72" y="52" width="16" height="108" fill="url(#pmr1)" rx="3" />
      <rect x="15" y="100" width="130" height="14" fill="url(#pmr1)" rx="3" />
      <ellipse cx="58" cy="44" rx="22" ry="14" fill="url(#pmr1)" transform="rotate(-15 58 44)" />
      <ellipse cx="102" cy="44" rx="22" ry="14" fill="url(#pmr1)" transform="rotate(15 102 44)" />
      <circle cx="80" cy="46" r="10" fill="#f4a261" />
      <circle cx="80" cy="46" r="6" fill="#ffd166" />
      <text x="80" y="94" textAnchor="middle" fontSize="24" fill="white" opacity="0.9">💍</text>
      <circle cx="28" cy="35" r="2.5" fill="white" opacity="0.9" />
      <circle cx="140" cy="28" r="2" fill="white" opacity="0.8" />
      <circle cx="148" cy="85" r="1.8" fill="white" opacity="0.9" />
    </svg>
  );
}