import { useState } from "react";
import { CONCOURS, SOURCES } from "../../data/concoursData.jsx";

/* ── Link helpers ── */
function PdfLink({ href, label, type = "sujet" }) {
  if (!href) return null;
  const cls = type === "rapport" ? "pdf-link rapport" : type === "zip" ? "pdf-link zip" : "pdf-link";
  const icon = type === "zip" ? "📦" : "📄";
  return (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {icon} {label}
    </a>
  );
}

/* ── CNC / CCP annales table ── */
function FilierTable({ concours, filiere }) {
  const rows = concours.annales;
  const hasRapport = rows.some(r => r[filiere]?.rapport);
  const hasCorrige = rows.some(r => r[filiere]?.corrige);

  return (
    <div className="annales-table-wrap">
      <table className="annales-table">
        <thead>
          <tr>
            <th>Année</th>
            <th>Sujet</th>
            {hasRapport && <th>Rapport</th>}
            {hasCorrige && <th>Correction</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            const entry = row[filiere];
            return (
              <tr key={row.year}>
                <td className="year-cell">{row.year}</td>
                <td>
                  <div className="link-cell-inner">
                    {entry?.sujet
                      ? <PdfLink href={entry.sujet} label="Sujet" type="sujet" />
                      : <span className="na-cell">—</span>}
                  </div>
                </td>
                {hasRapport && (
                  <td>
                    <div className="link-cell-inner">
                      {entry?.rapport
                        ? <PdfLink href={entry.rapport} label="Rapport" type="rapport" />
                        : <span className="na-cell">—</span>}
                    </div>
                  </td>
                )}
                {hasCorrige && (
                  <td>
                    <div className="link-cell-inner">
                      {entry?.corrige
                        ? <PdfLink href={entry.corrige} label="Correction" type="corrige" />
                        : <span className="na-cell">—</span>}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Mines-Ponts annales table ── */
function MinesTable({ concours }) {
  const rows = concours.annales;
  const has2025PDFs = rows.some(r => r["MP/PC/PSI"]?.sujet);

  return (
    <>
      <div className="mines-note">
        Les ZIPs contiennent toutes les épreuves de l'année. Le fichier info est nommé{" "}
        <code>Info-MP-PC-PSI.pdf</code> ou <code>Info-option-MP.pdf</code>.
      </div>
      <div className="annales-table-wrap">
        <table className="annales-table">
          <thead>
            <tr>
              <th>Année</th>
              {has2025PDFs && <th>Info commune (PDF)</th>}
              {has2025PDFs && <th>Option MP (PDF)</th>}
              <th>ZIP complet</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.year}>
                <td className="year-cell">{row.year}</td>
                {has2025PDFs && (
                  <td>
                    <div className="link-cell-inner">
                      {row["MP/PC/PSI"]?.sujet
                        ? <PdfLink href={row["MP/PC/PSI"].sujet} label="Info MP/PC/PSI" />
                        : <span className="na-cell">dans le ZIP</span>}
                    </div>
                  </td>
                )}
                {has2025PDFs && (
                  <td>
                    <div className="link-cell-inner">
                      {row["Option MP"]?.sujet
                        ? <PdfLink href={row["Option MP"].sujet} label="Option MP" />
                        : <span className="na-cell">dans le ZIP</span>}
                    </div>
                  </td>
                )}
                <td>
                  <div className="link-cell-inner">
                    {row.zip
                      ? <PdfLink href={row.zip} label={`ZIP ${row.year}`} type="zip" />
                      : <span className="na-cell">—</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── E3A table ── */
function E3ATable({ concours }) {
  return (
    <>
      <div className="e3a-note">
        ⚠️ L'épreuve d'informatique E3A-Polytech n'existe que depuis <strong>2023</strong>. 
        Les PDFs sont accessibles via formulaire sur le site officiel uniquement.
      </div>
      <div className="annales-table-wrap">
        <table className="annales-table">
          <thead>
            <tr>
              <th>Année</th>
              <th>Accès</th>
            </tr>
          </thead>
          <tbody>
            {concours.annales.map(row => (
              <tr key={row.year}>
                <td className="year-cell">{row.year}</td>
                <td>
                  <div className="link-cell-inner">
                    {row.siteUrl
                      ? <a className="pdf-link" href={row.siteUrl} target="_blank" rel="noopener noreferrer">
                          🌐 {row.note}
                        </a>
                      : <span className="na-cell">{row.note}</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Main page ── */
export default function ConcoursPage() {
  const [activeId, setActiveId]       = useState(CONCOURS[0].id);
  const [activeFiliere, setFiliere]   = useState(null);

  const concours = CONCOURS.find(c => c.id === activeId);
  const color    = concours.color;
  const filiere  = activeFiliere && concours.filieres.includes(activeFiliere)
    ? activeFiliere
    : concours.filieres[0];

  const handleSelectConcours = (id) => {
    setActiveId(id);
    setFiliere(null);
  };

  return (
    <div className="concours-page">
      {/* ── Sidebar ── */}
      <aside className="concours-sidebar">
        <div className="concours-sidebar-title">Concours</div>
        {CONCOURS.map(c => (
          <button
            key={c.id}
            className={`concours-nav-btn ${activeId === c.id ? "active" : ""}`}
            style={{ "--c-color": c.color }}
            onClick={() => handleSelectConcours(c.id)}
          >
            <span className="concours-nav-flag">{c.flag}</span>
            <span className="concours-nav-label">{c.name}</span>
          </button>
        ))}
      </aside>

      {/* ── Main content ── */}
      <div className="concours-main" style={{ "--c-color": color }}>
        {/* Header */}
        <div className="concours-header">
          <div className="concours-title-row">
            <span className="concours-flag-big">{concours.flag}</span>
            <span className="concours-name">{concours.name}</span>
            <a
              className="concours-official-link"
              href={concours.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ Site officiel
            </a>
          </div>
          <p className="concours-desc">{concours.description}</p>

          {/* Exam info */}
          <div className="concours-meta">
            {concours.examInfo.map(info => (
              <div key={info.label} className="concours-meta-pill">
                <span className="concours-meta-pill-label">{info.label} :</span>
                {info.value}
              </div>
            ))}
          </div>

          {/* Coefficients */}
          <div className="coeff-row">
            {concours.filieres.map(f => (
              <div key={f} className="coeff-badge">
                {f} — coeff. {concours.coefficients[f] ?? "?"}
              </div>
            ))}
          </div>
        </div>

        {/* Annales */}
        {concours.id === "mines" ? (
          <MinesTable concours={concours} />
        ) : concours.id === "e3a" ? (
          <E3ATable concours={concours} />
        ) : (
          <>
            {/* Filière tabs */}
            <div className="filiere-tabs">
              {concours.filieres.map(f => (
                <button
                  key={f}
                  className={`filiere-tab ${filiere === f ? "active" : ""}`}
                  onClick={() => setFiliere(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <FilierTable concours={concours} filiere={filiere} />
          </>
        )}

        {/* Sources */}
        <div className="sources-section">
          <div className="sources-title">Autres sources utiles</div>
          <div className="sources-grid">
            {SOURCES.map(s => (
              <a
                key={s.name}
                className="source-card"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--s-color": s.color }}
              >
                <div className="source-card-name">
                  {s.icon} {s.name}
                </div>
                <div className="source-card-desc">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
