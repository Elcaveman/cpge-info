import { useState, useMemo } from "react";
import "../css/PythonCheatSheet.css";
import { FONT, HEADING, CATS, CAT_COLOR, SECTIONS, NAV_ITEMS } from "../data/pythonCheatSheetData.jsx";

function highlight(code) {
  // We'll do a simple token-based approach
  const keywords = /\b(import|from|as|def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|try|except|finally|raise|with|lambda|True|False|None|self)\b/g;
  const builtins = /\b(print|input|len|type|int|float|str|list|dict|set|tuple|range|enumerate|map|filter|sorted|min|max|sum|abs|round|open|isinstance|staticmethod|classmethod|super|zip|any|all|hasattr|getattr|setattr)\b/g;
  const modules  = /\b(np|px|go|json|csv|os|math|sqlite3|conn|cur|fig|df)\b/g;
  const strings  = /(f?'[^']*'|f?"[^"]*")/g;
  const comments = /(#.*)/g;
  const numbers  = /\b(\d+\.?\d*)\b/g;

  // Escape HTML first
  let s = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply highlights (order matters — comments last to override)
  s = s.replace(strings,  m => `<span class="py-str">${m}</span>`);
  s = s.replace(numbers,  m => `<span class="py-num">${m}</span>`);
  s = s.replace(keywords, m => `<span class="py-kw">${m}</span>`);
  s = s.replace(builtins, m => `<span class="py-fn">${m}</span>`);
  s = s.replace(modules,  m => `<span class="py-mod">${m}</span>`);
  s = s.replace(comments, m => `<span class="py-cm">${m}</span>`);

  return s;
}

export default function PythonCheatSheet() {
  const [activeCat, setActiveCat]   = useState("all");
  const [search,    setSearch]      = useState("");
  const [copied,    setCopied]      = useState(null);
  const [activeNav, setActiveNav]   = useState(null);

  const filtered = useMemo(() => {
    return SECTIONS
      .filter(s => activeCat === "all" || s.cat === activeCat)
      .map(s => ({
        ...s,
        cmds: s.cmds.filter(c => {
          if (!search) return true;
          const q = search.toLowerCase();
          return c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
        })
      }))
      .filter(s => s.cmds.length > 0);
  }, [activeCat, search]);

  const total  = SECTIONS.reduce((a, s) => a + s.cmds.length, 0);
  const shown  = filtered.reduce((a, s) => a + s.cmds.length, 0);
  const progress = Math.round((shown / total) * 100);

  function copy(code, id) {
    const raw = code.replace(/\n/g, "\n");
    navigator.clipboard.writeText(raw).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  function scrollTo(catId) {
    setActiveCat("all");
    setSearch("");
    setActiveNav(catId);
    setTimeout(() => {
      const el = document.getElementById("sec-" + catId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <div className="python-cheat">
      <div className="layout">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">Py Ref</div>
            <div className="logo-sub">PYTHON · NUMPY · PLOTLY</div>
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
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-title">Python Cheat Sheet</div>
            <input
              className="search-input"
              placeholder="Search commands..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCat("all"); setActiveNav(null); }}
            />
          </div>

          <div className="content">
            <h1 className="page-heading">Python — Référence Débutant</h1>
            <div className="page-sub">
              {["Basics", "Strings", "Lists", "Dicts", "Control", "Functions", "Files", "NumPy", "Plotly", "SQLite3"].map(l => (
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <div className="filter-row">
                <span className="filter-label">CATÉGORIE</span>
                {CATS.map(c => (
                  <div
                    key={c.id}
                    className={`pill ${activeCat === c.id ? "active" : ""}`}
                    style={{ '--pill-color': activeCat === c.id ? c.color : 'transparent' }}
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
              const color = CAT_COLOR[sec.cat];
              return (
                <div key={sec.cat} id={"sec-" + sec.cat} className="section">
                  <div className="section-header">
                    <div className="section-color-bar" style={{ '--section-color': color }} />
                    <span className="section-title-text">{sec.title}</span>
                    <span className="section-count">{sec.cmds.length} cmds</span>
                  </div>
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
                              <span
                                dangerouslySetInnerHTML={{ __html: highlight(c.code) }}
                              />
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
