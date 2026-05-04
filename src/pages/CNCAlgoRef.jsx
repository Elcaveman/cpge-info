import { useState, useMemo, useRef, useEffect } from "react";
import "../css/CNCAlgoRef.css";
import { FONT, HEADING, CATS, CC, SECTIONS, NAV } from "../data/cncAlgoRefData.jsx";

function highlight(code) {
  const esc = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  // Single-pass: alternation ensures each token is consumed once,
  // so later groups never corrupt spans inserted by earlier groups.
  return esc.replace(
    /(#[^\n]*|--[^\n]*)|(f?'[^']*'|f?"[^"]*")|\b(\d+\.?\d*)\b|\b(def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|import|from|as|with|yield|lambda|True|False|None|SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP|BY|ORDER|HAVING|CREATE|TABLE|INSERT|INTO|VALUES|PRIMARY|KEY|REFERENCES|NULL|TEXT|INTEGER|REAL|UPDATE|SET|DELETE|UNION|INTERSECT|EXCEPT|DISTINCT)\b|\b(print|len|range|append|sorted|max|min|sum|enumerate|zip|reversed|heapq|deque|lru_cache|Counter|type|isinstance)\b|\b(Noeud|Arbre|Pile|File)\b/g,
    (m, cm, st, nu, kw, fn, tp) => {
      if (cm !== undefined) return `<span class="cm">${m}</span>`;
      if (st !== undefined) return `<span class="st">${m}</span>`;
      if (nu !== undefined) return `<span class="nu">${m}</span>`;
      if (kw !== undefined) return `<span class="kw">${m}</span>`;
      if (fn !== undefined) return `<span class="fn">${m}</span>`;
      if (tp !== undefined) return `<span class="tp">${m}</span>`;
      return m;
    }
  );
}

/* ─── FREQ STARS ──────────────────────────────────────────── */
function Stars({ n }) {
  return (
    <span className="stars">
      {[1,2,3].map(i=>(
        <span key={i} className={i<=n ? "star" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

/* ─── ALGO CARD ───────────────────────────────────────────── */
function AlgoCard({ algo, color, idx }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen]     = useState(true);

  function copy(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(algo.code).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false),1400);
  }

  return (
    <div className={`algo-card ${open ? 'open' : 'closed'}`} style={{borderColor: open?color+'44':'#1e1e26'}}>
      {/* Header */}
      <div
        onClick={()=>setOpen(o=>!o)}
        className={`card-header ${open ? 'open' : 'closed'}`}
      >
        <div className="card-color-bar" style={{background:color}}/>
        <span className="card-title">{algo.title}</span>
        <Stars n={algo.freq}/>
        <span className="card-complexity">{algo.complexity}</span>
        <span className="card-toggle">{open?'▲':'▼'}</span>
      </div>

      {open && (
        <div style={{padding:'12px 16px', display:'flex', flexDirection:'column', gap:8}}>
          {/* Code block */}
          <div className="code-block-wrapper">
            <pre className="code-block"
              dangerouslySetInnerHTML={{__html: highlight(algo.code)}}
            />
            <button
              onClick={copy}
              className={`copy-btn ${copied ? 'copied' : ''}`}
            >{copied ? '✓ copié':'copier'}</button>
          </div>
          {/* Note */}
          {algo.note && (
            <div className="algo-note" style={{borderLeftColor: color}}>
              💡 {algo.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────── */
export default function CNCAlgoRef() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch]       = useState("");
  const [activeNav, setActiveNav] = useState(null);

  const filtered = useMemo(()=>{
    return SECTIONS
      .filter(s=> activeCat==="all" || s.cat===activeCat)
      .map(s=>({
        ...s,
        algos: s.algos.filter(a=>{
          if (!search) return true;
          const q = search.toLowerCase();
          return a.title.toLowerCase().includes(q)
              || a.code.toLowerCase().includes(q)
              || (a.note||"").toLowerCase().includes(q);
        })
      }))
      .filter(s=> s.algos.length > 0);
  },[activeCat, search]);

  const total = SECTIONS.reduce((a,s)=>a+s.algos.length,0);
  const shown = filtered.reduce((a,s)=>a+s.algos.length,0);

  function scrollTo(catId) {
    setActiveCat("all"); setSearch(""); setActiveNav(catId);
    setTimeout(()=>{
      const el = document.getElementById("sec-"+catId);
      if (el) el.scrollIntoView({behavior:"smooth",block:"start"});
    },60);
  }

  return (
    <div className="cnc-algo-ref">
      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-t">CNC Algo</div>
            <div className="logo-s">CPGE · MP · PSI · TSI · Référence</div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(n=>(
              <div
                key={n.id}
                className={`ni ${activeNav===n.id?"active":""}`}
                style={{borderLeftColor: activeNav===n.id ? CC[n.id] : 'transparent'}}
                onClick={()=>scrollTo(n.id)}
              >
                <span className="ni-icon">{n.icon}</span>
                {n.label}
                <span className="ni-dot" style={{background:CC[n.id]}}/>
              </div>
            ))}
          </nav>
          <div className="sfooter">
            ALGOS VISIBLES · {shown}/{total}
            <div className="pb-bg">
              <div className="pb-fill" style={{width:`${Math.round(shown/total*100)}%`}}/>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-t">Référence Algorithmes CNC</div>
            <input
              className="search-input"
              placeholder="Rechercher un algo…"
              value={search}
              onChange={e=>{setSearch(e.target.value);setActiveCat("all");setActiveNav(null);}}
            />
          </div>

          <div className="content">
            <h1 className="page-h">Algorithmes Essentiels — CNC / CPGE</h1>
            <div className="page-s">
              Algorithmes classiques, avec des implémentations Python. Idéal pour la révision.
            </div>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <div className="filter-row">
                <span className="flabel">THÈME</span>
                {CATS.map(c=>(
                  <div
                    key={c.id}
                    className={`pill ${activeCat===c.id?"active":""}`}
                    style={{background: activeCat===c.id ? c.color : 'transparent'}}
                    onClick={()=>{setActiveCat(c.id);setSearch("");setActiveNav(null);}}
                  >{c.label}</div>
                ))}
              </div>
              <div className="filter-row">
                <span className="flabel">FRÉQUENCE</span>
                <span className="freq-legend">
                  <span className="freq-high">★★★</span> Très fréquent&nbsp;&nbsp;
                  <span className="freq-high">★★</span><span className="freq-low">★</span> Fréquent&nbsp;&nbsp;
                  <span className="freq-high">★</span><span className="freq-low">★★</span> Occasionnel
                </span>
              </div>
            </div>

            {/* SECTIONS */}
            {filtered.length===0 && (
              <div className="no-res">Aucun algorithme ne correspond à « {search} »</div>
            )}

            {filtered.map(sec=>{
              const color = CC[sec.cat];
              return (
                <div key={sec.cat} id={"sec-"+sec.cat}>
                  <div className="sec-header">
                    <div className="sec-bar" style={{background:color}}/>
                    <span className="sec-title">{sec.title}</span>
                    <span className="sec-count">{sec.algos.length} algos</span>
                  </div>
                  {sec.algos.map((a,i)=>(
                    <AlgoCard key={i} algo={a} color={color} idx={i}/>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
