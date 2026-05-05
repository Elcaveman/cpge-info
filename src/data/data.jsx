// ─── COURSE DOCUMENTS DATA ───────────────────────────────────────────────────
export const COURSES = [
  {
    sem: 1, label: "Semestre 1", color: "#34d399",
    topics: [
      {
        title: "Recherche & Tableaux",
        notes: "Recherche séquentielle dans un tableau 1D : parcourir jusqu'à trouver ou épuiser, O(n) pire cas, O(1) meilleur cas. Recherche du maximum : initialiser à tab[0] (jamais à 0 !), comparer tous les éléments. Second maximum : deux passes ou une seule avec deux variables. Comptage par dictionnaire : d[x] = d.get(x, 0) + 1. Notions fondamentales de coût : O(1) constant, O(n) linéaire, O(n²) quadratique.",
        pdf: { label: "Cours — Tableaux.pdf", url: "#" },
        slides: { label: "Saison 1 — Les Bases (E9)", url: "/saison1_les_bases.odp" },
        video: { label: "Recherche séquentielle vs dichotomique", url: "#" },
      },
      {
        title: "Boucles Imbriquées",
        notes: "Tri à bulles : deux boucles imbriquées, O(n²) pire cas, O(n) meilleur cas (tableau trié + flag), stable, en place. Recherche des deux valeurs les plus proches : O(n²) naïf — comparer toutes les paires. Recherche d'un facteur dans un texte : O(n·m) naïf. Règle pratique : k boucles imbriquées sur n éléments → O(n^k). Validation par invariant dès le S1 (formalisation au S2).",
        pdf: { label: "Cours — Boucles imbriquées.pdf", url: "#" },
        slides: { label: "Saison 1 — Les Bases (E10 Bulles)", url: "/saison1_les_bases.odp" },
        video: null,
      },
      {
        title: "Récursion & Dichotomie",
        notes: "Toute fonction récursive exige : (1) un ou plusieurs cas de base, (2) un cas récursif qui se rapproche du cas de base. Pile d'appels : chaque appel empile un frame — RecursionError si trop profond ou pas de cas de base. Recherche dichotomique : O(log n), nécessite tableau trié, réduire l'intervalle [g, d] à chaque étape. Exponentiation rapide : n pair → (a²)^(n/2), n impair → a × a^(n-1), O(log n). Preuve de terminaison par variant (entier qui décroît strictement).",
        pdf: { label: "Cours — Récursion.pdf", url: "#" },
        slides: { label: "Saison 1 — Les Bases (E6)", url: "/saison1_les_bases.odp" },
        video: { label: "Dichotomie — visualisation", url: "#" },
      },
      {
        title: "Algorithmes gloutons",
        notes: "Principe : choisir le meilleur choix local à chaque étape sans revenir en arrière. Rendu de monnaie : choisir la plus grande pièce ≤ somme restante — optimal si système canonique (euros), non optimal en général. Sélection d'activités : trier par date de fin, prendre l'activité compatible la plus tôt terminée. Allocation de salles : trier par heure de début. Preuve d'optimalité par exchange argument : montrer qu'on peut toujours remplacer une solution quelconque par la solution gloutonne sans perdre. Limite fondamentale : choix local ≠ optimum global — toujours savoir proposer un contre-exemple.",
        pdf: { label: "TD — Gloutons.pdf", url: "#" },
        slides: { label: "Saison 3 — Algorithmique Avancée (E1)", url: "/saison3_algorithmique_avancee.odp" },
        video: null,
      },
      {
        title: "Tableaux 2D & Images",
        notes: "Tableau 2D : img[i][j] où i = ligne, j = colonne. Rotation 90° horaire : img_rot[j][n-1-i] = img[i][j] — nécessite un nouveau tableau. Rotation 180° : img_rot[n-1-i][m-1-j] = img[i][j]. Réduction : sous-échantillonnage (garder 1 pixel sur k). Agrandissement : duplication ou interpolation. Convolution : pour chaque pixel, calculer la somme pondérée du voisinage avec un noyau. Noyau flou : tous les coefficients égaux (moyenne). Noyau détection de contour (Laplacien) : coefficients négatifs autour d'un centre positif. Gestion des bords : ignorer ou zéro-padding.",
        pdf: { label: "Cours — Images & Tableaux 2D.pdf", url: "#" },
        slides: null,
        video: null,
      },
      {
        title: "Algorithmes de tri",
        notes: "Insertion : O(n²) pire cas, O(n) meilleur cas (tableau trié), stable, en place — insérer chaque élément à sa place dans la partie gauche déjà triée. Sélection : O(n²) toujours, non stable (échange), en place — trouver le min du reste et l'échanger. Bulles : O(n²) pire, O(n) meilleur avec flag, stable, en place. Fusion : O(n log n) toujours, stable, non en place (O(n) mémoire) — diviser/récursion/fusionner deux listes triées. Rapide : O(n log n) moyen, O(n²) pire cas (tableau trié + pivot = premier/dernier), non stable, en place — partition autour du pivot. Comptage : O(n+k), non comparatif, stable, seulement pour entiers dans [0, k]. Savoir reconnaître : stable (préserve l'ordre relatif des éléments égaux), en place (O(1) mémoire supplémentaire), comparatif (utilise des comparaisons).",
        pdf: { label: "Cours — Tris.pdf", url: "#" },
        slides: { label: "Saison 1 — Les Bases (E10)", url: "/saison1_les_bases.odp" },
        video: { label: "Tri fusion expliqué", url: "https://algomaster.io/animations/dsa" },
      },
    ],
  },
  {
    sem: 2, label: "Semestre 2", color: "#60a5fa",
    topics: [
      {
        title: "Méthodes de Programmation",
        notes: "Spécification complète = signature + précondition (hypothèses sur l'entrée) + postcondition (garantie sur la sortie). Toujours écrire la spécification avant le code. Invariant de boucle : propriété vraie avant la première itération ET conservée après chaque itération → établit la correction partielle. Variant de boucle : expression entière ≥ 0 qui décroît strictement à chaque itération → établit la terminaison. Correction totale = correction partielle + terminaison. Assertion : assert cond — arrêt immédiat si faux, pas d'exception à rattraper, pas au programme. Jeu de tests : cas typiques + cas limites (tableau vide, un élément) + cas extrêmes (trié, trié à l'envers). Effet de bord : une instruction modifie l'état du programme ; une expression produit une valeur. Complexité temporelle dans le pire cas en ordre de grandeur (O(·)). Complexité en espace mentionnée sur des exemples seulement.",
        pdf: { label: "Cours — Méthodes.pdf", url: "#" },
        slides: { label: "Saison 3 — Algorithmique Avancée (E4)", url: "/saison3_algorithmique_avancee.odp" },
        video: { label: "Invariants de boucle", url: "#" },
      },
      {
        title: "Représentation des Nombres",
        notes: "Entiers positifs en binaire sur mots de taille fixe (8, 16, 32, 64 bits) — dépassement de capacité possible. Conversion base 10 → base 2 : divisions successives par 2. Entiers signés : complément à deux — inverser tous les bits puis +1, donne la représentation de -n. Avantage : addition/soustraction identiques pour signés et non signés. Entiers multi-précision Python (type int) : pas de dépassement, mais coût arithmétique croissant avec la taille. Distinction réels / décimaux / flottants : flottant = mantisse × 2^exposant, précision finie. Pas d'obligation de connaître IEEE-754 en détail. Précision : 0.1 + 0.2 ≠ 0.3 en Python — ne jamais comparer deux flottants avec ==, utiliser abs(a-b) < epsilon. Pas de nombres dénormalisés, NaN, infinis au programme.",
        pdf: { label: "Cours — Nombres.pdf", url: "#" },
        slides: null,
        video: null,
      },
      {
        title: "Graphes — Bases & Parcours",
        notes: "Vocabulaire obligatoire : graphe orienté (arcs) / non orienté (arêtes), sommet/nœud, degré sortant d⁺(s) / entrant d⁻(s) / total d(s), boucle, chemin, cycle, connexité (non orienté), composante connexe. Notation G = (S, A). Implémentations : matrice d'adjacence M[i][j] = 1 si arc i→j, O(n²) espace, O(1) test d'arête, O(n) voisins ; liste d'adjacence adj[s] = liste des voisins, O(n+m) espace, O(d(s)) voisins. Choisir selon densité du graphe. BFS (largeur) : file deque, niveau par niveau, trouve le plus court chemin en nombre d'arêtes, O(n+m). DFS (profondeur) : pile ou récursion, O(n+m). Détection de cycle non orienté : DFS + mémoriser le parent. Connexité : DFS/BFS depuis chaque sommet non visité. Ne jamais utiliser list.pop(0) en Python — O(n), utiliser deque.popleft() — O(1).",
        pdf: { label: "Cours — Graphes.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E6, E7, E8)", url: "/saison2_structures_de_donnees.odp" },
        video: { label: "BFS vs DFS — animé", url: "https://algomaster.io/animations/dsa" },
      },
      {
        title: "Dijkstra & Plus Courts Chemins",
        notes: "Dijkstra : file de priorité (heapq en Python), extraire le sommet de distance minimale, relâcher ses voisins. Invariant : quand un sommet est extrait, sa distance est définitivement optimale. Complexité O((n+m) log n) avec tas binaire. Condition absolue : poids positifs uniquement — Dijkstra échoue avec poids négatifs. Reconstruction du chemin : tableau predecesseur[], remonter de la cible vers la source. A* = Dijkstra + heuristique h(s) ≥ 0 admissible (ne surestime jamais le coût réel) — explore en priorité les sommets prometteurs. Exemples d'heuristiques : distance euclidienne, distance de Manhattan. Élagage alpha-bêta hors programme mais A* est attendu comme variante de Dijkstra.",
        pdf: { label: "Cours — Dijkstra.pdf", url: "#" },
        slides: { label: "Saison 3 — Algorithmique Avancée (E3)", url: "/saison3_algorithmique_avancee.odp" },
        video: { label: "Dijkstra pas-à-pas", url: "#" },
      },
    ],
  },
  {
    sem: 3, label: "Semestre 3", color: "#f472b6",
    topics: [
      {
        title: "SQL — Bases de Données",
        notes: "Vocabulaire : table/relation, attribut/colonne, enregistrement/ligne, domaine (int/float/str), schéma. Clé primaire (peut être composite) — unicité + non-nullité. Clé étrangère — référence à la clé primaire d'une autre table, assure l'intégrité référentielle. Associations 1-1, 1-n, n-n (décomposer n-n en deux 1-n avec table intermédiaire). SELECT cols FROM tables WHERE cond — opérateurs : +,-,*,/, =, <>, <, <=, >, >=, AND, OR, NOT. Mots-clés : DISTINCT, ORDER BY, LIMIT, OFFSET, AS (renommage). Jointures internes : T1 JOIN T2 ON phi (équi-jointures uniquement). Autojointure : même table deux fois, aliasée. Opérateurs ensemblistes : UNION, INTERSECT, EXCEPT. Agrégats : MIN, MAX, SUM, AVG, COUNT + GROUP BY. HAVING filtre après agrégation (≠ WHERE qui filtre avant). Ordre d'exécution SQL : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Requêtes imbriquées dans WHERE. NULL hors programme. DDL/TCL/ACL hors programme.",
        pdf: { label: "Cours — SQL.pdf", url: "#" },
        slides: { label: "Saison 3 — Algorithmique Avancée (E5)", url: "/saison3_algorithmique_avancee.odp" },
        video: { label: "SQL en 30 min", url: "#" },
      },
      {
        title: "Dictionnaires & Hachage",
        notes: "Fonction de hachage : transforme une clé en indice de tableau — O(1) moyen pour accès, insertion, suppression, recherche. Pire cas O(n) en cas de collisions massives (rare, géré par Python). Clés hashables : int, str, tuple (immuables) — PAS list ni dict (mutables). Syntaxe Python : d = {c1: v1, ...}, accès d[k], insertion d[k]=v, test k in d, len(d), d.copy(). Parcours : for k in d (clés), for k,v in d.items() (paires). Avantage vs liste : O(1) moyen au lieu de O(n) pour la recherche. Utilisation en prog. dynamique : table de mémoïsation cache = {}.",
        pdf: { label: "Cours — Dictionnaires.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E2)", url: "/saison2_structures_de_donnees.odp" },
        video: null,
      },
      {
        title: "Programmation Dynamique",
        notes: "Deux conditions nécessaires : sous-structure optimale (la solution optimale contient des solutions optimales des sous-problèmes) + chevauchement des sous-problèmes (les mêmes sous-problèmes réapparaissent). Mémoïsation top-down : récursion + dictionnaire cache — écrire la récursion naïve puis ajouter le cache. Bottom-up : remplir un tableau dp[] dans l'ordre croissant des sous-problèmes — plus efficace en pratique. Fibonacci mémoïsé : O(n) au lieu de O(2^n). Distance de Levenshtein : dp[i][j] = coût d'alignement de s1[:i] et s2[:j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(0 si s1[i]==s2[j] sinon 1)). LCS : dp[i][j] = longueur de la plus longue sous-suite commune de s1[:i] et s2[:j]. Floyd-Warshall : distances toutes paires, O(n³), dp[k][i][j] = min(dp[k-1][i][j], dp[k-1][i][k]+dp[k-1][k][j]). Reconstruction : backtracking sur la table dp pour retrouver le chemin, pas juste la valeur.",
        pdf: { label: "Cours — Prog. Dyn.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E9)", url: "/saison2_structures_de_donnees.odp" },
        video: { label: "Levenshtein visualisé", url: "#" },
      },
      {
        title: "IA & Théorie des Jeux",
        notes: "k-NN (k plus proches voisins) : calculer la distance euclidienne à tous les points d'entraînement, trier, prendre les k plus proches, vote majoritaire pour la classe. Matrice de confusion : lignes = classes réelles, colonnes = classes prédites — VP, FP, VN, FN. k-moyennes : choisir k centroïdes, assigner chaque point au centroïde le plus proche, recalculer les centroïdes, répéter jusqu'à convergence — minimum local possible, pas global. Jeux à 2 joueurs sur graphe biparti : états J1 et états J2, 3 types de terminaisons (victoire J1, victoire J2, nul). Stratégie sans mémoire uniquement. Positions gagnantes par calcul des attracteurs : propagation arrière depuis les états terminaux. Minimax : MAX maximise son score, MIN minimise le score de MAX — avec heuristique quand l'arbre est trop profond. Élagage alpha-bêta : hors programme mais concept à connaître.",
        pdf: { label: "Cours — IA & Jeux.pdf", url: "#" },
        slides: null,
        video: { label: "Minimax expliqué", url: "#" },
      },
    ],
  },
  {
    sem: 4, label: "Semestre 4", color: "#fb923c",
    topics: [
      {
        title: "Piles & Files",
        notes: "Pile LIFO (Last In First Out) : opérations empiler/dépiler/sommet/est_vide. Implémentation Python : list avec append() et pop() — O(1) amorti. Applications : undo/redo, évaluation d'expressions, vérification de parenthésage (empiler '(', dépiler sur ')'), DFS itératif, pile d'appels récursifs. File FIFO (First In First Out) : opérations enfiler/défiler/tête/est_vide. Implémentation Python : collections.deque avec append() et popleft() — O(1) garanti. list.pop(0) est O(n) — à bannir absolument. Applications : BFS, files d'attente, ordonnancement.",
        pdf: { label: "Cours — Piles & Files.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E1)", url: "/saison2_structures_de_donnees.odp" },
        video: { label: "Piles et files — animé", url: "https://algomaster.io/animations/dsa" },
      },
      {
        title: "Listes Chaînées",
        notes: "Structure : nœud = {val: x, suiv: pointeur_vers_nœud_suivant}. En Python : classe Noeud(val, suivant) ou dict. Opérations : insertion en tête O(1) — créer nœud, pointer vers ancienne tête, mettre à jour tête. Accès i-ème : O(n) — parcourir i fois. Suppression : O(n) pour trouver le prédécesseur, O(1) pour le retrait. Piège classique : toujours mettre à jour le pointeur AVANT de perdre la référence à l'ancien nœud suivant. Liste doublement chaînée : nœud = {val, prev, next} — insertion/suppression O(1) si on possède déjà le nœud.",
        pdf: { label: "Cours — Listes chaînées.pdf", url: "#" },
        slides: null,
        video: { label: "Listes chaînées visualisées", url: "#" },
      },
      {
        title: "Arbres Binaires",
        notes: "Vocabulaire : racine (nœud sans parent), feuille (nœud sans enfant), nœud interne, hauteur h (longueur du plus long chemin racine→feuille), taille n (nombre de nœuds), sous-arbre. Convention : hauteur arbre vide = -1 (à préciser dans la copie). Arbre parfait de hauteur h : 2^(h+1)-1 nœuds. Représentation Python : None = arbre vide, ou Noeud(val, gauche, droite). Parcours récursifs : préfixe NLR (racine, gauche, droite), infixe LNR (gauche, racine, droite → valeurs triées si ABR), postfixe LRN (gauche, droite, racine). BFS en largeur avec une file. Formules récursives : taille(None)=0, taille(n)=1+taille(n.g)+taille(n.d) ; hauteur(None)=-1, hauteur(n)=1+max(hauteur(n.g), hauteur(n.d)).",
        pdf: { label: "Cours — Arbres binaires.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E3, E5)", url: "/saison2_structures_de_donnees.odp" },
        video: { label: "Parcours d'arbres — animé", url: "https://algomaster.io/animations/dsa" },
      },
      {
        title: "Arbres Binaires de Recherche (ABR)",
        notes: "Propriété ABR : pour tout nœud n, tous les nœuds du sous-arbre gauche ont une valeur < n.val, tous ceux du sous-arbre droit ont une valeur ≥ n.val. La propriété doit tenir sur TOUT le sous-arbre, pas juste les fils directs. Recherche : O(h) — comparer avec la racine, aller à gauche ou droite. Insertion : même logique, insérer en feuille. Suppression avec deux fils : remplacer par le successeur infixe (minimum du sous-arbre droit) ou le prédécesseur infixe. Arbre équilibré : h ≈ log₂(n), opérations O(log n). Arbre dégénéré (données triées en entrée) : h = n-1, opérations O(n) — ressemble à une liste chaînée.",
        pdf: { label: "Cours — ABR.pdf", url: "#" },
        slides: { label: "Saison 2 — Structures de Données (E4)", url: "/saison2_structures_de_donnees.odp" },
        video: { label: "ABR — insertion et recherche", url: "https://algomaster.io/animations/dsa" },
      },
    ],
  },
  {
    sem: 0, label: "Annexe Python", color: "#818cf8",
    topics: [
      {
        title: "Python — Référence exigible",
        notes: "Traits généraux : typage dynamique (type déterminé à l'exécution), indentation significative, portée lexicale (cherche variable localement puis globalement), appel par valeur (évalue l'argument avant d'appeler). Types de base : int (+,-,*,//,**,% opérandes positifs), float (+,-,*,/,**), bool (not/or/and paresseux : or s'arrête au premier True, and au premier False), comparaisons ==,!=,<,>,<=,>=. Types structurés : str et tuple immuables (len, indice, +, *, tranche [a:b:p]). list : compréhension [e for x in s if cond], [e]*n, append, pop (en dernière position seulement !), len, tranche, copie superficielle a[:] — objets imbriqués partagés ! dict : {c1:v1,...}, d[k], d[k]=v, k in d, len, d.copy(), d.keys(), d.items(). Contrôle : if/elif/else, while (sans else), break, return, for (sans else) sur range(a,b)/str/tuple/list/dict.keys()/dict.items(). def f(p1,...,pn): return. Divers : #commentaire, print, import/as/from, open/read/readline/readlines/split/write/close, assert. Toute fonction de module non listée ici DOIT être documentée dans la copie d'examen.",
        pdf: { label: "Annexe Python officielle.pdf", url: "#" },
        slides: { label: "Saison 1 — Les Bases (E1–E8)", url: "/saison1_les_bases.odp" },
        video: { label: "Python CPGE — tour rapide", url: "#" },
      },
    ],
  },
];

