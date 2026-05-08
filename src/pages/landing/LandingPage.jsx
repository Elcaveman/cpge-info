import { useState, useEffect, useRef } from "react";
import { useBreakpoint } from "../../components/useBreakpoint.jsx";

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
    { label: "Prépa", href: "/prepa-info" },
    { label: "Olympiades", href: "#olympiad" },
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
        <span style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.5px" }} className="grad-text">ODEX</span>

        <ul className="nav-links-desktop" style={{ display:"flex", gap:32, listStyle:"none" }}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link-el">{link.label}</a>
            </li>
          ))}
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
        Du Maroc vers le monde · Association fondée 2025
      </p>

      <h1 className="anim-2" style={{ fontSize:"clamp(42px,9vw,112px)", fontWeight:800, lineHeight:0.93, letterSpacing:"-3px", position:"relative", zIndex:1 }}>
        Built to<br />
        <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>unlock your</span><br />
        potential.
      </h1>

      <p className="anim-3" style={{ maxWidth:500, margin:"28px auto 0", fontFamily:"'DM Mono',monospace", fontSize:isMobile?12:13, lineHeight:1.9, color:C.muted, fontWeight:300, position:"relative", zIndex:1 }}>
        From potential to exceptional — ODEX accompagne les étudiants marocains vers les meilleures universités, grandes écoles et carrières du monde entier.
      </p>

      <div className="anim-4" style={{ display:"flex", gap:12, justifyContent:"center", marginTop:40, position:"relative", zIndex:1, flexWrap:"wrap" }}>
        <a href="#contact" className="btn-primary-el">Rejoindre ODEX</a>
        <a href="#about" className="btn-ghost-el">En savoir plus →</a>
      </div>

      <div className="anim-5" style={{ display:"flex", gap:isMobile?28:64, justifyContent:"center", marginTop:72, paddingTop:40, borderTop:`1px solid ${C.border}`, width:"100%", maxWidth:600, position:"relative", zIndex:1 }}>
        {[["2","Pays"],["∞","Ambition"],["01","Mission"]].map(([n,l]) => (
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
  const items = ["Prépa Bac","Prépa CPGE","Concours Après Bac","Math Olympiad","Webinaires & Ressources","Du Maroc vers le Monde","Mentorat","Grandes Écoles","Universités Mondiales"];
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
            No one gets<br />there
            <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}> alone.</span>
          </h2>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:isMobile?12:13, lineHeight:2, color:C.muted, fontWeight:300 }}>
          <p>ODEX n'est pas là pour sélectionner les meilleurs. Nous sommes là pour maximiser le potentiel de chaque étudiant — lycéen, préparationnaire, universitaire — et les accompagner vers la meilleure version d'eux-mêmes.</p>
          <p style={{ marginTop:16 }}>Ingénieurs, enseignants, chercheurs de haut calibre — ce sont des destins qui se construisent avec les bonnes personnes, les bonnes ressources, et une communauté qui croit en toi avant même que tu y croies toi-même. Du Maroc vers le monde entier.</p>
        </div>
      </div>
    </section>
  );
}

