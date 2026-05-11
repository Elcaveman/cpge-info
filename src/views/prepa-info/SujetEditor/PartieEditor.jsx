import { useState } from "react";
import {
  SUJET_EDITOR_ICONS,
  createEmptyQuestion,
} from "../../../data/sujetEditorData.jsx";
import { QuestionEditor } from "./QuestionEditor.jsx";

export function PartieEditor({ partie, onChange, onDelete, onMove, isFirst, isLast }) {
  const [collapsed, setCollapsed] = useState(false);

  const update = (key, value) => onChange({ ...partie, [key]: value });

  const rotateIcon = () => {
    const idx = SUJET_EDITOR_ICONS.indexOf(partie.icon);
    update("icon", SUJET_EDITOR_ICONS[idx >= 0 ? (idx + 1) % SUJET_EDITOR_ICONS.length : 0]);
  };

  const updateQuestion = (qi, q) => {
    const next = [...partie.questions];
    next[qi] = q;
    update("questions", next);
  };

  const addQuestion = () => update("questions", [...partie.questions, createEmptyQuestion()]);

  const deleteQuestion = (qi) => {
    if (partie.questions.length === 1) return;
    update("questions", partie.questions.filter((_, i) => i !== qi));
  };

  const moveQuestion = (qi, dir) => {
    const ni = qi + dir;
    if (ni < 0 || ni >= partie.questions.length) return;
    const next = [...partie.questions];
    [next[qi], next[ni]] = [next[ni], next[qi]];
    update("questions", next);
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
            onChange={(e) => update("id", e.target.value)}
            placeholder="I"
          />
          <input
            className="sujet-input"
            value={partie.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Titre de la partie..."
          />
        </div>

        <div className="sujet-partie-card__actions">
          <button type="button" className="sujet-icon-btn" onClick={() => onMove(-1)} disabled={isFirst}>↑</button>
          <button type="button" className="sujet-icon-btn" onClick={() => onMove(1)} disabled={isLast}>↓</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--danger" onClick={onDelete}>✕</button>
          <button type="button" className="sujet-icon-btn" onClick={() => setCollapsed((v) => !v)}>
            {collapsed ? "▾ Afficher" : "▴ Réduire"}
          </button>
        </div>
      </div>

      {collapsed ? null : (
        <div className="sujet-partie-card__body">
          {partie.questions.map((q, qi) => (
            <QuestionEditor
              key={`${partie.id || "partie"}-${qi}`}
              question={q}
              index={qi}
              onChange={(uq) => updateQuestion(qi, uq)}
              onDelete={() => deleteQuestion(qi)}
              onMove={(dir) => moveQuestion(qi, dir)}
              isFirst={qi === 0}
              isLast={qi === partie.questions.length - 1}
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
