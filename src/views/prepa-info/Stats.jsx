import { useState, useMemo } from "react";
import {
  ALL_DATA,
  CONCOURS_CONFIG,
  TIMELINES,
  CAT_COLORS,
  TREND_ICON,
  CATEGORIES,
} from "../../data/statsData.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const CAT_CLASS = {
  Structures: "structures",
  Algorithmique: "algorithmique",
  "Bases de donnees": "bdd",
  "Bases de données": "bdd",
  Methodes: "methodes",
  "Méthodes": "methodes",
  "IA & Jeux": "ia-jeux",
  Representation: "representation",
  "Représentation": "representation",
};

const CMP_CLASS = {
  CNC: "cnc",
  CCP: "ccp",
  "X-Mines": "x-mines",
  E3A: "e3a",
};

// Tooltip
function CustomTooltip({ active, payload, concours, filiere }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const key = `${concours}_${filiere}`;
  const wKey = `weight_${concours}`;

  return (
    <div className="stats-tooltip">
      <div className="stats-tooltip-title">{d.topic}</div>
      <div className="stats-tooltip-line">Frequence : {d[key]}/10 sessions</div>
      <div className="stats-tooltip-line">Poids moyen : ~{d[wKey]} pts</div>
      <div className={`stats-tooltip-trend trend trend-${d.trend}`}>
        {TREND_ICON[d.trend]} {d.trend}
      </div>
    </div>
  );
}

