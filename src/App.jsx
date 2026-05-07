import { useState, useMemo, useEffect } from "react";
import {TodoPage} from "./pages/prepa-info/TodoPage.jsx";
import {ResourcesPage} from "./pages/prepa-info/ResourcesPage.jsx";
import {COURSES, ALL_ITEMS} from "./data/todoPageData";
import Stats from "./pages/prepa-info/Stats.jsx";
import SQLCheatSheet from "./pages/prepa-info/SQLCheatSheet.jsx";
import PythonCheatSheet from "./pages/prepa-info/PythonCheatSheet.jsx";
import CNCAlgoRef from "./pages/prepa-info/CNCAlgoRef.jsx";
import ConcoursPage from "./pages/prepa-info/ConcoursPage.jsx";
import ContactPage from "./pages/prepa-info/ContactPage.jsx";
import LandingPage from "./pages/landing/LandingPage.jsx";
import "./css/prepa-info/common.css";
import "./css/prepa-info/AppLayout.css";

// ─── URL ROUTING ─────────────────────────────────────────────────────────────
const PAGE_TO_PATH = {
  todo:          "/prepa-info/",
  resources:     "/prepa-info/resources",
  stats:         "/prepa-info/stats",
  sqlcheatsheet: "/prepa-info/sql",
  python:        "/prepa-info/python",
  cnc:           "/prepa-info/cnc",
  concours:      "/prepa-info/concours",
  contact:       "/prepa-info/contact",
};

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([k, v]) => [v, k])
);

function getPageFromPath(path) {
  const clean = path.replace(/\/$/, "") || "/";
  return (
    PATH_TO_PAGE[path] ||
    PATH_TO_PAGE[clean] ||
    PATH_TO_PAGE[clean + "/"] ||
    "todo"
  );
}

// ─── PREPA SHELL ─────────────────────────────────────────────────────────────
function PrepaApp({ page, navigateTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const CONTACT_LINKS = {
    github: "https://github.com/Elcaveman/cpge-info",
    group: "ODEX morrocco",
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
  };

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
                  onClick={() => { navigateTo(n.id); setMenuOpen(false); }}
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
          title="GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          className="global-contact-btn"
          href={CONTACT_LINKS.email}
          title="Email"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="2,4 12,13 22,4"/>
          </svg>
        </a>
      </div>
    </>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const isPrepa = window.location.pathname.startsWith("/prepa-info");
  const [route, setRoute] = useState(isPrepa ? "prepa" : "landing");
  const [page, setPage] = useState(() =>
    isPrepa ? getPageFromPath(window.location.pathname) : "todo"
  );

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      if (path.startsWith("/prepa-info")) {
        setRoute("prepa");
        setPage(getPageFromPath(path));
      } else {
        setRoute("landing");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigateTo = (pageId) => {
    const path = PAGE_TO_PATH[pageId] ?? "/prepa-info/";
    history.pushState({}, "", path);
    setRoute("prepa");
    setPage(pageId);
  };

  if (route === "landing") return <LandingPage />;
  return <PrepaApp page={page} navigateTo={navigateTo} />;
}