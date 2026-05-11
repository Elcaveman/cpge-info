export const SUJET_EDITOR_ICONS = ["🐍", "🗄️", "🔗", "📊", "🧠", "🌐", "📐", "⚙️", "📝", "🔢"];

export const SUJET_EDITOR_TYPES = ["python", "sql", "algo", "cours"];

export const SUJET_EDITOR_PRIORITIES = ["P0", "P1", "P2"];

export const SUJET_EDITOR_CONCOURS = ["CNC", "CCP", "Mines", "X-ENS", "CCINP"];

export const SUJET_EDITOR_FILIERES = ["MP", "PC", "PSI", "PT", "MPSI", "PCSI", "PTSI"];

export const SUJET_EDITOR_TABS = [
  { id: "edit", label: "✏ Éditer" },
  { id: "preview", label: "{ } JSON" },
  { id: "import", label: "↑ Importer" },
];

export const SUJET_EDITOR_TYPE_LABELS = {
  python: "Python",
  sql: "SQL",
  algo: "Algo",
  cours: "Cours",
};

export function createEmptyQuestion() {
  return {
    id: "",
    type: "python",
    priority: "P0",
    text: "",
    enonce: "",
    complexity: "",
    complexityNote: "",
    pitfall: "",
    code: "",
  };
}

export function createEmptyPartie() {
  return {
    id: "",
    title: "",
    icon: "📝",
    questions: [createEmptyQuestion()],
  };
}

export function createEmptySujet() {
  return {
    concours: "CNC",
    year: new Date().getFullYear(),
    filieres: ["MP"],
    duree: "3h",
    tags: ["Python 3"],
    parties: [createEmptyPartie()],
  };
}

export function normalizeSujet(rawSujet) {
  const baseSujet = createEmptySujet();
  const sujet = rawSujet && typeof rawSujet === "object" ? rawSujet : {};
  const parties = Array.isArray(sujet.parties) && sujet.parties.length > 0
    ? sujet.parties.map((partie) => normalizePartie(partie))
    : baseSujet.parties;

  return {
    ...baseSujet,
    ...sujet,
    year: Number.isFinite(Number(sujet.year)) ? Number(sujet.year) : baseSujet.year,
    filieres: Array.isArray(sujet.filieres) && sujet.filieres.length > 0 ? sujet.filieres : baseSujet.filieres,
    tags: Array.isArray(sujet.tags) ? sujet.tags.filter(Boolean) : baseSujet.tags,
    parties,
  };
}

function normalizePartie(rawPartie) {
  const basePartie = createEmptyPartie();
  const partie = rawPartie && typeof rawPartie === "object" ? rawPartie : {};
  const questions = Array.isArray(partie.questions) && partie.questions.length > 0
    ? partie.questions.map((question) => normalizeQuestion(question))
    : basePartie.questions;

  return {
    ...basePartie,
    ...partie,
    questions,
  };
}

function normalizeQuestion(rawQuestion) {
  const baseQuestion = createEmptyQuestion();
  const question = rawQuestion && typeof rawQuestion === "object" ? rawQuestion : {};

  return {
    ...baseQuestion,
    ...question,
  };
}