export default function Stats() {
  const [concours, setConcours] = useState("cnc");
  const [filiere, setFiliere] = useState("mp");
  const [cat, setCat] = useState("Toutes");
  const [view, setView] = useState("bar");
  const [sort, setSort] = useState("freq");
  const [compare, setCompare] = useState(false);

  const cfg = CONCOURS_CONFIG[concours];
  const barKey = `${concours}_${filiere}`;
  const wKey = `weight_${concours}`;

  const filtered = useMemo(() => {
    return ALL_DATA
      .filter((t) => cat === "Toutes" || t.cat === cat)
      .sort((a, b) => (sort === "freq" ? b[barKey] - a[barKey] : b[wKey] - a[wKey]));
  }, [cat, barKey, wKey, sort]);

  const compareData = useMemo(() => {
    return ALL_DATA
      .filter((t) => cat === "Toutes" || t.cat === cat)
      .sort((a, b) => b.cnc_mp - a.cnc_mp)
      .map((t) => ({
        topic: t.topic.length > 22 ? `${t.topic.slice(0, 20)}…` : t.topic,
        CNC: t.cnc_mp,
        CCP: t.ccp_mp,
        "X-Mines": t.xm_mp,
        E3A: t.e3a_mp,
        cat: t.cat,
      }));
  }, [cat]);

  const INSIGHTS = {
    cnc: [
      { icon: "🔴", text: "SQL (SELECT, JOIN, GROUP BY, MCD/MLD) — present dans 100% des sujets CNC. Priorite absolue." },
      { icon: "🔴", text: "Arbres Binaires / ABR — 85-90% des sessions, souvent le probleme principal." },
      { icon: "🟠", text: "Tri & Complexite — quasi-systematique, souvent en mise en bouche (premieres questions)." },
      { icon: "🟠", text: "Recursion — presque toujours presente, couplee aux arbres ou a la prog. dynamique." },
      { icon: "🟡", text: "Graphes (BFS/DFS/Dijkstra) — en nette hausse depuis 2021, probablement 2 questions desormais." },
      { icon: "🟡", text: "Prog. Dynamique (Levenshtein, LCS) — monte en puissance depuis 2022-2023." },
      { icon: "🟢", text: "Minimax / IA — ponctuels mais de plus en plus frequents ces 3 dernieres annees." },
    ],
    ccp: [
      { icon: "🔴", text: "Recursion et Tri/Complexite — presents dans quasiment tous les sujets CCP." },
      { icon: "🔴", text: "SQL et Arbres — tres frequents, souvent en parties distinctes du sujet." },
      { icon: "🟠", text: "Graphes BFS/DFS — frequents et souvent couples a une preuve par invariant." },
      { icon: "🟠", text: "Invariants & Variants — fortement valorises dans la correction CCP/CCINP." },
      { icon: "🟡", text: "Prog. Dynamique — en hausse, surtout depuis 2022." },
      { icon: "🟢", text: "SQL moins dominant qu'au CNC — souvent une partie sur 3 ou 4 du sujet." },
    ],
    xm: [
      { icon: "🔴", text: "Prog. Dynamique — theme roi des X-ENS/Mines-Ponts, souvent le coeur du sujet (~9 pts)." },
      { icon: "🔴", text: "Recursion + Preuve de correction — quasi-systematiques et tres formalisees." },
      { icon: "🟠", text: "Graphes + Dijkstra — frequents, traitement algorithmique rigoureux attendu." },
      { icon: "🟠", text: "Diviser pour regner — plus present qu'aux autres concours (Mines-Ponts notamment)." },
      { icon: "🟡", text: "Automates / Langages formels — specifique a X-ENS, quasi absent ailleurs." },
      { icon: "🟡", text: "SQL — marginal, seulement dans certaines filieres." },
      { icon: "🟢", text: "Listes chainees et MCD/MLD — presque absents, contrairement au CNC." },
    ],
    e3a: [
      { icon: "🔴", text: "SQL et Arbres — presents dans la grande majorite des sujets E3A/Polytech." },
      { icon: "🔴", text: "Tri & Complexite — systematique, souvent en premier exercice." },
      { icon: "🟠", text: "Recursion et Listes chainees — tres frequents, niveau accessible." },
      { icon: "🟠", text: "Graphes — en hausse depuis 2021, souvent BFS/DFS sans Dijkstra." },
      { icon: "🟡", text: "Prog. Dynamique — apparait mais moins rigoureux qu'en X-Mines." },
      { icon: "🟢", text: "Automates — quasi absents, contrairement a X-ENS." },
    ],
  };

  const CMP_COLORS = { CNC: "#f472b6", CCP: "#60a5fa", "X-Mines": "#34d399", E3A: "#fb923c" };

  return (
    <div className="stats-page">
      <div className="stats-app">
        <div className="stats-inner">
          <div className="stats-hdr">
            <div className="stats-title">Concours Informatique - Statistiques</div>
            <div className="stats-subtitle">CNC Maroc - CCP/CCINP - X-ENS/Mines-Ponts - E3A/Polytech - 2015-2025</div>
          </div>

          <div className="controls">
            <div className="ctrl-row">
              <span className="ctrl-label">CONCOURS</span>
              {Object.entries(CONCOURS_CONFIG).map(([k, v]) => (
                <button
                  key={k}
                  className={`stats-btn stats-btn--concours stats-btn--concours-${k} ${concours === k && !compare ? "stats-btn--active" : ""}`}
                  onClick={() => {
                    setConcours(k);
                    setCompare(false);
                  }}
                >
                  {v.label}
                </button>
              ))}
              <button className={`stats-btn stats-btn--compare ${compare ? "stats-btn--active" : ""}`} onClick={() => setCompare((c) => !c)}>
                Comparer tout
              </button>
            </div>

            {!compare && (
              <div className="ctrl-row">
                <span className="ctrl-label">FILIERE</span>
                {cfg.filieres.map((f) => (
                  <button key={f} className={`stats-btn ${filiere === f ? "stats-btn--active" : ""}`} onClick={() => setFiliere(f)}>
                    {f.toUpperCase()}
                  </button>
                ))}

                <div className="ctrl-vdiv" />

                <span className="ctrl-label">VUE</span>
                {["bar", "timeline"].map((v) => (
                  <button key={v} className={`stats-btn ${view === v ? "stats-btn--active" : ""}`} onClick={() => setView(v)}>
                    {v === "bar" ? "Barres" : "Timeline"}
                  </button>
                ))}

                <div className="ctrl-vdiv" />

                <span className="ctrl-label">TRI</span>
                {["freq", "weight"].map((v) => (
                  <button key={v} className={`stats-btn ${sort === v ? "stats-btn--active" : ""}`} onClick={() => setSort(v)}>
                    {v === "freq" ? "Frequence" : "Poids"}
                  </button>
                ))}
              </div>
            )}

            <div className="ctrl-divider" />

            <div className="ctrl-row">
              <span className="ctrl-label">CATEGORIE</span>
              {CATEGORIES.map((c) => {
                const catClass = CAT_CLASS[c];
                return (
                  <button
                    key={c}
                    className={`stats-btn ${catClass ? `stats-btn--cat-${catClass}` : ""} ${cat === c ? "stats-btn--active" : ""}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {compare && (
            <>
              <div className="cmp-legend">
                {Object.entries(CMP_COLORS).map(([k]) => (
                  <div key={k} className="cmp-legend-item">
                    <div className={`cmp-dot cmp-dot--${CMP_CLASS[k]}`} />
                    {k === "X-Mines"
                      ? "X-ENS / Mines-Ponts"
                      : k === "CCP"
                        ? "CCP / CCINP"
                        : k === "E3A"
                          ? "E3A / Polytech"
                          : "CNC Maroc"}
                  </div>
                ))}
                <span className="cmp-note">filiere MP</span>
              </div>

              <div className="chart-wrap">
                <div className="chart-title">FREQUENCE PAR CONCOURS (MP) - nombre de sessions sur ~10</div>
                <ResponsiveContainer width="100%" height={Math.max(300, compareData.length * 28)}>
                  <BarChart data={compareData} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }} barCategoryGap="25%">
                    <XAxis type="number" domain={[0, 10]} tick={{ fill: "#475569", fontSize: 10, fontFamily: "monospace" }} />
                    <YAxis type="category" dataKey="topic" width={190} tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }} />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a2e",
                        border: "1px solid #2d2d45",
                        borderRadius: 8,
                        fontFamily: "monospace",
                        fontSize: 11,
                      }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: 10, color: "#94a3b8" }} />
                    {Object.entries(CMP_COLORS).map(([k, c]) => (
                      <Bar key={k} dataKey={k} fill={c} radius={[0, 3, 3, 0]} maxBarSize={10} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {!compare && view === "bar" && (
            <>
              <div className="legend">
                {Object.entries(CAT_COLORS).map(([c]) => (
                  <div key={c} className="legend-item">
                    <div className={`legend-dot legend-dot--${CAT_CLASS[c]}`} />
                    {c}
                  </div>
                ))}
              </div>

              <div className="chart-wrap">
                <div className="chart-title">
                  {cfg.label.toUpperCase()} - {filiere.toUpperCase()} - {cfg.note} - trie par {sort === "freq" ? "frequence" : "poids"}
                </div>
                <ResponsiveContainer width="100%" height={Math.max(260, filtered.length * 26)}>
                  <BarChart data={filtered} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
                    <XAxis
                      type="number"
                      domain={[0, 10]}
                      tick={{ fill: "#475569", fontSize: 10, fontFamily: "monospace" }}
                      label={{ value: "sessions / 10", position: "insideBottomRight", offset: -4, fill: "#334155", fontSize: 9 }}
                    />
                    <YAxis type="category" dataKey="topic" width={195} tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }} />
                    <Tooltip content={<CustomTooltip concours={concours} filiere={filiere} />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey={barKey} radius={[0, 4, 4, 0]} maxBarSize={16}>
                      {filtered.map((t, i) => (
                        <Cell key={i} fill={CAT_COLORS[t.cat]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="table-wrap">
                <div className="t-head">
                  <span className="th">Theme</span>
                  <span className="th">Freq.</span>
                  <span className="th">Poids</span>
                  <span className="th hide-m">Tendance</span>
                  <span className="th hide-m">Categorie</span>
                </div>

                {filtered.map((t, i) => {
                  const catClass = CAT_CLASS[t.cat] || "structures";
                  const widthClass = `w-${Math.max(0, Math.min(100, Math.round((t[barKey] / 10) * 100)))}`;

                  return (
                    <div key={i} className="t-row">
                      <div className="topic-name td">
                        <span className={`cat-dot cat-dot--${catClass}`} />
                        <span className="topic-text">{t.topic}</span>
                        <div className="mini-bar-wrap">
                          <div className={`mini-bar mini-bar--${catClass} ${widthClass}`} />
                        </div>
                      </div>
                      <div className="td-mono">{t[barKey]}/10</div>
                      <div className="td-mono">~{t[wKey]} pts</div>
                      <div className={`hide-m trend trend-${t.trend}`}>
                        {TREND_ICON[t.trend]} {t.trend}
                      </div>
                      <div className={`hide-m td-mono cat-text--${catClass}`}>{t.cat}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!compare && view === "timeline" && (
            <div className="tl-list">
              {(TIMELINES[concours] || []).map((y) => (
                <div key={y.year} className="tl-row">
                  <div className="tl-year">{y.year}</div>
                  <div className="tl-tags">
                    {y.topics.map((t, i) => (
                      <span key={i} className="tl-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="insights insights--spaced">
            <div className="insights-title">{compare ? "INSIGHTS COMPARATIFS" : `INSIGHTS - ${cfg.label.toUpperCase()}`}</div>
            {compare ? (
              <>
                {[
                  { icon: "🔴", text: "SQL : dominant au CNC et CCP, quasi absent en X-Mines/ENS." },
                  { icon: "🔴", text: "Prog. Dynamique : theme roi en X-Mines (~9 pts), secondaire au CNC." },
                  { icon: "🟠", text: "Recursion & Tri : universels - presents dans les 4 concours." },
                  { icon: "🟠", text: "Arbres Binaires : partout, mais le niveau de formalisme varie fortement." },
                  { icon: "🟡", text: "Automates / Langages formels : exclusifs a X-ENS, absents ailleurs." },
                  { icon: "🟡", text: "MCD/MLD et INSERT/UPDATE : specifiques a CNC et CCP/E3A, absents en X-Mines." },
                  { icon: "🟢", text: "Listes chainees : tres presentes au CNC, marginales en X-Mines." },
                  { icon: "🟢", text: "Diviser pour regner : plus valorise en X-Mines et CCP qu'au CNC." },
                ].map((ins, i) => (
                  <div key={i} className="insight">
                    <span className="ins-icon">{ins.icon}</span>
                    <span>{ins.text}</span>
                  </div>
                ))}
              </>
            ) : (
              (INSIGHTS[concours] || []).map((ins, i) => (
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
