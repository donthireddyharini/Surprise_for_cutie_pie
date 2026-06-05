import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "intro" | "letter" | "kneel" | "ring" | "yes" | "no";

export function ProposalSection({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [stageHistory, setStageHistory] = useState<Stage[]>([]);
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number; duration: number; size: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ["#ff6b9d", "#ff8fab", "#ffb3c6", "#ffc8dd", "#ff85a1", "#f72585", "#e63946"];
    setPetals(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 8 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, []);

  const goToStage = (next: Stage) => {
    setStageHistory((h) => [...h, stage]);
    setStage(next);
  };

  const advance = () => {
    if (stage === "intro") goToStage("letter");
    else if (stage === "letter") goToStage("kneel");
    else if (stage === "kneel") goToStage("ring");
  };

  const handleBack = () => {
    if (stageHistory.length === 0) {
      onBack();
    } else {
      const prev = stageHistory[stageHistory.length - 1];
      setStageHistory((h) => h.slice(0, -1));
      setStage(prev);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a0015 0%, #1a0030 35%, #2d0050 65%, #0f001a 100%)",
      }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Falling petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -60, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: 360, opacity: [1, 1, 0.7, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              width: p.size,
              height: p.size,
              borderRadius: "50% 0 50% 0",
              background: p.color,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-5 left-5 z-50 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all hover:border-white/40"
      >
        ← Back
      </button>
      {onHome && (
        <button
          onClick={onHome}
          className="absolute top-5 right-5 z-50 text-white/70 hover:text-white text-sm px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all hover:border-white/40"
        >
          ⤺ Home
        </button>
      )}

      {/* Moon */}
      <div
        className="absolute top-10 right-16 z-0"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fffbe6, #ffd166)",
          boxShadow: "0 0 40px 20px rgba(255,209,102,0.18), 0 0 80px 40px rgba(255,209,102,0.08)",
        }}
      />

      <AnimatePresence mode="wait">
        {/* ── STAGE 1: INTRO ── */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg"
          >
            {/* Glowing gift box */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
              style={{ filter: "drop-shadow(0 0 32px #f72585aa)" }}
            >
              <ProposalGiftBox />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "Georgia, serif", color: "#ffd6ec", fontSize: "1.1rem", letterSpacing: "0.05em" }}
              className="mb-2 italic"
            >
              A special gift awaits…
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                background: "linear-gradient(135deg, #ff6b9d, #ffd166, #ff6b9d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Something from the heart
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.07, boxShadow: "0 0 40px #f72585aa" }}
              whileTap={{ scale: 0.95 }}
              onClick={advance}
              style={{
                background: "linear-gradient(135deg, #f72585, #b5179e)",
                color: "white",
                border: "none",
                padding: "1rem 2.5rem",
                borderRadius: "999px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
                boxShadow: "0 8px 32px rgba(247,37,133,0.45)",
              }}
            >
              Open the Gift 🎁
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 2: LOVE LETTER ── */}
        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.9, type: "spring" }}
            className="relative z-20 max-w-md w-full mx-auto px-6"
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,107,157,0.3)",
                borderRadius: "24px",
                padding: "2.5rem",
                boxShadow: "0 30px 80px rgba(247,37,133,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-4xl text-center mb-4">💌</div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.6rem",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #ff6b9d, #ffd166)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "1.5rem",
                }}
              >
                My Dearest Keerthi,
              </h2>
              <div style={{ color: "rgba(255,230,240,0.9)", lineHeight: 1.85, fontFamily: "Georgia, serif", fontSize: "0.97rem" }}>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-3">
                  From the very first moment I saw you, something shifted inside me — quietly, gently, irreversibly.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-3">
                  Every laugh we shared, every late-night conversation, every small glance — they all added up to something I can no longer imagine living without.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  You are the poem I never knew I was writing. And tonight, under a sky full of stars, I want to ask you something that my heart has been whispering for a long time…
                </motion.p>
              </div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #f72585aa" }}
                whileTap={{ scale: 0.95 }}
                onClick={advance}
                style={{
                  marginTop: "2rem",
                  width: "100%",
                  background: "linear-gradient(135deg, #f72585, #b5179e)",
                  color: "white",
                  border: "none",
                  padding: "0.9rem",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(247,37,133,0.4)",
                }}
              >
                Continue… 💕
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── STAGE 3: BOY KNEELING SCENE ── */}
        {stage === "kneel" && (
          <motion.div
            key="kneel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl w-full"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "Georgia, serif",
                color: "#ffd6ec",
                fontSize: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              ✨ Under the stars ✨
            </motion.p>

            {/* Scene */}
            <div className="relative w-full" style={{ maxWidth: 520, margin: "0 auto" }}>
              {/* Ground / path */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 90,
                  background: "linear-gradient(180deg, transparent, rgba(247,37,133,0.08) 60%, rgba(181,23,158,0.18))",
                  borderRadius: "0 0 24px 24px",
                }}
              />
              {/* Rose petals on ground */}
              {["10%", "25%", "40%", "60%", "75%", "88%"].map((l, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    bottom: 12 + (i % 3) * 8,
                    left: l,
                    fontSize: "1rem",
                    opacity: 0.7,
                    transform: `rotate(${i * 40}deg)`,
                  }}
                >
                  🌹
                </span>
              ))}

              {/* SVG Scene */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, type: "spring" }}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(247,37,133,0.4), 0 0 120px rgba(114,9,183,0.25)",
                  border: "2px solid rgba(247,37,133,0.35)",
                }}
              >
                <img
                  src="/images/love-proposal.jpg"
                  alt="Love proposal scene"
                  style={{
                    width: "100%",
                    display: "block",
                    maxHeight: "420px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                background: "linear-gradient(135deg, #ff6b9d, #ffd166, #ff85a1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              He's been waiting for this moment…
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{ color: "rgba(255,214,236,0.8)", fontFamily: "Georgia, serif", fontSize: "0.95rem", marginBottom: "1.8rem" }}
            >
              His heart racing, hands trembling, love overflowing…
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: "spring" }}
              whileHover={{ scale: 1.07, boxShadow: "0 0 50px #ffd16688" }}
              whileTap={{ scale: 0.95 }}
              onClick={advance}
              style={{
                background: "linear-gradient(135deg, #ffd166, #f72585)",
                color: "white",
                border: "none",
                padding: "1.1rem 3rem",
                borderRadius: "999px",
                fontSize: "1.15rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(247,37,133,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              See what he has… 💍
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 4: RING REVEAL + QUESTION ── */}
        {stage === "ring" && (
          <motion.div
            key="ring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg w-full"
          >
            {/* Glowing ring */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
              style={{
                marginBottom: "2rem",
                filter: "drop-shadow(0 0 40px #ffd16699) drop-shadow(0 0 80px #f7258555)",
              }}
            >
              <RingBox />
            </motion.div>

            {/* Sparkle burst */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: "2rem", letterSpacing: "0.5rem", marginBottom: "1.5rem" }}
            >
              ✨💍✨
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring" }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                background: "linear-gradient(135deg, #ff6b9d, #ffd166, #ff6b9d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Will You Be Mine?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                color: "rgba(255,214,236,0.9)",
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: 360,
              }}
            >
              I don't want to spend another day without you. You are my home, my heartbeat, my everything.
              <br /><br />
              <em>Keerthi, will you be my love — forever?</em>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex gap-5 flex-wrap justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 50px #4ade8088" }}
                whileTap={{ scale: 0.92 }}
                onClick={() => goToStage("yes")}
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  border: "none",
                  padding: "1rem 2.8rem",
                  borderRadius: "999px",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(34,197,94,0.45)",
                  letterSpacing: "0.03em",
                }}
              >
                💚 Yes, Forever!
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => goToStage("no")}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,200,220,0.8)",
                  border: "1px solid rgba(255,107,157,0.3)",
                  padding: "1rem 2.2rem",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                🤍 Not Yet…
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ── STAGE 5: YES ── */}
        {stage === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-lg"
          >
            {/* Firework emojis */}
            {["🎆", "🎇", "🎊", "🎉", "💖", "🌹", "✨", "💍"].map((e, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 300 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1, 0.5], x: 0, y: 0 }}
                transition={{ delay: i * 0.1, duration: 1.5 }}
                style={{ position: "absolute", fontSize: "2rem", pointerEvents: "none" }}
              >
                {e}
              </motion.span>
            ))}

            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              style={{ fontSize: "6rem", marginBottom: "1.5rem" }}
            >
              💍
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 3.2rem)",
                background: "linear-gradient(135deg, #ffd166, #ff6b9d, #ffd166)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              She said YES! 💖
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                color: "rgba(255,230,240,0.95)",
                fontFamily: "Georgia, serif",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              This is the beginning of our forever. <br />
              Every heartbeat, every breath, every morning — <br />
              <strong style={{ color: "#ffd166" }}>all yours, always.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ fontSize: "2.5rem", letterSpacing: "0.4rem", marginBottom: "2rem" }}
            >
              🌹❤️🌹
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHome}
              style={{
                background: "linear-gradient(135deg, #f72585, #b5179e)",
                color: "white",
                border: "none",
                padding: "0.9rem 2.5rem",
                borderRadius: "999px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(247,37,133,0.45)",
              }}
            >
              ⤺ Back to Home 🏠
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE 6: NOT YET ── */}
        {stage === "no" && (
          <motion.div
            key="no"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-md"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "5rem", marginBottom: "1.5rem" }}
            >
              🥺
            </motion.div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                color: "#ffd6ec",
                marginBottom: "1rem",
              }}
            >
              That's okay…
            </h2>
            <p
              style={{
                color: "rgba(255,214,236,0.85)",
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              He'll wait. No matter how long it takes. <br />
              Because loving you is enough — even if you need more time. <br />
              <em style={{ color: "#ffd166" }}>He's not going anywhere. 💛</em>
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.07, boxShadow: "0 0 40px #f7258555" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStage("ring")}
                style={{
                  background: "linear-gradient(135deg, #f72585, #b5179e)",
                  color: "white",
                  border: "none",
                  padding: "0.9rem 2rem",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(247,37,133,0.4)",
                }}
              >
                💕 Give him another chance?
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onHome}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,200,220,0.8)",
                  border: "1px solid rgba(255,107,157,0.3)",
                  padding: "0.9rem 1.8rem",
                  borderRadius: "999px",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                ⤺ Home
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

