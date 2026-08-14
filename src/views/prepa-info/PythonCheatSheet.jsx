import { useCallback } from "react";
import { FONT, HEADING, CATS, CAT_COLOR, SECTIONS, NAV_ITEMS } from "../../data/pythonCheatSheetData.jsx";
import { useMediaQuery } from "../../components/useMediaQuery.jsx";
import { MQ } from "../../lib/constants.js";
import { tokenize } from "../../lib/codeHighlight.js";
import { useCheatSheet } from "../../lib/useCheatSheet.js";
import { FilterBar } from "../../components/FilterBar.jsx";
import { SectionHeader } from "../../components/SectionHeader.jsx";

const PY_REGEX = /(#.*)|(f?'[^']*'|f?"[^"]*")|\b(\d+\.?\d*)\b|\b(import|from|as|def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|try|except|finally|raise|with|lambda|True|False|None|self)\b|\b(print|input|len|type|int|float|str|list|dict|set|tuple|range|enumerate|map|filter|sorted|min|max|sum|abs|round|open|isinstance|staticmethod|classmethod|super|zip|any|all|hasattr|getattr|setattr)\b|\b(np|px|go|json|csv|os|math|sqlite3|conn|cur|fig|df)\b/g;
const PY_CLASSES = ["py-cm", "py-str", "py-num", "py-kw", "py-fn", "py-mod"];

function highlight(code) {
  PY_REGEX.lastIndex = 0;
  return tokenize(code, PY_REGEX, PY_CLASSES);
}

const pyMatch = (c, q) => c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);

export default function PythonCheatSheet() {
  const isMobile = useMediaQuery(MQ.tablet);
  const matchItem = useCallback(pyMatch, []);
  const {
    activeCat, setActiveCat,
    search, setSearch,
    copied, copy,
    activeNav, scrollToSection: scrollTo,
    filtered, total, shown, progress,
  } = useCheatSheet(SECTIONS, "cmds", matchItem);

  return (
    <div className="python-cheat">
      <div className="layout">

        {/* ── SIDEBAR ── */}
        {!isMobile && <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">Python</div>
            <div className="logo-sub">NumPy · Plotly · SQLite3</div>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(n => (
              <div
                key={n.id}
                className={`nav-item ${activeNav === n.id ? "active" : ""}`}
                style={{ '--cat-color': CAT_COLOR[n.id] }}
                onClick={() => scrollTo(n.id)}
              >
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                <span className="nav-dot" style={{ '--cat-color': CAT_COLOR[n.id] }} />
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            VISIBLE · {shown}/{total}
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>}

        {/* ── MAIN ── */}
        <div className="main">
          <div className="content">
            <h1 className="page-heading">Python — Aide Mémoire</h1>
            <div className="page-sub">
              {["Basics", "Strings", "Lists", "Dicts", "Control", "Functions", "Files", "NumPy", "Plotly", "SQLite3"].map(l => (
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* FILTER BAR */}
            <FilterBar
              label="CATÉGORIE"
              options={CATS}
              value={activeCat}
              onChange={id => { setActiveCat(id); setSearch(""); }}
              topSlot={
                <div className="filter-row">
                  <span className="filter-label flabel">RECHERCHE</span>
                  <input
                    className="search-input filter-search"
                    placeholder="Rechercher une commande…"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setActiveCat("all"); }}
                  />
                </div>
              }
            />

            {/* SECTIONS */}
            {filtered.length === 0 && (
              <div className="no-results">No commands match "{search}"</div>
            )}

            {filtered.map(sec => {
              const color = CAT_COLOR[sec.cat];
              return (
                <div key={sec.cat} id={"sec-" + sec.cat} className="section">
                  <SectionHeader
                    title={sec.title}
                    count={`${sec.cmds.length} cmds`}
                    color={color}
                  />
                  <table className="cmd-table">
                    <tbody>
                      {sec.cmds.map((c, i) => {
                        const rowId = sec.cat + "-" + i;
                        const isMultiLine = c.code.includes("\n");
                        return (
                          <tr
                            key={i}
                            className={`cmd-row ${copied === rowId ? "copied" : ""}`}
                            onClick={() => copy(c.code, rowId)}
                            title="Click to copy"
                          >
                            <td className="cmd-cell-code">
                              <span>
                                {highlight(c.code).map((t, idx) => (
                                  t.cls ? <span key={idx} className={t.cls}>{t.text}</span> : <span key={idx}>{t.text}</span>
                                ))}
                              </span>
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
