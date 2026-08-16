import PrepaApp from "../../../src/views/prepa-info/PrepaApp.jsx";

const PATH_TO_PAGE = {
  "": "todo",
  resources: "resources",
  stats: "stats",
  sql: "sqlcheatsheet",
  python: "python",
  cnc: "cnc",
  concours: "concours",
  "sujet-editor": "sujeteditor",
  contact: "contact",
};

const PAGE_METADATA = {
  "": {
    title: "Checklist Programme CPGE Informatique 2025",
    description:
      "Checklist interactive du programme officiel 2025 de prépa info — MP, PC, PSI, PT. Coche chaque notion et suis ta progression, sauvegardée en local.",
  },
  resources: {
    title: "Ressources Prépa Informatique",
    description:
      "Toutes les ressources pour la prépa info : cours, supports et références classées par thème pour les classes préparatoires MP, PC, PSI, PT.",
  },
  stats: {
    title: "Statistiques de Progression CPGE",
    description: "Visualise ta progression dans le programme de prépa informatique, notion par notion et semestre par semestre.",
  },
  sql: {
    title: "Aide Mémoire SQL — Bases de Données Relationnelles",
    description:
      "Référence SQL pour la prépa info : SELECT, JOIN, GROUP BY, sous-requêtes. Tout ce qui tombe au concours CPGE, filtrable et copiable en un clic.",
  },
  python: {
    title: "Aide Mémoire Python — NumPy, Plotly, SQLite3",
    description:
      "Aide mémoire Python complet pour la prépa informatique : syntaxe, structures de données, NumPy, Plotly, SQLite3, filtrable par catégorie.",
  },
  cnc: {
    title: "Classique Concours — Algorithmes CNC",
    description:
      "Les algorithmes essentiels du CNC : tri, graphes, arbres, programmation dynamique. Implémentations Python, complexité et fréquence d'apparition au concours.",
  },
  concours: {
    title: "Annales & Concours Informatique CPGE",
    description: "Annales d'informatique des concours CPGE (CNC, CCINP...) avec sujets et corrigés pour t'entraîner en conditions réelles.",
  },
  "sujet-editor": {
    title: "Éditeur de Sujets avec Export PDF",
    description: "Crée et exporte tes propres sujets d'entraînement en PDF pour réviser l'informatique de prépa.",
  },
  contact: {
    title: "Contact",
    description: "Une question, une suggestion de ressource ? Contacte l'équipe Pivot — Prépa Info.",
  },
};

export async function generateMetadata({ params }) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts[0] ?? "";
  const meta = PAGE_METADATA[slug] ?? PAGE_METADATA[""];
  const path = slug ? `/cpge/${slug}` : "/cpge/";

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: { title: meta.title, description: meta.description, url: path },
  };
}

export default async function PrepaPage({ params }) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts[0] ?? "";
  const page = PATH_TO_PAGE[slug] ?? "todo";

  return <PrepaApp page={page} />;
}
