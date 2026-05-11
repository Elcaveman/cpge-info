const  SUBJECT_MAP = {

}

const SUJET = {
  concours: "CNC",
  year: 2023,
  filieres: ["MP", "PC", "PSI"],
  duree: "3h",
  tags: ["Python 3", "SQL", "Algorithmique"],
  parties: [
    {
      id: "I",
      title: "Programmation Python",
      icon: "🐍",
      questions: [
        {
          id: "I.1",
          type: "python",
          priority: "P0",
          text: "Écrire une fonction retournant le maximum d'un tableau non vide",
          enonce: "Écrire une fonction maximum(tab) qui prend en paramètre une liste non vide d'entiers et retourne la valeur maximale. Préciser la complexité.",
          complexity: "O(n)",
          complexityNote: "une passe sur le tableau",
          pitfall: "Initialiser m = 0 est faux si tous les éléments sont négatifs. Toujours initialiser avec tab[0].",
          code: `def maximum(tab):
    # Précondition : tab est non vide
    m = tab[0]
    for x in tab[1:]:
        if x > m:
            m = x
    return m`,
        },
        {
          id: "I.2",
          type: "python",
          priority: "P0",
          text: "Implémenter une recherche dichotomique dans un tableau trié",
          enonce: "Écrire une fonction dicho(tab, val) qui retourne l'indice de val dans le tableau trié tab, ou -1 si absent. Justifier la terminaison.",
          complexity: "O(log n)",
          complexityNote: "l'intervalle est divisé par 2 à chaque étape",
          pitfall: "Oublier que le tableau doit être trié. Sans cette précondition, le résultat est incorrect même si la fonction termine.",
          code: `def dicho(tab, val):
    # Précondition : tab trié par ordre croissant
    g, d = 0, len(tab) - 1
    while g <= d:
        # Variant : d - g, décroît strictement
        m = (g + d) // 2
        if tab[m] == val:
            return m
        elif tab[m] < val:
            g = m + 1
        else:
            d = m - 1
    return -1`,
        },
        {
          id: "I.3",
          type: "python",
          priority: "P0",
          text: "Donner un invariant de boucle pour le tri par insertion",
          enonce: "Donner un invariant de la boucle externe du tri par insertion et montrer la correction partielle de l'algorithme.",
          complexity: "O(n²) pire cas · O(n) meilleur cas",
          complexityNote: "tableau trié en entrée",
          pitfall: null,
          code: `# Invariant (for i in range(1, n)):
# "À la fin de l'itération i, tab[0..i] est trié"

def tri_insertion(tab):
    for i in range(1, len(tab)):
        cle = tab[i]
        j = i - 1
        while j >= 0 and tab[j] > cle:
            tab[j + 1] = tab[j]
            j -= 1
        tab[j + 1] = cle`,
        },
      ],
    },
    {
      id: "II",
      title: "Bases de données SQL",
      icon: "🗄️",
      questions: [
        {
          id: "II.1",
          type: "sql",
          priority: "P0",
          text: "Étudiants ayant une moyenne strictement supérieure à 14",
          enonce: "Schéma : Etudiant(#id, nom, prenom) · Note(#id_etudiant→Etudiant, #matiere, valeur)\n\nRetourner le nom et prénom des étudiants dont la moyenne est > 14, triés par moyenne décroissante.",
          complexity: null,
          complexityNote: null,
          pitfall: "Écrire WHERE AVG(...) > 14 au lieu de HAVING. Le filtre sur un agrégat se fait toujours avec HAVING, jamais WHERE.",
          code: `SELECT E.nom, E.prenom,
       AVG(N.valeur) AS moyenne
FROM Etudiant E
     JOIN Note N ON N.id_etudiant = E.id
GROUP BY E.id, E.nom, E.prenom
HAVING AVG(N.valeur) > 14
ORDER BY moyenne DESC;`,
        },
        {
          id: "II.2",
          type: "sql",
          priority: "P1",
          text: "Autojointure — paires d'étudiants dans la même classe sans doublons",
          enonce: "Etudiant(#id, nom, classe) — Retourner toutes les paires (nom1, nom2) d'étudiants distincts dans la même classe, sans doublons symétriques.",
          complexity: null,
          complexityNote: null,
          pitfall: "Utiliser E1.id <> E2.id retourne les doublons symétriques (A,B) ET (B,A). Toujours utiliser < pour les autojointures.",
          code: `SELECT E1.nom AS etudiant_1, E2.nom AS etudiant_2
FROM Etudiant E1
     JOIN Etudiant E2 ON E1.classe = E2.classe
WHERE E1.id < E2.id;
-- < évite (A,B) et (B,A) simultanément`,
        },
      ],
    },
    {
      id: "III",
      title: "Algorithmique & Graphes",
      icon: "🔗",
      questions: [
        {
          id: "III.1",
          type: "algo",
          priority: "P0",
          text: "Parcours BFS et détection de connexité d'un graphe",
          enonce: "Le graphe est donné par liste d'adjacence adj (dictionnaire). Écrire est_connexe(adj) qui retourne True si le graphe non orienté est connexe.",
          complexity: "O(n + m)",
          complexityNote: "chaque sommet et arête visités une fois",
          pitfall: "Oublier le tableau visités → boucle infinie sur les cycles. Marquer un sommet comme vu dès qu'on l'enfile, pas quand on le défile.",
          code: `from collections import deque

def est_connexe(adj):
    if not adj:
        return True
    source = next(iter(adj))
    vus = {source}
    # deque obligatoire — list.pop(0) est O(n) !
    file = deque([source])
    while file:
        s = file.popleft()
        for v in adj[s]:
            if v not in vus:
                vus.add(v)
                file.append(v)
    return len(vus) == len(adj)`,
        },
      ],
    },
  ],
};