import { SectionShell, EndingQuote } from "./SectionShell";

export function ApologyLetter({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  const letter = `I lost you because of my mistakes, but I never wanted to lose you. 💔 Last time kuda malli velli poyi gap teesukoni, malli ippudu vachanu ani anukoku. 😔 Last time naaku ardham ayindhi entante, neetho call lo maatladithe entha cheppina, adhi nenu eppudu cheppinatte untadhi kaani, neeku naa nijamaina maarpu kanipinchadhu ani. 💔 Andukane aa roju ninnu mari disturb cheyyanu ani neeku cheppi call cut chesesa. 😞🙏\n\nYou are the most important and precious person in my life, and I never want to forget any memory of you because those memories are the sweetest part of my life. ❤️ I will always try to change and prepare myself to understand you better. I never thought that I’m not your type, because I’m always willing to improve myself to become your type. Those changes never hurt me anymore, because I’m changing for the most precious person in my life—you. ✨ Yes, it may sound like I’m making ocean-deep promises, but I will always try my best to keep every promise I make to you. I love you so much. ❤️`;

  return (
    <SectionShell title="Please Give Me Another Chance" onBack={onBack} onHome={onHome} dark>
      <div className="prose max-w-3xl mx-auto mt-6 text-lg text-white">
        {letter.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <EndingQuote text="I will always try my best to keep every promise I make to you." />
    </SectionShell>
  );
}

export default ApologyLetter;
