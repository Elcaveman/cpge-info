import { useState, useMemo, useEffect } from "react";

// ─── COURSE DOCUMENTS DATA ───────────────────────────────────────────────────
const COURSES = [
  {
    sem: 1, label: "Semestre 1", color: "#34d399",
    topics: [
      {
        title: "Algorithmes de tri",
        notes: "Comparaison des tris classiques : insertion, sélection, fusion, rapide. Tableaux de complexité et propriétés (stable, en place).",
        pdf: { label: "Cours — Tris.pdf", url: "#" },
        video: { label: "Tri fusion expliqué", url: "#" },
      },
      {
        title: "Récursion & Dichotomie",
        notes: "Schémas récursifs fondamentaux. Preuve de terminaison par variant. Recherche dichotomique et exponentiation rapide.",
        pdf: { label: "Cours — Récursion.pdf", url: "#" },
        video: { label: "Dichotomie — visualisation", url: "#" },
      },
      {
        title: "Algorithmes gloutons",
        notes: "Rendu de monnaie, sélection d'activités. Limites des algorithmes gloutons — contre-exemples.",
        pdf: { label: "TD — Gloutons.pdf", url: "#" },
        video: null,
      },
    ],
  },
  {
    sem: 2, label: "Semestre 2", color: "#60a5fa",
    topics: [
      {
        title: "Graphes — Bases & Parcours",
        notes: "Vocabulaire, représentations (liste d'adjacence, matrice). BFS avec deque, DFS récursif. Détection de cycles et connexité.",
        pdf: { label: "Cours — Graphes.pdf", url: "#" },
        video: { label: "BFS vs DFS — animé", url: "#" },
      },
      {
        title: "Dijkstra & Plus Courts Chemins",
        notes: "Algorithme de Dijkstra avec file de priorité. Condition de validité (poids positifs). Introduction à A*.",
        pdf: { label: "Cours — Dijkstra.pdf", url: "#" },
        video: { label: "Dijkstra pas-à-pas", url: "#" },
      },
      {
        title: "Représentation des Nombres",
        notes: "Entiers positifs, complément à deux, flottants. Problèmes de précision en Python.",
        pdf: { label: "Cours — Nombres.pdf", url: "#" },
        video: null,
      },
      {
        title: "Méthodes de Programmation",
        notes: "Spécification, précondition, postcondition, invariants, variants. Correction partielle vs totale. Jeux de tests.",
        pdf: { label: "Cours — Méthodes.pdf", url: "#" },
        video: { label: "Invariants de boucle", url: "#" },
      },
    ],
  },
  {
    sem: 3, label: "Semestre 3", color: "#f472b6",
    topics: [
      {
        title: "SQL — Bases de Données",
        notes: "SELECT, JOIN, GROUP BY, HAVING, agrégats. Modèle entité-association, clés primaires et étrangères.",
        pdf: { label: "Cours — SQL.pdf", url: "#" },
        video: { label: "SQL en 30 min", url: "#" },
      },
      {
        title: "Programmation Dynamique",
        notes: "Sous-structure optimale, chevauchement. Mémoïsation vs bottom-up. Levenshtein, LCS, Floyd-Warshall.",
        pdf: { label: "Cours — Prog. Dyn.pdf", url: "#" },
        video: { label: "Levenshtein visualisé", url: "#" },
      },
      {
        title: "IA & Théorie des Jeux",
        notes: "k-NN, k-moyennes, matrice de confusion. Minimax avec heuristique. Positions gagnantes et attracteurs.",
        pdf: { label: "Cours — IA & Jeux.pdf", url: "#" },
        video: { label: "Minimax expliqué", url: "#" },
      },
    ],
  },
  {
    sem: 0, label: "Annexe Python", color: "#818cf8",
    topics: [
      {
        title: "Python — Référence exigible",
        notes: "Liste exhaustive des éléments Python au programme : types, structures de contrôle, fonctions, fichiers, assertions.",
        pdf: { label: "Annexe Python officielle.pdf", url: "#" },
        video: { label: "Python CPGE — tour rapide", url: "#" },
      },
    ],
  },
];

