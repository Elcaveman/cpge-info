import { useState } from "react";
import { COURSES } from "../data/data";

// ─── FILE VIEWER MODAL ────────────────────────────────────────────────────────
function FileViewer({ file, onClose }) {
  if (!file) return null;

  const isOdf = file.url.match(/\.(odp|ods|odt|odg)$/i);
  // ODF files need Google Docs Viewer; PDFs render natively
  const src = isOdf
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true`
    : file.url;

  return (
    <div className="fv-overlay" onClick={onClose}>
      <div className="fv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fv-header">
          <span className="fv-title">{file.label}</span>
          <div className="fv-actions">
            <a
              href={file.url}
              download
              className="fv-btn fv-btn--download"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⬇ Télécharger
            </a>
            <button className="fv-btn fv-btn--close" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <iframe src={src} className="fv-frame" title={file.label} allowFullScreen />
      </div>
    </div>
  );
}

// ─── RESOURCES PAGE ───────────────────────────────────────────────────────────
export function ResourcesPage() {
  const [activeSem, setActiveSem] = useState(1);
  const [openFile, setOpenFile] = useState(null); // { url, label }

  const current = COURSES.find((c) => c.sem === activeSem);

  return (
    <>
      <FileViewer file={openFile} onClose={() => setOpenFile(null)} />

      <div className="res-layout">
        {/* Semester picker sidebar */}
        <nav className="res-nav">
          <p className="res-nav-label">SEMESTRE</p>
          {COURSES.map((c) => (
            <button
              key={c.sem}
              className={`res-nav-btn ${
                activeSem === c.sem ? "res-nav-btn--active" : ""
              }`}
              style={
                activeSem === c.sem
                  ? { borderColor: c.color, color: c.color }
                  : {}
              }
              onClick={() => setActiveSem(c.sem)}
            >
              <span
                className="res-nav-dot"
                style={{
                  background: activeSem === c.sem ? c.color : "#2d2d45",
                }}
              />
              {c.label}
            </button>
          ))}
        </nav>

        {/* Topic cards */}
        <div className="res-cards">
          <div className="res-cards-header">
            <div
              className="res-sem-pill"
              style={{
                background: current.color + "18",
                color: current.color,
                borderColor: current.color + "33",
              }}
            >
              {current.label}
            </div>
            <p className="res-cards-count">
              {current.topics.length} document
              {current.topics.length > 1 ? "s" : ""}
            </p>
          </div>

          {current.topics.map((topic, i) => (
            <div key={i} className="res-card">
              <div className="res-card-title">{topic.title}</div>
              <p className="res-card-notes">{topic.notes}</p>
              <div className="res-card-links">
                {topic.pdf && (
                  <button
                    className="res-link res-link--pdf"
                    onClick={() => setOpenFile(topic.pdf)}
                  >
                    <span className="res-link-icon">📄</span>
                    {topic.pdf.label}
                  </button>
                )}

                {topic.slides && (
                  <button
                    className="res-link res-link--slides"
                    onClick={() => setOpenFile(topic.slides)}
                  >
                    <span className="res-link-icon">📊</span>
                    {topic.slides.label}
                  </button>
                )}

                {topic.video && (
                  <a
                    href={topic.video.url}
                    className="res-link res-link--video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="res-link-icon">▶</span>
                    {topic.video.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}