/* ── Gift Box SVG for Proposal ── */
function ProposalGiftBox() {
  return (
    <svg width="160" height="170" viewBox="0 0 160 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pb1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f72585" />
          <stop offset="100%" stopColor="#7209b7" />
        </linearGradient>
        <linearGradient id="pb2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b5179e" />
          <stop offset="100%" stopColor="#560bad" />
        </linearGradient>
        <linearGradient id="pr1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Box body */}
      <rect x="15" y="65" width="130" height="95" rx="10" fill="url(#pb1)" filter="url(#glow)" />
      {/* Lid */}
      <rect x="8" y="52" width="144" height="26" rx="7" fill="url(#pb2)" />
      {/* Ribbon vertical */}
      <rect x="72" y="52" width="16" height="108" fill="url(#pr1)" rx="3" />
      {/* Ribbon horizontal */}
      <rect x="15" y="100" width="130" height="14" fill="url(#pr1)" rx="3" />
      {/* Bow left */}
      <ellipse cx="58" cy="44" rx="22" ry="14" fill="url(#pr1)" transform="rotate(-15 58 44)" />
      {/* Bow right */}
      <ellipse cx="102" cy="44" rx="22" ry="14" fill="url(#pr1)" transform="rotate(15 102 44)" />
      {/* Bow center */}
      <circle cx="80" cy="46" r="10" fill="#f4a261" />
      <circle cx="80" cy="46" r="6" fill="#ffd166" />
      {/* Heart on box */}
      <text x="80" y="94" textAnchor="middle" fontSize="24" fill="white" opacity="0.9">💕</text>
      {/* Sparkles */}
      <circle cx="28" cy="35" r="2.5" fill="white" opacity="0.9" />
      <circle cx="140" cy="28" r="2" fill="white" opacity="0.8" />
      <circle cx="148" cy="85" r="1.8" fill="white" opacity="0.9" />
      <circle cx="12" cy="100" r="1.5" fill="white" opacity="0.7" />
    </svg>
  );
}

