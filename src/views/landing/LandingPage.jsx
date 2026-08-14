import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../../components/useMediaQuery.jsx";

function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 900px)");
  return { isMobile, isTablet };
}

const C = {
  cyan: "#00D4FF", purple: "#9B40FF",
  bg: "#06060E", surface: "#0D0D1A",
  border: "rgba(255,255,255,0.06)",
  text: "#FFFFFF", muted: "rgba(255,255,255,0.38)",
};
const grad = "linear-gradient(90deg, #00D4FF, #9B40FF)";

// ── REVEAL HOOK ───────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (!isTablet) setMenuOpen(false); }, [isTablet]);

  const links = [
    { label: "À propos", href: "#about" },
    { label: "Programmes", href: "#programs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding: isTablet ? "16px 24px" : "20px 48px",
        borderBottom:`1px solid ${scrolled ? "rgba(255,255,255,0.08)" : C.border}`,
        backdropFilter:"blur(20px)",
        background: scrolled ? "rgba(6,6,14,0.95)" : "rgba(6,6,14,0.6)",
        transition:"background .3s, border-color .3s",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src="/pivot-icon.svg" alt="Pivot" style={{ width:50, height:50 }} />
          <span style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.5px" }} className="grad-text">PIVOT</span>
        </div>

        <ul className="nav-links-desktop" style={{ display:"flex", gap:32, listStyle:"none" }}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link-el">{link.label}</a>
            </li>
          ))}
          <li>
            <a href="/cpge/" className="nav-link-el nav-link-cyan">Prépa Info ↗</a>
          </li>
        </ul>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {!isTablet && <a href="#contact" className="btn-primary-el" style={{ padding:"8px 20px", fontSize:10 }}>Rejoindre</a>}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position:"fixed", top:0, left:0, right:0, bottom:0,
          background:"rgba(6,6,14,0.98)", zIndex:490,
          display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", gap:36, backdropFilter:"blur(20px)",
        }}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link-el" style={{ fontSize:20, letterSpacing:3 }}
              onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="/cpge/" className="nav-link-el nav-link-cyan" style={{ fontSize:20, letterSpacing:3 }}
            onClick={() => setMenuOpen(false)}>Prépa Info ↗</a>
          <a href="#contact" className="btn-primary-el" onClick={() => setMenuOpen(false)}>Rejoindre</a>
        </div>
      )}
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";

  return (
    <section style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:`140px ${px} 100px`, position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)", top:"50%", left:"30%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(155,64,255,0.08) 0%,transparent 70%)", top:"40%", right:"5%", transform:"translate(40%,-50%)", pointerEvents:"none" }} />

      <p className="anim-1" style={{ fontFamily:"'DM Mono',monospace", fontSize:isMobile?9:10, letterSpacing:isMobile?2:4, textTransform:"uppercase", color:C.cyan, marginBottom:24 }}>
        Prépa Informatique · MP · PC · PSI · PT
      </p>

      <h1 className="anim-2" style={{ fontSize:"clamp(42px,9vw,112px)", fontWeight:800, lineHeight:0.93, letterSpacing:"-3px", position:"relative", zIndex:1 }}>
        Built to<br />
        <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>unlock your</span><br />
        potential.
      </h1>

      <p className="anim-3" style={{ maxWidth:500, margin:"28px auto 0", fontFamily:"'DM Mono',monospace", fontSize:isMobile?12:13, lineHeight:1.9, color:C.muted, fontWeight:300, position:"relative", zIndex:1 }}>
        From potential to exceptional — tout ce qu'il te faut pour exceller en informatique, au même endroit.
      </p>

      <div className="anim-3" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginTop:20, position:"relative", zIndex:1 }}>
        {["Cours", "Checklist programme", "Aide mémoire", "Concours corrigés"].map(tag => (
          <span key={tag} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:1, color:C.cyan, border:`1px solid rgba(0,212,255,0.25)`, padding:"4px 12px", borderRadius:100 }}>{tag}</span>
        ))}
      </div>

      <div className="anim-4" style={{ display:"flex", gap:12, justifyContent:"center", marginTop:40, position:"relative", zIndex:1, flexWrap:"wrap" }}>
        <a href="/cpge/" className="btn-primary-el">Accéder à la plateforme</a>
        <a href="#about" className="btn-ghost-el">En savoir plus →</a>
      </div>

      <div className="anim-5" style={{ display:"flex", gap:isMobile?28:64, justifyContent:"center", marginTop:72, paddingTop:40, borderTop:`1px solid ${C.border}`, width:"100%", maxWidth:600, position:"relative", zIndex:1 }}>
        {[["4","Filières"],["∞","Ressources"],["01","Objectif"]].map(([n,l]) => (
          <div key={l}>
            <div className="grad-text" style={{ fontSize:isMobile?26:38, fontWeight:800, letterSpacing:"-1px" }}>{n}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.muted, marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Prépa CPGE Informatique","Algorithmique","Python","SQL & Bases de données","Structures de données","Annales CNC","Checklist Programme","Aide Mémoire","Classique Concours","MP · PC · PSI · PT"];
  const doubled = [...items,...items];
  return (
    <div style={{ overflow:"hidden", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"16px 0", background:C.surface }}>
      <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 22s linear infinite" }}>
        {doubled.map((item,i) => (
          <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:C.muted, padding:"0 32px", flexShrink:0 }}>
            <span style={{ color:C.cyan, marginRight:16 }}>✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";

  return (
    <section id="about" style={{ padding:`${isMobile?"64px":"120px"} ${px}`, maxWidth:1200, margin:"0 auto" }}>
      <div ref={ref} className="reveal" style={{ display:"grid", gridTemplateColumns:isTablet?"1fr":"1fr 1fr", gap:isTablet?36:80, alignItems:"center" }}>
        <div>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple, marginBottom:18 }}>Notre mission</p>
          <h2 style={{ fontSize:"clamp(30px,4vw,54px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px" }}>
            La prépa info,<br />sans
            <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}> se perdre.</span>
          </h2>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:isMobile?12:13, lineHeight:2, color:C.muted, fontWeight:300 }}>
          <p>Pivot est une plateforme pensée pour les étudiants en classe préparatoire informatique — MP, PC, PSI, PT. Pas de contenu générique : chaque outil, chaque ressource est calé sur le programme officiel 2025.</p>
          <p style={{ marginTop:16 }}>Checklist interactive du programme, aide mémoire Python et SQL, algorithmes classiques des concours CNC, annales commentées — tout est là, organisé, accessible, et gratuit.</p>
        </div>
      </div>
    </section>
  );
}