// ── PILLARS ───────────────────────────────────────────────────────────────────
const PILLARS = [
  { n:"01", icon:"📖", title:"Prépa Bac", text:"Maths, Physique-Chimie, Sciences de l'Ingénieur et Informatique — toutes les matières scientifiques du bac marocain avec cours, exercices et webinaires live." },
  { n:"02", icon:"🎯", title:"Prépa CPGE", text:"Ressources ciblées pour MP, PC, PSI, PT — Maths, Physique, SII et Informatique. Annales, méthodes et mentorat par des étudiants en grandes écoles d'ingénieurs." },
  { n:"03", icon:"🏛️", title:"Concours Après Bac", text:"Orientation et préparation aux concours post-bac scientifiques — grandes écoles d'ingénieurs, informatique et IA, physique appliquée — France et international." },
  { n:"04", icon:"🌍", title:"Mobilité Internationale", text:"Campus France, bourses, équivalences, logement — tout le soutien concret pour franchir le pas vers les meilleures universités du monde." },
  { n:"05", icon:"🏆", title:"Math Olympiad", text:"L'ODEX Math Olympiad — notre compétition phare pour les esprits les plus affûtés, ouverte aux lycéens et préparationnaires du Maroc et du monde." },
  { n:"06", icon:"🤝", title:"Mentorat & Réseau", text:"Alumni dans les grandes écoles françaises et universités mondiales — connectés à toi, pour que tu ne partes jamais seul vers tes objectifs." },
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
          <h2 style={{ fontSize:"clamp(26px,4vw,48px)", fontWeight:800, letterSpacing:"-2px", lineHeight:1.05 }}>Ce que<br />nous faisons.</h2>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple }}>Six piliers</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:2 }}>
          {PILLARS.map((p,i) => <PillarCard key={p.n} {...p} delay={i*0.07} />)}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, icon, title, text, delay }) {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className="reveal pillar-card" style={{ transitionDelay:`${delay}s` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="pglow" style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 20% 20%,rgba(0,212,255,0.05) 0%,transparent 60%)", opacity:hov?1:0, transition:"opacity .4s", pointerEvents:"none" }} />
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:2, color:C.cyan, marginBottom:24, opacity:0.6 }}>{n}</div>
      <div style={{ fontSize:24, marginBottom:14 }}>{icon}</div>
      <div style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.5px", marginBottom:10 }}>{title}</div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, lineHeight:1.9, color:C.muted, fontWeight:300 }}>{text}</div>
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
        <a href="#contact" className="btn-primary-el" style={{ background:accent }}>{cta}</a>
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
          Chaque étape.<br />
          <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>Chaque niveau.</span>
        </h2>
      </div>
      <ProgramCard badge="📖 Ouvert aux inscriptions" badgeColor={C.cyan} title="ODEX" italic="Prépa Bac"
        body="Un accompagnement complet pour réussir le baccalauréat marocain — toutes les matières scientifiques. Des cours structurés, des webinaires live et un suivi personnalisé pour décrocher la mention que tu mérites."
        items={BAC_ITEMS} accent="linear-gradient(90deg,#00D4FF,#00ffaa)" cta="Rejoindre la Prépa Bac" />
      <ProgramCard badge="🎯 Bientôt disponible" badgeColor={C.purple} title="ODEX" italic="Prépa CPGE"
        body="Les classes préparatoires sont exigeantes. ODEX te donne les ressources des meilleurs — annales, méthodes, mentorat par des étudiants en grandes écoles — pour que la prépa soit une rampe de lancement, pas un mur."
        items={PREPA_ITEMS} accent="linear-gradient(90deg,#9B40FF,#00D4FF)" cta="Être notifié au lancement" />
      <ProgramCard badge="🏛️ Bientôt disponible" badgeColor="#f472b6" title="Concours" italic="Après Bac"
        body="Le bac en poche, la vraie question commence. ODEX t'oriente et te prépare aux concours post-bac scientifiques — grandes écoles d'ingénieurs, filières informatique et IA, physique appliquée — en France et dans les meilleures universités STEM du monde."
        items={CONCOURS_ITEMS} accent="linear-gradient(90deg,#f472b6,#9B40FF)" cta="Être notifié au lancement" />
    </section>
  );
}

// ── OLYMPIAD ──────────────────────────────────────────────────────────────────
const MATH = [
  { eq:<>∀ε &gt; 0, ∃δ &gt; 0 : |x − a| &lt; δ ⟹ |<span style={{color:C.cyan}}>f(x) − L</span>| &lt; ε</> },
  { eq:<>∑<sub>n=1</sub><sup>∞</sup> 1/n² = <span style={{color:C.cyan}}>π²/6</span></> },
  { eq:<>e<sup>iπ</sup> + 1 = <span style={{color:C.cyan}}>0</span></> },
  { eq:<>P(A|B) = P(B|A) · P(A) / <span style={{color:C.cyan}}>P(B)</span></> },
  { eq:<>det(AB) = <span style={{color:C.cyan}}>det(A)</span> · det(B)</> },
];