// ─── TODO DATA ───────────────────────────────────────────────────────────────
export const ALL_ITEMS = [
  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Recherche & Tableaux
  // ══════════════════════════════════════════════════════════════════
  { id: 1, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Recherche séquentielle dans un tableau 1D", hook: "Parcourir jusqu'à trouver, O(n) pire cas, O(1) meilleur cas", pitfall: null },
  { id: 2, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Recherche du maximum / second maximum", hook: "max_val = tab[0], puis comparer chaque élément", pitfall: "Initialiser max_val = 0 est faux si tous les éléments sont négatifs !" },
  { id: 3, sem: 1, section: "Recherche & Tableaux", priority: "P1", text: "Comptage par dictionnaire", hook: "d[x] = d.get(x, 0) + 1", pitfall: null },
  { id: 4, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Notions de coût : O(1), O(n), O(n²)", hook: "O(1) = constant, O(n) = linéaire, O(n²) = quadratique", pitfall: null },
  { id: 5, sem: 1, section: "Recherche & Tableaux", priority: "P0", text: "Utilisation de modules/bibliothèques (lecture fichier, stats, graphiques)", hook: "Aucune connaissance de module n'est exigible — documenter dans la copie", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Boucles Imbriquées
  // ══════════════════════════════════════════════════════════════════
  { id: 6, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Tri à bulles", hook: "O(n²) pire cas, O(n) meilleur cas avec flag, stable, en place", pitfall: null },
  { id: 7, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Recherche des deux valeurs les plus proches dans un tableau", hook: "O(n²) naïf — comparer toutes les paires", pitfall: null },
  { id: 8, sem: 1, section: "Boucles Imbriquées", priority: "P1", text: "Recherche d'un facteur dans un texte (naïve)", hook: "O(n·m) — boucles imbriquées sur texte et motif", pitfall: null },
  { id: 9, sem: 1, section: "Boucles Imbriquées", priority: "P0", text: "Reconnaître ET prouver la complexité quadratique", hook: "k boucles imbriquées sur n éléments → O(n^k)", pitfall: null },
  { id: 10, sem: 1, section: "Boucles Imbriquées", priority: "P2", text: "Validation de la correction par invariant dès le S1", hook: "Introduit avant la formalisation du S2 — toujours proposer un invariant", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Dichotomie & Récursion
  // ══════════════════════════════════════════════════════════════════
  { id: 11, sem: 1, section: "Dichotomie", priority: "P0", text: "Recherche dichotomique dans un tableau trié", hook: "O(log n) — couper en 2 à chaque étape, nécessite tableau trié", pitfall: "Oublier que le tableau doit être trié !" },
  { id: 12, sem: 1, section: "Dichotomie", priority: "P0", text: "Exponentiation rapide", hook: "n pair → (a²)^(n/2), n impair → a × a^(n-1), O(log n)", pitfall: "Oublier le cas n = 0 (résultat = 1) ou n = 1 !" },
  { id: 13, sem: 1, section: "Dichotomie", priority: "P0", text: "Savoir que log₂(10⁹) ≈ 30 — accélération linéaire → logarithmique", hook: "Un milliard d'éléments → 30 étapes seulement", pitfall: null },
  { id: 14, sem: 1, section: "Récursion", priority: "P0", text: "Structure obligatoire : cas de base + cas récursif qui converge", hook: "Sans cas de base → RecursionError (dépassement de pile)", pitfall: "Oublier le cas de base ou écrire un cas récursif qui ne converge pas" },
  { id: 15, sem: 1, section: "Récursion", priority: "P0", text: "Version récursive d'algorithmes dichotomiques", hook: "Passer (tab, g, d) — variant : d - g", pitfall: null },
  { id: 16, sem: 1, section: "Récursion", priority: "P0", text: "Énumération (sous-listes, permutations d'une liste)", hook: "Récursion sur la taille de la liste : inclure/exclure le premier élément", pitfall: null },
  { id: 17, sem: 1, section: "Récursion", priority: "P1", text: "Dessins de fractales (turtle)", hook: "Récursion sur la profondeur — cas de base = profondeur 0", pitfall: null },
  { id: 18, sem: 1, section: "Récursion", priority: "P1", text: "Dépassement de pile — expliquer et éviter", hook: "Python : limite par défaut ~1000 niveaux", pitfall: "Pas de cas de base → RecursionError" },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Algorithmes Gloutons
  // ══════════════════════════════════════════════════════════════════
  { id: 19, sem: 1, section: "Algorithmes Gloutons", priority: "P0", text: "Rendu de monnaie", hook: "Choisir la plus grande pièce ≤ somme restante", pitfall: "Pièces {1,3,4}, rendre 6 → glouton: {4,1,1} (3 pièces), optimal: {3,3} (2 pièces)" },
  { id: 20, sem: 1, section: "Algorithmes Gloutons", priority: "P0", text: "Sélection d'activités (intervalles compatibles)", hook: "Trier par date de fin croissante, prendre si compatible", pitfall: null },
  { id: 21, sem: 1, section: "Algorithmes Gloutons", priority: "P1", text: "Allocation de salles pour des cours", hook: "Trier par heure de début, affecter à la salle la plus tôt disponible", pitfall: null },
  { id: 22, sem: 1, section: "Algorithmes Gloutons", priority: "P0", text: "Glouton ≠ Optimal en général — toujours savoir contre-exemplariser", hook: "Exchange argument pour les preuves d'optimalité", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Tableaux 2D & Images
  // ══════════════════════════════════════════════════════════════════
  { id: 23, sem: 1, section: "Tableaux 2D & Images", priority: "P0", text: "Accès à img[i][j] : i = ligne, j = colonne", hook: "Parcours : for i in range(n): for j in range(m):", pitfall: "Confondre lignes et colonnes dans les indices" },
  { id: 24, sem: 1, section: "Tableaux 2D & Images", priority: "P1", text: "Rotation d'image 90° et 180°", hook: "90° horaire : img_rot[j][n-1-i] = img[i][j] — nécessite nouveau tableau", pitfall: null },
  { id: 25, sem: 1, section: "Tableaux 2D & Images", priority: "P1", text: "Convolution : flou et détection de contour", hook: "Somme pondérée du voisinage avec un noyau (kernel)", pitfall: "Gérer les bords (ignorer ou zéro-padding)" },
  { id: 26, sem: 1, section: "Tableaux 2D & Images", priority: "P2", text: "Réduction / agrandissement d'image", hook: "Réduction : sous-échantillonnage (1 pixel sur k). Agrandissement : duplication", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 1 — Tris
  // ══════════════════════════════════════════════════════════════════
  { id: 27, sem: 1, section: "Tris", priority: "P0", text: "Tri par insertion — O(n²) pire, O(n) meilleur, stable, en place", hook: "Insérer chaque élément à sa place dans la partie gauche déjà triée", pitfall: null },
  { id: 28, sem: 1, section: "Tris", priority: "P0", text: "Tri par sélection — O(n²) toujours, non stable, en place", hook: "Trouver le min du reste, l'échanger avec la position courante", pitfall: "Non stable : l'échange peut casser l'ordre relatif des éléments égaux" },
  { id: 29, sem: 1, section: "Tris", priority: "P0", text: "Tri à bulles — O(n²) pire, O(n) meilleur avec flag, stable, en place", hook: "Faire remonter le maximum à chaque passe", pitfall: null },
  { id: 30, sem: 1, section: "Tris", priority: "P0", text: "Tri fusion — O(n log n) toujours, stable, non en place O(n)", hook: "Diviser → récursion sur chaque moitié → fusionner deux listes triées", pitfall: null },
  { id: 31, sem: 1, section: "Tris", priority: "P0", text: "Tri rapide — O(n log n) moyen, O(n²) pire cas, non stable, en place", hook: "Partition autour d'un pivot : éléments < pivot | pivot | éléments ≥ pivot", pitfall: "Pire cas : tableau trié + pivot = premier ou dernier élément" },
  { id: 32, sem: 1, section: "Tris", priority: "P1", text: "Tri par comptage — O(n+k), non comparatif, stable", hook: "Compter les occurrences de chaque valeur dans [0,k], reconstruire le tableau", pitfall: "Seulement pour clés entières bornées dans [0,k]" },
  { id: 33, sem: 1, section: "Tris", priority: "P0", text: "Savoir caractériser un tri : stable / en place / comparatif", hook: "Stable = préserve l'ordre relatif des éléments égaux. En place = O(1) mémoire", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 2 — Méthodes de Programmation
  // ══════════════════════════════════════════════════════════════════
  { id: 34, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Spécification : signature + précondition + postcondition (avant le code)", hook: "Précondition = hypothèses sur l'entrée. Postcondition = garantie sur la sortie", pitfall: null },
  { id: 35, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Précondition / Postcondition / Invariant (en commentaires Python)", hook: "# Précondition : tab est trié. # Postcondition : retourne l'indice ou -1", pitfall: null },
  { id: 36, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Assertion : assert condition", hook: "Arrêt immédiat si faux — ni définition ni rattrapage d'exceptions au programme", pitfall: null },
  { id: 37, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Variant de boucle → preuve de terminaison", hook: "Expression entière ≥ 0 qui décroît strictement à chaque itération", pitfall: "Oublier de montrer que le variant est bien un entier positif" },
  { id: 38, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Invariant de boucle → preuve de correction partielle", hook: "Vrai AVANT la boucle, conservé par chaque itération, utile après la boucle", pitfall: "L'invariant doit être assez fort pour conclure sur la postcondition" },
  { id: 39, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Correction partielle vs correction totale", hook: "Totale = partielle (résultat correct si terminaison) + terminaison garantie", pitfall: null },
  { id: 40, sem: 2, section: "Méthodes de Programmation", priority: "P0", text: "Jeu de tests : cas typiques + limites + extrêmes", hook: "Toujours tester : tableau vide, un élément, déjà trié, trié à l'envers, doublons", pitfall: null },
  { id: 41, sem: 2, section: "Méthodes de Programmation", priority: "P2", text: "Effet de bord d'une instruction vs expression", hook: "Affectation = instruction en Python (pas une expression contrairement à C)", pitfall: null },
  { id: 42, sem: 2, section: "Méthodes de Programmation", priority: "P2", text: "Complexité en espace (en plus de la complexité temporelle)", hook: "Mentionnée 'sur des exemples' seulement — tri fusion : O(n), tri rapide : O(log n)", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 2 — Représentation des Nombres
  // ══════════════════════════════════════════════════════════════════
  { id: 43, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Entiers positifs sur mots de taille fixe (binaire)", hook: "8 bits → [0, 255], 16 bits → [0, 65535], dépassement de capacité possible", pitfall: null },
  { id: 44, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Complément à deux pour entiers signés", hook: "Inverser tous les bits de n, puis +1 → représentation de -n en binaire", pitfall: "Le bit de poids fort indique le signe (1 = négatif)" },
  { id: 45, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Distinction réels / décimaux / flottants", hook: "Tous les réels ne sont pas représentables en machine (ex : 1/3, √2)", pitfall: null },
  { id: 46, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Flottants : mantisse × 2^exposant — pas d'obligation IEEE-754 en détail", hook: "Représentation de 0 à connaître. NaN, infinis, dénormalisés hors programme", pitfall: null },
  { id: 47, sem: 2, section: "Représentation des Nombres", priority: "P0", text: "Précision flottante — ne jamais tester l'égalité directe", hook: "abs(a - b) < 1e-9 au lieu de a == b", pitfall: "0.1 + 0.2 ≠ 0.3 en Python (0.30000000000000004)" },
  { id: 48, sem: 2, section: "Représentation des Nombres", priority: "P1", text: "Entiers multi-précision Python — coût arithmétique croissant avec la taille", hook: "int Python n'a pas de dépassement mais 2^(10^6) est très lent à calculer", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 2 — Graphes
  // ══════════════════════════════════════════════════════════════════
  { id: 49, sem: 2, section: "Graphes", priority: "P0", text: "Vocabulaire : orienté/non orienté, arc/arête, degré entrant d⁻/sortant d⁺, cycle, connexité", hook: "G = (S, A) — S sommets, A arcs/arêtes", pitfall: null },
  { id: 50, sem: 2, section: "Graphes", priority: "P0", text: "Matrice d'adjacence vs liste d'adjacence — choisir selon densité", hook: "Matrice : O(n²) espace, O(1) test arête. Liste : O(n+m) espace, O(d(s)) voisins", pitfall: null },
  { id: 51, sem: 2, section: "Graphes", priority: "P0", text: "BFS (largeur) avec collections.deque + popleft()", hook: "Niveau par niveau — trouve le plus court chemin en nombre d'arêtes", pitfall: "list.pop(0) est O(n) — TOUJOURS utiliser deque.popleft() qui est O(1) !" },
  { id: 52, sem: 2, section: "Graphes", priority: "P0", text: "DFS (profondeur) — récursif ou itératif avec pile explicite", hook: "Détection de cycles, connexité, exploration exhaustive", pitfall: null },
  { id: 53, sem: 2, section: "Graphes", priority: "P0", text: "Tableau visités[] obligatoire pour éviter les boucles infinies", hook: "Marquer un sommet comme visité dès qu'on l'enfile/empile", pitfall: "Oublier visités[] → boucle infinie sur les cycles !" },
  { id: 54, sem: 2, section: "Graphes", priority: "P1", text: "Détection de cycle dans un graphe non orienté (DFS + parent)", hook: "Si on trouve un voisin déjà visité ≠ parent → cycle", pitfall: null },
  { id: 55, sem: 2, section: "Graphes", priority: "P1", text: "Test de connexité (BFS/DFS depuis chaque sommet non encore visité)", hook: "Autant d'appels que de composantes connexes", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 2 — Plus Courts Chemins
  // ══════════════════════════════════════════════════════════════════
  { id: 56, sem: 2, section: "Plus Courts Chemins", priority: "P0", text: "Algorithme de Dijkstra (poids positifs uniquement)", hook: "File de priorité heapq, invariant : distance extraite = optimale", pitfall: "Ne fonctionne PAS avec des poids négatifs !" },
  { id: 57, sem: 2, section: "Plus Courts Chemins", priority: "P0", text: "Reconstruction du chemin Dijkstra : tableau predecesseur[]", hook: "predecesseur[v] = u si on passe par u pour atteindre v optimalement", pitfall: null },
  { id: 58, sem: 2, section: "Plus Courts Chemins", priority: "P1", text: "Complexité de Dijkstra : O((n+m) log n) avec tas binaire", hook: "n extractions du minimum + m relaxations d'arêtes", pitfall: null },
  { id: 59, sem: 2, section: "Plus Courts Chemins", priority: "P1", text: "A* = Dijkstra + heuristique admissible h(s) ≥ 0", hook: "h(s) = distance estimée de s à la cible — ne doit jamais surestimer", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 3 — Bases de Données SQL
  // ══════════════════════════════════════════════════════════════════
  { id: 60, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Vocabulaire : table, attribut, enregistrement, domaine, schéma", hook: "Domaine = type de la colonne : int, float, str — pas de types SQL spécifiques", pitfall: null },
  { id: 61, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Clé primaire (peut être composite) — unicité et non-nullité", hook: "Table(#id, nom, age) — # indique la clé primaire", pitfall: null },
  { id: 62, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Clé étrangère — référence à la clé primaire d'une autre table", hook: "Table(id, #client_id→Client) — assure l'intégrité référentielle", pitfall: null },
  { id: 63, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Associations 1-1, 1-n, n-n (décomposer n-n en deux 1-n)", hook: "n-n : créer une table intermédiaire avec deux clés étrangères comme clé primaire", pitfall: null },
  { id: 64, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "SELECT cols FROM tables WHERE cond (filtrage, projection, AS)", hook: "Opérateurs : +,-,*,/, =, <>, <, <=, >, >=, AND, OR, NOT", pitfall: null },
  { id: 65, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "ORDER BY, DISTINCT, LIMIT, OFFSET", hook: "ORDER BY col ASC/DESC. OFFSET n saute les n premières lignes après tri", pitfall: null },
  { id: 66, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "JOIN T1 JOIN T2 ON phi (équi-jointures) + autojointure", hook: "phi est une conjonction d'égalités uniquement (équi-jointures)", pitfall: null },
  { id: 67, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "UNION, INTERSECT, EXCEPT", hook: "UNION : toutes les lignes des deux requêtes (sans doublons)", pitfall: "Les deux requêtes doivent avoir le même nombre et type de colonnes" },
  { id: 68, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Agrégats : MIN, MAX, SUM, AVG, COUNT + GROUP BY", hook: "Ordre d'exécution : FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT", pitfall: null },
  { id: 69, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "HAVING — filtrer après agrégation (≠ WHERE qui filtre avant)", hook: "WHERE filtre les lignes. HAVING filtre les groupes formés par GROUP BY", pitfall: "Écrire WHERE COUNT(*) > 2 au lieu de HAVING — erreur classique !" },
  { id: 70, sem: 3, section: "Bases de Données SQL", priority: "P1", text: "Requêtes imbriquées (sous-requêtes dans WHERE ou SELECT)", hook: "WHERE id IN (SELECT id FROM ... WHERE ...) — scalar ou ensemble", pitfall: null },
  { id: 71, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "INSERT INTO table (col1, col2) VALUES (v1, v2)", hook: "Colonnes optionnelles si toutes renseignées dans l'ordre de déclaration", pitfall: "Ordre des valeurs doit correspondre exactement à l'ordre des colonnes !" },
  { id: 72, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "UPDATE table SET col = val WHERE condition", hook: "Modifier des enregistrements existants ciblés", pitfall: "Oublier le WHERE met à jour TOUTE la table !" },
  { id: 73, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "DELETE FROM table WHERE condition", hook: "Supprimer des lignes ciblées", pitfall: "Oublier le WHERE supprime TOUS les enregistrements de la table !" },
  { id: 74, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Cardinalités (0,1) (1,1) (0,n) (1,n) dans un schéma entité-association", hook: "min,max : 0 = optionnel, 1 = obligatoire, n = plusieurs", pitfall: null },
  { id: 75, sem: 3, section: "Bases de Données SQL", priority: "P0", text: "Passage MCD → MLD : règles de traduction des associations", hook: "1-1 : FK d'un côté. 1-n : FK côté n. n-n : table intermédiaire clé composée", pitfall: null },
  { id: 76, sem: 3, section: "Bases de Données SQL", priority: "P1", text: "Lire et compléter un schéma MCD (entités, associations, cardinalités)", hook: "Souvent donné en contexte dans l'énoncé — savoir lire et compléter", pitfall: null },
  { id: 77, sem: 3, section: "Bases de Données SQL", priority: "P1", text: "Schéma relationnel MLD — notation : Table(#clé, attr1, #attr2→AutreTable)", hook: "Souligner clé primaire, flèche pour clé étrangère", pitfall: null },
  { id: 78, sem: 3, section: "Bases de Données SQL", priority: "P2", text: "NULL — concept exclu du programme officiel mais souvent rencontré", hook: "Hors programme mais à signaler si rencontré en pratique", pitfall: null },
  { id: 79, sem: 3, section: "Bases de Données SQL", priority: "P2", text: "INSERT avec SELECT — insérer le résultat d'une requête", hook: "INSERT INTO t1 SELECT ... FROM t2 WHERE ...", pitfall: null },
  { id: 80, sem: 3, section: "Bases de Données SQL", priority: "P2", text: "Contrainte d'intégrité référentielle — FK orpheline", hook: "Violation si la valeur FK n'existe pas dans la table référencée", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 3 — Dictionnaires & Programmation Dynamique
  // ══════════════════════════════════════════════════════════════════
  { id: 81, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Hachage : clé → fonction de hachage → indice → O(1) moyen", hook: "Toutes les opérations de base en O(1) moyen, O(n) pire cas", pitfall: null },
  { id: 82, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Clés hashables : int, str, tuple (PAS list ni dict)", hook: "Une clé hashable est nécessairement immuable", pitfall: "Utiliser une liste comme clé → TypeError: unhashable type: 'list'" },
  { id: 83, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Deux conditions prog. dynamique : sous-structure optimale + chevauchement", hook: "Si les deux sont vérifiées, mémoriser les sous-problèmes → gain exponentiel", pitfall: null },
  { id: 84, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Mémoïsation top-down : récursion + dictionnaire cache", hook: "cache = {} ; if args in cache: return cache[args] ; ... ; cache[args] = res", pitfall: null },
  { id: 85, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Bottom-up : remplir le tableau dp[] dans l'ordre croissant", hook: "Plus efficace en pratique : pas d'appels récursifs ni de overhead de hachage", pitfall: "S'assurer que dp[i] est calculé avant tout dp[j] qui en dépend" },
  { id: 86, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P0", text: "Distance de Levenshtein (édition)", hook: "dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(0 si égaux, 1 sinon))", pitfall: "Initialiser la première ligne et colonne : dp[i][0]=i et dp[0][j]=j" },
  { id: 87, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P1", text: "Plus longue sous-suite commune (LCS)", hook: "dp[i][j] = dp[i-1][j-1]+1 si s1[i]==s2[j], sinon max(dp[i-1][j], dp[i][j-1])", pitfall: null },
  { id: 88, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P1", text: "Floyd-Warshall — plus courts chemins toutes paires, O(n³)", hook: "dp[k][i][j] = min(dp[k-1][i][j], dp[k-1][i][k]+dp[k-1][k][j])", pitfall: null },
  { id: 89, sem: 3, section: "Dictionnaires & Prog. Dynamique", priority: "P2", text: "Reconstruction de la solution optimale (backtracking sur table dp)", hook: "Remonter la table dp depuis le coin bas-droit pour reconstruire le chemin", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 3 — IA & Jeux
  // ══════════════════════════════════════════════════════════════════
  { id: 90, sem: 3, section: "IA & Jeux", priority: "P1", text: "k plus proches voisins (k-NN) — classification supervisée", hook: "Calculer distances euclidiennes, trier, prendre k premiers, vote majoritaire", pitfall: "k pair → possible égalité à traiter. Choisir k impair si classes en nombre pair" },
  { id: 91, sem: 3, section: "IA & Jeux", priority: "P1", text: "Matrice de confusion — VP, FP, VN, FN", hook: "Lignes = classes réelles, colonnes = classes prédites. Précision = VP/(VP+FP)", pitfall: null },
  { id: 92, sem: 3, section: "IA & Jeux", priority: "P1", text: "k-moyennes — clustering non supervisé", hook: "Initialiser k centroïdes, assigner, recalculer, répéter jusqu'à convergence", pitfall: "Converge vers minimum local — résultat dépend de l'initialisation" },
  { id: 93, sem: 3, section: "IA & Jeux", priority: "P1", text: "Jeux à 2 joueurs sur graphe biparti — 3 types d'états finaux", hook: "États J1 ∪ États J2 (biparti). Terminaux : J1 gagne, J2 gagne, nul", pitfall: null },
  { id: 94, sem: 3, section: "IA & Jeux", priority: "P1", text: "Positions gagnantes par calcul des attracteurs (propagation arrière)", hook: "Partir des états terminaux gagnants, propager vers les états précédents", pitfall: null },
  { id: 95, sem: 3, section: "IA & Jeux", priority: "P0", text: "Algorithme minimax avec heuristique", hook: "MAX maximise son score, MIN minimise le score de MAX — récursion alternée", pitfall: "Élagage alpha-bêta : hors programme" },
  { id: 96, sem: 3, section: "IA & Jeux", priority: "P2", text: "Jeux à 3 états finaux : J1 gagne / J2 gagne / match nul", hook: "Stratégie sans mémoire uniquement au programme", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 4 — Structures de Données Linéaires
  // ══════════════════════════════════════════════════════════════════
  { id: 97, sem: 4, section: "Structures de Données Linéaires", priority: "P0", text: "Type abstrait Pile (LIFO) : empiler, dépiler, sommet, est_vide", hook: "Implémentation Python : list avec append() O(1) et pop() O(1)", pitfall: null },
  { id: 98, sem: 4, section: "Structures de Données Linéaires", priority: "P0", text: "Type abstrait File (FIFO) : enfiler, défiler, tête, est_vide", hook: "TOUJOURS implémenter avec collections.deque — popleft() en O(1)", pitfall: "list.pop(0) est O(n) — à bannir absolument !" },
  { id: 99, sem: 4, section: "Structures de Données Linéaires", priority: "P0", text: "Application pile : vérification de parenthésage équilibré", hook: "Empiler '(' sur '(', dépiler sur ')' — vide à la fin = équilibré", pitfall: null },
  { id: 100, sem: 4, section: "Structures de Données Linéaires", priority: "P0", text: "Listes chaînées : nœud = valeur + pointeur suivant", hook: "Représenté par classe Noeud(val, suivant) ou dict {'val': x, 'suiv': ...}", pitfall: null },
  { id: 101, sem: 4, section: "Structures de Données Linéaires", priority: "P0", text: "Insertion en tête O(1), accès i-ème O(n) dans une liste chaînée", hook: "Créer nœud → pointer vers ancienne tête → mettre à jour tête", pitfall: "Toujours mettre à jour le pointeur AVANT de perdre la référence au suivant !" },
  { id: 102, sem: 4, section: "Structures de Données Linéaires", priority: "P1", text: "Implémentation d'une pile / file par liste chaînée", hook: "Pile : insérer/supprimer en tête. File : insérer en queue, supprimer en tête", pitfall: null },
  { id: 103, sem: 4, section: "Structures de Données Linéaires", priority: "P1", text: "Listes doublement chaînées — pointeurs précédent et suivant", hook: "Insertion/suppression O(1) si on possède déjà le nœud", pitfall: null },
  { id: 104, sem: 4, section: "Structures de Données Linéaires", priority: "P2", text: "Complexité amortie — séquence de n opérations sur une pile", hook: "n push + 1 pop_all → O(n) total, O(1) amorti par opération", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 4 — Arbres Binaires
  // ══════════════════════════════════════════════════════════════════
  { id: 105, sem: 4, section: "Arbres Binaires", priority: "P0", text: "Vocabulaire : racine, feuille, nœud interne, hauteur, taille, sous-arbre", hook: "Hauteur = longueur du plus long chemin racine→feuille. Hauteur arbre vide = -1", pitfall: "Convention hauteur arbre vide = -1 ou 0 selon les sujets — toujours préciser !" },
  { id: 106, sem: 4, section: "Arbres Binaires", priority: "P0", text: "Représentation Python : None = arbre vide, Noeud(val, gauche, droite)", hook: "Arbre parfait de hauteur h contient 2^(h+1)-1 nœuds", pitfall: null },
  { id: 107, sem: 4, section: "Arbres Binaires", priority: "P0", text: "Parcours préfixe NLR, infixe LNR, postfixe LRN — récursion naturelle", hook: "Préfixe : racine→G→D. Infixe : G→racine→D (donne valeurs triées sur ABR). Postfixe : G→D→racine", pitfall: null },
  { id: 108, sem: 4, section: "Arbres Binaires", priority: "P0", text: "Calcul récursif : taille, hauteur, nombre de feuilles", hook: "taille(None)=0, taille(n)=1+taille(n.g)+taille(n.d)", pitfall: "hauteur(None)=-1, hauteur(n)=1+max(hauteur(n.g), hauteur(n.d))" },
  { id: 109, sem: 4, section: "Arbres Binaires", priority: "P0", text: "Parcours en largeur (BFS) avec une file", hook: "Même principe que BFS graphe — enfiler gauche puis droite à chaque étape", pitfall: null },
  { id: 110, sem: 4, section: "Arbres Binaires", priority: "P1", text: "Arbre binaire parfait / complet — relation hauteur et nombre de nœuds", hook: "Parfait de hauteur h : 2^(h+1)-1 nœuds. Hauteur ≈ log₂(n)", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // SEMESTRE 4 — Arbres Binaires de Recherche (ABR)
  // ══════════════════════════════════════════════════════════════════
  { id: 111, sem: 4, section: "Arbres Binaires de Recherche", priority: "P0", text: "Propriété ABR : gauche < racine ≤ droite à chaque nœud — sur TOUT le sous-arbre", hook: "Propriété récursive : doit tenir en chaque nœud, pas seulement entre fils directs", pitfall: "Vérifier seulement les fils directs est insuffisant — piège classique !" },
  { id: 112, sem: 4, section: "Arbres Binaires de Recherche", priority: "P0", text: "Recherche et insertion dans un ABR — O(h)", hook: "val < racine → gauche, val ≥ racine → droite, récursivement", pitfall: null },
  { id: 113, sem: 4, section: "Arbres Binaires de Recherche", priority: "P0", text: "Arbre équilibré : h ≈ log₂(n), opérations O(log n)", hook: "Arbre équilibré = idéal. Se produit si les données sont aléatoires", pitfall: null },
  { id: 114, sem: 4, section: "Arbres Binaires de Recherche", priority: "P1", text: "Arbre dégénéré : données triées en entrée → h = n-1, O(n)", hook: "Insérer 1,2,3,...,n dans un ABR donne une liste chaînée à droite", pitfall: null },
  { id: 115, sem: 4, section: "Arbres Binaires de Recherche", priority: "P1", text: "Suppression dans un ABR — cas du nœud avec deux fils", hook: "Remplacer par le successeur infixe = minimum du sous-arbre droit", pitfall: null },
  { id: 116, sem: 4, section: "Arbres Binaires de Recherche", priority: "P2", text: "Tas (heap) — arbre binaire complet avec propriété de tas", hook: "Max-tas : parent ≥ enfants. Utilisé pour file de priorité (heapq) et heapsort", pitfall: null },
  { id: 117, sem: 4, section: "Arbres Binaires de Recherche", priority: "P2", text: "Encodage de Huffman — arbre de fréquences pour compression", hook: "Sélection gloutonne des deux nœuds de plus faible fréquence à chaque étape", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // ANNEXE PYTHON — Référence exigible
  // ══════════════════════════════════════════════════════════════════
  { id: 118, sem: 0, section: "Python — Traits généraux", priority: "P0", text: "Typage dynamique — type déterminé à l'exécution, pas à la déclaration", hook: "x = 1 puis x = 'hello' est valide en Python", pitfall: null },
  { id: 119, sem: 0, section: "Python — Traits généraux", priority: "P0", text: "Portée lexicale — cherche variable localement puis dans l'espace global", hook: "Une variable locale masque une variable globale du même nom", pitfall: null },
  { id: 120, sem: 0, section: "Python — Traits généraux", priority: "P0", text: "Appel par valeur — évalue l'argument avant d'appeler la fonction", hook: "Pour les objets mutables (list, dict) : la référence est copiée, pas l'objet", pitfall: "f(tab) peut modifier tab si f modifie ses éléments — passage de référence !" },
  { id: 121, sem: 0, section: "Python — Types de base", priority: "P0", text: "int : +, -, *, //, **, % (opérandes positifs pour //,%)", hook: "// = division entière (floor), ** = puissance, % = modulo", pitfall: "(-7) // 2 = -4 en Python (floor division), pas -3 !" },
  { id: 122, sem: 0, section: "Python — Types de base", priority: "P0", text: "float : +, -, *, /, **", hook: "/ donne toujours un flottant en Python 3 — utiliser // pour la division entière", pitfall: null },
  { id: 123, sem: 0, section: "Python — Types de base", priority: "P0", text: "bool : not, or, and — évaluation paresseuse (court-circuit)", hook: "or s'arrête au premier True, and au premier False", pitfall: "a or b évalue b uniquement si a est False — b peut avoir des effets de bord" },
  { id: 124, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Chaînes/Tuples (immuables) : len, indice, +, *, tranche [a:b:p]", hook: "[a:b] : de l'indice a inclus à b exclu. [::-1] : renverser", pitfall: null },
  { id: 125, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Listes : compréhension, [e]*n, append, pop, tranche, copie superficielle", hook: "[e for x in s if cond]. b = a[:] est une copie superficielle", pitfall: "b = a[:] copie superficielle — objets imbriqués (listes de listes) partagés !" },
  { id: 126, sem: 0, section: "Python — Types structurés", priority: "P0", text: "Dictionnaires : {c1:v1,...}, accès, insertion, k in d, len, copy", hook: "d.get(k, default) évite KeyError si clé absente", pitfall: null },
  { id: 127, sem: 0, section: "Python — Contrôle", priority: "P0", text: "if / elif / else", hook: "Pas de switch/case au programme (Python 3.10+ uniquement)", pitfall: null },
  { id: 128, sem: 0, section: "Python — Contrôle", priority: "P0", text: "while (sans else), break, return dans boucle", hook: "break sort de la boucle. return sort de la fonction avec une valeur", pitfall: null },
  { id: 129, sem: 0, section: "Python — Contrôle", priority: "P0", text: "for (sans else) sur range, str, tuple, list, dict.keys(), dict.items()", hook: "for k, v in d.items() : parcours clé-valeur simultané", pitfall: null },
  { id: 130, sem: 0, section: "Python — Contrôle", priority: "P0", text: "def f(p1, ..., pn): ... return", hook: "Sans return explicite → retourne None. Portée : les variables locales restent locales", pitfall: null },
  { id: 131, sem: 0, section: "Python — Divers", priority: "P0", text: "import module / as alias / from module import f, g", hook: "Toute fonction de module non listée dans l'annexe DOIT être documentée dans la copie", pitfall: null },
  { id: 132, sem: 0, section: "Python — Divers", priority: "P0", text: "Fichiers : open, read, readline, readlines, split, write, close", hook: "open(fichier, 'r'/'w'/'a'). readlines() → liste de lignes avec '\\n'", pitfall: "Toujours fermer le fichier avec close() — ou utiliser with open(...) as f:" },
  { id: 133, sem: 0, section: "Python — Divers", priority: "P0", text: "assert condition (sans message d'erreur)", hook: "Arrêt immédiat si la condition est fausse — utile pour valider les entrées", pitfall: null },

  // ══════════════════════════════════════════════════════════════════
  // RÉFÉRENCE COURS/TD SUP
  // ══════════════════════════════════════════════════════════════════
  { id: 134, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 1 : Codage de l'information", hook: null, pitfall: null },
  { id: 135, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 2 : Algorithmique de base", hook: null, pitfall: null },
  { id: 136, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 3 : La base de Python", hook: null, pitfall: null },
  { id: 137, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 4 : Les fonctions", hook: null, pitfall: null },
  { id: 138, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 5 : Les séquences", hook: null, pitfall: null },
  { id: 139, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 6 : Les matrices", hook: null, pitfall: null },
  { id: 140, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 7 : Les fichiers", hook: null, pitfall: null },
  { id: 141, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 8 : Les dictionnaires", hook: null, pitfall: null },
  { id: 142, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 9 : Les ensembles", hook: null, pitfall: null },
  { id: 143, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 10 : Gestion des exceptions", hook: null, pitfall: null },
  { id: 144, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 11 : POO", hook: null, pitfall: null },
  { id: 145, sem: 1, section: "Cours Sup — Référence", priority: "P1", text: "Chapitre 12 : Modules numpy, matplotlib, scipy", hook: null, pitfall: null },

  { id: 146, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 1 : Codage de l'information", hook: null, pitfall: null },
  { id: 147, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 2 : Codage de l'information", hook: null, pitfall: null },
  { id: 148, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 3 : Le module turtle", hook: null, pitfall: null },
  { id: 149, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 4 : Algorithmique : Affectation", hook: null, pitfall: null },
  { id: 150, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 5 : Algorithmique : I/O", hook: null, pitfall: null },
  { id: 151, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 6 : Algorithmique : Tests", hook: null, pitfall: null },
  { id: 152, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 7 : Algorithmique : Boucles", hook: null, pitfall: null },
  { id: 153, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 8 : Algorithmique : Révision", hook: null, pitfall: null },
  { id: 154, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 9 : Python - Initiation", hook: null, pitfall: null },
  { id: 155, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 10 : Python - I/O", hook: null, pitfall: null },
  { id: 156, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 11 : Python - Tests", hook: null, pitfall: null },
  { id: 157, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 12 : Python - Boucles", hook: null, pitfall: null },
  { id: 158, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 12 (suite) : Python - Boucles", hook: null, pitfall: null },
  { id: 159, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 13 : Les fonctions", hook: null, pitfall: null },
  { id: 160, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 14 : Les fonctions récursives", hook: null, pitfall: null },
  { id: 161, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 15 : Les chaînes de caractères", hook: null, pitfall: null },
  { id: 162, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 16 : Les chaînes de caractères", hook: null, pitfall: null },
  { id: 163, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 17 : Les listes et les tuples", hook: null, pitfall: null },
  { id: 164, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 18 : Les listes et les tuples", hook: null, pitfall: null },
  { id: 165, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 19 : Les matrices", hook: null, pitfall: null },
  { id: 166, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 19 : Le module PIL", hook: null, pitfall: null },
  { id: 167, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 20 : Fichiers", hook: null, pitfall: null },
  { id: 168, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 21 : Dictionnaires - Ensembles - Exceptions", hook: null, pitfall: null },
  { id: 169, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 22 : POO", hook: null, pitfall: null },
  { id: 170, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 23 : Module numpy", hook: null, pitfall: null },
  { id: 171, sem: 1, section: "TD Sup — Référence", priority: "P2", text: "TD 24 : Modules matplotlib, scipy", hook: null, pitfall: null },
];

// ─── UI ─ PRIORITY_CONFIG ───────────────────────────────────────────────────────────────
export const PRIORITY_CONFIG = {
  P0: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  P1: { color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  P2: { color: "#eab308", bg: "rgba(234,179,8,0.12)" },
};