// ── PILLARS ───────────────────────────────────────────────────────────────────
const PILLARS = [
  { n:"01", icon:"✅", title:"CPGE Informatique", text:"Checklist complète du programme 2025 — MP, PC, PSI, PT. Notions classées par semestre, priorité et section. Progression sauvegardée localement.", available: true },
  { n:"02", icon:"🐍", title:"Python & NumPy", text:"Aide mémoire complet — syntaxe, structures de données, NumPy, Plotly, SQLite3. Filtrable par catégorie, copiable en un clic.", available: true },
  { n:"03", icon:"📋", title:"SQL", text:"Référence SQL pour les bases de données relationnelles — SELECT, JOIN, GROUP BY, sous-requêtes. Tout ce qui tombe au concours.", available: true },
  { n:"04", icon:"🧮", title:"Classique Concours", text:"Algorithmes essentiels du CNC — tri, graphes, arbres, programmation dynamique. Implémentations Python, complexité, fréquence d'apparition.", available: true },
  { n:"05", icon:"🎓", title:"Licence & Master", text:"Algorithmique avancée, systèmes, réseaux, machine learning — des ressources structurées pour la suite après la prépa.", available: false },
  { n:"06", icon:"⚙️", title:"École d'ingénieurs", text:"Automatique, électronique, génie logiciel, optimisation — un accompagnement pour les premières années d'école d'ingénieurs.", available: false },
];

function Pillars() {
  const ref = useReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <section id="programs" style={{ background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:`${isMobile?"64px":"100px"} ${px}` }}>
        <div ref={ref} className="reveal" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:10 }}>
          <h2 style={{ fontSize:"clamp(26px,4vw,48px)", fontWeight:800, letterSpacing:"-2px", lineHeight:1.05 }}>Ce que<br />tu trouveras.</h2>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple }}>Six outils</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:2 }}>
          {PILLARS.map((p,i) => <PillarCard key={p.n} {...p} delay={i*0.07} />)}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, icon, title, text, delay, available }) {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className="reveal pillar-card" style={{ transitionDelay:`${delay}s`, opacity: available ? 1 : 0.6 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="pglow" style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 20% 20%,rgba(0,212,255,0.05) 0%,transparent 60%)", opacity:hov?1:0, transition:"opacity .4s", pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, color:C.cyan, opacity:0.6 }}>{n}</span>
        {!available && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:C.purple, border:`1px solid ${C.purple}44`, padding:"3px 8px", borderRadius:100 }}>Bientôt</span>}
      </div>
      <div style={{ fontSize:24, marginBottom:14 }}>{icon}</div>
      <div style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.5px", marginBottom:10 }}>{title}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, lineHeight:1.9, color:C.muted, fontWeight:300 }}>{text}</div>
    </div>
  );
}

