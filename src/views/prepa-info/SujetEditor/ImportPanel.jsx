import { useRef, useState } from "react";
import { normalizeSujet } from "../../../data/sujetEditorData.jsx";
import { Field } from "./Field.jsx";

export function ImportPanel({ onImport, onNotice }) {
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

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => parse(String(ev.target?.result || ""));
    reader.readAsText(file);
    e.target.value = "";
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
          onChange={(e) => setRaw(e.target.value)}
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
