import { lazy, Suspense, useState, useEffect } from "react";

const LandingApp = lazy(() => import("./views/landing/LandingApp.jsx"));
const PrepaApp = lazy(() => import("./views/cpge/PrepaApp.jsx"));

// ─── URL ROUTING ─────────────────────────────────────────────────────────────
const PAGE_TO_PATH = {
  todo:          "/cpge/",
  resources:     "/cpge/resources",
  stats:         "/cpge/stats",
  sqlcheatsheet: "/cpge/sql",
  python:        "/cpge/python",
  cnc:           "/cpge/cnc",
  concours:      "/cpge/concours",
  contact:       "/cpge/contact",
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

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const isPrepa = window.location.pathname.startsWith("/cpge");
  const [route, setRoute] = useState(isPrepa ? "prepa" : "landing");
  const [page, setPage] = useState(() =>
    isPrepa ? getPageFromPath(window.location.pathname) : "todo"
  );

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      if (path.startsWith("/cpge")) {
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
    const path = PAGE_TO_PATH[pageId] ?? "/cpge/";
    history.pushState({}, "", path);
    setRoute("prepa");
    setPage(pageId);
  };

  if (route === "landing") {
    return (
      <Suspense fallback={<div />}>
        <LandingApp />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div />}>
      <PrepaApp page={page} navigateTo={navigateTo} />
    </Suspense>
  );
}