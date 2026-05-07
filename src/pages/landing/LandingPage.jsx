import { useState, useEffect, useRef } from "react";
import "../../css/landing/common.css";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`landing-nav${scrolled ? " scrolled" : ""}`}>
      <span className="nav-logo grad-text">ODEX</span>
      <ul className="nav-links">
        {["À propos", "Programmes", "Olympiades", "Contact"].map(l => (
          <li key={l}><a href="#" className="nav-link-el">{l}</a></li>
        ))}
        <li>
          <a href="/prepa-info/" className="nav-link-el nav-link-cyan">Prépa Info ↗</a>
        </li>
      </ul>
      <a href="#contact" className="btn-primary-el nav-btn-sm">Rejoindre</a>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      <p className="hero-tagline anim-1">
        Du Maroc vers le monde · Association fondée 2025
      </p>

      <h1 className="hero-h1 anim-2">
        Built to<br />
        <span className="grad-text serif-italic">unlock your</span><br />
        potential.
      </h1>

      <p className="hero-body anim-3">
        From potential to exceptional — ODEX accompagne les étudiants marocains vers les meilleures universités, grandes écoles et carrières du monde entier.
      </p>

      <div className="hero-ctas anim-4">
        <a href="#contact" className="btn-primary-el">Rejoindre ODEX</a>
        <a href="/prepa-info/" className="btn-ghost-el">Accéder à Prépa Info →</a>
      </div>

      <div className="hero-stats anim-5">
        {[["2", "Pays"], ["∞", "Ambition"], ["01", "Mission"]].map(([n, l]) => (
          <div key={l}>
            <div className="hero-stat-num grad-text">{n}</div>
            <div className="hero-stat-label">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Prépa Bac", "Prépa CPGE", "Concours Après Bac", "Math Olympiad", "Webinaires & Ressources", "Du Maroc vers le Monde", "Mentorat", "Grandes Écoles", "Universités Mondiales"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal();
  return (
    <section className="about-section">
      <div ref={ref} className="reveal about-grid">
        <div>
          <p className="about-label">Notre mission</p>
          <h2 className="about-heading">
            No one gets<br />there
            <span className="grad-text serif-italic"> alone.</span>
          </h2>
        </div>
        <div className="about-body">
          <p>ODEX n'est pas là pour sélectionner les meilleurs. Nous sommes là pour maximiser le potentiel de chaque étudiant — lycéen, préparationnaire, universitaire — et les accompagner vers la meilleure version d'eux-mêmes.</p>
          <p>Ingénieurs, enseignants, chercheurs de haut calibre — ce sont des destins qui se construisent avec les bonnes personnes, les bonnes ressources, et une communauté qui croit en toi avant même que tu y croies toi-même. Du Maroc vers le monde entier.</p>
        </div>
      </div>
    </section>
  );
}

// ── PILLARS ───────────────────────────────────────────────────────────────────
const PILLARS = [
  { n: "01", icon: "📖", title: "Prépa Bac", text: "Mathématiques, Physique-Chimie, Sciences de l'Ingénieur et Informatique — toutes les matières scientifiques du bac marocain, avec cours, exercices et webinaires live." },
  { n: "02", icon: "🎯", title: "Prépa CPGE", text: "Ressources ciblées pour les filières MP, PC, PSI, PT — Maths, Physique, SII et Informatique. Annales, méthodes et mentorat par des étudiants en grandes écoles d'ingénieurs." },
  { n: "03", icon: "🏛️", title: "Concours Après Bac", text: "Orientation et préparation aux concours post-bac scientifiques — grandes écoles d'ingénieurs, filières informatique et IA, physique appliquée — en France, au Maroc et à l'international." },
  { n: "04", icon: "🌍", title: "Mobilité Internationale", text: "Campus France, bourses, équivalences, logement — tout le soutien concret pour franchir le pas vers les meilleures universités du monde." },
  { n: "05", icon: "🏆", title: "Math Olympiad", text: "L'ODEX Math Olympiad — notre compétition phare pour les esprits les plus affûtés, ouverte aux lycéens et préparationnaires du Maroc et du monde." },
  { n: "06", icon: "🤝", title: "Mentorat & Réseau", text: "Alumni dans les grandes écoles françaises, les universités américaines, les entreprises du CAC40 — connectés à toi, pour que tu ne partes pas seul." },
];

function Pillars() {
  const ref = useReveal();
  return (
    <section className="pillars-section">
      <div className="pillars-inner">
        <div ref={ref} className="reveal pillars-header">
          <h2 className="pillars-heading">Ce que<br />nous faisons.</h2>
          <p className="pillars-label">Six piliers</p>
        </div>
        <div className="pillars-grid">
          {PILLARS.map((p, i) => <PillarCard key={p.n} {...p} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, icon, title, text, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal pillar-card"
      style={{ '--reveal-delay': `${delay}s` }}
    >
      <div className="pillar-glow-el" />
      <div className="pillar-num">{n}</div>
      <div className="pillar-icon">{icon}</div>
      <div className="pillar-title">{title}</div>
      <div className="pillar-text">{text}</div>
    </div>
  );
}

// ── PROGRAM CARDS ─────────────────────────────────────────────────────────────
const BAC_ITEMS = [
  "Mathématiques — cours, exercices et annales corrigées",
  "Physique-Chimie — fiches de révision et méthodes",
  "Sciences de l'Ingénieur — mécanique, électricité, automatique",
  "Informatique — algorithmique, Python, bases de données",
  "Webinaires live avant les examens nationaux",
];

const PREPA_ITEMS = [
  "Mathématiques — MP, PC, PSI, PT — cours & colles",
  "Physique & Chimie — annales commentées des concours",
  "Sciences Industrielles de l'Ingénieur (SII)",
  "Informatique — algo, structures de données, SQL, IA",
  "Mentorat par des étudiants en grandes écoles d'ingénieurs",
];

const CONCOURS_ITEMS = [
  "Concours ingénieurs — CentraleSupélec, Mines, Polytechnique",
  "Informatique & IA — écoles spécialisées et masters",
  "Sciences Industrielles — filières mécanique & automatique",
  "Physique appliquée — ENS, Institut d'Optique, ESPCI",
  "Universités internationales STEM — MIT, ETH, TU Berlin",
];

function ProgramCard({ badge, badgeColor, title, italic, body, items, accent, cta }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal program-card">
      <div className="program-accent-bar" style={{ background: accent }} />
      <div>
        <div
          className="program-badge"
          style={{ color: badgeColor, border: `1px solid ${badgeColor}44` }}
        >{badge}</div>
        <h2 className="program-card-heading">
          {title}<br />
          <span
            className="serif-italic"
            style={{ background: accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >{italic}</span>
        </h2>
        <p className="program-card-body">{body}</p>
        <a href="#contact" className="btn-primary-el" style={{ background: accent }}>{cta}</a>
      </div>
      <div className="program-items">
        {items.map((item, i) => (
          <div
            key={i}
            className="program-item"
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${badgeColor}55`; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
          >
            <span className="program-item-dot" style={{ color: badgeColor }}>✦</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Programs() {
  return (
    <section className="programs-section">
      <div className="programs-header">
        <p className="programs-label">Nos programmes</p>
        <h2 className="programs-heading">
          Chaque étape.<br />
          <span className="grad-text serif-italic">Chaque niveau.</span>
        </h2>
      </div>

      <ProgramCard
        badge="📖 Ouvert aux inscriptions"
        badgeColor="#00D4FF"
        title="ODEX"
        italic="Prépa Bac"
        body="Un accompagnement complet pour réussir le baccalauréat marocain — toutes les matières, toutes les filières. Des cours structurés, des webinaires live et un suivi personnalisé pour décrocher la mention que tu mérites."
        items={BAC_ITEMS}
        accent="linear-gradient(90deg, #00D4FF, #00ffaa)"
        cta="Rejoindre la Prépa Bac"
      />

      <ProgramCard
        badge="🎯 Bientôt disponible"
        badgeColor="#9B40FF"
        title="ODEX"
        italic="Prépa CPGE"
        body="Les classes préparatoires sont exigeantes. ODEX te donne les ressources des meilleurs — annales, méthodes, mentorat par des étudiants en grandes écoles — pour que la prépa soit une rampe de lancement, pas un mur."
        items={PREPA_ITEMS}
        accent="linear-gradient(90deg, #9B40FF, #00D4FF)"
        cta="Être notifié au lancement"
      />

      <ProgramCard
        badge="🏛️ Bientôt disponible"
        badgeColor="#f472b6"
        title="Concours"
        italic="Après Bac"
        body="Le bac en poche, la vraie question commence : et maintenant ? ODEX t'oriente et te prépare aux concours post-bac scientifiques — grandes écoles d'ingénieurs, filières informatique et IA, physique appliquée — en France et dans les meilleures universités STEM du monde."
        items={CONCOURS_ITEMS}
        accent="linear-gradient(90deg, #f472b6, #9B40FF)"
        cta="Être notifié au lancement"
      />
    </section>
  );
}

// ── OLYMPIAD ──────────────────────────────────────────────────────────────────
const MATH = [
  { eq: <>∀ε &gt; 0, ∃δ &gt; 0 : |x − a| &lt; δ ⟹ |<span className="text-cyan">f(x) − L</span>| &lt; ε</> },
  { eq: <>∑<sub>n=1</sub><sup>∞</sup> 1/n² = <span className="text-cyan">π²/6</span></> },
  { eq: <>e<sup>iπ</sup> + 1 = <span className="text-cyan">0</span></> },
  { eq: <>P(A|B) = P(B|A) · P(A) / <span className="text-cyan">P(B)</span></> },
  { eq: <>det(AB) = <span className="text-cyan">det(A)</span> · det(B)</> },
];

function Olympiad() {
  const ref = useReveal();
  return (
    <section className="olympiad-section">
      <div ref={ref} className="reveal olympiad-card">
        <div className="olympiad-accent-bar" />
        <div>
          <div className="olympiad-badge">🔢 Bientôt disponible</div>
          <h2 className="olympiad-heading">
            ODEX<br />Math{" "}
            <span className="grad-text serif-italic">Olympiad</span>
          </h2>
          <p className="olympiad-body">
            Une compétition mathématique internationale pensée pour les esprits les plus curieux — lycéens et préparationnaires du Maroc et du monde entier, réunis autour de problèmes qui ne s'inventent pas.
          </p>
          <a href="#contact" className="btn-primary-el">Être notifié au lancement</a>
        </div>
        <div className="math-rows">
          {MATH.map((m, i) => (
            <div key={i} className="math-row">{m.eq}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CORRIDOR ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Prépa Bac", text: "On commence ici — révision structurée, méthodes, webinaires et suivi pour réussir le bac marocain avec les meilleures mentions." },
  { n: "02", title: "Prépa CPGE & Concours", text: "Intégration en classe préparatoire ou orientation vers les concours post-bac — en France, au Maroc, au Canada, aux États-Unis." },
  { n: "03", title: "Mobilité & Admission", text: "Campus France, dossiers d'admission, bourses, équivalences — on t'accompagne dans chaque étape administrative pour que rien ne te bloque." },
  { n: "04", title: "Du Maroc vers le monde", text: "Grandes écoles françaises, universités américaines, MIT, Polytechnique — le monde est la destination, pas juste une ville." },
];

const FLAGS = ["🇲🇦", "→", "🇫🇷", "🇺🇸", "🇨🇦", "🇬🇧", "🌍"];

function Corridor() {
  const refL = useReveal();
  const refR = useReveal();
  return (
    <section className="corridor-section">
      <div className="corridor-inner">
        <div ref={refL} className="reveal">
          <div className="corridor-flags">
            {FLAGS.map((f, i) => (
              f === "→"
                ? <span key={i} className="corridor-flag-arrow">{f}</span>
                : <span key={i} className="corridor-flag-emoji" style={{ animationDelay: `${i * 0.4}s` }}>{f}</span>
            ))}
          </div>
          <h2 className="corridor-heading">
            Du Maroc<br />
            <span className="grad-text">vers le monde.</span>
          </h2>
          <p className="corridor-body">
            Le Maroc est notre point de départ, pas notre plafond. ODEX construit le chemin de A à Z — du bac jusqu'aux meilleures institutions mondiales — avec les outils, les mentors et la communauté pour y arriver.
          </p>
        </div>
        <div ref={refR} className="reveal">
          {STEPS.map(s => (
            <div key={s.n} className="step-row">
              <span className="step-num">{s.n}</span>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-text">{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useReveal();

  const handleSubmit = () => {
    if (email.includes("@")) { setDone(true); setEmail(""); }
  };

  return (
    <section className="cta-section">
      <p className="cta-label">Rejoindre le mouvement</p>
      <h2 ref={ref} className="reveal cta-heading">
        Built for those<br />who refuse
        <span className="grad-text serif-italic"> to settle.</span>
      </h2>
      <p className="cta-sub">
        {done ? "✓ Reçu — on revient vers toi au lancement 🚀" : "From potential to exceptional. Rejoins le mouvement."}
      </p>
      {!done && (
        <div className="cta-form">
          <input
            className="cta-input-el"
            type="email"
            placeholder="ton.email@exemple.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          <button className="btn-primary-el" onClick={handleSubmit}>Rejoindre</button>
        </div>
      )}
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer-inner">
        <span className="footer-logo grad-text">ODEX</span>
        <span className="footer-copy">Association Loi 1901 · Du Maroc vers le Monde · 2025</span>
        <div className="footer-links">
          {[["Instagram", "#"], ["LinkedIn", "#"], ["contact@odex.fr", "#"]].map(([l, h]) => (
            <a key={l} href={h} className="footer-link-el">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="landing-root">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <div className="section-divider" />
      <Pillars />
      <Programs />
      <Olympiad />
      <Corridor />
      <CTA />
      <Footer />
    </div>
  );
}