// ── PROGRAM CARDS ─────────────────────────────────────────────────────────────
const CPGE_ITEMS = [
  "Checklist interactive du programme 2025 — MP · PC · PSI · PT",
  "Aide mémoire Python — NumPy, Plotly, SQLite3",
  "Aide mémoire SQL — bases de données relationnelles",
  "Classique Concours — algorithmes CNC avec code Python",
  "Annales informatique — sujets et corrigés",
  "Éditeur de sujets avec export PDF",
];
const MASTER_ITEMS = [
  "Algorithmique avancée — graphes, complexité, NP-complétude",
  "Bases de données — relationnelles & NoSQL",
  "Systèmes d'exploitation & réseaux",
  "Machine Learning & Intelligence Artificielle",
  "Génie logiciel & architecture logicielle",
];
const INGÉ_ITEMS = [
  "Automatique & traitement du signal",
  "Électronique & systèmes embarqués",
  "Probabilités & statistiques appliquées",
  "Optimisation & recherche opérationnelle",
  "Projets & stages industriels",
];

function ProgramCard({ badge, badgeColor, title, italic, body, items, accent, cta, href }) {
  const ref = useReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const p = isMobile ? "24px" : isTablet ? "40px" : "64px";

  return (
    <div ref={ref} className="reveal" style={{
      background:C.surface, border:`1px solid ${C.border}`, borderRadius:4,
      padding:p, display:"grid",
      gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
      gap: isTablet ? 28 : 72,
      alignItems:"center", position:"relative", overflow:"hidden", marginBottom:20,
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:accent }} />
      <div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:badgeColor, border:`1px solid ${badgeColor}44`, padding:"6px 14px", borderRadius:100, marginBottom:18 }}>{badge}</div>
        <h2 style={{ fontSize:"clamp(24px,3.5vw,44px)", fontWeight:800, letterSpacing:"-2px", lineHeight:1.0, marginBottom:16 }}>
          {title}<br />
          <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, background:accent, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{italic}</span>
        </h2>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, lineHeight:1.9, color:C.muted, fontWeight:300, marginBottom:24 }}>{body}</p>
        <a href={href || "#contact"} className="btn-primary-el" style={{ background:accent }}>{cta}</a>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {items.map((item,i) => (
          <div key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:isMobile?11:12, color:C.muted, padding:"11px 15px", border:`1px solid ${C.border}`, borderRadius:4, display:"flex", alignItems:"center", gap:10, transition:"border-color .3s, color .3s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${badgeColor}55`; e.currentTarget.style.color=C.text; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
            <span style={{ color:badgeColor, fontSize:10, opacity:0.7, flexShrink:0 }}>✦</span>{item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Programs() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";
  return (
    <section id="prepa" style={{ maxWidth:1200, margin:"0 auto", padding:`${isMobile?"64px":"120px"} ${px} 0` }}>
      <div style={{ marginBottom:48 }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple, marginBottom:12 }}>Nos programmes</p>
        <h2 style={{ fontSize:"clamp(26px,4vw,52px)", fontWeight:800, letterSpacing:"-2px", lineHeight:1.05 }}>
          Chaque niveau.<br />
          <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>Chaque étape.</span>
        </h2>
      </div>
      <ProgramCard
        badge="✅ Disponible maintenant" badgeColor={C.cyan}
        title="CPGE" italic="Informatique"
        body="Une plateforme complète pour les préparationnaires en informatique — checklist du programme, aide mémoire, algorithmes des concours, annales. Gratuit, sans inscription."
        items={CPGE_ITEMS} accent="linear-gradient(90deg,#00D4FF,#00ffaa)"
        cta="Accéder à la plateforme" href="/cpge/"
      />
      <ProgramCard
        badge="🎓 Bientôt disponible" badgeColor={C.purple}
        title="Licence &" italic="Master"
        body="Des ressources structurées pour la suite après la prépa — algorithmique avancée, bases de données, systèmes, machine learning. La même rigueur, appliquée aux niveaux L3, M1 et M2."
        items={MASTER_ITEMS} accent="linear-gradient(90deg,#9B40FF,#00D4FF)"
        cta="Être notifié au lancement"
      />
      <ProgramCard
        badge="⚙️ Bientôt disponible" badgeColor="#f472b6"
        title="École" italic="d'ingénieurs"
        body="Un accompagnement ciblé pour les premières années d'école d'ingénieurs — automatique, électronique, probabilités, optimisation. Pour que le passage de la prépa à l'école soit une transition, pas un choc."
        items={INGÉ_ITEMS} accent="linear-gradient(90deg,#f472b6,#9B40FF)"
        cta="Être notifié au lancement"
      />
    </section>
  );
}

// ── CORRIDOR ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n:"01", title:"Programme & Checklist", text:"Commence par avoir une vision claire de tout le programme — par semestre, par priorité. Coche au fur et à mesure, suis ta progression." },
  { n:"02", title:"Aide mémoire & Références", text:"Python, SQL, algorithmes CNC — des références filtrables que tu consultes en deux secondes pendant tes révisions ou tes TDs." },
  { n:"03", title:"Annales & Concours", text:"Entraîne-toi sur de vrais sujets de concours, avec des corrigés détaillés. Identifie les algorithmes qui reviennent, les pièges classiques." },
  { n:"04", title:"Licence, Master & Ingé — bientôt", text:"La plateforme grandit avec toi. Les ressources pour les niveaux post-prépa arrivent prochainement." },
];

function Corridor() {
  const refL = useReveal();
  const refR = useReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";

  return (
    <section style={{ background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:`${isMobile?"64px":"100px"} ${px}`, display:"grid", gridTemplateColumns:isTablet?"1fr":"1fr 1fr", gap:isTablet?40:80, alignItems:"center" }}>
        <div ref={refL} className="reveal">
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple, marginBottom:18 }}>Comment ça marche</p>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,44px)", fontWeight:800, letterSpacing:"-1.5px", lineHeight:1.05, marginBottom:16 }}>
            Un outil,<br /><span className="grad-text">une progression.</span>
          </h2>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, lineHeight:1.9, color:C.muted, fontWeight:300 }}>
            Pivot n'est pas un agrégateur de cours. C'est un outil de travail — pensé pour que chaque minute passée dessus soit utile. Checklist, références, entraînement : tout est là, dans l'ordre.
          </p>
        </div>
        <div ref={refR} className="reveal">
          {STEPS.map(s => (
            <div key={s.n} className="step-row">
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, color:C.cyan, width:30, flexShrink:0, paddingTop:2, opacity:0.6 }}>{s.n}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:"-0.3px", marginBottom:4 }}>{s.title}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, lineHeight:1.8, color:C.muted, fontWeight:300 }}>{s.text}</div>
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
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "20px" : isTablet ? "32px" : "48px";

  const handleSubmit = () => {
    if (email.includes("@")) { setDone(true); setEmail(""); }
  };

  return (
    <section id="contact" style={{ maxWidth:1200, margin:"0 auto", padding:`${isMobile?"72px":"140px"} ${px}`, textAlign:"center" }}>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple, marginBottom:18 }}>Être notifié des nouvelles ressources</p>
      <h2 ref={ref} className="reveal" style={{ fontSize:"clamp(36px,7vw,96px)", fontWeight:800, letterSpacing:"-3px", lineHeight:0.93, marginBottom:24 }}>
        La prépa, c'est<br />mieux avec
        <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}> les bons outils.</span>
      </h2>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:C.muted, fontWeight:300, letterSpacing:1, marginBottom:36 }}>
        {done ? "✓ Reçu — on te prévient à chaque nouvelle ressource 🚀" : "Laisse ton email pour être averti des nouvelles ressources et du lancement des prochains niveaux."}
      </p>
      {!done && (
        <div style={{ display:"flex", gap:10, justifyContent:"center", maxWidth:480, margin:"0 auto", flexDirection:isMobile?"column":"row" }}>
          <input className="cta-input-el" type="email" placeholder="ton.email@exemple.com"
            value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSubmit()} />
          <button className="btn-primary-el" onClick={handleSubmit}>Rejoindre</button>
        </div>
      )}
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ borderTop:`1px solid ${C.border}` }}>
      <footer style={{
        maxWidth:1200, margin:"0 auto", padding:`28px ${isMobile?"20px":"48px"}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexDirection:isMobile?"column":"row", gap:isMobile?16:0, textAlign:isMobile?"center":"left",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src="/pivot-icon.svg" alt="Pivot" style={{ width:50, height:50 }} />
          <span className="grad-text" style={{ fontSize:16, fontWeight:800 }}>PIVOT</span>
        </div>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:C.muted }}>Plateforme Prépa Informatique · MP · PC · PSI · PT · 2025</span>
        <div style={{ display:"flex", gap:isMobile?16:24, flexWrap:"wrap", justifyContent:"center" }}>
          {[["Instagram","#"],["LinkedIn","#"],["help.info.pivot@gmail.com","#"]].map(([l,h]) => (
            <a key={l} href={h} className="footer-link-el">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <div style={{ background:C.bg, minHeight:"100vh" }}>
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", maxWidth:1200, margin:"0 auto" }} />
        <Pillars />
        <Programs />
        <Corridor />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