/* ── Boy Proposing Scene SVG ── */
function ProposalScene() {
  return (
    <svg width="100%" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0015" />
          <stop offset="100%" stopColor="#2d0050" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d0066" />
          <stop offset="100%" stopColor="#1a0030" />
        </linearGradient>
        <radialGradient id="spotlight" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(247,37,133,0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="boyShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4361ee" />
          <stop offset="100%" stopColor="#3a0ca3" />
        </linearGradient>
        <linearGradient id="girlDress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f72585" />
          <stop offset="100%" stopColor="#7209b7" />
        </linearGradient>
        <linearGradient id="ringGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="360" fill="url(#sky)" />
      <rect y="260" width="520" height="100" fill="url(#ground)" />
      <ellipse cx="260" cy="260" rx="260" ry="40" fill="url(#spotlight)" />

      {/* Stars */}
      {[40, 90, 150, 200, 300, 380, 430, 480, 60, 350].map((x, i) => (
        <circle key={i} cx={x} cy={20 + (i % 5) * 18} r={1 + (i % 2)} fill="white" opacity={0.5 + (i % 3) * 0.15} />
      ))}

      {/* Moon */}
      <circle cx="450" cy="50" r="28" fill="#ffd166" opacity="0.9" />
      <circle cx="460" cy="42" r="22" fill="#2d0050" opacity="0.95" />

      {/* Floating hearts */}
      <text x="230" y="80" fontSize="18" opacity="0.7">💖</text>
      <text x="310" y="100" fontSize="14" opacity="0.6">💕</text>
      <text x="260" y="60" fontSize="12" opacity="0.5">❤️</text>

      {/* Rose petals on ground */}
      {[130,170,210,290,330,370].map((x, i) => (
        <ellipse key={i} cx={x} cy={268 + (i % 2) * 6} rx="7" ry="4" fill="#f72585" opacity="0.6" transform={`rotate(${i*30} ${x} 270)`} />
      ))}

      {/* ─── BOY (kneeling on left side) ─── */}
      {/* Boy - body / shirt */}
      <rect x="148" y="188" width="46" height="52" rx="8" fill="url(#boyShirt)" />
      {/* Boy - head */}
      <circle cx="171" cy="172" r="26" fill="#c8956c" />
      {/* Boy - hair */}
      <ellipse cx="171" cy="152" rx="26" ry="14" fill="#1a0a00" />
      <rect x="145" y="152" width="52" height="10" rx="5" fill="#1a0a00" />
      {/* Boy - face: eyes */}
      <circle cx="162" cy="170" r="3.5" fill="#1a0a00" />
      <circle cx="180" cy="170" r="3.5" fill="#1a0a00" />
      {/* Boy - face: smile */}
      <path d="M163 181 Q171 188 179 181" stroke="#7a4a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Boy - kneeling leg (bent) */}
      <rect x="148" y="232" width="22" height="30" rx="6" fill="#2b2d42" />
      <rect x="152" y="258" width="30" height="14" rx="5" fill="#1a1a2e" />
      {/* Boy - other leg (on ground) */}
      <ellipse cx="175" cy="268" rx="18" ry="10" fill="#2b2d42" />
      {/* Boy - arm extending ring */}
      <rect x="190" y="202" width="50" height="14" rx="7" fill="#c8956c" />
      {/* Ring box in hand */}
      <rect x="236" y="192" width="22" height="18" rx="4" fill="#7209b7" />
      <rect x="236" y="188" width="22" height="8" rx="3" fill="#b5179e" />
      <ellipse cx="247" cy="188" rx="6" ry="4" fill="url(#ringGlow)" filter="url(#glow2)" />
      {/* Ring sparkle */}
      <circle cx="247" cy="184" r="3" fill="#ffd166" opacity="0.95" filter="url(#glow2)" />
      <text x="240" y="183" fontSize="10" fill="#ffd166" opacity="0.8">✦</text>

      {/* ─── GIRL (standing on right side) ─── */}
      {/* Girl - dress */}
      <path d="M310 200 Q290 240 285 280 L360 280 Q355 240 335 200 Z" fill="url(#girlDress)" />
      {/* Girl - body */}
      <rect x="307" y="185" width="48" height="38" rx="10" fill="#e8a87c" />
      {/* Girl - head */}
      <circle cx="331" cy="164" r="28" fill="#c8956c" />
      {/* Girl - hair */}
      <ellipse cx="331" cy="144" rx="28" ry="14" fill="#0d0208" />
      <rect x="303" y="144" width="56" height="40" rx="6" fill="#0d0208" />
      <ellipse cx="303" cy="175" rx="10" ry="22" fill="#0d0208" />
      <ellipse cx="359" cy="175" rx="10" ry="22" fill="#0d0208" />
      {/* Girl - face: eyes with eyelashes */}
      <circle cx="322" cy="162" r="4" fill="#1a0a00" />
      <circle cx="340" cy="162" r="4" fill="#1a0a00" />
      <line x1="320" y1="155" x2="316" y2="151" stroke="#0d0208" strokeWidth="1.5" />
      <line x1="322" y1="154" x2="322" y2="149" stroke="#0d0208" strokeWidth="1.5" />
      <line x1="324" y1="155" x2="328" y2="151" stroke="#0d0208" strokeWidth="1.5" />
      <line x1="338" y1="155" x2="334" y2="151" stroke="#0d0208" strokeWidth="1.5" />
      <line x1="340" y1="154" x2="340" y2="149" stroke="#0d0208" strokeWidth="1.5" />
      <line x1="342" y1="155" x2="346" y2="151" stroke="#0d0208" strokeWidth="1.5" />
      {/* Girl - blush */}
      <ellipse cx="314" cy="170" rx="7" ry="4" fill="#f72585" opacity="0.3" />
      <ellipse cx="348" cy="170" rx="7" ry="4" fill="#f72585" opacity="0.3" />
      {/* Girl - smile */}
      <path d="M323 175 Q331 183 339 175" stroke="#7a4a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Girl - hand over mouth (surprised) */}
      <ellipse cx="325" cy="182" rx="12" ry="8" fill="#c8956c" />
      {/* Girl - arms */}
      <rect x="290" y="196" width="18" height="38" rx="8" fill="#e8a87c" transform="rotate(10 290 196)" />
      <rect x="344" y="196" width="18" height="38" rx="8" fill="#e8a87c" transform="rotate(-10 362 196)" />

      {/* Floating sparkles between them */}
      <text x="265" y="230" fontSize="16" opacity="0.8">✨</text>
      <text x="252" y="210" fontSize="12" opacity="0.6">💫</text>

      {/* Ground roses */}
      <text x="130" y="290" fontSize="16">🌹</text>
      <text x="160" y="285" fontSize="14">🌹</text>
      <text x="355" y="290" fontSize="16">🌹</text>
      <text x="385" y="285" fontSize="14">🌹</text>
    </svg>
  );
}

/* ── Open Ring Box SVG ── */
function RingBox() {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rbBox" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7209b7" />
          <stop offset="100%" stopColor="#3a0ca3" />
        </linearGradient>
        <linearGradient id="rbLid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b5179e" />
          <stop offset="100%" stopColor="#7209b7" />
        </linearGradient>
        <linearGradient id="rbInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0f6" />
          <stop offset="100%" stopColor="#ffd6ec" />
        </linearGradient>
        <linearGradient id="rbRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f4a261" />
        </linearGradient>
        <filter id="ringGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Box base */}
      <rect x="30" y="100" width="140" height="70" rx="12" fill="url(#rbBox)" />
      {/* Inner cushion */}
      <rect x="40" y="108" width="120" height="54" rx="8" fill="url(#rbInner)" />
      {/* Ring cushion ridge */}
      <ellipse cx="100" cy="130" rx="30" ry="10" fill="#ffc8dd" opacity="0.6" />
      {/* Ring */}
      <ellipse cx="100" cy="118" rx="22" ry="8" stroke="url(#rbRing)" strokeWidth="7" fill="none" filter="url(#ringGlow)" />
      {/* Diamond */}
      <polygon points="100,96 110,108 100,114 90,108" fill="white" opacity="0.95" filter="url(#ringGlow)" />
      <polygon points="100,96 110,108 100,102" fill="#b0e0ff" opacity="0.9" />
      <polygon points="100,96 90,108 100,102" fill="#ddf0ff" opacity="0.9" />
      {/* Diamond sparkles */}
      <circle cx="100" cy="94" r="3" fill="white" opacity="0.9" />
      <line x1="100" y1="88" x2="100" y2="92" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="94" y1="90" x2="97" y2="93" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="106" y1="90" x2="103" y2="93" stroke="white" strokeWidth="1.5" opacity="0.9" />
      {/* Open lid */}
      <path d="M30 100 Q30 40 100 20 Q170 40 170 100" fill="url(#rbLid)" />
      <path d="M40 100 Q40 52 100 34 Q160 52 160 100" fill="url(#rbBox)" opacity="0.6" />
      {/* Lid inner satin */}
      <path d="M48 100 Q50 58 100 42 Q150 58 152 100" fill="url(#rbInner)" opacity="0.5" />
      {/* Sparkles */}
      <text x="28" y="55" fontSize="14">✨</text>
      <text x="155" y="45" fontSize="14">✨</text>
      <text x="88" y="28" fontSize="12">💎</text>
    </svg>
  );
}
