import { useState, useCallback } from "react";
import { FONT, HEADING, CATS, CC, SECTIONS, NAV } from "../../data/cncAlgoRefData.jsx";
import { useMediaQuery } from "../../components/useMediaQuery.jsx";
import { MQ } from "../../lib/constants.js";
import { tokenize } from "../../lib/codeHighlight.js";
import { useCheatSheet } from "../../lib/useCheatSheet.js";
import { FilterBar } from "../../components/FilterBar.jsx";
import { SectionHeader } from "../../components/SectionHeader.jsx";

const CNC_REGEX = /(#[^\n]*|--[^\n]*)|(f?'[^']*'|f?"[^"]*")|\b(\d+\.?\d*)\b|\b(def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|import|from|as|with|yield|lambda|True|False|None|SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP|BY|ORDER|HAVING|CREATE|TABLE|INSERT|INTO|VALUES|PRIMARY|KEY|REFERENCES|NULL|TEXT|INTEGER|REAL|UPDATE|SET|DELETE|UNION|INTERSECT|EXCEPT|DISTINCT)\b|\b(print|len|range|append|sorted|max|min|sum|enumerate|zip|reversed|heapq|deque|lru_cache|Counter|type|isinstance)\b|\b(Noeud|Arbre|Pile|File)\b/g;
const CNC_CLASSES = ["cm", "st", "nu", "kw", "fn", "tp"];

function highlight(code) {
  CNC_REGEX.lastIndex = 0;
  return tokenize(code, CNC_REGEX, CNC_CLASSES);
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
            <pre className="code-block">
              {highlight(algo.code).map((t, i) => (
                t.cls ? <span key={i} className={t.cls}>{t.text}</span> : <span key={i}>{t.text}</span>
              ))}
            </pre>
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

const cncMatch = (a, q) =>
  a.title.toLowerCase().includes(q) ||
  a.code.toLowerCase().includes(q) ||
  (a.note || "").toLowerCase().includes(q);

/* ─── APP ─────────────────────────────────────────────────── */
export default function CNCAlgoRef() {
  const isMobile = useMediaQuery(MQ.tablet);
  const matchItem = useCallback(cncMatch, []);
  const {
    activeCat, setActiveCat,
    search, setSearch,
    activeNav, scrollToSection: scrollTo,
    filtered, total, shown,
  } = useCheatSheet(SECTIONS, "algos", matchItem);

  return (
    <div className="cnc-algo-ref">
      <div className="layout">

        {/* SIDEBAR */}
        {!isMobile && <aside className="sidebar">
          <div className="logo">
            <div className="logo-t">Classique Concours</div>
            <div className="logo-s">CNC · MP · PSI · TSI</div>
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
        </aside>}

        {/* MAIN */}
        <div className="main">
          <div className="content">
            <h1 className="page-h">Algorithmes Essentiels — CNC / CPGE</h1>
            <div className="page-s">
              Algorithmes classiques, avec des implémentations Python. Idéal pour la révision.
            </div>

            {/* FILTER BAR */}
            <FilterBar
              label="THÈME"
              options={CATS}
              value={activeCat}
              onChange={id => { setActiveCat(id); setSearch(""); }}
              topSlot={
                <div className="filter-row">
                  <span className="filter-label flabel">RECHERCHE</span>
                  <input
                    className="search-input filter-search"
                    placeholder="Rechercher un algo…"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setActiveCat("all"); }}
                  />
                </div>
              }
            >
              <div className="filter-row">
                <span className="flabel">FRÉQUENCE</span>
                <span className="freq-legend">
                  <span className="freq-high">★★★</span> Très fréquent&nbsp;&nbsp;
                  <span className="freq-high">★★</span><span className="freq-low">★</span> Fréquent&nbsp;&nbsp;
                  <span className="freq-high">★</span><span className="freq-low">★★</span> Occasionnel
                </span>
              </div>
            </FilterBar>

            {/* SECTIONS */}
            {filtered.length===0 && (
              <div className="no-res">Aucun algorithme ne correspond à « {search} »</div>
            )}

            {filtered.map(sec=>{
              const color = CC[sec.cat];
              return (
                <div key={sec.cat} id={"sec-"+sec.cat}>
                  <SectionHeader
                    title={sec.title}
                    count={`${sec.algos.length} algos`}
                    color={color}
                  />
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
