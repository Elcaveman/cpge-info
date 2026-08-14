import { useState } from "react";
import {
  SUJET_EDITOR_CONCOURS,
  SUJET_EDITOR_FILIERES,
} from "../../../data/sujetEditorData.jsx";
import { Field } from "./Field.jsx";

export function MetaEditor({ sujet, onChange }) {
  const [tagInput, setTagInput] = useState("");

  const update = (key, value) => onChange({ ...sujet, [key]: value });

  const toggleFiliere = (f) => {
    update("filieres", sujet.filieres.includes(f)
      ? sujet.filieres.filter((v) => v !== f)
      : [...sujet.filieres, f]);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || sujet.tags.includes(t)) return;
    update("tags", [...sujet.tags, t]);
    setTagInput("");
  };

  return (
    <section className="sujet-panel sujet-panel--meta">
      <div className="sujet-panel__eyebrow">Métadonnées du sujet</div>

      <div className="sujet-grid sujet-grid--meta">
        <Field label="Concours" required>
          <select className="sujet-input" value={sujet.concours} onChange={(e) => update("concours", e.target.value)}>
            {SUJET_EDITOR_CONCOURS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Année" required>
          <input
            className="sujet-input"
            type="number"
            min={2000}
            max={2035}
            value={sujet.year}
            onChange={(e) => update("year", Number(e.target.value) || new Date().getFullYear())}
          />
        </Field>
        <Field label="Durée">
          <input className="sujet-input" value={sujet.duree} onChange={(e) => update("duree", e.target.value)} placeholder="3h" />
        </Field>
        <Field label="Matière">
          <input className="sujet-input sujet-input--disabled" value="Informatique" disabled />
        </Field>
      </div>

      <Field label="Filières">
        <div className="sujet-pill-row">
          {SUJET_EDITOR_FILIERES.map((f) => (
            <button
              key={f}
              type="button"
              className={`sujet-pill-btn ${sujet.filieres.includes(f) ? "is-active" : ""}`}
              onClick={() => toggleFiliere(f)}
            >
              {f}
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
                onClick={() => update("tags", sujet.tags.filter((v) => v !== tag))}
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
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Python 3, SQL, Graphes..."
          />
          <button type="button" className="sujet-icon-btn" onClick={addTag}>+ Ajouter</button>
        </div>
      </Field>
    </section>
  );
}