function Olympiad() {
  const ref = useReveal();
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? "24px" : isTablet ? "40px" : "64px";
  const spx = isMobile ? "20px" : isTablet ? "32px" : "48px";

  return (
    <section id="olympiad" style={{ maxWidth:1200, margin:"0 auto", padding:`${isMobile?"64px":"120px"} ${spx}` }}>
      <div ref={ref} className="reveal" style={{
        background:C.surface, border:`1px solid ${C.border}`, borderRadius:4,
        padding:px, display:"grid",
        gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
        gap: isTablet ? 32 : 72,
        alignItems:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:grad }} />
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:C.cyan, border:`1px solid rgba(0,212,255,0.25)`, padding:"6px 14px", borderRadius:100, marginBottom:18 }}>🔢 Bientôt disponible</div>
          <h2 style={{ fontSize:"clamp(26px,4vw,52px)", fontWeight:800, letterSpacing:"-2px", lineHeight:1.0, marginBottom:16 }}>
            ODEX<br />Math{" "}
            <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>Olympiad</span>
          </h2>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, lineHeight:1.9, color:C.muted, fontWeight:300, marginBottom:24 }}>
            Une compétition mathématique internationale pensée pour les esprits les plus curieux — lycéens et préparationnaires du Maroc et du monde entier, réunis autour de problèmes qui ne s'inventent pas.
          </p>
          <a href="#contact" className="btn-primary-el">Être notifié au lancement</a>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {MATH.map((m,i) => <div key={i} className="math-row">{m.eq}</div>)}
        </div>
      </div>
    </section>
  );
}

// ── CORRIDOR ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n:"01", title:"Prépa Bac", text:"On commence ici — révision structurée, méthodes, webinaires et suivi pour réussir le bac marocain avec les meilleures mentions." },
  { n:"02", title:"Prépa CPGE & Concours", text:"Intégration en CPGE ou orientation vers les concours post-bac — en France, au Maroc, au Canada, aux États-Unis." },
  { n:"03", title:"Mobilité & Admission", text:"Campus France, dossiers d'admission, bourses, équivalences — on t'accompagne dans chaque étape pour que rien ne te bloque." },
  { n:"04", title:"Du Maroc vers le monde", text:"Grandes écoles françaises, MIT, Polytechnique, ETH Zurich — le monde est la destination, pas juste une ville." },
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
          <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap", alignItems:"center" }}>
            {["🇲🇦","→","🇫🇷","🇺🇸","🇨🇦","🇬🇧","🌍"].map((f,i) => (
              <span key={i} style={{ fontSize:f==="→"?18:isMobile?26:32, color:f==="→"?C.cyan:"inherit", animation:f!=="→"?`float 3s ease-in-out ${i*0.4}s infinite`:"none", display:"inline-block", opacity:f==="→"?0.5:1 }}>{f}</span>
            ))}
          </div>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,44px)", fontWeight:800, letterSpacing:"-1.5px", lineHeight:1.05, marginBottom:16 }}>
            Du Maroc<br /><span className="grad-text">vers le monde.</span>
          </h2>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, lineHeight:1.9, color:C.muted, fontWeight:300 }}>
            Le Maroc est notre point de départ, pas notre plafond. ODEX construit le chemin de A à Z — du bac jusqu'aux meilleures institutions mondiales — avec les outils, les mentors et la communauté pour y arriver.
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
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:C.purple, marginBottom:18 }}>Rejoindre le mouvement</p>
      <h2 ref={ref} className="reveal" style={{ fontSize:"clamp(36px,7vw,96px)", fontWeight:800, letterSpacing:"-3px", lineHeight:0.93, marginBottom:24 }}>
        Built for those<br />who refuse
        <span className="grad-text" style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}> to settle.</span>
      </h2>
      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:C.muted, fontWeight:300, letterSpacing:1, marginBottom:36 }}>
        {done ? "✓ Reçu — on revient vers toi au lancement 🚀" : "From potential to exceptional. Rejoins le mouvement."}
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
        <span className="grad-text" style={{ fontSize:16, fontWeight:800 }}>ODEX</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:2, color:C.muted }}>Association Loi 1901 · Du Maroc vers le Monde · 2025</span>
        <div style={{ display:"flex", gap:isMobile?16:24, flexWrap:"wrap", justifyContent:"center" }}>
          {[["Instagram","#"],["LinkedIn","#"],["contact@odex.fr","#"]].map(([l,h]) => (
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
        <Olympiad />
        <Corridor />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
