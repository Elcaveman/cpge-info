import { useState } from "react";
import {
  SUJET_EDITOR_TYPES,
  SUJET_EDITOR_PRIORITIES,
  SUJET_EDITOR_TYPE_LABELS,
} from "../../../data/sujetEditorData.jsx";
import { Field } from "./Field.jsx";

const TYPE_CLASS = { python: "python", sql: "sql", algo: "algo", cours: "cours" };
const PRIORITY_CLASS = { P0: "p0", P1: "p1", P2: "p2" };

export function QuestionEditor({ question, index, onChange, onDelete, onMove, isFirst, isLast }) {
  const [expanded, setExpanded] = useState(index === 0);
  const typeClass = TYPE_CLASS[question.type] || "cours";
  const priorityClass = PRIORITY_CLASS[question.priority] || "p2";

  const update = (key, value) => onChange({ ...question, [key]: value });

  return (
    <section className={`sujet-question-card ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="sujet-question-card__header"
        onClick={() => setExpanded((v) => !v)}
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
        <button type="button" className="sujet-icon-btn" onClick={() => onMove(-1)} disabled={isFirst}>↑</button>
        <button type="button" className="sujet-icon-btn" onClick={() => onMove(1)} disabled={isLast}>↓</button>
        <button type="button" className="sujet-icon-btn sujet-icon-btn--danger" onClick={onDelete}>✕</button>
      </div>

      {expanded ? (
        <div className="sujet-question-card__body">
          <div className="sujet-grid sujet-grid--question-top">
            <Field label="ID" required className="sujet-field--id">
              <input className="sujet-input" value={question.id} onChange={(e) => update("id", e.target.value)} placeholder="I.1" />
            </Field>
            <Field label="Type" required className="sujet-field--type">
              <select className="sujet-input" value={question.type} onChange={(e) => update("type", e.target.value)}>
                {SUJET_EDITOR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Priorité" className="sujet-field--priority">
              <select className="sujet-input" value={question.priority} onChange={(e) => update("priority", e.target.value)}>
                {SUJET_EDITOR_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Titre de la question" required className="sujet-field--title">
              <input
                className="sujet-input"
                value={question.text}
                onChange={(e) => update("text", e.target.value)}
                placeholder="Écrire une fonction qui..."
              />
            </Field>
          </div>

          <Field label="Énoncé">
            <textarea
              className="sujet-textarea"
              rows={3}
              value={question.enonce}
              onChange={(e) => update("enonce", e.target.value)}
              placeholder="Écrire la fonction f(x) telle que..."
            />
          </Field>

          <Field label="Code / Correction">
            <textarea
              className="sujet-textarea sujet-textarea--code"
              rows={8}
              value={question.code}
              onChange={(e) => update("code", e.target.value)}
              placeholder={"def f(x):\n    # votre code ici\n    return x"}
              spellCheck={false}
            />
          </Field>

          <div className="sujet-grid sujet-grid--question-meta">
            <Field label="Complexité">
              <input className="sujet-input" value={question.complexity} onChange={(e) => update("complexity", e.target.value)} placeholder="O(n log n)" />
            </Field>
            <Field label="Note complexité">
              <input className="sujet-input" value={question.complexityNote} onChange={(e) => update("complexityNote", e.target.value)} placeholder="une passe sur le tableau" />
            </Field>
          </div>

          <Field label="Piège classique">
            <textarea
              className="sujet-textarea"
              rows={2}
              value={question.pitfall}
              onChange={(e) => update("pitfall", e.target.value)}
              placeholder="Ne pas initialiser m = 0..."
            />
          </Field>
        </div>
      ) : null}
    </section>
  );
}
