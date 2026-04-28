import { useState, useMemo, useRef, useEffect } from "react";
import "../css/CNCAlgoRef.css";

/* ─── THEME ───────────────────────────────────────────────── */
const FONT    = "'JetBrains Mono','Fira Code',monospace";
const HEADING = "'Rajdhani','Chakra Petch',sans-serif";

const CATS = [
  { id:"all",       label:"Tout",          color:"#fff"    },
  { id:"recursion", label:"Récursivité",   color:"#4ade80" },
  { id:"sort",      label:"Tri",           color:"#f472b6" },
  { id:"search",    label:"Recherche",     color:"#60a5fa" },
  { id:"lists",     label:"Listes chaîn.", color:"#a78bfa" },
  { id:"trees",     label:"Arbres bin.",   color:"#fb923c" },
  { id:"graphs",    label:"Graphes",       color:"#facc15" },
  { id:"dp",        label:"Prog. Dyn.",    color:"#34d399" },
  { id:"matrices",  label:"Matrices",      color:"#f87171" },
  { id:"strings",   label:"Chaînes",       color:"#38bdf8" },
  { id:"sql",       label:"SQL / BDD",     color:"#c084fc" },
];
const CC = Object.fromEntries(CATS.map(c=>[c.id,c.color]));

/* ─── ALGORITHM DATA ──────────────────────────────────────── */
// Each entry: { title, freq (★★★ = very frequent), complexity, code, note }
const SECTIONS = [
  {
    cat:"recursion", title:"Récursivité & Diviser pour Régner",
    algos:[
      {
        title:"Factorielle",
        freq:3, complexity:"O(n) temps, O(n) pile",
        code:`def fact(n):
    return 1 if n == 0 else n * fact(n-1)`,
        note:"Cas de base TOUJOURS en premier. Récurrence simple.",
      },
      {
        title:"Fibonacci (mémoïsation)",
        freq:3, complexity:"O(n) avec cache",
        code:`from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)`,
        note:"Sans cache : O(2ⁿ). Avec @lru_cache : O(n). À connaître par cœur.",
      },
      {
        title:"Exponentiation rapide",
        freq:3, complexity:"O(log n)",
        code:`def puissance(a, n):
    if n == 0: return 1
    if n % 2 == 0:
        m = puissance(a, n//2)
        return m * m
    return a * puissance(a, n-1)`,
        note:"Diviser pour régner classique. log n multiplications au lieu de n.",
      },
      {
        title:"Algorithme d'Euclide (PGCD)",
        freq:3, complexity:"O(log min(a,b))",
        code:`def pgcd(a, b):
    return a if b == 0 else pgcd(b, a % b)`,
        note:"Toujours demandé. Version itérative aussi acceptée.",
      },
      {
        title:"Tours de Hanoï",
        freq:2, complexity:"O(2ⁿ)",
        code:`def hanoi(n, source, cible, aux):
    if n == 1:
        print(f"{source} -> {cible}")
        return
    hanoi(n-1, source, aux, cible)
    print(f"{source} -> {cible}")
    hanoi(n-1, aux, cible, source)`,
        note:"Paradigme de récursion à 3 appels. Identifier source/cible/auxiliaire.",
      },
      {
        title:"Fusion (Merge Sort — phase fusion)",
        freq:3, complexity:"O(n)",
        code:`def fusion(L1, L2):
    if not L1: return L2
    if not L2: return L1
    if L1[0] <= L2[0]:
        return [L1[0]] + fusion(L1[1:], L2)
    return [L2[0]] + fusion(L1, L2[1:])`,
        note:"Sous-fonction du tri fusion. Mémoriser ce patron.",
      },
    ]
  },
  {
    cat:"sort", title:"Algorithmes de Tri",
    algos:[
      {
        title:"Tri par insertion",
        freq:3, complexity:"O(n²) — stable",
        code:`def tri_insertion(T):
    for i in range(1, len(T)):
        cle, j = T[i], i-1
        while j >= 0 and T[j] > cle:
            T[j+1] = T[j]; j -= 1
        T[j+1] = cle
    return T`,
        note:"Efficace sur tableaux presque triés. Stable.",
      },
      {
        title:"Tri par sélection",
        freq:2, complexity:"O(n²) — non stable",
        code:`def tri_selection(T):
    n = len(T)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if T[j] < T[min_idx]: min_idx = j
        T[i], T[min_idx] = T[min_idx], T[i]
    return T`,
        note:"Simple à coder mais peu efficace. Non stable.",
      },
      {
        title:"Tri fusion (Merge Sort)",
        freq:3, complexity:"O(n log n) — stable",
        code:`def tri_fusion(T):
    if len(T) <= 1: return T
    m = len(T) // 2
    G = tri_fusion(T[:m])
    D = tri_fusion(T[m:])
    return fusion(G, D)   # voir fusion() ci-dessus

def fusion(L1, L2):
    res = []
    i = j = 0
    while i < len(L1) and j < len(L2):
        if L1[i] <= L2[j]: res.append(L1[i]); i += 1
        else:               res.append(L2[j]); j += 1
    return res + L1[i:] + L2[j:]`,
        note:"★ Très fréquent au CNC. Diviser/régner + fusion. Stable.",
      },
      {
        title:"Tri rapide (Quick Sort)",
        freq:3, complexity:"O(n log n) moy, O(n²) pire",
        code:`def tri_rapide(T):
    if len(T) <= 1: return T
    pivot = T[len(T)//2]
    G = [x for x in T if x < pivot]
    M = [x for x in T if x == pivot]
    D = [x for x in T if x > pivot]
    return tri_rapide(G) + M + tri_rapide(D)`,
        note:"Non stable. Pire cas : tableau déjà trié (pivot mal choisi).",
      },
      {
        title:"Tri à bulles",
        freq:2, complexity:"O(n²) — stable",
        code:`def tri_bulles(T):
    n = len(T)
    for i in range(n):
        for j in range(0, n-i-1):
            if T[j] > T[j+1]:
                T[j], T[j+1] = T[j+1], T[j]
    return T`,
        note:"Très simple, mais inefficace. Souvent demandé pour analyse de complexité.",
      },
    ]
  },
  {
    cat:"search", title:"Recherche & Dichotomie",
    algos:[
      {
        title:"Recherche séquentielle",
        freq:2, complexity:"O(n)",
        code:`def recherche(T, cible):
    for i, x in enumerate(T):
        if x == cible: return i
    return -1`,
        note:"Cas non trié. Retourner l'indice ou -1.",
      },
      {
        title:"Recherche dichotomique",
        freq:3, complexity:"O(log n) — tableau TRIÉ requis",
        code:`def dicho(T, cible):
    g, d = 0, len(T)-1
    while g <= d:
        m = (g+d) // 2
        if T[m] == cible: return m
        elif T[m] < cible: g = m+1
        else: d = m-1
    return -1`,
        note:"★★ Très fréquent. Invariant : cible dans T[g..d]. Précondition : tableau trié.",
      },
      {
        title:"Recherche dichotomique (récursive)",
        freq:3, complexity:"O(log n)",
        code:`def dicho_rec(T, cible, g, d):
    if g > d: return -1
    m = (g+d) // 2
    if T[m] == cible: return m
    elif T[m] < cible: return dicho_rec(T, cible, m+1, d)
    else:              return dicho_rec(T, cible, g, m-1)`,
        note:"Version récursive demandée quand on traite les ABR ou les tableaux triés.",
      },
      {
        title:"Min et Max simultanés",
        freq:2, complexity:"O(n)",
        code:`def min_max(T):
    mn, mx = T[0], T[0]
    for x in T[1:]:
        if x < mn: mn = x
        if x > mx: mx = x
    return mn, mx`,
        note:"Un seul parcours. Retourner un tuple.",
      },
    ]
  },
  {
    cat:"lists", title:"Listes Chaînées",
    algos:[
      {
        title:"Structure Nœud",
        freq:3, complexity:"—",
        code:`class Noeud:
    def __init__(self, val, suivant=None):
        self.val = val
        self.suivant = suivant

# Créer 1 -> 2 -> 3
tete = Noeud(1, Noeud(2, Noeud(3)))`,
        note:"Patron de base. tete=None signifie liste vide.",
      },
      {
        title:"Parcourir une liste chaînée",
        freq:3, complexity:"O(n)",
        code:`def afficher(tete):
    courant = tete
    while courant:
        print(courant.val, end=" -> ")
        courant = courant.suivant
    print("None")`,
        note:"Ne jamais modifier tete dans la boucle. Utiliser une variable courant.",
      },
      {
        title:"Insérer en tête",
        freq:3, complexity:"O(1)",
        code:`def inserer_tete(tete, val):
    return Noeud(val, tete)   # nouveau nœud pointe sur ancienne tête`,
        note:"Insertion O(1). Retourner le nouveau nœud comme nouvelle tête.",
      },
      {
        title:"Longueur d'une liste chaînée",
        freq:2, complexity:"O(n)",
        code:`def longueur(tete):
    n, courant = 0, tete
    while courant:
        n += 1
        courant = courant.suivant
    return n`,
        note:"Compter les nœuds. Peut aussi s'écrire récursivement.",
      },
      {
        title:"Recherche dans liste chaînée",
        freq:3, complexity:"O(n)",
        code:`def rechercher(tete, val):
    courant = tete
    while courant:
        if courant.val == val: return True
        courant = courant.suivant
    return False`,
        note:"Retourner True/False ou le nœud selon ce qui est demandé.",
      },
      {
        title:"Inverser une liste chaînée",
        freq:3, complexity:"O(n)",
        code:`def inverser(tete):
    prec, courant = None, tete
    while courant:
        suivant = courant.suivant
        courant.suivant = prec
        prec = courant
        courant = suivant
    return prec   # nouvelle tête`,
        note:"★ Fréquent. Trois pointeurs : prec / courant / suivant.",
      },
      {
        title:"Pile (LIFO) avec liste chaînée",
        freq:3, complexity:"push/pop O(1)",
        code:`class Pile:
    def __init__(self):     self.tete = None
    def est_vide(self):     return self.tete is None
    def empiler(self, x):   self.tete = Noeud(x, self.tete)
    def depiler(self):
        v = self.tete.val; self.tete = self.tete.suivant; return v`,
        note:"Toujours vérifier est_vide() avant depiler().",
      },
      {
        title:"File (FIFO) avec liste chaînée",
        freq:3, complexity:"enfiler/défiler O(1)",
        code:`class File:
    def __init__(self):   self.tete = self.queue = None
    def est_vide(self):  return self.tete is None
    def enfiler(self, x):
        n = Noeud(x)
        if self.est_vide(): self.tete = self.queue = n
        else: self.queue.suivant = n; self.queue = n
    def defiler(self):
        v = self.tete.val; self.tete = self.tete.suivant
        if not self.tete: self.queue = None
        return v`,
        note:"Garder un pointeur tete ET queue pour enfilage O(1).",
      },
    ]
  },
  {
    cat:"trees", title:"Arbres Binaires & ABR",
    algos:[
      {
        title:"Structure Arbre Binaire",
        freq:3, complexity:"—",
        code:`class Arbre:
    def __init__(self, val, gauche=None, droite=None):
        self.val    = val
        self.gauche = gauche
        self.droite = droite

# Feuille
f = Arbre(5)
# Arbre  :   3
#           / \\
#          1   5
a = Arbre(3, Arbre(1), Arbre(5))`,
        note:"arbre=None signifie arbre vide. Toujours tester if arbre is None.",
      },
      {
        title:"Hauteur d'un arbre",
        freq:3, complexity:"O(n)",
        code:`def hauteur(a):
    if a is None: return -1      # convention : feuille → 0
    return 1 + max(hauteur(a.gauche), hauteur(a.droite))`,
        note:"★ Très fréquent. Convention hauteur(None)=-1 ou 0 selon l'énoncé.",
      },
      {
        title:"Taille d'un arbre",
        freq:3, complexity:"O(n)",
        code:`def taille(a):
    if a is None: return 0
    return 1 + taille(a.gauche) + taille(a.droite)`,
        note:"Nombre de nœuds. Cas de base = 0.",
      },
      {
        title:"Parcours préfixe / infixe / suffixe",
        freq:3, complexity:"O(n) chacun",
        code:`def prefixe(a):   # racine - gauche - droite  (NLR)
    if a is None: return
    print(a.val); prefixe(a.gauche); prefixe(a.droite)

def infixe(a):    # gauche - racine - droite  (LNR) → trié si ABR
    if a is None: return
    infixe(a.gauche); print(a.val); infixe(a.droite)

def suffixe(a):   # gauche - droite - racine  (LRN)
    if a is None: return
    suffixe(a.gauche); suffixe(a.droite); print(a.val)`,
        note:"Infixe sur un ABR donne les valeurs triées. Mnémo : N=Nœud, L=gauche, R=droite.",
      },
      {
        title:"Parcours en largeur (BFS arbre)",
        freq:3, complexity:"O(n)",
        code:`from collections import deque

def bfs_arbre(racine):
    if racine is None: return
    file = deque([racine])
    while file:
        n = file.popleft()
        print(n.val, end=" ")
        if n.gauche: file.append(n.gauche)
        if n.droite: file.append(n.droite)`,
        note:"Utiliser une deque comme file. Niveau par niveau.",
      },
      {
        title:"Arbre Binaire de Recherche — Recherche",
        freq:3, complexity:"O(h) — h=hauteur",
        code:`def abr_recherche(a, val):
    if a is None: return False
    if val == a.val: return True
    if val < a.val:  return abr_recherche(a.gauche, val)
    return abr_recherche(a.droite, val)`,
        note:"Propriété ABR : gauche < racine < droite. O(log n) si équilibré.",
      },
      {
        title:"ABR — Insertion",
        freq:3, complexity:"O(h)",
        code:`def abr_inserer(a, val):
    if a is None: return Arbre(val)
    if val < a.val:
        a.gauche = abr_inserer(a.gauche, val)
    elif val > a.val:
        a.droite = abr_inserer(a.droite, val)
    return a`,
        note:"★ Retourner TOUJOURS la racine. Ne pas insérer les doublons.",
      },
      {
        title:"Arbre binaire est-il un ABR ?",
        freq:2, complexity:"O(n)",
        code:`def est_abr(a, mini=float('-inf'), maxi=float('inf')):
    if a is None: return True
    if not (mini < a.val < maxi): return False
    return (est_abr(a.gauche, mini, a.val) and
            est_abr(a.droite, a.val, maxi))`,
        note:"Passer les bornes en paramètres. Ne pas juste comparer enfant/parent.",
      },
    ]
  },
  {
    cat:"graphs", title:"Graphes — BFS, DFS, Dijkstra",
    algos:[
      {
        title:"Représentation : liste d'adjacence",
        freq:3, complexity:"—",
        code:`# Graphe non orienté
G = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
# Pondéré : {'A': [('B',3), ('C',1)], ...}`,
        note:"Format dict of lists. Utilisé dans 90% des sujets CNC.",
      },
      {
        title:"DFS — Parcours en profondeur (récursif)",
        freq:3, complexity:"O(V+E)",
        code:`def dfs(G, sommet, visites=None):
    if visites is None: visites = set()
    visites.add(sommet)
    print(sommet, end=" ")
    for voisin in G[sommet]:
        if voisin not in visites:
            dfs(G, voisin, visites)
    return visites`,
        note:"★ Utiliser un set pour les visités. Passer visites en paramètre.",
      },
      {
        title:"DFS — Parcours en profondeur (itératif)",
        freq:3, complexity:"O(V+E)",
        code:`from collections import deque

def dfs_iter(G, depart):
    visites, pile = set(), deque([depart])
    while pile:
        s = pile.pop()          # pile → LIFO
        if s not in visites:
            visites.add(s)
            print(s, end=" ")
            for v in G[s]:
                if v not in visites: pile.append(v)
    return visites`,
        note:"pile.pop() = LIFO = DFS. Remplacer par popleft() → BFS.",
      },
      {
        title:"BFS — Parcours en largeur",
        freq:3, complexity:"O(V+E)",
        code:`from collections import deque

def bfs(G, depart):
    visites = {depart}
    file = deque([depart])
    while file:
        s = file.popleft()      # file → FIFO
        print(s, end=" ")
        for v in G[s]:
            if v not in visites:
                visites.add(v); file.append(v)
    return visites`,
        note:"★★ BFS = plus court chemin (graphe non pondéré). deque + popleft.",
      },
      {
        title:"BFS — Plus court chemin",
        freq:3, complexity:"O(V+E)",
        code:`from collections import deque

def plus_court_chemin(G, dep, arr):
    file = deque([(dep, [dep])])
    visites = {dep}
    while file:
        s, chemin = file.popleft()
        if s == arr: return chemin
        for v in G[s]:
            if v not in visites:
                visites.add(v)
                file.append((v, chemin + [v]))
    return None   # pas de chemin`,
        note:"Stocker le chemin dans la file. Retourner None si inaccessible.",
      },
      {
        title:"Composantes connexes",
        freq:2, complexity:"O(V+E)",
        code:`def composantes_connexes(G):
    visites, composantes = set(), []
    for s in G:
        if s not in visites:
            comp = dfs(G, s, visites)   # dfs modifie visites
            composantes.append(comp)
    return composantes`,
        note:"Lancer un DFS depuis chaque sommet non visité.",
      },
      {
        title:"Dijkstra (plus court chemin pondéré)",
        freq:3, complexity:"O((V+E) log V)",
        code:`import heapq

def dijkstra(G, depart):
    dist = {s: float('inf') for s in G}
    dist[depart] = 0
    tas = [(0, depart)]        # (distance, sommet)
    while tas:
        d, s = heapq.heappop(tas)
        if d > dist[s]: continue
        for voisin, poids in G[s]:
            nd = d + poids
            if nd < dist[voisin]:
                dist[voisin] = nd
                heapq.heappush(tas, (nd, voisin))
    return dist
# G pondéré : {'A':[('B',3),('C',1)], ...}`,
        note:"★★ heapq = tas min. Ignorer si dist trouvée meilleure. Ne pas revisiter.",
      },
    ]
  },
  {
    cat:"dp", title:"Programmation Dynamique",
    algos:[
      {
        title:"Fibonacci — DP tableau",
        freq:3, complexity:"O(n) temps, O(n) espace",
        code:`def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
        note:"Mémoïsation bottom-up. O(1) espace possible avec deux variables.",
      },
      {
        title:"Problème du sac à dos (0/1)",
        freq:3, complexity:"O(n×W)",
        code:`def sac_a_dos(poids, valeurs, W):
    n = len(poids)
    dp = [[0]*(W+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(W+1):
            dp[i][w] = dp[i-1][w]
            if poids[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                               valeurs[i-1] + dp[i-1][w-poids[i-1]])
    return dp[n][W]`,
        note:"★ Fréquent CNC. dp[i][w] = valeur max avec i objets, capacité w.",
      },
      {
        title:"Plus Longue Sous-Séquence Commune (PLSC)",
        freq:2, complexity:"O(m×n)",
        code:`def plsc(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
        note:"Aussi appelé LCS. Souvent demandé sous forme de bioinformatique.",
      },
      {
        title:"Rendu de monnaie",
        freq:3, complexity:"O(n×montant)",
        code:`def rendu_monnaie(pieces, montant):
    dp = [float('inf')] * (montant+1)
    dp[0] = 0
    for m in range(1, montant+1):
        for p in pieces:
            if p <= m and dp[m-p]+1 < dp[m]:
                dp[m] = dp[m-p]+1
    return dp[montant] if dp[montant] != float('inf') else -1`,
        note:"dp[m] = nb minimum de pièces pour montant m. dp[0]=0 est le cas de base.",
      },
      {
        title:"Nombres de Catalan (chemins / parenthésages)",
        freq:2, complexity:"O(n²)",
        code:`def catalan(n):
    dp = [0] * (n+1)
    dp[0] = dp[1] = 1
    for i in range(2, n+1):
        for j in range(i):
            dp[i] += dp[j] * dp[i-1-j]
    return dp[n]`,
        note:"Compte arbres BST, parenthésages valides, chemins sous la diagonale.",
      },
    ]
  },
  {
    cat:"matrices", title:"Matrices & Tableaux 2D",
    algos:[
      {
        title:"Créer une matrice n×m",
        freq:3, complexity:"O(n×m)",
        code:`# Matrice nulle n×m
M = [[0]*m for _ in range(n)]

# ATTENTION : ne pas faire M = [[0]*m]*n
# (toutes les lignes seraient le même objet)`,
        note:"Toujours utiliser une compréhension de liste pour chaque ligne.",
      },
      {
        title:"Transposée d'une matrice",
        freq:3, complexity:"O(n×m)",
        code:`def transposee(M):
    n, m = len(M), len(M[0])
    return [[M[i][j] for i in range(n)] for j in range(m)]
    # ou : list(map(list, zip(*M)))`,
        note:"★ Lignes ↔ colonnes. zip(*M) est la version Pythonique.",
      },
      {
        title:"Produit de matrices",
        freq:3, complexity:"O(n³)",
        code:`def produit(A, B):
    n, p, m = len(A), len(A[0]), len(B[0])
    C = [[0]*m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            for k in range(p):
                C[i][j] += A[i][k] * B[k][j]
    return C`,
        note:"Vérifier que nb colonnes(A) == nb lignes(B). Résultat : n×m.",
      },
      {
        title:"Recherche dans une matrice triée",
        freq:2, complexity:"O(n+m)",
        code:`def cherche_matrice(M, cible):
    # Matrice triée : lignes et colonnes croissantes
    i, j = 0, len(M[0])-1    # coin haut-droite
    while i < len(M) and j >= 0:
        if M[i][j] == cible: return (i, j)
        elif M[i][j] > cible: j -= 1
        else: i += 1
    return None`,
        note:"Partir du coin haut-droite : élimine une ligne ou colonne à chaque étape.",
      },
      {
        title:"Matrice d'adjacence → liste d'adjacence",
        freq:2, complexity:"O(V²)",
        code:`def mat_vers_liste(M):
    n = len(M)
    G = {i: [] for i in range(n)}
    for i in range(n):
        for j in range(n):
            if M[i][j]: G[i].append(j)
    return G`,
        note:"Utile pour convertir entre représentations de graphes.",
      },
      {
        title:"Rotation 90° d'une matrice carrée",
        freq:2, complexity:"O(n²)",
        code:`def rotation_90(M):
    n = len(M)
    # Transposer puis inverser chaque ligne
    T = transposee(M)
    return [ligne[::-1] for ligne in T]`,
        note:"Composition de transposition + miroir horizontal.",
      },
    ]
  },
  {
    cat:"strings", title:"Algorithmes sur Chaînes",
    algos:[
      {
        title:"Palindrome",
        freq:3, complexity:"O(n)",
        code:`def est_palindrome(s):
    s = s.lower().replace(' ', '')
    return s == s[::-1]
    # Ou : all(s[i]==s[~i] for i in range(len(s)//2))`,
        note:"s[::-1] = retournement en Python. Penser à normaliser la casse.",
      },
      {
        title:"Anagramme",
        freq:2, complexity:"O(n log n) ou O(n)",
        code:`def est_anagramme(s1, s2):
    return sorted(s1.lower()) == sorted(s2.lower())
    # Version O(n) avec Counter :
    # from collections import Counter
    # return Counter(s1.lower()) == Counter(s2.lower())`,
        note:"Deux mots anagrammes ont les mêmes lettres triées.",
      },
      {
        title:"Recherche naïve d'un motif",
        freq:3, complexity:"O(n×m)",
        code:`def recherche_motif(texte, motif):
    n, m = len(texte), len(motif)
    positions = []
    for i in range(n - m + 1):
        if texte[i:i+m] == motif:
            positions.append(i)
    return positions`,
        note:"Base pour KMP. Demandé souvent pour analyse de complexité.",
      },
      {
        title:"Conversion base 10 → base b",
        freq:3, complexity:"O(log n)",
        code:`def vers_base(n, b):
    if n == 0: return '0'
    chiffres = "0123456789ABCDEF"
    res = ""
    while n > 0:
        res = chiffres[n % b] + res
        n //= b
    return res

# Binaire : vers_base(42, 2)  → '101010'`,
        note:"★ Fréquent : binaire (b=2), octal (b=8), hexa (b=16).",
      },
      {
        title:"Conversion binaire → décimal",
        freq:3, complexity:"O(n)",
        code:`def bin_vers_dec(s):
    return sum(int(b) * 2**i
               for i, b in enumerate(reversed(s)))
    # ou : int(s, 2)`,
        note:"Méthode de Horner aussi acceptée : résultat = résultat*2 + bit.",
      },
      {
        title:"Compression Run-Length",
        freq:2, complexity:"O(n)",
        code:`def rle_encode(s):
    if not s: return ""
    res, count = "", 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]: count += 1
        else:
            res += s[i-1] + (str(count) if count>1 else "")
            count = 1
    res += s[-1] + (str(count) if count>1 else "")
    return res
# "aaabbc" → "a3b2c"`,
        note:"Demandé sous forme de compression d'images ou de séquences ADN.",
      },
    ]
  },
  {
    cat:"sql", title:"SQL & Bases de Données Relationnelles",
    algos:[
      {
        title:"Modèle relationnel — rappel",
        freq:3, complexity:"—",
        code:`-- Clé primaire, étrangère, contraintes
CREATE TABLE Etudiant (
    id      INTEGER PRIMARY KEY,
    nom     TEXT NOT NULL,
    promo   INTEGER
);
CREATE TABLE Note (
    etu_id  INTEGER REFERENCES Etudiant(id),
    matiere TEXT,
    note    REAL,
    PRIMARY KEY (etu_id, matiere)
);`,
        note:"Connaître : PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE.",
      },
      {
        title:"SELECT de base + filtres",
        freq:3, complexity:"—",
        code:`-- Tous les étudiants de promo 2024 avec moyenne > 12
SELECT nom, AVG(note) AS moy
FROM   Etudiant E
JOIN   Note N ON E.id = N.etu_id
WHERE  E.promo = 2024
GROUP  BY E.id, E.nom
HAVING AVG(note) > 12
ORDER  BY moy DESC;`,
        note:"★ Ordre obligatoire : SELECT→FROM→JOIN→WHERE→GROUP BY→HAVING→ORDER BY.",
      },
      {
        title:"Jointures essentielles",
        freq:3, complexity:"—",
        code:`-- INNER JOIN (intersection)
SELECT * FROM A JOIN B ON A.id = B.a_id;

-- LEFT JOIN (tout A + correspondances dans B)
SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;

-- Auto-jointure (trouver paires)
SELECT A.nom, B.nom
FROM   Etudiant A, Etudiant B
WHERE  A.promo = B.promo AND A.id < B.id;`,
        note:"LEFT JOIN laisse des NULL du côté droit. Utiliser IS NULL pour les non-matchés.",
      },
      {
        title:"Sous-requêtes",
        freq:3, complexity:"—",
        code:`-- Étudiants ayant la meilleure note en maths
SELECT nom FROM Etudiant
WHERE id IN (
    SELECT etu_id FROM Note
    WHERE matiere='Maths'
    AND note = (SELECT MAX(note) FROM Note
                WHERE matiere='Maths')
);`,
        note:"Sous-requête corrélée vs non-corrélée. EXISTS est souvent plus efficace que IN.",
      },
      {
        title:"Algèbre relationnelle → SQL",
        freq:3, complexity:"—",
        code:`-- Projection π  →  SELECT col1, col2 FROM T
-- Sélection  σ  →  SELECT * FROM T WHERE condition
-- Jointure   ⋈  →  T1 JOIN T2 ON T1.k = T2.k
-- Union      ∪  →  SELECT ... UNION SELECT ...
-- Différence −  →  SELECT ... EXCEPT SELECT ...
-- Intersection∩ →  SELECT ... INTERSECT SELECT ...`,
        note:"★ Le CNC demande souvent de traduire une expression d'algèbre relationnelle en SQL.",
      },
      {
        title:"Python + SQLite3 complet",
        freq:3, complexity:"—",
        code:`import sqlite3

conn = sqlite3.connect(':memory:')
cur  = conn.cursor()

cur.execute('''CREATE TABLE notes
               (nom TEXT, matiere TEXT, val REAL)''')

donnees = [('Alice','Maths',15.5),('Bob','Info',14.0)]
cur.executemany('INSERT INTO notes VALUES (?,?,?)', donnees)
conn.commit()

for row in cur.execute('SELECT * FROM notes WHERE val>14'):
    print(row)

conn.close()`,
        note:"Toujours utiliser des ? paramétrés (jamais de f-string SQL = injection).",
      },
    ]
  },
];

/* ─── NAV ITEMS ───────────────────────────────────────────── */
const NAV = [
  { id:"recursion", label:"Récursivité",    icon:"∞" },
  { id:"sort",      label:"Tri",            icon:"↕" },
  { id:"search",    label:"Recherche",      icon:"⌕" },
  { id:"lists",     label:"Listes chaîn.",  icon:"→" },
  { id:"trees",     label:"Arbres bin.",    icon:"⋱" },
  { id:"graphs",    label:"Graphes",        icon:"⬡" },
  { id:"dp",        label:"Prog. Dyn.",     icon:"◈" },
  { id:"matrices",  label:"Matrices",       icon:"▦" },
  { id:"strings",   label:"Chaînes",        icon:"\"" },
  { id:"sql",       label:"SQL / BDD",      icon:"⊛" },
];

/* ─── SYNTAX HIGHLIGHTER ──────────────────────────────────── */
function highlight(code) {
  const esc = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return esc
    .replace(/(#.*|--.*)/g,           '<span class="cm">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g,
                                       '<span class="st">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g,      '<span class="nu">$1</span>')
    .replace(/\b(def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|import|from|as|with|yield|lambda|True|False|None|SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP\s+BY|ORDER\s+BY|HAVING|CREATE|TABLE|INSERT|INTO|VALUES|PRIMARY|KEY|REFERENCES|NOT|NULL|TEXT|INTEGER|REAL|UPDATE|SET|DELETE|AND|OR|UNION|INTERSECT|EXCEPT|DISTINCT)\b/g,
                                       '<span class="kw">$1</span>')
    .replace(/\b(print|len|range|int|float|str|list|dict|set|append|sorted|max|min|sum|enumerate|zip|reversed|heapq|deque|lru_cache|Counter|type|isinstance)\b/g,
                                       '<span class="fn">$1</span>')
    .replace(/\b(float|int|str|list|dict|set|Noeud|Arbre|Pile|File)\b/g,
                                       '<span class="tp">$1</span>');
}

/* ─── FREQ STARS ──────────────────────────────────────────── */
function Stars({ n }) {
  return (
    <span className="stars">
      {[1,2,3].map(i=>(
        <span key={i} className={i<=n ? "star" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

/* ─── ALGO CARD ───────────────────────────────────────────── */
function AlgoCard({ algo, color, idx }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen]     = useState(true);

  function copy(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(algo.code).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false),1400);
  }

  return (
    <div className={`algo-card ${open ? 'open' : 'closed'}`} style={{borderColor: open?color+'44':'#1e1e26'}}>
      {/* Header */}
      <div
        onClick={()=>setOpen(o=>!o)}
        className={`card-header ${open ? 'open' : 'closed'}`}
      >
        <div className="card-color-bar" style={{background:color}}/>
        <span className="card-title">{algo.title}</span>
        <Stars n={algo.freq}/>
        <span className="card-complexity">{algo.complexity}</span>
        <span className="card-toggle">{open?'▲':'▼'}</span>
      </div>

      {open && (
        <div style={{padding:'12px 16px', display:'flex', flexDirection:'column', gap:8}}>
          {/* Code block */}
          <div className="code-block-wrapper">
            <pre className="code-block"
              dangerouslySetInnerHTML={{__html: highlight(algo.code)}}
            />
            <button
              onClick={copy}
              className={`copy-btn ${copied ? 'copied' : ''}`}
            >{copied ? '✓ copié':'copier'}</button>
          </div>
          {/* Note */}
          {algo.note && (
            <div className="algo-note" style={{borderLeftColor: color}}>
              💡 {algo.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────── */
export default function CNCAlgoRef() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch]       = useState("");
  const [activeNav, setActiveNav] = useState(null);

  const filtered = useMemo(()=>{
    return SECTIONS
      .filter(s=> activeCat==="all" || s.cat===activeCat)
      .map(s=>({
        ...s,
        algos: s.algos.filter(a=>{
          if (!search) return true;
          const q = search.toLowerCase();
          return a.title.toLowerCase().includes(q)
              || a.code.toLowerCase().includes(q)
              || (a.note||"").toLowerCase().includes(q);
        })
      }))
      .filter(s=> s.algos.length > 0);
  },[activeCat, search]);

  const total = SECTIONS.reduce((a,s)=>a+s.algos.length,0);
  const shown = filtered.reduce((a,s)=>a+s.algos.length,0);

  function scrollTo(catId) {
    setActiveCat("all"); setSearch(""); setActiveNav(catId);
    setTimeout(()=>{
      const el = document.getElementById("sec-"+catId);
      if (el) el.scrollIntoView({behavior:"smooth",block:"start"});
    },60);
  }

  return (
    <div className="cnc-algo-ref">
      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-t">CNC Algo</div>
            <div className="logo-s">CPGE · MP · PSI · Référence</div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(n=>(
              <div
                key={n.id}
                className={`ni ${activeNav===n.id?"active":""}`}
                style={{borderLeftColor: activeNav===n.id ? CC[n.id] : 'transparent'}}
                onClick={()=>scrollTo(n.id)}
              >
                <span className="ni-icon">{n.icon}</span>
                {n.label}
                <span className="ni-dot" style={{background:CC[n.id]}}/>
              </div>
            ))}
          </nav>
          <div className="sfooter">
            ALGOS VISIBLES · {shown}/{total}
            <div className="pb-bg">
              <div className="pb-fill" style={{width:`${Math.round(shown/total*100)}%`}}/>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-t">Référence Algorithmes CNC</div>
            <input
              className="search-input"
              placeholder="Rechercher un algo…"
              value={search}
              onChange={e=>{setSearch(e.target.value);setActiveCat("all");setActiveNav(null);}}
            />
          </div>

          <div className="content">
            <h1 className="page-h">Algorithmes Essentiels — CNC / CPGE</h1>
            <div className="page-s">
              {["Récursivité","Tri","Recherche","Listes","Arbres","Graphes","Prog. Dyn.","Matrices","Chaînes","SQL"].map(l=>(
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <div className="filter-row">
                <span className="flabel">THÈME</span>
                {CATS.map(c=>(
                  <div
                    key={c.id}
                    className={`pill ${activeCat===c.id?"active":""}`}
                    style={{background: activeCat===c.id ? c.color : 'transparent'}}
                    onClick={()=>{setActiveCat(c.id);setSearch("");setActiveNav(null);}}
                  >{c.label}</div>
                ))}
              </div>
              <div className="filter-row">
                <span className="flabel">FRÉQUENCE</span>
                <span className="freq-legend">
                  <span className="freq-high">★★★</span> Très fréquent&nbsp;&nbsp;
                  <span className="freq-high">★★</span><span className="freq-low">★</span> Fréquent&nbsp;&nbsp;
                  <span className="freq-high">★</span><span className="freq-low">★★</span> Occasionnel
                </span>
              </div>
            </div>

            {/* LEGEND */}
            <div className="legend">
              {CATS.filter(c=>c.id!=="all").map(c=>(
                <div key={c.id} className="li">
                  <div className="ld" style={{background:c.color}}/>
                  {c.label}
                </div>
              ))}
            </div>

            {/* SECTIONS */}
            {filtered.length===0 && (
              <div className="no-res">Aucun algorithme ne correspond à « {search} »</div>
            )}

            {filtered.map(sec=>{
              const color = CC[sec.cat];
              return (
                <div key={sec.cat} id={"sec-"+sec.cat}>
                  <div className="sec-header">
                    <div className="sec-bar" style={{background:color}}/>
                    <span className="sec-title">{sec.title}</span>
                    <span className="sec-count">{sec.algos.length} algos</span>
                  </div>
                  {sec.algos.map((a,i)=>(
                    <AlgoCard key={i} algo={a} color={color} idx={i}/>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
