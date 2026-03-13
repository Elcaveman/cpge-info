import { useState, useMemo, useEffect } from "react";
import {COURSES, ALL_ITEMS} from "../data/data";

// ─── RESOURCES PAGE ──────────────────────────────────────────────────────────
export function ResourcesPage() {
  const [activeSem, setActiveSem] = useState(1);
  const current = COURSES.find(c => c.sem === activeSem);

  return (
    <div className="res-layout">
      {/* Semester picker sidebar */}
      <nav className="res-nav">
        <p className="res-nav-label">SEMESTRE</p>
        {COURSES.map(c => (
          <button
            key={c.sem}
            className={`res-nav-btn ${activeSem === c.sem ? "res-nav-btn--active" : ""}`}
            style={activeSem === c.sem ? { borderColor: c.color, color: c.color } : {}}
            onClick={() => setActiveSem(c.sem)}
          >
            <span className="res-nav-dot" style={{ background: activeSem === c.sem ? c.color : "#2d2d45" }} />
            {c.label}
          </button>
        ))}
      </nav>

      {/* Topic cards */}
      <div className="res-cards">
        <div className="res-cards-header">
          <div className="res-sem-pill" style={{ background: current.color + "18", color: current.color, borderColor: current.color + "33" }}>
            {current.label}
          </div>
          <p className="res-cards-count">{current.topics.length} document{current.topics.length > 1 ? "s" : ""}</p>
        </div>

        {current.topics.map((topic, i) => (
          <div key={i} className="res-card">
            <div className="res-card-title">{topic.title}</div>
            <p className="res-card-notes">{topic.notes}</p>
            <div className="res-card-links">
              {topic.pdf && (
                <a href={topic.pdf.url} className="res-link res-link--pdf" target="_blank" rel="noopener noreferrer">
                  <span className="res-link-icon">📄</span>
                  {topic.pdf.label}
                </a>
              )}
              {topic.video && (
                <a href={topic.video.url} className="res-link res-link--video" target="_blank" rel="noopener noreferrer">
                  <span className="res-link-icon">▶</span>
                  {topic.video.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}