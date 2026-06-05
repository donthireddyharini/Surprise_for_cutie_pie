import { SectionShell } from "./SectionShell";

export function PhotoDetail({ onBack, onHome }: { onBack: () => void; onHome?: () => void }) {
  return (
    <SectionShell title="Photo Story" onBack={onBack} onHome={onHome}>
      <div className="max-w-3xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src="/images/photo-story.png"
          alt="Our beautiful moment"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="prose max-w-3xl mx-auto text-lg">
        <p>
          Ee photo ChatGPT photo ne kakapothe, dheni lo entha memory vundho thelusa? ❤️
          Neku gurtu vunda? Manam first time direct ga bayata kalusukunam aroju, nuvvu
          periods tho vachav park ki. Iddaram anukokunda same blue color dress
          vesukunam. 💙 Adhe mana first time direct ga kalusukovadam, inka okari hand
          inkokaru pattukovadam. 🤝❤️ Nuvvu ee black dress lo photo story pettina roje,
          🖤 nenu anukokunda aa black jacket lo photo thesukuna. Naku aa old photo
          dhorakale; Risitha ani adigithe, avi delete chesesa ani cheppindi. 😔 So naku
          malli aa moment recreate cheyali anipinchindi. ✨ Anduke ChatGPT use chesi
          try chesa. Keerthi, nuvvu chance isthe direct ga ne chedam. ❤️✨🥹
        </p>
      </div>
    </SectionShell>
  );
}

export default PhotoDetail;
