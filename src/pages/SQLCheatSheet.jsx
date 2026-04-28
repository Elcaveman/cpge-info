import { useState, useMemo } from "react";
import "./SQLCheatSheet.css";

const CATS = [
  { id: "all",        label: "Toutes",       color: "#fff" },
  { id: "basics",     label: "Basics",       color: "#4ade80" },
  { id: "filtering",  label: "Filtering",    color: "#f472b6" },
  { id: "joins",      label: "Joins",        color: "#60a5fa" },
  { id: "aggregation",label: "Aggregation",  color: "#a78bfa" },
  { id: "ddl",        label: "DDL",          color: "#fb923c" },
  { id: "dml",        label: "DML",          color: "#facc15" },
  { id: "subqueries", label: "Subqueries",   color: "#34d399" },
  { id: "advanced",   label: "Advanced",     color: "#f87171" },
];

const SECTIONS = [
  {
    cat: "basics", title: "Basic Queries",
    cmds: [
      { kw: "SELECT * FROM", rest: "table",                        desc: "Select all columns" },
      { kw: "SELECT", rest: "col1, col2 FROM table",               desc: "Select specific columns" },
      { kw: "SELECT DISTINCT", rest: "col FROM table",             desc: "Remove duplicate rows" },
      { kw: "SELECT * FROM", rest: "table LIMIT 10",               desc: "Limit rows returned" },
      { kw: "ORDER BY", rest: "col ASC | DESC",                    desc: "Sort results" },
      { kw: "SELECT", rest: "col AS alias FROM table",             desc: "Rename column (alias)" },
    ]
  },
  {
    cat: "filtering", title: "Filtering & Conditions",
    cmds: [
      { kw: "WHERE", rest: "col = 'value'",                        desc: "Filter by equality" },
      { kw: "WHERE", rest: "col BETWEEN 10 AND 50",                desc: "Range filter (inclusive)" },
      { kw: "WHERE", rest: "col IN ('a', 'b', 'c')",              desc: "Match list of values" },
      { kw: "WHERE", rest: "col NOT IN ('a', 'b')",               desc: "Exclude list of values" },
      { kw: "WHERE", rest: "col IS NULL",                          desc: "Column has no value" },
      { kw: "WHERE", rest: "col IS NOT NULL",                      desc: "Column has a value" },
      { kw: "WHERE", rest: "col LIKE '%text%'",                    desc: "Pattern match (% = any)" },
      { kw: "WHERE", rest: "col LIKE 't_xt'",                     desc: "Pattern match (_ = one char)" },
      { kw: "WHERE", rest: "a = 1 AND b = 2",                     desc: "Both conditions true" },
      { kw: "WHERE", rest: "a = 1 OR b = 2",                      desc: "Either condition true" },
    ]
  },
  {
    cat: "joins", title: "Joins",
    cmds: [
      { kw: "INNER JOIN", rest: "t2 ON t1.id = t2.id",            desc: "Rows matching in both tables" },
      { kw: "LEFT JOIN",  rest: "t2 ON t1.id = t2.id",            desc: "All left + matched right" },
      { kw: "RIGHT JOIN", rest: "t2 ON t1.id = t2.id",            desc: "All right + matched left" },
      { kw: "FULL OUTER JOIN", rest: "t2 ON t1.id = t2.id",       desc: "All rows from both tables" },
      { kw: "CROSS JOIN", rest: "t2",                              desc: "Every combination of rows" },
      { kw: "FROM", rest: "t AS a JOIN t AS b ON a.id = b.pid",   desc: "Self join" },
    ]
  },
  {
    cat: "aggregation", title: "Aggregation & Grouping",
    cmds: [
      { kw: "COUNT(*)",  rest: "",                                  desc: "Count all rows" },
      { kw: "COUNT(",    rest: "col)",                              desc: "Count non-null values" },
      { kw: "SUM(",      rest: "col)",                              desc: "Sum of values" },
      { kw: "AVG(",      rest: "col)",                              desc: "Average of values" },
      { kw: "MIN(",      rest: "col) / MAX(col)",                  desc: "Smallest / largest value" },
      { kw: "GROUP BY",  rest: "col",                              desc: "Group rows for aggregation" },
      { kw: "GROUP BY",  rest: "col HAVING COUNT(*) > 5",          desc: "Filter groups (post-aggregation)" },
    ]
  },
  {
    cat: "ddl", title: "DDL — Define Structure",
    cmds: [
      { kw: "CREATE TABLE", rest: "t (id INT, name VARCHAR(100))", desc: "Create new table" },
      { kw: "DROP TABLE",   rest: "t",                             desc: "Delete table permanently" },
      { kw: "DROP TABLE IF EXISTS", rest: "t",                     desc: "Drop only if it exists" },
      { kw: "ALTER TABLE",  rest: "t ADD col INT",                 desc: "Add a column" },
      { kw: "ALTER TABLE",  rest: "t DROP COLUMN col",             desc: "Remove a column" },
      { kw: "ALTER TABLE",  rest: "t RENAME TO new_name",          desc: "Rename a table" },
      { kw: "CREATE INDEX", rest: "idx ON t(col)",                 desc: "Index for faster queries" },
      { kw: "CREATE VIEW",  rest: "v AS SELECT ...",               desc: "Saved virtual query" },
    ]
  },
  {
    cat: "dml", title: "DML — Modify Data",
    cmds: [
      { kw: "INSERT INTO", rest: "t (col) VALUES ('val')",         desc: "Insert a new row" },
      { kw: "INSERT INTO", rest: "t SELECT * FROM t2",             desc: "Insert from another table" },
      { kw: "UPDATE",      rest: "t SET col = 'val' WHERE id = 1", desc: "Update existing rows" },
      { kw: "DELETE FROM", rest: "t WHERE id = 1",                 desc: "Delete specific rows" },
      { kw: "TRUNCATE TABLE", rest: "t",                           desc: "Delete all rows (fast)" },
    ]
  },
  {
    cat: "subqueries", title: "Subqueries & CTEs",
    cmds: [
      { kw: "WHERE", rest: "col = (SELECT MAX(col) FROM t)",       desc: "Subquery in WHERE" },
      { kw: "WHERE EXISTS", rest: "(SELECT 1 FROM t2 WHERE ...)",  desc: "Check if subquery returns rows" },
      { kw: "FROM", rest: "(SELECT ...) AS sub",                   desc: "Derived table in FROM" },
      { kw: "WITH", rest: "cte AS (SELECT ...) SELECT * FROM cte", desc: "CTE — named temp result" },
      { kw: "WITH RECURSIVE", rest: "cte AS (...)",                desc: "Recursive CTE" },
    ]
  },
  {
    cat: "advanced", title: "Advanced & Window Functions",
    cmds: [
      { kw: "ROW_NUMBER()", rest: "OVER (PARTITION BY col ORDER BY col)", desc: "Row number per partition" },
      { kw: "RANK()",       rest: "OVER (ORDER BY col)",            desc: "Rank with gaps on ties" },
      { kw: "DENSE_RANK()", rest: "OVER (ORDER BY col)",            desc: "Rank without gaps on ties" },
      { kw: "LAG(",         rest: "col, 1) OVER (ORDER BY col)",    desc: "Value from previous row" },
      { kw: "LEAD(",        rest: "col, 1) OVER (ORDER BY col)",    desc: "Value from next row" },
      { kw: "SUM(",         rest: "col) OVER (ORDER BY date)",      desc: "Running total" },
      { kw: "CASE WHEN",    rest: "x > 0 THEN 'pos' ELSE 'neg' END", desc: "Conditional value (if/else)" },
      { kw: "COALESCE(",    rest: "col, 'default')",                desc: "First non-null value" },
      { kw: "NULLIF(",      rest: "col, 0)",                        desc: "Null if values are equal" },
      { kw: "UNION",        rest: "",                               desc: "Combine results, no duplicates" },
      { kw: "UNION ALL",    rest: "",                               desc: "Combine results, keep duplicates" },
      { kw: "CAST(",        rest: "col AS DATE)",                   desc: "Convert data type" },
      { kw: "CONCAT(",      rest: "col1, ' ', col2)",               desc: "Combine strings" },
    ]
  },
];

const NAV_ITEMS = [
  { id: "basics",      label: "Basics",       icon: "▶" },
  { id: "filtering",   label: "Filtering",    icon: "⌁" },
  { id: "joins",       label: "Joins",        icon: "⋈" },
  { id: "aggregation", label: "Aggregation",  icon: "∑" },
  { id: "ddl",         label: "DDL",          icon: "⬡" },
  { id: "dml",         label: "DML",          icon: "✎" },
  { id: "subqueries",  label: "Subqueries",   icon: "⊂" },
  { id: "advanced",    label: "Advanced",     icon: "◈" },
];


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
              {["Basics", "Filtering", "Joins", "Aggregation", "DDL", "DML", "Subqueries", "Advanced"].map(l => (
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
                    className={`pill cat-${c.id} ${activeCat === c.id ? "active" : ""}`}
                    onClick={() => { setActiveCat(c.id); setSearch(""); setActiveNav(null); }}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* LEGEND */}
            <div className="legend">
              {CATS.filter(c => c.id !== "all").map(c => (
                <div key={c.id} className="legend-item">
                  <div className={`legend-dot cat-${c.id}`} />
                  {c.label}
                </div>
              ))}
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
