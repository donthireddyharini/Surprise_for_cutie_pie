import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "@/components/auth/Login";
import { HeroLanding } from "@/components/birthday/HeroLanding";
import { MemoryVault } from "@/components/birthday/MemoryVault";
import { JourneySection } from "@/components/birthday/JourneySection";
import { ReasonsSection } from "@/components/birthday/ReasonsSection";
import { WishesSection } from "@/components/birthday/WishesSection";
import { ConfessionSection } from "@/components/birthday/ConfessionSection";
import { FinalCelebration } from "@/components/birthday/FinalCelebration";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import PhotoDetail from "@/components/birthday/PhotoDetail";
import ApologyLetter from "@/components/birthday/ApologyLetter";
import { ProposalSection } from "@/components/birthday/ProposalSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday ❤" },
      { name: "description", content: "A little surprise made just for you, with all my heart." },
      { property: "og:title", content: "Happy Birthday ❤" },
      { property: "og:description", content: "A little surprise made just for you, with all my heart." },
    ],
  }),
  component: Index,
});

type View =
  | { kind: "hero" }
  | { kind: "vault" }
  | { kind: "section"; id: number }
  | { kind: "proposal" }
  | { kind: "finale"; message?: string };

function Index() {
  // Always require login on page load — clear any saved session
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.removeItem("lg_user");
      localStorage.removeItem("lg_token");
    } catch { /* ignore */ }
  }, []);

  const [view, setView] = useState<View>({ kind: "hero" });
  const [history, setHistory] = useState<View[]>([]);
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set());

  const navigate = (next: View) => {
    setView((prev) => {
      setHistory((h) => [...h, prev]);
      return next;
    });
  };

  const goBack = () => {
    setHistory((h) => {
      if (h.length === 0) {
        setView({ kind: "hero" });
        return [];
      }
      const last = h[h.length - 1];
      setView(last);
      return h.slice(0, -1);
    });
  };

  const goHome = () => {
    setView({ kind: "hero" });
    setHistory([]);
  };

  const openCard = (id: number) => {
    setUnlocked((s) => {
      const n = new Set(s);
      n.add(id);
      return n;
    });
    navigate({ kind: "section", id });
  };

  return (
    <main className="relative">
      {!user ? (
        <Login
          onLogin={(u) => {
            setUser(u);
          }}
        />
      ) : (
        <>
          
        </>
      )}
      <MusicToggle />
      <AnimatePresence mode="wait">
        {user && view.kind === "hero" && (
          <HeroLanding
            key="hero"
            onOpen={() => navigate({ kind: "vault" })}
            onPropose={() => navigate({ kind: "proposal" })}
          />
        )}
        {user && view.kind === "vault" && (
          <MemoryVault key="vault" unlocked={unlocked} onOpen={openCard} onHome={goHome} onBack={goBack} />
        )}
        {user && view.kind === "section" && view.id === 0 && (
          <JourneySection key="s0" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "section" && view.id === 1 && (
          <ReasonsSection key="s1" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "section" && view.id === 2 && (
          <WishesSection key="s2" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "section" && view.id === 3 && (
          <ConfessionSection
            key="s3"
            onBack={goBack}
            onHome={goHome}
            onYes={() => navigate({ kind: "finale" })}
            onTalk={() =>
              navigate({
                kind: "finale",
                message:
                  "Whatever you decide, today is yours — and you are loved beyond words.",
              })
            }
          />
        )}
        {user && view.kind === "proposal" && (
          <ProposalSection key="proposal" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "section" && view.id === 4 && (
          <PhotoDetail key="s4" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "section" && view.id === 5 && (
          <ApologyLetter key="s5" onBack={goBack} onHome={goHome} />
        )}
        {user && view.kind === "finale" && (
          <FinalCelebration key="finale" message={view.message} onBack={goBack} onHome={goHome} />
        )}
      </AnimatePresence>
    </main>
  );
}
