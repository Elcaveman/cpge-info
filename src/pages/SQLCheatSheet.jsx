import { useState, useMemo } from "react";
import "../css/SQLCheatSheet.css";
import { CATS, SECTIONS, NAV_ITEMS } from "../data/sqlCheatSheetData.jsx";

export default function SQLCheatSheet() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [activeNav, setActiveNav] = useState(null);

  const filtered = useMemo(() => {
    return SECTIONS
      .filter(s => activeCat === "all" || s.cat === activeCat)
      .map(s => ({
        ...s,
        cmds: s.cmds.filter(c => {
          if (!search) return true;
          const q = search.toLowerCase();
          return (c.kw + c.rest).toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
        })
      }))
      .filter(s => s.cmds.length > 0);
  }, [activeCat, search]);

  const total = SECTIONS.reduce((a, s) => a + s.cmds.length, 0);
  const shown = filtered.reduce((a, s) => a + s.cmds.length, 0);
  const progress = Math.round((shown / total) * 100);

  function copy(raw, id) {
    navigator.clipboard.writeText(raw).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  function scrollToSection(catId) {
    setActiveCat("all");
    setSearch("");
    setActiveNav(catId);
    setTimeout(() => {
      const el = document.getElementById("sec-" + catId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <div className="sql-cheat">
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">SQL Ref</div>
            <div className="logo-sub">SELECT · JOIN · GROUP BY</div>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(n => (
              <div
                key={n.id}
                className={`nav-item cat-${n.id} ${activeNav === n.id ? "active" : ""}`}
                onClick={() => scrollToSection(n.id)}
              >
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                <span className={`nav-dot cat-${n.id}`} />
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            VISIBLE · {shown}/{total}
            <progress className="progress-meter" max={100} value={progress} />
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-title">SQL Cheat Sheet</div>
            <input
              className="search-input"
              placeholder="Search commands..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCat("all"); }}
            />
          </div>

          <div className="content">
            <h1 className="page-heading">SQL — Référence Complète</h1>
            <div className="page-sub">
              Commandes SQL essentielles pour la manipulation de données relationnelles.
            </div>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <div className="filter-row">
                <span className="filter-label">CATÉGORIE</span>
                {CATS.map(c => (
                  <div
                    key={c.id}
                    className={`pill cat-${c.id} ${activeCat === c.id ? "active" : ""}`}
                    onClick={() => { setActiveCat(c.id); setSearch(""); setActiveNav(null); }}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTIONS */}
            {filtered.length === 0 && (
              <div className="no-results">No commands match "{search}"</div>
            )}
            {filtered.map(sec => {
              return (
                <div key={sec.cat} id={"sec-" + sec.cat} className="section">
                  <div className="section-header">
                    <div className={`section-color-bar cat-${sec.cat}`} />
                    <span className="section-title-text">{sec.title}</span>
                    <span className="section-count">{sec.cmds.length} cmds</span>
                  </div>
                  <table className="cmd-table">
                    <tbody>
                      {sec.cmds.map((c, i) => {
                        const raw = (c.kw + (c.rest ? " " + c.rest : "")).trim();
                        const rowId = sec.cat + "-" + i;
                        return (
                          <tr
                            key={i}
                            className={`cmd-row ${copied === rowId ? "copied" : ""}`}
                            onClick={() => copy(raw, rowId)}
                            title="Click to copy"
                          >
                            <td className="cmd-cell-code">
                              <span className={`kw cat-${sec.cat}`}>{c.kw}</span>
                              {c.rest && <span className="val"> {c.rest}</span>}
                              <span className="copy-badge">copied!</span>
                            </td>
                            <td className="cmd-cell-desc">{c.desc}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
