import { useState, useMemo, useEffect } from "react";
import {TodoPage} from "./pages/TodoPage.jsx";
import {ResourcesPage} from "./pages/ResourcesPage.jsx";
import {COURSES, ALL_ITEMS} from "./data/data";
import Stats from "./pages/Stats.jsx";
import SQLCheatSheet from "./pages/SQLCheatSheet.jsx";
import PythonCheatSheet from "./pages/PythonCheatSheet.jsx";
import CNCAlgoRef from "./pages/CNCAlgoRef.jsx";
import ConcoursPage from "./pages/ConcoursPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import "./css/AppLayout.css";

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("todo");
  const [menuOpen, setMenuOpen] = useState(false);
  const CONTACT_LINKS = {
    github: "https://github.com/Elcaveman/cpge-info",
    group: "OD morrocco",
    email: "mailto:02.oudaoud@gmail.com",
  };

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem("cpge_checked");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem("cpge_checked", JSON.stringify(checked)); }
    catch { }
  }, [checked]);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const resetChecked = () => {
    setChecked({});
    localStorage.setItem("cpge_checked", JSON.stringify({}));
  }

  const donePct = Math.round((ALL_ITEMS.filter(i => checked[i.id]).length / ALL_ITEMS.length) * 100);

  const NAV_ITEMS = [
    { id: "todo", label: "Checklist", icon: "✅" },
    { id: "resources", label: "Ressources", icon: "📚" },
    { id: "stats", label: "Statistiques", icon: "📊" },
    { id: "sqlcheatsheet", label: "SQL Ref", icon: "📋" },
    { id: "python", label: "Python Ref", icon: "🐍" },
    { id: "cnc", label: "Algo CNC", icon: "🧮" },
    { id: "concours", label: "Concours", icon: "🏆" },
    { id: "contact", label: "Contact", icon: "📬" },
  ];

  return (
    <>
      <div className="shell">
        {/* ── Sidebar ── */}
        <>
        {/* Hamburger button — only visible on mobile */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? "✕" : "☰"}
        </button>

          {/* Overlay — tapping it closes the menu */}
          {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

          <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
            <div className="sidebar-logo">
              <div className="sidebar-logo-title">CPGE Info</div>
              <div className="sidebar-logo-sub">MP · PC · PSI · PT</div>
            </div>
            <nav className="sidebar-nav">
              {NAV_ITEMS.map(n => (
                <button
                  key={n.id}
                  className={`nav-btn ${page === n.id ? "nav-btn--active" : ""}`}
                  onClick={() => { setPage(n.id); setMenuOpen(false); }} // close on nav
                >
                  <span className="nav-btn-icon">{n.icon}</span>
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="sidebar-progress">
              <div className="sidebar-progress-label">
                <span>PROGRESSION</span>
                <span>{donePct}%</span>
              </div>
              <progress className="sidebar-progress-meter" max={100} value={donePct} />
            </div>
          </aside>
        </>

        {/* ── Main ── */}
        <main className="main">
          <div className="page-inner">
            {page === "todo" && <TodoPage checked={checked} toggle={toggle} resetChecked={resetChecked}/>}
            {page === "resources" && (
              <>
                <div className="page-title">Ressources de cours</div>
                <ResourcesPage />
              </>
            )}
            {page === "stats" && (
              <>
                <div className="page-title">Statistiques des concours</div>
                <Stats />
              </>
            )}
            {page === "sqlcheatsheet" && (
              <>
                <div className="page-title">SQL Commands</div>
                <SQLCheatSheet />
              </>
            )}
            {page === "python" && <PythonCheatSheet />}
            {page === "cnc" && <CNCAlgoRef />}
            {page === "concours" && (
              <>
                <div className="page-title">Annales Informatique</div>
                <ConcoursPage />
              </>
            )}
            {page === "contact" && <ContactPage links={CONTACT_LINKS} />}
          </div>
        </main>
      </div>

      <div className="global-contact-dock" aria-label="Liens de contact rapides">
        <a
          className="global-contact-btn"
          href={CONTACT_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="global-contact-btn"
          href={CONTACT_LINKS.group}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "none" }} /* hidden for now since OD morrocco doesn't have a public page */
        >
          Site Groupe
        </a>
        <button
          type="button"
          className="global-contact-btn"
          onClick={() => {
            setPage("contact");
            setMenuOpen(false);
          }}
        >
          Contact
        </button>
      </div>
    </>
  );
}