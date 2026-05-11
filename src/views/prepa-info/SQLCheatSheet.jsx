import { useCallback } from "react";
import { CATS, SECTIONS, NAV_ITEMS } from "../../data/sqlCheatSheetData.jsx";
import { useMediaQuery } from "../../components/useMediaQuery.jsx";
import { MQ } from "../../lib/constants.js";
import { useCheatSheet } from "../../lib/useCheatSheet.js";
import { FilterBar } from "../../components/FilterBar.jsx";
import { SectionHeader } from "../../components/SectionHeader.jsx";

const sqlMatch = (c, q) => (c.kw + c.rest).toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);

export default function SQLCheatSheet() {
  const isMobile = useMediaQuery(MQ.tablet);
  const matchItem = useCallback(sqlMatch, []);
  const {
    activeCat, setActiveCat,
    search, setSearch,
    copied, copy,
    activeNav, scrollToSection,
    filtered, total, shown, progress,
  } = useCheatSheet(SECTIONS, "cmds", matchItem);

  return (
    <div className="sql-cheat">
      <div className="layout">  
        {/* SIDEBAR */}
        {!isMobile && <aside className="sidebar">
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
        </aside>}

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
            <FilterBar
              label="CATÉGORIE"
              options={CATS.map(c => ({ ...c, className: `cat-${c.id}` }))}
              value={activeCat}
              onChange={id => { setActiveCat(id); setSearch(""); }}
            />

            {/* SECTIONS */}
            {filtered.length === 0 && (
              <div className="no-results">No commands match "{search}"</div>
            )}
            {filtered.map(sec => {
              return (
                <div key={sec.cat} id={"sec-" + sec.cat} className="section">
                  <SectionHeader
                    title={sec.title}
                    count={`${sec.cmds.length} cmds`}
                    barClass={`cat-${sec.cat}`}
                  />
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
