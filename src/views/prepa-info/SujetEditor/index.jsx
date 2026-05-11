"use client";

import { useState } from "react";
import { exportSujetToPdf } from "../../../lib/sujetToPdf.js";
import {
  createEmptyPartie,
  createEmptySujet,
  SUJET_EDITOR_TABS,
} from "../../../data/sujetEditorData.jsx";
import { MetaEditor } from "./MetaEditor.jsx";
import { PartieEditor } from "./PartieEditor.jsx";
import { JsonPreview } from "./JsonPreview.jsx";
import { ImportPanel } from "./ImportPanel.jsx";
import { downloadBlob } from "./utils.js";

export default function SujetEditorPage() {
  const [sujet, setSujet] = useState(createEmptySujet());
  const [tab, setTab] = useState("edit");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [pdfError, setPdfError] = useState("");

  const setPartie = (i, p) => {
    const next = [...sujet.parties];
    next[i] = p;
    setSujet({ ...sujet, parties: next });
  };

  const addPartie = () => setSujet({ ...sujet, parties: [...sujet.parties, createEmptyPartie()] });

  const deletePartie = (i) => {
    if (sujet.parties.length === 1) return;
    setSujet({ ...sujet, parties: sujet.parties.filter((_, idx) => idx !== i) });
  };

  const movePartie = (i, dir) => {
    const ni = i + dir;
    if (ni < 0 || ni >= sujet.parties.length) return;
    const next = [...sujet.parties];
    [next[i], next[ni]] = [next[ni], next[i]];
    setSujet({ ...sujet, parties: next });
  };

  const resetSujet = () => {
    if (window.confirm("Réinitialiser ? Toutes les données seront perdues.")) {
      setSujet(createEmptySujet());
      setNotice("Sujet réinitialisé.");
      setPdfError("");
    }
  };

  const handleJsonExport = () => {
    const blob = new Blob([JSON.stringify(sujet, null, 2)], { type: "application/json" });
    downloadBlob(blob, `${sujet.concours.toLowerCase()}-${sujet.year}-info.json`);
    setNotice("Fichier JSON exporté.");
  };

  const handlePdfExport = async () => {
    setPdfLoading(true);
    setPdfError("");
    try {
      await exportSujetToPdf(sujet);
      setNotice("PDF généré.");
    } catch (err) {
      setPdfError(`Erreur PDF : ${err.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  const totalQuestions = sujet.parties.reduce((n, p) => n + p.questions.length, 0);

  return (
    <div className="sujet-editor-page">
      <header className="sujet-editor-topbar">
        <div className="sujet-editor-topbar__branding">
          <div className="sujet-editor-topbar__logo">ODEX</div>
          <div className="sujet-editor-topbar__label">Éditeur de corrections</div>
        </div>

        <div className="sujet-editor-topbar__meta">
          <span className="sujet-editor-topbar__stats">
            {sujet.parties.length} partie{sujet.parties.length > 1 ? "s" : ""} · {totalQuestions} question{totalQuestions > 1 ? "s" : ""}
          </span>

          <div className="sujet-editor-tabs" role="tablist" aria-label="Outils de l'éditeur">
            {SUJET_EDITOR_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`sujet-editor-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button type="button" className="sujet-icon-btn sujet-icon-btn--danger" onClick={resetSujet}>
            Réinitialiser
          </button>
        </div>
      </header>

      <div className="sujet-editor-shell">
        <section className="sujet-editor-hero">
          <div>
            <div className="page-title">Éditeur de sujet</div>
            <p className="sujet-editor-hero__text">
              Prépare un sujet de concours au format JSON, réutilisable dans l'application et exportable en PDF.
            </p>
          </div>
          <div className="sujet-editor-hero__chips">
            <span className="sujet-editor-chip">JSON structuré</span>
            <span className="sujet-editor-chip">Export PDF</span>
            <span className="sujet-editor-chip">Import rapide</span>
          </div>
        </section>

        {notice ? <div className="sujet-feedback sujet-feedback--notice">{notice}</div> : null}
        {pdfError ? <div className="sujet-feedback sujet-feedback--error">{pdfError}</div> : null}

        {tab === "import" && (
          <ImportPanel
            onImport={(s) => { setSujet(s); setTab("edit"); }}
            onNotice={setNotice}
          />
        )}
        {tab === "preview" && <JsonPreview sujet={sujet} onNotice={setNotice} />}

        {tab === "edit" && (
          <>
            <MetaEditor sujet={sujet} onChange={setSujet} />

            <div className="sujet-editor-section-head">
              <div className="sujet-panel__eyebrow">Parties & questions</div>
              <button type="button" className="sujet-icon-btn sujet-icon-btn--primary" onClick={addPartie}>
                + Ajouter une partie
              </button>
            </div>

            <div className="sujet-partie-list">
              {sujet.parties.map((p, i) => (
                <PartieEditor
                  key={`${p.id || "partie"}-${i}`}
                  partie={p}
                  onChange={(up) => setPartie(i, up)}
                  onDelete={() => deletePartie(i)}
                  onMove={(dir) => movePartie(i, dir)}
                  isFirst={i === 0}
                  isLast={i === sujet.parties.length - 1}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {tab === "edit" && (
        <div className="sujet-editor-dock">
          <button type="button" className="sujet-icon-btn" onClick={() => setTab("preview")}>{"{ } Voir JSON"}</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--success" onClick={handleJsonExport}>↓ Exporter .json</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--pdf" onClick={handlePdfExport} disabled={pdfLoading}>
            {pdfLoading ? "⏳ Génération..." : "⬇ Exporter PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