// ─── TODO DATA ───────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  { id: 1, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Recherche séquentielle dans un tableau 1D", hook: "Parcourir jusqu'à trouver, O(n) en pire cas", pitfall: null },
  { id: 2, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Recherche du maximum / second maximum", hook: null, pitfall: "Initialiser max_val = tab[0], jamais = 0 !" },
  { id: 3, sem: 1, section: "Recherche & Tableaux", priority: "P1", text: "Comptage par dictionnaire", hook: "d[x] = d.get(x, 0) + 1", pitfall: null },
  { id: 4, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Notions de coût : O(1), O(n), O(n²)", hook: null, pitfall: null },
  { id: 5, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Tri à bulles", hook: "O(n²), stable, en place", pitfall: null },
  { id: 6, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Recherche des deux valeurs les plus proches", hook: null, pitfall: null },
  { id: 7, sem: 1, section: "Boucles Imbriquées", priority: "P1", text: "Recherche d'un facteur dans un texte (naïve)", hook: "O(n·m) — boucles imbriquées", pitfall: null },
  { id: 8, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Reconnaître ET prouver la complexité quadratique", hook: null, pitfall: null },
  { id: 9, sem: 1, section: "Dichotomie", priority: "P0", text: "Recherche dichotomique dans un tableau trié", hook: "O(log n) — couper en 2 à chaque étape", pitfall: null },
  { id: 10, sem: 1, section: "Dichotomie", priority: "P0", text: "Exponentiation rapide", hook: "n pair → (a²)^(n/2), n impair → a × a^(n-1)", pitfall: "Oublier le cas n = 0 !" },
  { id: 11, sem: 1, section: "Dichotomie", priority: "P0", text: "Savoir que log₂(10⁹) ≈ 30", hook: null, pitfall: null },
  { id: 12, sem: 1, section: "Récursion", priority: "P0", text: "Version récursive d'algorithmes dichotomiques", hook: null, pitfall: null },
  { id: 13, sem: 1, section: "Récursion", priority: "P0", text: "Énumération (sous-listes, permutations)", hook: null, pitfall: null },
  { id: 14, sem: 1, section: "Récursion", priority: "P1", text: "Dépassement de pile — expliquer et éviter", hook: null, pitfall: "Pas de cas de base → RecursionError" },
  { id: 15, sem: 1, section: "Algorithmes Gloutons", priority: "P0", text: "Rendu de monnaie", hook: "Choisir la plus grande pièce possible à chaque étape", pitfall: null },
  { id: 16, sem: 1, section: "Algorithmes Gloutons", priority: "P1", text: "Allocation de salles / sélection d'activités", hook: null, pitfall: null },
  { id: 17, sem: 1, section: "Algorithmes Gloutons", priority: "P0", text: "Glouton ≠ Optimal en général — savoir contre-exemplariser", hook: null, pitfall: "Pièces {1,3,4}, rendre 6 → glouton: {4,1,1}, optimal: {3,3}" },
  { id: 18, sem: 1, section: "Tableaux 2D & Images", priority: "P1", text: "Rotation d'une image (90°, 180°)", hook: null, pitfall: null },
  { id: 19, sem: 1, section: "Tableaux 2D & Images", priority: "P1", text: "Convolution : flou, détection de contour", hook: null, pitfall: null },
  { id: 20, sem: 1, section: "Tris", priority: "P0", text: "Tri par insertion — O(n²), stable, en place", hook: null, pitfall: null },
  { id: 21, sem: 1, section: "Tris", priority: "P0", text: "Tri par sélection — O(n²), non stable, en place", hook: null, pitfall: null },
  { id: 22, sem: 1, section: "Tris", priority: "P0", text: "Tri fusion — O(n log n), stable, non en place", hook: "Diviser → récursion → fusionner", pitfall: null },
  { id: 23, sem: 1, section: "Tris", priority: "P0", text: "Tri rapide — O(n log n) moy., non stable, en place", hook: "Pire cas O(n²) si tableau trié + pivot = 1er élément", pitfall: null },
  { id: 24, sem: 1, section: "Tris", priority: "P1", text: "Tri par comptage — O(n+k), non comparatif", hook: "Seulement pour clés entières bornées", pitfall: null },
  { id: 25, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Spécification : Entrée / Sortie avant chaque fonction", hook: null, pitfall: null },
  { id: 26, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Précondition / Postcondition / Invariant (en commentaires)", hook: null, pitfall: null },
  { id: 27, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Assertion : assert condition", hook: "Arrêt immédiat si faux — pas d'exception à gérer", pitfall: null },
  { id: 28, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Variant de boucle → preuve de terminaison", hook: "Entier qui décroît strictement à chaque itération", pitfall: null },
  { id: 29, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Invariant de boucle → preuve de correction", hook: "Vrai avant ET après chaque itération", pitfall: null },
  { id: 30, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Correction partielle vs correction totale", hook: "Totale = partielle + terminaison garantie", pitfall: null },
  { id: 31, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Jeu de tests : cas normaux + limites + extrêmes", hook: null, pitfall: "Tester tableau vide, un élément, déjà trié, trié à l'envers" },
  { id: 32, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Entiers positifs sur mots de taille fixe (binaire)", hook: null, pitfall: null },
  { id: 33, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Complément à deux pour entiers signés", hook: "Inverser les bits de n, puis +1 → représentation de -n", pitfall: null },
  { id: 34, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Distinction réels / décimaux / flottants", hook: "Tous les réels ne sont pas représentables", pitfall: null },
  { id: 35, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Flottants : mantisse × 2^exposant", hook: "Pas besoin de connaître IEEE-754 en détail", pitfall: null },
  { id: 36, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Précision flottante — ne jamais tester l'égalité", hook: "0.1 + 0.2 ≠ 0.3 en Python", pitfall: "Écrire abs(x - 0.1) < 1e-9, jamais x == 0.1" },
  { id: 37, sem: 2, section: "Représentation des Nombres", priority: "P1", text: "Entiers multi-précision Python — coût arithmétique croissant", hook: null, pitfall: null },
  { id: 38, sem: 2, section: "Graphes", priority: "P0", text: "Vocabulaire : orienté/non orienté, arc/arête, degré, cycle, connexité", hook: "G = (S, A) ; d⁺ sortant, d⁻ entrant", pitfall: null },
  { id: 39, sem: 2, section: "Graphes", priority: "P0", text: "Implémentations : liste d'adjacence vs matrice d'adjacence", hook: "Liste : O(n+m) mémoire. Matrice : O(n²) mais O(1) test arête", pitfall: null },
  { id: 40, sem: 2, section: "Graphes", priority: "P0", text: "BFS (largeur) — file collections.deque + popleft()", hook: "Plus court chemin en nombre d'arêtes", pitfall: "pop(0) sur liste Python est O(n) — TOUJOURS utiliser deque !" },
  { id: 41, sem: 2, section: "Graphes", priority: "P0", text: "DFS (profondeur) — pile ou récursion", hook: "Détection de cycles, connexité", pitfall: null },
  { id: 42, sem: 2, section: "Graphes", priority: "P1", text: "Détection de cycle dans un graphe non orienté (DFS + parent)", hook: null, pitfall: null },
  { id: 43, sem: 2, section: "Graphes", priority: "P1", text: "Test de connexité (BFS/DFS depuis chaque sommet non visité)", hook: null, pitfall: null },
  { id: 44, sem: 2, section: "Plus Courts Chemins", priority: "P0", text: "Algorithme de Dijkstra (poids positifs uniquement)", hook: "BFS + file de priorité — invariant : distance extraite = optimale", pitfall: "Ne fonctionne PAS avec poids négatifs !" },
  { id: 45, sem: 2, section: "Plus Courts Chemins", priority: "P1", text: "Algorithme A* — Dijkstra + heuristique h(s) ≥ 0 admissible", hook: null, pitfall: null },
  { id: 46, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Vocabulaire : table, attribut, enregistrement, domaine, schéma", hook: null, pitfall: null },
  { id: 47, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Clé primaire (peut être composite)", hook: null, pitfall: null },
  { id: 48, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Clé étrangère — référence à la clé primaire d'une autre table", hook: null, pitfall: null },
  { id: 49, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Associations 1-1, 1-*, *-* (décomposer *-* en deux 1-*)", hook: null, pitfall: null },
  { id: 50, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "SELECT ... FROM ... WHERE ... (filtrage, projection, AS)", hook: null, pitfall: null },
  { id: 51, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "ORDER BY, DISTINCT, LIMIT, OFFSET", hook: null, pitfall: null },
  { id: 52, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "JOIN ... ON ... (équi-jointures) + autojointure", hook: null, pitfall: null },
  { id: 53, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "UNION, INTERSECT, EXCEPT", hook: null, pitfall: null },
  { id: 54, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Agrégats : MIN, MAX, SUM, AVG, COUNT + GROUP BY", hook: "Ordre logique : FROM → WHERE → GROUP BY → HAVING → SELECT", pitfall: null },
  { id: 55, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "HAVING — filtrer après agrégation (≠ WHERE avant agrégation)", hook: null, pitfall: "WHERE filtre les lignes, HAVING filtre les groupes" },
  { id: 56, sem: 3, section: "Bases de Données SQL", priority: "P1", text: "Requêtes imbriquées (sous-requêtes dans WHERE)", hook: null, pitfall: null },
  { id: 57, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Hachage : clé → indice par fonction de hachage → O(1) moyen", hook: null, pitfall: null },
  { id: 58, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Clés hashables : int, str, tuple (PAS list ni dict)", hook: null, pitfall: null },
  { id: 59, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Sous-structure optimale + chevauchement des sous-problèmes", hook: "Prog. dynamique = Glouton avec mémoire", pitfall: null },
  { id: 60, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Mémoïsation (top-down) : récursion + dictionnaire cache", hook: null, pitfall: null },
  { id: 61, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Bottom-up : remplir le tableau dans le bon ordre", hook: null, pitfall: null },
  { id: 62, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Distance d'édition (Levenshtein)", hook: "dp[i][j] = min(insertion, suppression, substitution)", pitfall: null },
  { id: 63, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P1", text: "Plus longue sous-suite commune (LCS)", hook: null, pitfall: null },
  { id: 64, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P1", text: "Floyd-Warshall — plus courts chemins toutes paires, O(n³)", hook: null, pitfall: null },
  { id: 65, sem: 3, section: "IA & Jeux", priority: "P1", text: "k plus proches voisins (k-NN) — classification supervisée", hook: "Calculer distances, trier, prendre k premiers, vote majoritaire", pitfall: "k pair → possible égalité à gérer" },
  { id: 66, sem: 3, section: "IA & Jeux", priority: "P1", text: "Matrice de confusion — vrais/faux positifs/négatifs", hook: null, pitfall: null },
  { id: 67, sem: 3, section: "IA & Jeux", priority: "P1", text: "k-moyennes — clustering non supervisé", hook: "Convergence vers minimum local (pas de preuve globale requise)", pitfall: null },
  { id: 68, sem: 3, section: "IA & Jeux", priority: "P1", text: "Jeux à 2 joueurs sur graphe biparti — positions gagnantes/perdantes", hook: null, pitfall: null },
  { id: 69, sem: 3, section: "IA & Jeux", priority: "P1", text: "Attracteurs — calcul par propagation arrière", hook: null, pitfall: null },
  { id: 70, sem: 3, section: "IA & Jeux", priority: "P0", text: "Algorithme minimax avec heuristique", hook: "MAX choisit le meilleur pour lui, MIN le pire pour l'adversaire", pitfall: "Hors programme : élagage alpha-bêta" },
  { id: 71, sem: 0, section: "Python — Traits généraux", priority: "P0", text: "Typage dynamique, indentation, portée lexicale, appel par valeur", hook: null, pitfall: null },
  { id: 72, sem: 0, section: "Python — Types de base", priority: "P0", text: "int : +, -, *, //, **, % (opérandes positifs pour %)", hook: null, pitfall: null },
  { id: 73, sem: 0, section: "Python — Types de base", priority: "P0", text: "float : +, -, *, /, **", hook: null, pitfall: null },
  { id: 74, sem: 0, section: "Python — Types de base", priority: "P0", text: "bool : not, or, and — évaluation paresseuse !", hook: null, pitfall: null },
  { id: 75, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Chaînes/Tuples (immuables) : len, indice, +, *, tranche [a:b]", hook: null, pitfall: null },
  { id: 76, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Listes : compréhension, [e]*n, append, pop, tranche, copie", hook: null, pitfall: "b = a[:] copie superficielle — objets imbriqués partagés !" },
  { id: 77, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Dictionnaires : {c:v}, accès, insertion, k in d, len, copy", hook: null, pitfall: null },
  { id: 78, sem: 0, section: "Python — Contrôle", priority: "P0", text: "if / elif / else", hook: null, pitfall: null },
  { id: 79, sem: 0, section: "Python — Contrôle", priority: "P0", text: "while (sans else), break, return dans boucle", hook: null, pitfall: null },
  { id: 80, sem: 0, section: "Python — Contrôle", priority: "P0", text: "for (sans else) sur range, str, tuple, list, dict.keys(), .items()", hook: null, pitfall: null },
  { id: 81, sem: 0, section: "Python — Contrôle", priority: "P0", text: "def f(p1, ..., pn): ... return", hook: null, pitfall: null },
  { id: 82, sem: 0, section: "Python — Divers", priority: "P0", text: "import module / as alias / from module import f, g", hook: null, pitfall: "Toute fonction de module non listée doit être documentée dans la copie !" },
  { id: 83, sem: 0, section: "Python — Divers", priority: "P0", text: "Fichiers : open, read, readline, readlines, split, write, close", hook: null, pitfall: null },
  { id: 84, sem: 0, section: "Python — Divers", priority: "P0", text: "assert condition (sans message d'erreur)", hook: null, pitfall: null },
];

const PRIORITY_CONFIG = {
  P0: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  P1: { color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  P2: { color: "#eab308", bg: "rgba(234,179,8,0.12)" },
};

const SEM_LABELS = { 0: "Annexe Python", 1: "Semestre 1", 2: "Semestre 2", 3: "Semestre 3" };
const SEM_COLORS = { 0: "#818cf8", 1: "#34d399", 2: "#60a5fa", 3: "#f472b6" };

// ─── RESOURCES PAGE ──────────────────────────────────────────────────────────
function ResourcesPage() {
  const [activeSem, setActiveSem] = useState(1);
  const current = COURSES.find(c => c.sem === activeSem);

  return (
    <div className="res-layout">
      {/* Semester picker sidebar */}
      <nav className="res-nav">
        <p className="res-nav-label">SEMESTRE</p>
        {COURSES.map(c => (
          <button
            key={c.sem}
            className={`res-nav-btn ${activeSem === c.sem ? "res-nav-btn--active" : ""}`}
            style={activeSem === c.sem ? { borderColor: c.color, color: c.color } : {}}
            onClick={() => setActiveSem(c.sem)}
          >
            <span className="res-nav-dot" style={{ background: activeSem === c.sem ? c.color : "#2d2d45" }} />
            {c.label}
          </button>
        ))}
      </nav>

      {/* Topic cards */}
      <div className="res-cards">
        <div className="res-cards-header">
          <div className="res-sem-pill" style={{ background: current.color + "18", color: current.color, borderColor: current.color + "33" }}>
            {current.label}
          </div>
          <p className="res-cards-count">{current.topics.length} document{current.topics.length > 1 ? "s" : ""}</p>
        </div>

        {current.topics.map((topic, i) => (
          <div key={i} className="res-card">
            <div className="res-card-title">{topic.title}</div>
            <p className="res-card-notes">{topic.notes}</p>
            <div className="res-card-links">
              {topic.pdf && (
                <a href={topic.pdf.url} className="res-link res-link--pdf" target="_blank" rel="noopener noreferrer">
                  <span className="res-link-icon">📄</span>
                  {topic.pdf.label}
                </a>
              )}
              {topic.video && (
                <a href={topic.video.url} className="res-link res-link--video" target="_blank" rel="noopener noreferrer">
                  <span className="res-link-icon">▶</span>
                  {topic.video.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TODO PAGE ───────────────────────────────────────────────────────────────
function TodoPage({ checked, toggle }) {
  const [filterSem, setFilterSem] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSection, setFilterSection] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  const sections = useMemo(() => [...new Set(ALL_ITEMS.map(i => i.section))], []);

  const filtered = useMemo(() => ALL_ITEMS.filter(item => {
    if (filterSem !== "all" && item.sem !== Number(filterSem)) return false;
    if (filterPriority !== "all" && item.priority !== filterPriority) return false;
    if (filterStatus === "done" && !checked[item.id]) return false;
    if (filterStatus === "todo" && checked[item.id]) return false;
    if (filterSection !== "all" && item.section !== filterSection) return false;
    if (search && !item.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [filterSem, filterPriority, filterStatus, filterSection, search, checked]);

  const stats = useMemo(() => {
    const total = ALL_ITEMS.length;
    const done = ALL_ITEMS.filter(i => checked[i.id]).length;
    const p0Total = ALL_ITEMS.filter(i => i.priority === "P0").length;
    const p0Done = ALL_ITEMS.filter(i => i.priority === "P0" && checked[i.id]).length;
    return { total, done, p0Total, p0Done, pct: Math.round((done / total) * 100) };
  }, [checked]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(item => {
      if (!g[item.section]) g[item.section] = [];
      g[item.section].push(item);
    });
    return g;
  }, [filtered]);

  const resetFilters = () => {
    setFilterSem("all"); setFilterPriority("all");
    setFilterStatus("all"); setFilterSection("all"); setSearch("");
  };

  return (
    <>
      <div className="todo-header">
        <div className="header-top">
          <div className="title">CPGE Informatique</div>
          <div className="subtitle">MP · PC · PSI · PT — Programme 2021</div>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-row">
            <span className="progress-label">PROGRESSION GLOBALE</span>
            <span className="progress-label">{stats.done} / {stats.total} — {stats.pct}%</span>
          </div>
          <div className="bar"><div className="bar-fill" style={{ width: `${stats.pct}%` }} /></div>
        </div>
        <div className="stats-row">
          {[
            { num: stats.done, lbl: "VALIDÉS", color: "#34d399" },
            { num: stats.total - stats.done, lbl: "RESTANTS", color: "#60a5fa" },
            { num: stats.p0Done, lbl: "P0 VALIDÉS", color: "#ef4444" },
            { num: stats.p0Total - stats.p0Done, lbl: "P0 RESTANTS", color: "#f97316" },
          ].map(s => (
            <div key={s.lbl} className="stat-chip">
              <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input className="search" placeholder="Rechercher une notion..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-row">
          <select value={filterSem} onChange={e => setFilterSem(e.target.value)}>
            <option value="all">Tous les semestres</option>
            <option value="0">Annexe Python</option>
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
            <option value="3">Semestre 3</option>
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="all">Toutes priorités</option>
            <option value="P0">🔴 P0 — Indispensable</option>
            <option value="P1">🟠 P1 — Important</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Tout statut</option>
            <option value="todo">À faire</option>
            <option value="done">Validés</option>
          </select>
          <select value={filterSection} onChange={e => setFilterSection(e.target.value)} style={{ maxWidth: 200 }}>
            <option value="all">Toutes sections</option>
            {sections.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="reset-btn" onClick={resetFilters}>↺ Réinitialiser</button>
        </div>
      </div>

      <div className="results-count">
        {filtered.length} notion{filtered.length !== 1 ? "s" : ""} affichée{filtered.length !== 1 ? "s" : ""}
        {(filterSem !== "all" || filterPriority !== "all" || filterStatus !== "all" || filterSection !== "all" || search) && " (filtrées)"}
      </div>

      <div className="content">
        {Object.keys(grouped).length === 0 ? (
          <div className="empty">Aucune notion ne correspond aux filtres sélectionnés.</div>
        ) : (
          Object.entries(grouped).map(([section, items]) => {
            const semVal = items[0].sem;
            const semColor = SEM_COLORS[semVal];
            const doneSec = items.filter(i => checked[i.id]).length;
            return (
              <div key={section} className="section-block">
                <div className="section-header">
                  <div style={{ width: 3, height: 14, background: semColor, borderRadius: 2 }} />
                  <span className="section-title">{section}</span>
                  <span className="section-count">{doneSec}/{items.length}</span>
                </div>
                {items.map(item => {
                  const pc = PRIORITY_CONFIG[item.priority];
                  const isExpanded = expandedItem === item.id;
                  const hasDetail = item.hook || item.pitfall;
                  return (
                    <div key={item.id} className={`item ${checked[item.id] ? "done" : ""}`}>
                      <div className="item-main" onClick={() => toggle(item.id)}>
                        <div className={`checkbox ${checked[item.id] ? "checked" : ""}`} onClick={e => { e.stopPropagation(); toggle(item.id); }}>
                          {checked[item.id] && (
                            <svg className="check-svg" viewBox="0 0 12 12">
                              <polyline points="2,6 5,9 10,3" />
                            </svg>
                          )}
                        </div>
                        <div className="item-body">
                          <div className={`item-text ${checked[item.id] ? "done" : ""}`}>{item.text}</div>
                          <div className="item-meta">
                            <span className="priority-badge" style={{ background: pc.bg, color: pc.color }}>{item.priority}</span>
                            <span className="sem-badge" style={{ color: semColor, borderColor: semColor + "33" }}>{SEM_LABELS[item.sem]}</span>
                          </div>
                        </div>
                        {hasDetail && (
                          <button className="expand-btn" onClick={e => { e.stopPropagation(); setExpandedItem(isExpanded ? null : item.id); }}>
                            {isExpanded ? "▲" : "▾"}
                          </button>
                        )}
                      </div>
                      {isExpanded && hasDetail && (
                        <>
                          <div className="divider" />
                          <div className="item-detail">
                            {item.hook && (
                              <div className="detail-row">
                                <span className="detail-icon">💡</span>
                                <span className="detail-text hook">{item.hook}</span>
                              </div>
                            )}
                            {item.pitfall && (
                              <div className="detail-row">
                                <span className="detail-icon">⚠️</span>
                                <span className="detail-text pitfall">{item.pitfall}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("todo");

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem("cpge_checked");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem("cpge_checked", JSON.stringify(checked)); }
    catch { }
  }, [checked]);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const donePct = Math.round((ALL_ITEMS.filter(i => checked[i.id]).length / ALL_ITEMS.length) * 100);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0a0f; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

    /* ── Layout shell ── */
    .shell { display: flex; min-height: 100vh; background: #0a0a0f; color: #e2e8f0; font-family: 'Syne', sans-serif; }

    /* ── Sidebar ── */
    .sidebar { width: 220px; min-width: 220px; background: #0d0d18; border-right: 1px solid #1a1a2e; display: flex; flex-direction: column; padding: 28px 0 24px; position: sticky; top: 0; height: 100vh; }
    .sidebar-logo { padding: 0 20px 24px; border-bottom: 1px solid #1a1a2e; }
    .sidebar-logo-title { font-size: 15px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.3px; }
    .sidebar-logo-sub { font-size: 10px; color: #475569; font-family: 'JetBrains Mono', monospace; margin-top: 3px; }
    .sidebar-nav { display: flex; flex-direction: column; gap: 4px; padding: 20px 12px 0; flex: 1; }
    .nav-btn { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; border: none; background: none; color: #64748b; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; text-align: left; transition: all 0.15s; }
    .nav-btn:hover { background: #12121c; color: #94a3b8; }
    .nav-btn--active { background: #12121c; color: #f1f5f9; }
    .nav-btn-icon { font-size: 15px; width: 20px; text-align: center; }
    .sidebar-progress { padding: 16px 20px 0; border-top: 1px solid #1a1a2e; margin-top: auto; }
    .sidebar-progress-label { font-size: 10px; color: #475569; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; margin-bottom: 8px; display: flex; justify-content: space-between; }
    .sidebar-bar { height: 3px; background: #1e1e2e; border-radius: 3px; overflow: hidden; }
    .sidebar-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #34d399, #60a5fa); transition: width 0.5s ease; }

    /* ── Main content ── */
    .main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
    .page-inner { max-width: 860px; width: 100%; margin: 0 auto; padding: 32px 32px 80px; }

    /* ── Todo page ── */
    .todo-header { }
    .header-top { display: flex; align-items: baseline; gap: 12px; margin-bottom: 4px; }
    .title { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #f1f5f9; }
    .subtitle { font-size: 11px; color: #64748b; font-family: 'JetBrains Mono', monospace; }
    .progress-bar-wrap { margin: 20px 0 0; }
    .progress-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .progress-label { font-size: 11px; color: #64748b; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }
    .bar { height: 4px; background: #1e1e2e; border-radius: 4px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #34d399, #60a5fa); transition: width 0.5s ease; }
    .stats-row { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
    .stat-chip { background: #12121c; border: 1px solid #1e1e2e; border-radius: 8px; padding: 8px 14px; }
    .stat-num { font-size: 20px; font-weight: 700; line-height: 1; }
    .stat-lbl { font-size: 10px; color: #64748b; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.06em; margin-top: 2px; }
    .filters { margin: 24px 0 0; display: flex; flex-direction: column; gap: 10px; }
    .search-wrap { position: relative; }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; font-size: 14px; }
    .search { width: 100%; background: #12121c; border: 1px solid #1e1e2e; color: #e2e8f0; border-radius: 8px; padding: 10px 12px 10px 34px; font-family: 'JetBrains Mono', monospace; font-size: 13px; outline: none; transition: border-color 0.2s; }
    .search:focus { border-color: #334155; }
    .filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
    select { background: #12121c; border: 1px solid #1e1e2e; color: #94a3b8; border-radius: 8px; padding: 7px 10px; font-size: 12px; font-family: 'JetBrains Mono', monospace; outline: none; cursor: pointer; appearance: none; }
    select:focus { border-color: #334155; color: #e2e8f0; }
    .reset-btn { background: none; border: 1px solid #1e1e2e; color: #64748b; border-radius: 8px; padding: 7px 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace; cursor: pointer; transition: all 0.15s; }
    .reset-btn:hover { border-color: #334155; color: #94a3b8; }
    .results-count { font-size: 11px; color: #475569; font-family: 'JetBrains Mono', monospace; margin: 12px 0 0; }
    .content { margin-top: 16px; }
    .section-block { margin-bottom: 24px; }
    .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #475569; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
    .section-count { font-size: 10px; color: #334155; font-family: 'JetBrains Mono', monospace; background: #12121c; border: 1px solid #1e1e2e; border-radius: 4px; padding: 1px 6px; }
    .item { background: #0e0e1a; border: 1px solid #1a1a2e; border-radius: 10px; margin-bottom: 6px; overflow: hidden; transition: border-color 0.2s; }
    .item:hover { border-color: #252540; }
    .item.done { opacity: 0.45; }
    .item-main { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; cursor: pointer; }
    .checkbox { width: 18px; height: 18px; min-width: 18px; border-radius: 5px; border: 2px solid #2d2d45; background: transparent; display: flex; align-items: center; justify-content: center; transition: all 0.15s; cursor: pointer; margin-top: 1px; }
    .checkbox.checked { border-color: #34d399; background: #34d399; }
    .check-svg { width: 10px; height: 10px; stroke: #0a0a0f; stroke-width: 2.5; fill: none; }
    .item-body { flex: 1; min-width: 0; }
    .item-text { font-size: 14px; color: #cbd5e1; line-height: 1.4; }
    .item-text.done { text-decoration: line-through; color: #475569; }
    .item-meta { display: flex; align-items: center; gap: 6px; margin-top: 5px; flex-wrap: wrap; }
    .priority-badge { font-size: 10px; font-family: 'JetBrains Mono', monospace; padding: 2px 7px; border-radius: 4px; font-weight: 600; }
    .sem-badge { font-size: 10px; font-family: 'JetBrains Mono', monospace; padding: 2px 7px; border-radius: 4px; background: #12121c; border: 1px solid #1e1e2e; }
    .expand-btn { background: none; border: none; cursor: pointer; color: #334155; font-size: 16px; padding: 0 4px; transition: color 0.15s; margin-left: auto; align-self: center; }
    .expand-btn:hover { color: #64748b; }
    .item-detail { padding: 0 14px 12px 44px; display: flex; flex-direction: column; gap: 6px; }
    .detail-row { display: flex; align-items: flex-start; gap: 8px; }
    .detail-icon { font-size: 12px; margin-top: 1px; min-width: 16px; }
    .detail-text { font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #64748b; line-height: 1.5; }
    .detail-text.hook { color: #7dd3fc; }
    .detail-text.pitfall { color: #fca5a5; }
    .empty { text-align: center; padding: 60px 20px; color: #334155; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .divider { height: 1px; background: #1a1a2e; }

    /* ── Resources page ── */
    .res-layout { display: flex; gap: 28px; align-items: flex-start; }
    .res-nav { width: 160px; min-width: 160px; position: sticky; top: 32px; display: flex; flex-direction: column; gap: 4px; }
    .res-nav-label { font-size: 10px; color: #475569; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.1em; margin-bottom: 8px; }
    .res-nav-btn { display: flex; align-items: center; gap: 8px; background: none; border: 1px solid #1a1a2e; border-radius: 8px; padding: 8px 10px; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 600; color: #64748b; cursor: pointer; text-align: left; transition: all 0.15s; }
    .res-nav-btn:hover { background: #12121c; color: #94a3b8; }
    .res-nav-btn--active { background: #12121c; }
    .res-nav-dot { width: 7px; height: 7px; border-radius: 50%; min-width: 7px; transition: background 0.2s; }
    .res-cards { flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .res-cards-header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
    .res-sem-pill { font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: 1px solid; }
    .res-cards-count { font-size: 11px; color: #475569; font-family: 'JetBrains Mono', monospace; }
    .res-card { background: #0e0e1a; border: 1px solid #1a1a2e; border-radius: 12px; padding: 18px 20px; transition: border-color 0.2s; }
    .res-card:hover { border-color: #252540; }
    .res-card-title { font-size: 15px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
    .res-card-notes { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 14px; }
    .res-card-links { display: flex; gap: 10px; flex-wrap: wrap; }
    .res-link { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 7px; font-size: 12px; font-family: 'JetBrains Mono', monospace; text-decoration: none; border: 1px solid; transition: all 0.15s; }
    .res-link--pdf { color: #7dd3fc; border-color: rgba(125,211,252,0.2); background: rgba(125,211,252,0.06); }
    .res-link--pdf:hover { background: rgba(125,211,252,0.12); border-color: rgba(125,211,252,0.4); }
    .res-link--video { color: #f472b6; border-color: rgba(244,114,182,0.2); background: rgba(244,114,182,0.06); }
    .res-link--video:hover { background: rgba(244,114,182,0.12); border-color: rgba(244,114,182,0.4); }
    .res-link-icon { font-size: 13px; }

    /* ── Page title ── */
    .page-title { font-size: 22px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.3px; margin-bottom: 24px; }
  `;

  const NAV_ITEMS = [
    { id: "todo", label: "Checklist", icon: "✓" },
    { id: "resources", label: "Ressources", icon: "📚" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="shell">
        {/* ── Sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-title">CPGE Info</div>
            <div className="sidebar-logo-sub">MP · PC · PSI · PT</div>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`nav-btn ${page === n.id ? "nav-btn--active" : ""}`}
                onClick={() => setPage(n.id)}
              >
                <span className="nav-btn-icon">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-progress">
            <div className="sidebar-progress-label">
              <span>PROGRESSION</span>
              <span>{donePct}%</span>
            </div>
            <div className="sidebar-bar">
              <div className="sidebar-bar-fill" style={{ width: `${donePct}%` }} />
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="main">
          <div className="page-inner">
            {page === "todo" && <TodoPage checked={checked} toggle={toggle} />}
            {page === "resources" && (
              <>
                <div className="page-title">Ressources de cours</div>
                <ResourcesPage />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}