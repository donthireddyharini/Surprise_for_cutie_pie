import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Soft royalty-free romantic loop
const TRACK_URL =
  "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d654.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-4 right-4 z-50 h-12 w-12 rounded-full glass flex items-center justify-center text-xl"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <motion.span
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: "linear" }}
      >
        {playing ? "🎵" : "🎶"}
      </motion.span>
    </motion.button>
  );
}