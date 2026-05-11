"use client";

import { useRef, useState } from "react";
import { exportSujetToPdf } from "../../lib/sujetToPdf.js";
import {
  createEmptyPartie,
  createEmptyQuestion,
  createEmptySujet,
  normalizeSujet,
  SUJET_EDITOR_CONCOURS,
  SUJET_EDITOR_FILIERES,
  SUJET_EDITOR_ICONS,
  SUJET_EDITOR_PRIORITIES,
  SUJET_EDITOR_TABS,
  SUJET_EDITOR_TYPE_LABELS,
  SUJET_EDITOR_TYPES,
} from "../../data/sujetEditorData.jsx";

const TYPE_CLASS = {
  python: "python",
  sql: "sql",
  algo: "algo",
  cours: "cours",
};

const PRIORITY_CLASS = {
  P0: "p0",
  P1: "p1",
  P2: "p2",
};

function Field({ label, required = false, children, className = "" }) {
  return (
    <div className={`sujet-field ${className}`.trim()}>
      <div className="sujet-field__label">
        <span>{label}</span>
        {required ? <span className="sujet-field__required">*</span> : null}
      </div>
      {children}
    </div>
  );
}

function QuestionEditor({ question, index, onChange, onDelete, onMove, isFirst, isLast }) {
  const [expanded, setExpanded] = useState(index === 0);
  const typeClass = TYPE_CLASS[question.type] || "cours";
  const priorityClass = PRIORITY_CLASS[question.priority] || "p2";

  const update = (key, value) => {
    onChange({ ...question, [key]: value });
  };

  return (
    <section className={`sujet-question-card ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="sujet-question-card__header"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <span className="sujet-question-card__drag">⠿</span>
        <span className={`sujet-badge sujet-badge--type sujet-badge--type-${typeClass}`}>
          {SUJET_EDITOR_TYPE_LABELS[question.type] || question.type || "?"}
        </span>
        <span className={`sujet-badge sujet-badge--priority sujet-badge--priority-${priorityClass}`}>
          {question.priority}
        </span>
        <span className="sujet-question-card__title">{question.text || "Nouvelle question..."}</span>
        <span className="sujet-question-card__chevron">▾</span>
      </button>

      <div className="sujet-question-card__controls">
        <button type="button" className="sujet-icon-btn" onClick={() => onMove(-1)} disabled={isFirst}>
          ↑
        </button>
        <button type="button" className="sujet-icon-btn" onClick={() => onMove(1)} disabled={isLast}>
          ↓
        </button>
        <button type="button" className="sujet-icon-btn sujet-icon-btn--danger" onClick={onDelete}>
          ✕
        </button>
      </div>

      {expanded ? (
        <div className="sujet-question-card__body">
          <div className="sujet-grid sujet-grid--question-top">
            <Field label="ID" required className="sujet-field--id">
              <input className="sujet-input" value={question.id} onChange={(event) => update("id", event.target.value)} placeholder="I.1" />
            </Field>
            <Field label="Type" required className="sujet-field--type">
              <select className="sujet-input" value={question.type} onChange={(event) => update("type", event.target.value)}>
                {SUJET_EDITOR_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="Priorité" className="sujet-field--priority">
              <select className="sujet-input" value={question.priority} onChange={(event) => update("priority", event.target.value)}>
                {SUJET_EDITOR_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </Field>
            <Field label="Titre de la question" required className="sujet-field--title">
              <input
                className="sujet-input"
                value={question.text}
                onChange={(event) => update("text", event.target.value)}
                placeholder="Écrire une fonction qui..."
              />
            </Field>
          </div>

          <Field label="Énoncé">
            <textarea
              className="sujet-textarea"
              rows={3}
              value={question.enonce}
              onChange={(event) => update("enonce", event.target.value)}
              placeholder="Écrire la fonction f(x) telle que..."
            />
          </Field>

          <Field label="Code / Correction">
            <textarea
              className="sujet-textarea sujet-textarea--code"
              rows={8}
              value={question.code}
              onChange={(event) => update("code", event.target.value)}
              placeholder={"def f(x):\n    # votre code ici\n    return x"}
              spellCheck={false}
            />
          </Field>

          <div className="sujet-grid sujet-grid--question-meta">
            <Field label="Complexité">
              <input
                className="sujet-input"
                value={question.complexity}
                onChange={(event) => update("complexity", event.target.value)}
                placeholder="O(n log n)"
              />
            </Field>
            <Field label="Note complexité">
              <input
                className="sujet-input"
                value={question.complexityNote}
                onChange={(event) => update("complexityNote", event.target.value)}
                placeholder="une passe sur le tableau"
              />
            </Field>
          </div>

          <Field label="Piège classique">
            <textarea
              className="sujet-textarea"
              rows={2}
              value={question.pitfall}
              onChange={(event) => update("pitfall", event.target.value)}
              placeholder="Ne pas initialiser m = 0..."
            />
          </Field>
        </div>
      ) : null}
    </section>
  );
}

function PartieEditor({ partie, onChange, onDelete, onMove, isFirst, isLast }) {
  const [collapsed, setCollapsed] = useState(false);

  const updatePartie = (key, value) => {
    onChange({ ...partie, [key]: value });
  };

  const rotateIcon = () => {
    const currentIndex = SUJET_EDITOR_ICONS.indexOf(partie.icon);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % SUJET_EDITOR_ICONS.length : 0;
    updatePartie("icon", SUJET_EDITOR_ICONS[nextIndex]);
  };

  const updateQuestion = (questionIndex, updatedQuestion) => {
    const nextQuestions = [...partie.questions];
    nextQuestions[questionIndex] = updatedQuestion;
    updatePartie("questions", nextQuestions);
  };

  const addQuestion = () => {
    updatePartie("questions", [...partie.questions, createEmptyQuestion()]);
  };

  const deleteQuestion = (questionIndex) => {
    if (partie.questions.length === 1) {
      return;
    }

    updatePartie(
      "questions",
      partie.questions.filter((_, index) => index !== questionIndex),
    );
  };

  const moveQuestion = (questionIndex, direction) => {
    const nextIndex = questionIndex + direction;
    if (nextIndex < 0 || nextIndex >= partie.questions.length) {
      return;
    }

    const nextQuestions = [...partie.questions];
    [nextQuestions[questionIndex], nextQuestions[nextIndex]] = [nextQuestions[nextIndex], nextQuestions[questionIndex]];
    updatePartie("questions", nextQuestions);
  };

  return (
    <section className="sujet-partie-card">
      <div className="sujet-partie-card__header">
        <button type="button" className="sujet-partie-card__icon" onClick={rotateIcon} title="Changer l'icône">
          {partie.icon}
        </button>

        <div className="sujet-partie-card__title-row">
          <input
            className="sujet-input sujet-input--part-id"
            value={partie.id}
            onChange={(event) => updatePartie("id", event.target.value)}
            placeholder="I"
          />
          <input
            className="sujet-input"
            value={partie.title}
            onChange={(event) => updatePartie("title", event.target.value)}
            placeholder="Titre de la partie..."
          />
        </div>

        <div className="sujet-partie-card__actions">
          <button type="button" className="sujet-icon-btn" onClick={() => onMove(-1)} disabled={isFirst}>↑</button>
          <button type="button" className="sujet-icon-btn" onClick={() => onMove(1)} disabled={isLast}>↓</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--danger" onClick={onDelete}>✕</button>
          <button type="button" className="sujet-icon-btn" onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? "▾ Afficher" : "▴ Réduire"}
          </button>
        </div>
      </div>

      {collapsed ? null : (
        <div className="sujet-partie-card__body">
          {partie.questions.map((question, questionIndex) => (
            <QuestionEditor
              key={`${partie.id || "partie"}-${questionIndex}`}
              question={question}
              index={questionIndex}
              onChange={(updatedQuestion) => updateQuestion(questionIndex, updatedQuestion)}
              onDelete={() => deleteQuestion(questionIndex)}
              onMove={(direction) => moveQuestion(questionIndex, direction)}
              isFirst={questionIndex === 0}
              isLast={questionIndex === partie.questions.length - 1}
            />
          ))}

          <button type="button" className="sujet-icon-btn sujet-icon-btn--primary sujet-icon-btn--block" onClick={addQuestion}>
            + Ajouter une question
          </button>
        </div>
      )}
    </section>
  );
}

function MetaEditor({ sujet, onChange }) {
  const [tagInput, setTagInput] = useState("");

  const updateSujet = (key, value) => {
    onChange({ ...sujet, [key]: value });
  };

  const toggleFiliere = (filiere) => {
    updateSujet(
      "filieres",
      sujet.filieres.includes(filiere)
        ? sujet.filieres.filter((value) => value !== filiere)
        : [...sujet.filieres, filiere],
    );
  };

  const addTag = () => {
    const nextTag = tagInput.trim();
    if (!nextTag || sujet.tags.includes(nextTag)) {
      return;
    }

    updateSujet("tags", [...sujet.tags, nextTag]);
    setTagInput("");
  };

  return (
    <section className="sujet-panel sujet-panel--meta">
      <div className="sujet-panel__eyebrow">Métadonnées du sujet</div>

      <div className="sujet-grid sujet-grid--meta">
        <Field label="Concours" required>
          <select className="sujet-input" value={sujet.concours} onChange={(event) => updateSujet("concours", event.target.value)}>
            {SUJET_EDITOR_CONCOURS.map((concours) => (
              <option key={concours} value={concours}>{concours}</option>
            ))}
          </select>
        </Field>
        <Field label="Année" required>
          <input
            className="sujet-input"
            type="number"
            min={2000}
            max={2035}
            value={sujet.year}
            onChange={(event) => updateSujet("year", Number(event.target.value) || new Date().getFullYear())}
          />
        </Field>
        <Field label="Durée">
          <input className="sujet-input" value={sujet.duree} onChange={(event) => updateSujet("duree", event.target.value)} placeholder="3h" />
        </Field>
        <Field label="Matière">
          <input className="sujet-input sujet-input--disabled" value="Informatique" disabled />
        </Field>
      </div>

      <Field label="Filières">
        <div className="sujet-pill-row">
          {SUJET_EDITOR_FILIERES.map((filiere) => (
            <button
              key={filiere}
              type="button"
              className={`sujet-pill-btn ${sujet.filieres.includes(filiere) ? "is-active" : ""}`}
              onClick={() => toggleFiliere(filiere)}
            >
              {filiere}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Tags">
        <div className="sujet-tag-list">
          {sujet.tags.map((tag) => (
            <div key={tag} className="sujet-tag">
              <span>{tag}</span>
              <button
                type="button"
                className="sujet-tag__remove"
                onClick={() => updateSujet("tags", sujet.tags.filter((value) => value !== tag))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="sujet-inline-actions">
          <input
            className="sujet-input"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addTag();
              }
            }}
            placeholder="Python 3, SQL, Graphes..."
          />
          <button type="button" className="sujet-icon-btn" onClick={addTag}>+ Ajouter</button>
        </div>
      </Field>
    </section>
  );
}

function JsonPreview({ sujet, onNotice }) {
  const json = JSON.stringify(sujet, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      onNotice("JSON copié dans le presse-papiers.");
    } catch {
      onNotice("Impossible de copier le JSON automatiquement.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: "application/json" });
    downloadBlob(blob, `${sujet.concours.toLowerCase()}-${sujet.year}-info.json`);
    onNotice("Fichier JSON exporté.");
  };

  return (
    <section className="sujet-panel">
      <div className="sujet-panel__header sujet-panel__header--spread">
        <div className="sujet-panel__eyebrow">Aperçu JSON — prêt à importer</div>
        <div className="sujet-inline-actions sujet-inline-actions--tight">
          <button type="button" className="sujet-icon-btn" onClick={handleCopy}>Copier</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--success" onClick={handleDownload}>↓ Télécharger .json</button>
        </div>
      </div>
      <pre className="sujet-json-output">{json}</pre>
    </section>
  );
}

function ImportPanel({ onImport, onNotice }) {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const parse = (text) => {
    try {
      const parsed = normalizeSujet(JSON.parse(text));
      onImport(parsed);
      setRaw("");
      setError("");
      onNotice("Sujet importé avec succès.");
    } catch (err) {
      setError(`JSON invalide : ${err.message}`);
    }
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      parse(String(loadEvent.target?.result || ""));
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <section className="sujet-panel">
      <div className="sujet-panel__eyebrow">Importer un sujet existant</div>

      <div className="sujet-inline-actions">
        <button type="button" className="sujet-icon-btn sujet-icon-btn--primary" onClick={() => fileRef.current?.click()}>
          📂 Ouvrir un fichier .json
        </button>
        <input ref={fileRef} className="sujet-hidden-input" type="file" accept=".json" onChange={handleFile} />
      </div>

      <Field label="Ou coller le JSON directement" className="sujet-field--flush">
        <textarea
          className="sujet-textarea"
          rows={5}
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          placeholder='{ "concours": "CNC", ... }'
        />
        {error ? <div className="sujet-feedback sujet-feedback--error">{error}</div> : null}
        <button type="button" className="sujet-icon-btn sujet-icon-btn--primary" onClick={() => parse(raw)}>
          Importer
        </button>
      </Field>
    </section>
  );
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function SujetEditorPage() {
  const [sujet, setSujet] = useState(createEmptySujet());
  const [tab, setTab] = useState("edit");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [pdfError, setPdfError] = useState("");

  const setPartie = (partIndex, updatedPartie) => {
    const nextParties = [...sujet.parties];
    nextParties[partIndex] = updatedPartie;
    setSujet({ ...sujet, parties: nextParties });
  };

  const addPartie = () => {
    setSujet({ ...sujet, parties: [...sujet.parties, createEmptyPartie()] });
  };

  const deletePartie = (partIndex) => {
    if (sujet.parties.length === 1) {
      return;
    }

    setSujet({
      ...sujet,
      parties: sujet.parties.filter((_, index) => index !== partIndex),
    });
  };

  const movePartie = (partIndex, direction) => {
    const nextIndex = partIndex + direction;
    if (nextIndex < 0 || nextIndex >= sujet.parties.length) {
      return;
    }

    const nextParties = [...sujet.parties];
    [nextParties[partIndex], nextParties[nextIndex]] = [nextParties[nextIndex], nextParties[partIndex]];
    setSujet({ ...sujet, parties: nextParties });
  };

  const resetSujet = () => {
    if (window.confirm("Réinitialiser ? Toutes les données seront perdues.")) {
      setSujet(createEmptySujet());
      setNotice("Sujet réinitialisé.");
      setPdfError("");
    }
  };

  const handleJsonExport = () => {
    const json = JSON.stringify(sujet, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    downloadBlob(blob, `${sujet.concours.toLowerCase()}-${sujet.year}-info.json`);
    setNotice("Fichier JSON exporté.");
  };

  const handlePdfExport = async () => {
    setPdfLoading(true);
    setPdfError("");

    try {
      await exportSujetToPdf(sujet);
      setNotice("PDF généré.");
    } catch (error) {
      setPdfError(`Erreur PDF : ${error.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  const totalQuestions = sujet.parties.reduce((count, partie) => count + partie.questions.length, 0);

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
            {SUJET_EDITOR_TABS.map((tabItem) => (
              <button
                key={tabItem.id}
                type="button"
                role="tab"
                aria-selected={tab === tabItem.id}
                className={`sujet-editor-tab ${tab === tabItem.id ? "is-active" : ""}`}
                onClick={() => setTab(tabItem.id)}
              >
                {tabItem.label}
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

        {tab === "import" ? <ImportPanel onImport={(importedSujet) => { setSujet(importedSujet); setTab("edit"); }} onNotice={setNotice} /> : null}
        {tab === "preview" ? <JsonPreview sujet={sujet} onNotice={setNotice} /> : null}

        {tab === "edit" ? (
          <>
            <MetaEditor sujet={sujet} onChange={setSujet} />

            <div className="sujet-editor-section-head">
              <div className="sujet-panel__eyebrow">Parties & questions</div>
              <button type="button" className="sujet-icon-btn sujet-icon-btn--primary" onClick={addPartie}>
                + Ajouter une partie
              </button>
            </div>

            <div className="sujet-partie-list">
              {sujet.parties.map((partie, partIndex) => (
                <PartieEditor
                  key={`${partie.id || "partie"}-${partIndex}`}
                  partie={partie}
                  onChange={(updatedPartie) => setPartie(partIndex, updatedPartie)}
                  onDelete={() => deletePartie(partIndex)}
                  onMove={(direction) => movePartie(partIndex, direction)}
                  isFirst={partIndex === 0}
                  isLast={partIndex === sujet.parties.length - 1}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {tab === "edit" ? (
        <div className="sujet-editor-dock">
          <button type="button" className="sujet-icon-btn" onClick={() => setTab("preview")}>{"{ } Voir JSON"}</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--success" onClick={handleJsonExport}>↓ Exporter .json</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--pdf" onClick={handlePdfExport} disabled={pdfLoading}>
            {pdfLoading ? "⏳ Génération..." : "⬇ Exporter PDF"}
          </button>
        </div>
      ) : null}
    </div>
  );
}