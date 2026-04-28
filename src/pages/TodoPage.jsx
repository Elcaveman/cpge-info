import { useState, useMemo } from "react";
import { ALL_ITEMS } from "../data/data";
import "./TodoPage.css";


const SEM_LABELS = { 0: "Annexe Python", 1: "Semestre 1", 2: "Semestre 2", 3: "Semestre 3", 4: "Semestre 4" };

// ─── TODO PAGE ───────────────────────────────────────────────────────────────
export function TodoPage({ checked, toggle, resetChecked }) {
  const [filterSem, setFilterSem] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSection, setFilterSection] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  const sections = useMemo(() => [...new Set(ALL_ITEMS.map(i => i.section))], []);

  const filtered = useMemo(() => ALL_ITEMS.filter(item => {
    if (filterSem !== "all" && item.sem !== Number(filterSem)) return false;
    if (filterPriority !== "all" && item.priority !== filterPriority) return false;
    if (filterStatus === "done" && !checked[item.id]) return false;
    if (filterStatus === "todo" && checked[item.id]) return false;
    if (filterSection !== "all" && item.section !== filterSection) return false;
    if (search && !item.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [filterSem, filterPriority, filterStatus, filterSection, search, checked]);

  const stats = useMemo(() => {
    const total = ALL_ITEMS.length;
    const done = ALL_ITEMS.filter(i => checked[i.id]).length;
    const p0Total = ALL_ITEMS.filter(i => i.priority === "P0").length;
    const p0Done = ALL_ITEMS.filter(i => i.priority === "P0" && checked[i.id]).length;
    return { total, done, p0Total, p0Done, pct: Math.round((done / total) * 100) };
  }, [checked]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(item => {
      if (!g[item.section]) g[item.section] = [];
      g[item.section].push(item);
    });
    return g;
  }, [filtered]);

  const resetFiltersAndTasks = (checked) => {
    setFilterSem("all"); setFilterPriority("all");
    setFilterStatus("all"); setFilterSection("all"); setSearch("");
    resetChecked();
  };

  return (
    <>
    <main className="centered">
      <div className="page">
        <div className="todo-header">
          <div className="header-top">
            <div className="title">CPGE Informatique</div>
            <div className="subtitle">MP · PC · PSI · PT — Programme 2021</div>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-row">
              <span className="progress-label">PROGRESSION GLOBALE</span>
              <span className="progress-label">{stats.done} / {stats.total} — {stats.pct}%</span>
            </div>
            <progress className="todo-progress-meter" max={100} value={stats.pct} />
          </div>
          <div className="stats-row">
            {[
              { num: stats.done, lbl: "VALIDÉS", tone: "done" },
              { num: stats.total - stats.done, lbl: "RESTANTS", tone: "remaining" },
              { num: stats.p0Done, lbl: "P0 VALIDÉS", tone: "p0-done" },
              { num: stats.p0Total - stats.p0Done, lbl: "P0 RESTANTS", tone: "p0-remaining" },
            ].map(s => (
              <div key={s.lbl} className="stat-chip">
                <div className={`stat-num stat-num--${s.tone}`}>{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="filters">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input className="search" placeholder="Rechercher une notion..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-row">
            <select value={filterSem} onChange={e => setFilterSem(e.target.value)}>
              <option value="all">Tous les semestres</option>
              <option value="0">Annexe Python</option>
              <option value="1">Semestre 1</option>
              <option value="2">Semestre 2</option>
              <option value="3">Semestre 3</option>
              <option value="4">Semestre 4</option>
            </select>
            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
              <option value="all">Toutes priorités</option>
              <option value="P0">🔴 P0 — Indispensable</option>
              <option value="P1">🟠 P1 — Important</option>
              <option value="P2">🟡 P2 — Optionnel</option>
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Tout statut</option>
              <option value="todo">À faire</option>
              <option value="done">Validés</option>
            </select>
            <select className="filter-section-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
              <option value="all">Toutes sections</option>
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="reset-btn" onClick={resetFiltersAndTasks}>↺ Réinitialiser</button>
          </div>
        </div>

        <div className="results-count">
          {filtered.length} notion{filtered.length !== 1 ? "s" : ""} affichée{filtered.length !== 1 ? "s" : ""}
          {(filterSem !== "all" || filterPriority !== "all" || filterStatus !== "all" || filterSection !== "all" || search) && " (filtrées)"}
        </div>

        <div className="content">
        {Object.keys(grouped).length === 0 ? (
          <div className="empty">Aucune notion ne correspond aux filtres sélectionnés.</div>
        ) : (
          Object.entries(grouped).map(([section, items]) => {
            const semVal = items[0].sem;
            const doneSec = items.filter(i => checked[i.id]).length;
            return (
              <div key={section} className="section-block">
                <div className="section-header">
                  <div className={`section-sem-bar sem-${semVal}`} />
                  <span className="section-title">{section}</span>
                  <span className="section-count">{doneSec}/{items.length}</span>
                </div>
                {items.map(item => {
                  const isExpanded = expandedItem === item.id;
                  const hasDetail = item.hook || item.pitfall;
                  return (
                    <div key={item.id} className={`item ${checked[item.id] ? "done" : ""}`}>
                      <div className="item-main" onClick={() => toggle(item.id)}>
                        <div className={`checkbox ${checked[item.id] ? "checked" : ""}`} onClick={e => { e.stopPropagation(); toggle(item.id); }}>
                          {checked[item.id] && (
                            <svg className="check-svg" viewBox="0 0 12 12">
                              <polyline points="2,6 5,9 10,3" />
                            </svg>
                          )}
                        </div>
                        <div className="item-body">
                          <div className={`item-text ${checked[item.id] ? "done" : ""}`}>{item.text}</div>
                          <div className="item-meta">
                            <span className={`priority-badge priority-badge--${item.priority.toLowerCase()}`}>{item.priority}</span>
                            <span className={`sem-badge sem-${item.sem}`}>{SEM_LABELS[item.sem]}</span>
                          </div>
                        </div>
                        {hasDetail && (
                          <button className="expand-btn" onClick={e => { e.stopPropagation(); setExpandedItem(isExpanded ? null : item.id); }}>
                            {isExpanded ? "▲" : "▾"}
                          </button>
                        )}
                      </div>
                      {isExpanded && hasDetail && (
                        <>
                          <div className="divider" />
                          <div className="item-detail">
                            {item.hook && (
                              <div className="detail-row">
                                <span className="detail-icon">💡</span>
                                <span className="detail-text hook">{item.hook}</span>
                              </div>
                            )}
                            {item.pitfall && (
                              <div className="detail-row">
                                <span className="detail-icon">⚠️</span>
                                <span className="detail-text pitfall">{item.pitfall}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
        </div>
      </div>
      </main>
    </>
  );
}