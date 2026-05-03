import { useState, useMemo } from "react";
import { ALL_DATA, CONCOURS_CONFIG, TIMELINES , CAT_COLORS, TREND_ICON, TREND_COLOR, CATEGORIES } from "../data/statsData.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, concours, filiere }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const key = `${concours}_${filiere}`;
  const wKey = `weight_${concours}`;
  return (
    <div style={{ background:"#1a1a2e", border:"1px solid #2d2d45", borderRadius:8, padding:"10px 14px", fontSize:12, fontFamily:"monospace", maxWidth:220 }}>
      <div style={{ color:"#f1f5f9", fontWeight:700, marginBottom:4 }}>{d.topic}</div>
      <div style={{ color:"#94a3b8" }}>Fréquence : {d[key]}/10 sessions</div>
      <div style={{ color:"#94a3b8" }}>Poids moyen : ~{d[wKey]} pts</div>
      <div style={{ color: TREND_COLOR[d.trend], marginTop:4 }}>{TREND_ICON[d.trend]} {d.trend}</div>
    </div>
  );
}

// ─── Stats component ─────────────────────────────────────────────────────────────────────
export default function Stats() {
  const [concours, setConcours]   = useState("cnc");
  const [filiere, setFiliere]     = useState("mp");
  const [cat, setCat]             = useState("Toutes");
  const [view, setView]           = useState("bar");
  const [sort, setSort]           = useState("freq");
  const [compare, setCompare]     = useState(false); // side-by-side bar

  const cfg = CONCOURS_CONFIG[concours];
  const barKey = `${concours}_${filiere}`;
  const wKey   = `weight_${concours}`;

  const filtered = useMemo(() => {
    return ALL_DATA
      .filter(t => cat === "Toutes" || t.cat === cat)
      .sort((a,b) => sort === "freq" ? b[barKey] - a[barKey] : b[wKey] - a[wKey]);
  }, [cat, barKey, wKey, sort]);

  // For compare mode: show all 4 concours MP side by side
  const compareData = useMemo(() => {
    return ALL_DATA
      .filter(t => cat === "Toutes" || t.cat === cat)
      .sort((a,b) => b.cnc_mp - a.cnc_mp)
      .map(t => ({
        topic: t.topic.length > 22 ? t.topic.slice(0,20)+"…" : t.topic,
        CNC:   t.cnc_mp,
        CCP:   t.ccp_mp,
        "X-Mines": t.xm_mp,
        E3A:   t.e3a_mp,
        cat:   t.cat,
      }));
  }, [cat]);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    body { background:#0a0a0f; }
    ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#111; } ::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }
    .app { min-height:100vh; background:#0a0a0f; color:#e2e8f0; font-family:'Syne',sans-serif; padding:32px 20px 80px; }
    .inner { max-width:980px; margin:0 auto; }

    /* header */
    .hdr { margin-bottom:24px; }
    .title { font-size:24px; font-weight:800; color:#f1f5f9; letter-spacing:-0.5px; }
    .subtitle { font-size:11px; color:#475569; font-family:'JetBrains Mono',monospace; margin-top:4px; }

    /* chips row */
    .chips { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
    .chip { background:#0e0e1a; border:1px solid #1a1a2e; border-radius:10px; padding:10px 14px; min-width:100px; }
    .chip-num { font-size:20px; font-weight:800; line-height:1; }
    .chip-lbl { font-size:9px; color:#64748b; font-family:'JetBrains Mono',monospace; margin-top:3px; letter-spacing:.06em; }

    /* controls */
    .controls { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; background:#0e0e1a; border:1px solid #1a1a2e; border-radius:12px; padding:14px 16px; }
    .ctrl-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .ctrl-label { font-size:10px; color:#475569; font-family:'JetBrains Mono',monospace; letter-spacing:.1em; min-width:76px; }
    .btn { padding:5px 12px; border-radius:7px; border:1px solid #1e1e2e; background:none; color:#64748b; font-family:'Syne',sans-serif; font-size:12px; font-weight:600; cursor:pointer; transition:all .15s; white-space:nowrap; }
    .btn:hover { border-color:#334155; color:#94a3b8; }
    .btn--active { background:#12121c; color:#f1f5f9; border-color:#334155; }
    .btn--concours.btn--active { background:#12121c; }
    .btn--compare { border-color:#818cf8; color:#818cf8; }
    .btn--compare.btn--active { background:rgba(129,140,248,.12); }
    .ctrl-divider { width:100%; height:1px; background:#1a1a2e; }

    /* legend */
    .legend { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px; }
    .legend-item { display:flex; align-items:center; gap:5px; font-size:10px; color:#64748b; font-family:'JetBrains Mono',monospace; }
    .legend-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }

    /* chart */
    .chart-wrap { background:#0e0e1a; border:1px solid #1a1a2e; border-radius:12px; padding:20px 6px 8px; margin-bottom:20px; }
    .chart-title { font-size:11px; color:#475569; font-family:'JetBrains Mono',monospace; letter-spacing:.08em; padding:0 14px; margin-bottom:14px; }

    /* table */
    .table-wrap { background:#0e0e1a; border:1px solid #1a1a2e; border-radius:12px; overflow:hidden; margin-bottom:20px; }
    .t-head { display:grid; grid-template-columns:1fr 70px 80px 70px 80px; gap:6px; padding:9px 14px; background:#12121c; border-bottom:1px solid #1a1a2e; }
    .th { font-size:9px; color:#475569; font-family:'JetBrains Mono',monospace; letter-spacing:.1em; text-transform:uppercase; }
    .t-row { display:grid; grid-template-columns:1fr 70px 80px 70px 80px; gap:6px; padding:9px 14px; border-bottom:1px solid #12121c; align-items:center; transition:background .1s; }
    .t-row:last-child { border-bottom:none; }
    .t-row:hover { background:#12121c; }
    .td { font-size:12px; color:#cbd5e1; }
    .td-mono { font-size:11px; font-family:'JetBrains Mono',monospace; color:#94a3b8; }
    .topic-name { display:flex; align-items:center; gap:7px; }
    .cat-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .mini-bar-wrap { flex:1; height:3px; background:#1e1e2e; border-radius:3px; }
    .mini-bar { height:100%; border-radius:3px; }

    /* timeline */
    .tl-list { display:flex; flex-direction:column; gap:10px; }
    .tl-row { background:#0e0e1a; border:1px solid #1a1a2e; border-radius:10px; padding:11px 14px; display:flex; align-items:flex-start; gap:14px; }
    .tl-year { font-size:14px; font-weight:800; color:#f1f5f9; min-width:42px; font-family:'JetBrains Mono',monospace; }
    .tl-tags { display:flex; gap:7px; flex-wrap:wrap; }
    .tl-tag { font-size:10px; padding:3px 9px; border-radius:20px; background:#12121c; border:1px solid #2d2d45; color:#94a3b8; font-family:'JetBrains Mono',monospace; }

    /* insights */
    .insights { background:#0e0e1a; border:1px solid #1a1a2e; border-radius:12px; padding:16px 18px; }
    .insights-title { font-size:10px; color:#475569; font-family:'JetBrains Mono',monospace; letter-spacing:.1em; margin-bottom:12px; }
    .insight { display:flex; gap:9px; margin-bottom:8px; font-size:12px; color:#94a3b8; line-height:1.55; }
    .insight:last-child { margin-bottom:0; }
    .ins-icon { font-size:13px; min-width:18px; }

    /* compare legend */
    .cmp-legend { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:10px; }
    .cmp-legend-item { display:flex; align-items:center; gap:5px; font-size:10px; font-family:'JetBrains Mono',monospace; color:#94a3b8; }
    .cmp-dot { width:8px; height:8px; border-radius:2px; }

    @media (max-width:640px) {
      .t-head, .t-row { grid-template-columns:1fr 60px 60px; }
      .hide-m { display:none; }
    }
  `;

  const INSIGHTS = {
    cnc: [
      { icon:"🔴", text:"SQL (SELECT, JOIN, GROUP BY, MCD/MLD) — présent dans 100% des sujets CNC. Priorité absolue." },
      { icon:"🔴", text:"Arbres Binaires / ABR — 85–90% des sessions, souvent le problème principal." },
      { icon:"🟠", text:"Tri & Complexité — quasi-systématique, souvent en mise en bouche (premières questions)." },
      { icon:"🟠", text:"Récursion — presque toujours présente, couplée aux arbres ou à la prog. dynamique." },
      { icon:"🟡", text:"Graphes (BFS/DFS/Dijkstra) — en nette hausse depuis 2021, probablement 2 questions désormais." },
      { icon:"🟡", text:"Prog. Dynamique (Levenshtein, LCS) — monte en puissance depuis 2022–2023." },
      { icon:"🟢", text:"Minimax / IA — ponctuels mais de plus en plus fréquents ces 3 dernières années." },
    ],
    ccp: [
      { icon:"🔴", text:"Récursion et Tri/Complexité — présents dans quasiment tous les sujets CCP." },
      { icon:"🔴", text:"SQL et Arbres — très fréquents, souvent en parties distinctes du sujet." },
      { icon:"🟠", text:"Graphes BFS/DFS — fréquents et souvent couplés à une preuve par invariant." },
      { icon:"🟠", text:"Invariants & Variants — fortement valorisés dans la correction CCP/CCINP." },
      { icon:"🟡", text:"Prog. Dynamique — en hausse, surtout depuis 2022." },
      { icon:"🟢", text:"SQL moins dominant qu'au CNC — souvent une partie sur 3 ou 4 du sujet." },
    ],
    xm: [
      { icon:"🔴", text:"Prog. Dynamique — thème roi des X-ENS/Mines-Ponts, souvent le cœur du sujet (~9 pts)." },
      { icon:"🔴", text:"Récursion + Preuve de correction — quasi-systématiques et très formalisées." },
      { icon:"🟠", text:"Graphes + Dijkstra — fréquents, traitement algorithmique rigoureux attendu." },
      { icon:"🟠", text:"Diviser pour régner — plus présent qu'aux autres concours (Mines-Ponts notamment)." },
      { icon:"🟡", text:"Automates / Langages formels — spécifique à X-ENS, quasi absent ailleurs." },
      { icon:"🟡", text:"SQL — marginal, seulement dans certaines filières." },
      { icon:"🟢", text:"Listes chaînées et MCD/MLD — presque absents, contrairement au CNC." },
    ],
    e3a: [
      { icon:"🔴", text:"SQL et Arbres — présents dans la grande majorité des sujets E3A/Polytech." },
      { icon:"🔴", text:"Tri & Complexité — systématique, souvent en premier exercice." },
      { icon:"🟠", text:"Récursion et Listes chaînées — très fréquents, niveau accessible." },
      { icon:"🟠", text:"Graphes — en hausse depuis 2021, souvent BFS/DFS sans Dijkstra." },
      { icon:"🟡", text:"Prog. Dynamique — apparaît mais moins rigoureux qu'en X-Mines." },
      { icon:"🟢", text:"Automates — quasi absents, contrairement à X-ENS." },
    ],
  };

  const CMP_COLORS = { CNC:"#f472b6", CCP:"#60a5fa", "X-Mines":"#34d399", E3A:"#fb923c" };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="inner">

          <div className="hdr">
            <div className="title">Concours Informatique — Statistiques</div>
            <div className="subtitle">CNC Maroc · CCP/CCINP · X-ENS/Mines-Ponts · E3A/Polytech · 2015–2025</div>
          </div>

          {/* ── Controls ── */}
          <div className="controls">
            {/* Concours row */}
            <div className="ctrl-row">
              <span className="ctrl-label">CONCOURS</span>
              {Object.entries(CONCOURS_CONFIG).map(([k, v]) => (
                <button key={k}
                  className={`btn btn--concours ${concours===k&&!compare?"btn--active":""}`}
                  style={concours===k&&!compare ? { borderColor:v.color, color:v.color } : {}}
                  onClick={() => { setConcours(k); setCompare(false); }}>
                  {v.label}
                </button>
              ))}
              <button className={`btn btn--compare ${compare?"btn--active":""}`}
                onClick={() => setCompare(c => !c)}>
                ⇄ Comparer tout
              </button>
            </div>

            {/* Filière + View + Sort row */}
            {!compare && (
              <div className="ctrl-row">
                <span className="ctrl-label">FILIÈRE</span>
                {cfg.filieres.map(f => (
                  <button key={f} className={`btn ${filiere===f?"btn--active":""}`} onClick={() => setFiliere(f)}>
                    {f.toUpperCase()}
                  </button>
                ))}
                <div style={{ width:1, height:24, background:"#1e1e2e", margin:"0 4px" }} />
                <span className="ctrl-label">VUE</span>
                {[["bar","Barres"],["timeline","Timeline"]].map(([v,l]) => (
                  <button key={v} className={`btn ${view===v?"btn--active":""}`} onClick={() => setView(v)}>{l}</button>
                ))}
                <div style={{ width:1, height:24, background:"#1e1e2e", margin:"0 4px" }} />
                <span className="ctrl-label">TRI</span>
                {[["freq","Fréquence"],["weight","Poids"]].map(([v,l]) => (
                  <button key={v} className={`btn ${sort===v?"btn--active":""}`} onClick={() => setSort(v)}>{l}</button>
                ))}
              </div>
            )}

            <div className="ctrl-divider" />

            {/* Category row */}
            <div className="ctrl-row">
              <span className="ctrl-label">CATÉGORIE</span>
              {CATEGORIES.map(c => (
                <button key={c}
                  className={`btn ${cat===c?"btn--active":""}`}
                  style={cat===c && CAT_COLORS[c] ? { borderColor:CAT_COLORS[c], color:CAT_COLORS[c] } : {}}
                  onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ── Compare mode ── */}
          {compare && (
            <>
              <div className="cmp-legend">
                {Object.entries(CMP_COLORS).map(([k,c]) => (
                  <div key={k} className="cmp-legend-item">
                    <div className="cmp-dot" style={{ background:c }} />
                    {k === "X-Mines" ? "X-ENS / Mines-Ponts" : k === "CCP" ? "CCP / CCINP" : k === "E3A" ? "E3A / Polytech" : "CNC Maroc"}
                  </div>
                ))}
                <span style={{ fontSize:10, color:"#334155", fontFamily:"monospace", marginLeft:4 }}>filière MP</span>
              </div>
              <div className="chart-wrap">
                <div className="chart-title">FRÉQUENCE PAR CONCOURS (MP) — nombre de sessions sur ~10</div>
                <ResponsiveContainer width="100%" height={Math.max(300, compareData.length * 28)}>
                  <BarChart data={compareData} layout="vertical" margin={{ left:10, right:30, top:0, bottom:0 }} barCategoryGap="25%">
                    <XAxis type="number" domain={[0,10]} tick={{ fill:"#475569", fontSize:10, fontFamily:"monospace" }} />
                    <YAxis type="category" dataKey="topic" width={190} tick={{ fill:"#94a3b8", fontSize:10, fontFamily:"monospace" }} />
                    <Tooltip contentStyle={{ background:"#1a1a2e", border:"1px solid #2d2d45", borderRadius:8, fontFamily:"monospace", fontSize:11 }} />
                    <Legend wrapperStyle={{ fontFamily:"monospace", fontSize:10, color:"#94a3b8" }} />
                    {Object.entries(CMP_COLORS).map(([k,c]) => (
                      <Bar key={k} dataKey={k} fill={c} radius={[0,3,3,0]} maxBarSize={10} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ── Single concours bar chart ── */}
          {!compare && view === "bar" && (
            <>
              <div className="legend">
                {Object.entries(CAT_COLORS).map(([c,col]) => (
                  <div key={c} className="legend-item">
                    <div className="legend-dot" style={{ background:col }} />
                    {c}
                  </div>
                ))}
              </div>
              <div className="chart-wrap">
                <div className="chart-title">{cfg.label.toUpperCase()} — {filiere.toUpperCase()} · {cfg.note} · trié par {sort === "freq" ? "fréquence" : "poids"}</div>
                <ResponsiveContainer width="100%" height={Math.max(260, filtered.length * 26)}>
                  <BarChart data={filtered} layout="vertical" margin={{ left:10, right:30, top:0, bottom:0 }}>
                    <XAxis type="number" domain={[0,10]} tick={{ fill:"#475569", fontSize:10, fontFamily:"monospace" }}
                      label={{ value:"sessions / 10", position:"insideBottomRight", offset:-4, fill:"#334155", fontSize:9 }} />
                    <YAxis type="category" dataKey="topic" width={195} tick={{ fill:"#94a3b8", fontSize:10, fontFamily:"monospace" }} />
                    <Tooltip content={<CustomTooltip concours={concours} filiere={filiere} />} cursor={{ fill:"rgba(255,255,255,0.03)" }} />
                    <Bar dataKey={barKey} radius={[0,4,4,0]} maxBarSize={16}>
                      {filtered.map((t,i) => <Cell key={i} fill={CAT_COLORS[t.cat]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detail table */}
              <div className="table-wrap">
                <div className="t-head">
                  <span className="th">Thème</span>
                  <span className="th">Freq.</span>
                  <span className="th">Poids</span>
                  <span className="th hide-m">Tendance</span>
                  <span className="th hide-m">Catégorie</span>
                </div>
                {filtered.map((t,i) => (
                  <div key={i} className="t-row">
                    <div className="topic-name td">
                      <span className="cat-dot" style={{ background:CAT_COLORS[t.cat] }} />
                      <span style={{ flex:1 }}>{t.topic}</span>
                      <div className="mini-bar-wrap">
                        <div className="mini-bar" style={{ width:`${t[barKey]/10*100}%`, background:CAT_COLORS[t.cat]+"88" }} />
                      </div>
                    </div>
                    <div className="td-mono">{t[barKey]}/10</div>
                    <div className="td-mono">~{t[wKey]} pts</div>
                    <div className="hide-m" style={{ color:TREND_COLOR[t.trend], fontSize:11, fontFamily:"monospace", fontWeight:700 }}>
                      {TREND_ICON[t.trend]} {t.trend}
                    </div>
                    <div className="hide-m td-mono" style={{ color:CAT_COLORS[t.cat]+"cc" }}>{t.cat}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Timeline view ── */}
          {!compare && view === "timeline" && (
            <div className="tl-list">
              {(TIMELINES[concours] || []).map(y => (
                <div key={y.year} className="tl-row">
                  <div className="tl-year">{y.year}</div>
                  <div className="tl-tags">
                    {y.topics.map((t,i) => <span key={i} className="tl-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Insights ── */}
          <div className="insights" style={{ marginTop:20 }}>
            <div className="insights-title">
              {compare ? "INSIGHTS COMPARATIFS" : `INSIGHTS — ${cfg.label.toUpperCase()}`}
            </div>
            {compare ? (
              <>
                {[
                  { icon:"🔴", text:"SQL : dominant au CNC et CCP, quasi absent en X-Mines/ENS." },
                  { icon:"🔴", text:"Prog. Dynamique : thème roi en X-Mines (~9 pts), secondaire au CNC." },
                  { icon:"🟠", text:"Récursion & Tri : universels — présents dans les 4 concours." },
                  { icon:"🟠", text:"Arbres Binaires : partout, mais le niveau de formalisme varie fortement." },
                  { icon:"🟡", text:"Automates / Langages formels : exclusifs à X-ENS, absents ailleurs." },
                  { icon:"🟡", text:"MCD/MLD et INSERT/UPDATE : spécifiques à CNC et CCP/E3A, absents en X-Mines." },
                  { icon:"🟢", text:"Listes chaînées : très présentes au CNC, marginales en X-Mines." },
                  { icon:"🟢", text:"Diviser pour régner : plus valorisé en X-Mines et CCP qu'au CNC." },
                ].map((ins,i) => (
                  <div key={i} className="insight">
                    <span className="ins-icon">{ins.icon}</span>
                    <span>{ins.text}</span>
                  </div>
                ))}
              </>
            ) : (
              (INSIGHTS[concours]||[]).map((ins,i) => (
                <div key={i} className="insight">
                  <span className="ins-icon">{ins.icon}</span>
                  <span>{ins.text}</span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}
