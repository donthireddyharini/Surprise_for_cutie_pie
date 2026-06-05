import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUILT_USER = "Ammu";
const BUILT_PASS = "12022022";

export function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number; opacity: number }[]
  >([]);
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userRef.current?.focus();
    setHearts(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 22,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        opacity: 0.08 + Math.random() * 0.18,
      }))
    );
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your name and password 💌");
      triggerShake();
      return;
    }

    if (username.trim() !== BUILT_USER || password !== BUILT_PASS) {
      setError("Hmm, that doesn't seem right… try again 🥺");
      triggerShake();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        try {
          localStorage.setItem("lg_user", BUILT_USER);
          localStorage.setItem("lg_token", "1");
          onLogin(BUILT_USER);
        } catch {
          setError("Unable to save login");
        }
      }, 1200);
    }, 800);
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0d001a 0%, #1a0030 40%, #2d0050 70%, #100020 100%)",
      }}
    >
      {/* Animated star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              opacity: 0.2 + Math.random() * 0.6,
              animation: `twinkle-login ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: "110vh", x: `${h.x}vw`, opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, h.opacity, h.opacity, 0] }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: 0,
              fontSize: h.size,
              userSelect: "none",
            }}
          >
            💗
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%",
          right: "10%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(114,9,183,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Moon */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "6%",
          right: "8%",
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fffbe6, #ffd166)",
          boxShadow: "0 0 30px 12px rgba(255,209,102,0.15), 0 0 60px 30px rgba(255,209,102,0.07)",
        }}
      />

      {/* Login card */}
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="relative z-10 flex flex-col items-center text-center px-8"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
              style={{ fontSize: "5rem", marginBottom: "1rem" }}
            >
              💍
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "2rem",
                background: "linear-gradient(135deg, #ffd166, #ff6b9d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome, Ammu! 💖
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ color: "rgba(255,214,236,0.8)", fontFamily: "Georgia, serif", marginTop: "0.5rem" }}
            >
              Your surprise is ready…
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="relative z-10 w-full max-w-sm mx-auto px-4"
          >
            {/* Card */}
            <motion.form
              onSubmit={submit}
              animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(247,107,157,0.25)",
                borderRadius: "28px",
                padding: "2.5rem 2rem",
                boxShadow:
                  "0 30px 80px rgba(247,37,133,0.2), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Lock icon / ring */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="flex justify-center mb-5"
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f72585, #7209b7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    boxShadow: "0 0 30px rgba(247,37,133,0.5), 0 0 60px rgba(114,9,183,0.3)",
                  }}
                >
                  🔐
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.9rem",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #ff6b9d, #ffd166, #ff85a1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.4rem",
                  lineHeight: 1.2,
                }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  textAlign: "center",
                  color: "rgba(255,200,220,0.65)",
                  fontSize: "0.9rem",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  marginBottom: "2rem",
                }}
              >
                A little surprise is waiting for you… ✨
              </motion.p>

              {/* Username field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
                style={{ marginBottom: "1.2rem" }}
              >
                <label
                  style={{
                    display: "block",
                    color: "rgba(255,200,220,0.8)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.45rem",
                  }}
                >
                  Your Name
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.1rem",
                      pointerEvents: "none",
                    }}
                  >
                    🌸
                  </span>
                  <input
                    ref={userRef}
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                    placeholder="Enter your name"
                    autoComplete="username"
                    style={{
                      width: "100%",
                      paddingLeft: "2.8rem",
                      paddingRight: "1rem",
                      paddingTop: "0.8rem",
                      paddingBottom: "0.8rem",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(247,107,157,0.3)",
                      borderRadius: "14px",
                      color: "rgba(255,240,248,0.95)",
                      fontSize: "1rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(247,37,133,0.7)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(247,37,133,0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(247,107,157,0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                style={{ marginBottom: "1.6rem" }}
              >
                <label
                  style={{
                    display: "block",
                    color: "rgba(255,200,220,0.8)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.45rem",
                  }}
                >
                  Secret Password
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.1rem",
                      pointerEvents: "none",
                    }}
                  >
                    🔑
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter your secret key"
                    autoComplete="current-password"
                    style={{
                      width: "100%",
                      paddingLeft: "2.8rem",
                      paddingRight: "3rem",
                      paddingTop: "0.8rem",
                      paddingBottom: "0.8rem",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(247,107,157,0.3)",
                      borderRadius: "14px",
                      color: "rgba(255,240,248,0.95)",
                      fontSize: "1rem",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(247,37,133,0.7)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(247,37,133,0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(247,107,157,0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                      opacity: 0.7,
                      padding: 0,
                    }}
                    tabIndex={-1}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      color: "#ff8fab",
                      fontSize: "0.88rem",
                      textAlign: "center",
                      marginBottom: "1rem",
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(247,37,133,0.6)" }}
                whileTap={{ scale: 0.96 }}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  background: loading
                    ? "rgba(247,37,133,0.4)"
                    : "linear-gradient(135deg, #f72585, #b5179e)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.05em",
                  boxShadow: "0 8px 32px rgba(247,37,133,0.4)",
                  transition: "background 0.3s",
                }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block" }}
                    >
                      💫
                    </motion.span>
                    Opening your surprise…
                  </span>
                ) : (
                  "Open My Surprise 💖"
                )}
              </motion.button>

              {/* Divider hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  textAlign: "center",
                  color: "rgba(255,200,220,0.35)",
                  fontSize: "0.75rem",
                  marginTop: "1.5rem",
                  fontFamily: "Georgia, serif",
                }}
              >
                Made with ❤️ just for you
              </motion.p>
            </motion.form>

            {/* Decorative hearts below card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "1.4rem",
                letterSpacing: "0.4rem",
                opacity: 0.5,
              }}
            >
              🌸 💗 🌸
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle-login {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        input::placeholder {
          color: rgba(255,200,220,0.35);
        }
      `}</style>
    </div>
  );
}

export default Login;
