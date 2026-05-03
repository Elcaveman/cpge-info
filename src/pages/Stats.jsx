import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../css/Stats.css";
import { ALL_DATA, TIMELINES, CAT_COLORS } from "../data/statsData.jsx";

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
    <div className="stats-page">
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
              {Object.entries(CONCOURS_CONFIG).map(([k, cfgItem]) => (
                <button key={k}
                  className={`btn btn--concours btn--concours-${k} ${concours===k&&!compare?"btn--active":""}`}
                  onClick={() => { setConcours(k); setCompare(false); }}>
                  {cfgItem.label}
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
                <div className="ctrl-vdiv" />
                <span className="ctrl-label">VUE</span>
                {[["bar","Barres"],["timeline","Timeline"]].map(([v,l]) => (
                  <button key={v} className={`btn ${view===v?"btn--active":""}`} onClick={() => setView(v)}>{l}</button>
                ))}
                <div className="ctrl-vdiv" />
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
                  className={`btn btn--cat btn--cat-${CAT_CLASS[c]} ${cat===c?"btn--active":""}`}
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
                    <div className={`cmp-dot cmp-dot--${CMP_CLASS[k]}`} />
                    {k === "X-Mines" ? "X-ENS / Mines-Ponts" : k === "CCP" ? "CCP / CCINP" : k === "E3A" ? "E3A / Polytech" : "CNC Maroc"}
                  </div>
                ))}
                <span className="cmp-note">filiere MP</span>
              </div>
              <div className="chart-wrap">
                <div className="chart-title">FRÉQUENCE PAR CONCOURS (MP) — nombre de sessions sur ~10</div>
                <ResponsiveContainer width="100%" height={Math.max(300, compareData.length * 28)}>
                  <BarChart data={compareData} layout="vertical" margin={{ left:10, right:30, top:0, bottom:0 }} barCategoryGap="25%">
                    <XAxis type="number" domain={[0,10]} tick={{ fill:"#475569", fontSize:10, fontFamily:"monospace" }} />
                    <YAxis type="category" dataKey="topic" width={190} tick={{ fill:"#94a3b8", fontSize:10, fontFamily:"monospace" }} />
                    <Tooltip />
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
                    <div className={`legend-dot legend-dot--${CAT_CLASS[c]}`} />
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
                      <span className={`cat-dot cat-dot--${CAT_CLASS[t.cat]}`} />
                      <span className="topic-text">{t.topic}</span>
                      <div className="mini-bar-wrap">
                        <div className={`mini-bar mini-bar--${CAT_CLASS[t.cat]} w-${Math.round((t[barKey] / 10) * 100)}`} />
                      </div>
                    </div>
                    <div className="td-mono">{t[barKey]}/10</div>
                    <div className="td-mono">~{t[wKey]} pts</div>
                    <div className={`hide-m trend trend-${t.trend}`}>
                      {TREND_ICON[t.trend]} {t.trend}
                    </div>
                    <div className={`hide-m td-mono cat-text cat-text--${CAT_CLASS[t.cat]}`}>{t.cat}</div>
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
          <div className="insights insights--spaced">
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
    </div>
  );
}
