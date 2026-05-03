// Stats Dashboard - Data
export const ALL_DATA = [
  // ─ topic, cat, concours frequencies (out of 10), avg weight (/40 or normalised), trend
  // CNC = CNC Maroc; CCP = CCINP/CCP; XM = X-ENS / Mines-Ponts; E3A = E3A-Polytech

  // ── Structures de données
  { topic: "Arbres Binaires / ABR",        cat: "Structures",        cnc_mp:9, cnc_psi:8, ccp_mp:7, ccp_psi:6, xm_mp:6, xm_psi:5, e3a_mp:5, e3a_psi:5, weight_cnc:8.2, weight_ccp:7.5, weight_xm:6.0, weight_e3a:6.5, trend:"stable" },
  { topic: "Listes chaînées",              cat: "Structures",        cnc_mp:8, cnc_psi:7, ccp_mp:5, ccp_psi:5, xm_mp:3, xm_psi:3, e3a_mp:6, e3a_psi:6, weight_cnc:6.5, weight_ccp:5.0, weight_xm:3.5, weight_e3a:5.5, trend:"stable" },
  { topic: "Piles & Files",                cat: "Structures",        cnc_mp:7, cnc_psi:6, ccp_mp:6, ccp_psi:5, xm_mp:4, xm_psi:4, e3a_mp:5, e3a_psi:5, weight_cnc:5.0, weight_ccp:4.5, weight_xm:4.0, weight_e3a:4.5, trend:"stable" },

  // ── Algorithmique
  { topic: "Tri & Complexité",             cat: "Algorithmique",     cnc_mp:10,cnc_psi:9, ccp_mp:9, ccp_psi:8, xm_mp:8, xm_psi:8, e3a_mp:8, e3a_psi:8, weight_cnc:7.8, weight_ccp:7.0, weight_xm:7.5, weight_e3a:7.0, trend:"stable" },
  { topic: "Récursion",                    cat: "Algorithmique",     cnc_mp:9, cnc_psi:10,ccp_mp:8, ccp_psi:9, xm_mp:9, xm_psi:9, e3a_mp:7, e3a_psi:8, weight_cnc:7.5, weight_ccp:7.0, weight_xm:8.0, weight_e3a:6.5, trend:"stable" },
  { topic: "Graphes (BFS / DFS)",          cat: "Algorithmique",     cnc_mp:8, cnc_psi:7, ccp_mp:7, ccp_psi:6, xm_mp:8, xm_psi:7, e3a_mp:6, e3a_psi:5, weight_cnc:7.0, weight_ccp:6.5, weight_xm:8.0, weight_e3a:5.5, trend:"hausse" },
  { topic: "Programmation Dynamique",      cat: "Algorithmique",     cnc_mp:6, cnc_psi:5, ccp_mp:5, ccp_psi:4, xm_mp:8, xm_psi:7, e3a_mp:4, e3a_psi:3, weight_cnc:6.0, weight_ccp:5.5, weight_xm:9.0, weight_e3a:5.0, trend:"hausse" },
  { topic: "Algorithmes Gloutons",         cat: "Algorithmique",     cnc_mp:5, cnc_psi:4, ccp_mp:4, ccp_psi:4, xm_mp:5, xm_psi:4, e3a_mp:4, e3a_psi:3, weight_cnc:4.5, weight_ccp:4.0, weight_xm:5.0, weight_e3a:3.5, trend:"stable" },
  { topic: "Dijkstra / Plus courts chm.",  cat: "Algorithmique",     cnc_mp:4, cnc_psi:3, ccp_mp:4, ccp_psi:3, xm_mp:6, xm_psi:5, e3a_mp:3, e3a_psi:3, weight_cnc:4.0, weight_ccp:4.0, weight_xm:6.5, weight_e3a:3.5, trend:"hausse" },
  { topic: "Diviser pour régner",          cat: "Algorithmique",     cnc_mp:3, cnc_psi:3, ccp_mp:4, ccp_psi:4, xm_mp:6, xm_psi:6, e3a_mp:3, e3a_psi:3, weight_cnc:3.5, weight_ccp:4.5, weight_xm:7.0, weight_e3a:3.5, trend:"stable" },

  // ── Bases de données
  { topic: "SQL (SELECT / JOIN / GROUP BY)",cat: "Bases de données",  cnc_mp:10,cnc_psi:9, ccp_mp:8, ccp_psi:7, xm_mp:3, xm_psi:3, e3a_mp:6, e3a_psi:5, weight_cnc:8.5, weight_ccp:7.0, weight_xm:3.0, weight_e3a:5.5, trend:"stable" },
  { topic: "MCD / MLD (modélisation)",     cat: "Bases de données",  cnc_mp:8, cnc_psi:7, ccp_mp:6, ccp_psi:5, xm_mp:1, xm_psi:1, e3a_mp:4, e3a_psi:4, weight_cnc:6.0, weight_ccp:5.0, weight_xm:1.5, weight_e3a:4.0, trend:"stable" },
  { topic: "INSERT / UPDATE / DELETE",     cat: "Bases de données",  cnc_mp:6, cnc_psi:5, ccp_mp:4, ccp_psi:3, xm_mp:1, xm_psi:1, e3a_mp:3, e3a_psi:3, weight_cnc:3.5, weight_ccp:3.0, weight_xm:1.0, weight_e3a:2.5, trend:"stable" },

  // ── Méthodes de programmation
  { topic: "Invariants & Variants",        cat: "Méthodes",          cnc_mp:7, cnc_psi:8, ccp_mp:7, ccp_psi:8, xm_mp:8, xm_psi:9, e3a_mp:5, e3a_psi:6, weight_cnc:5.5, weight_ccp:5.5, weight_xm:7.0, weight_e3a:4.5, trend:"stable" },
  { topic: "Preuve de correction / termin.",cat: "Méthodes",          cnc_mp:5, cnc_psi:6, ccp_mp:6, ccp_psi:7, xm_mp:7, xm_psi:8, e3a_mp:4, e3a_psi:5, weight_cnc:4.0, weight_ccp:5.0, weight_xm:6.5, weight_e3a:4.0, trend:"stable" },
  { topic: "Spécification / Complexité esp.",cat:"Méthodes",          cnc_mp:3, cnc_psi:3, ccp_mp:4, ccp_psi:4, xm_mp:6, xm_psi:6, e3a_mp:3, e3a_psi:3, weight_cnc:2.5, weight_ccp:3.5, weight_xm:5.5, weight_e3a:3.0, trend:"stable" },

  // ── IA & Jeux
  { topic: "Minimax / Théorie des jeux",   cat: "IA & Jeux",         cnc_mp:5, cnc_psi:4, ccp_mp:3, ccp_psi:3, xm_mp:4, xm_psi:3, e3a_mp:3, e3a_psi:2, weight_cnc:4.5, weight_ccp:3.5, weight_xm:5.0, weight_e3a:3.5, trend:"hausse" },
  { topic: "k-NN / k-moyennes",            cat: "IA & Jeux",         cnc_mp:3, cnc_psi:3, ccp_mp:3, ccp_psi:2, xm_mp:4, xm_psi:3, e3a_mp:2, e3a_psi:2, weight_cnc:3.0, weight_ccp:3.0, weight_xm:5.0, weight_e3a:3.0, trend:"hausse" },
  { topic: "Automates / Langages formels", cat: "IA & Jeux",         cnc_mp:1, cnc_psi:1, ccp_mp:2, ccp_psi:2, xm_mp:5, xm_psi:5, e3a_mp:2, e3a_psi:2, weight_cnc:1.0, weight_ccp:3.0, weight_xm:7.0, weight_e3a:3.0, trend:"stable" },

  // ── Représentation
  { topic: "Images 2D & Tableaux",         cat: "Représentation",    cnc_mp:6, cnc_psi:5, ccp_mp:5, ccp_psi:4, xm_mp:3, xm_psi:3, e3a_mp:5, e3a_psi:4, weight_cnc:4.5, weight_ccp:4.0, weight_xm:3.5, weight_e3a:4.0, trend:"stable" },
  { topic: "Représentation des nombres",   cat: "Représentation",    cnc_mp:4, cnc_psi:4, ccp_mp:3, ccp_psi:3, xm_mp:2, xm_psi:2, e3a_mp:3, e3a_psi:3, weight_cnc:3.0, weight_ccp:2.5, weight_xm:2.0, weight_e3a:2.5, trend:"baisse" },
];

// Timeline data per concours
export const TIMELINES = {
  cnc: [
    { year: "2017", topics: ["Arbres Binaires", "SQL", "Récursion", "Tri"] },
    { year: "2018", topics: ["Tri", "Listes chaînées", "SQL", "MCD/MLD"] },
    { year: "2019", topics: ["Graphes BFS/DFS", "ABR", "Prog. Dynamique", "SQL"] },
    { year: "2020", topics: ["Récursion", "Piles & Files", "SQL", "Invariants"] },
    { year: "2021", topics: ["Arbres Binaires", "SQL", "Dijkstra", "MCD/MLD"] },
    { year: "2022", topics: ["Tri", "Graphes", "SQL", "Listes chaînées"] },
    { year: "2023", topics: ["Récursion", "ABR", "SQL", "Minimax"] },
    { year: "2024", topics: ["Prog. Dynamique", "SQL", "Arbres", "k-NN"] },
    { year: "2025", topics: ["Graphes", "SQL", "Récursion", "Invariants"] },
  ],
  ccp: [
    { year: "2017", topics: ["Récursion", "Tri", "Invariants"] },
    { year: "2018", topics: ["Arbres", "SQL", "Graphes"] },
    { year: "2019", topics: ["Piles & Files", "IA — k-NN", "SQL"] },
    { year: "2020", topics: ["Récursion", "ABR", "Complexité"] },
    { year: "2021", topics: ["Graphes BFS", "SQL", "Invariants", "Tri"] },
    { year: "2022", topics: ["Prog. Dynamique", "Arbres", "Récursion"] },
    { year: "2023", topics: ["ABR", "SQL", "Graphes", "Gloutons"] },
    { year: "2024", topics: ["Récursion", "Prog. Dynamique", "SQL", "Minimax"] },
  ],
  xm: [
    { year: "2017", topics: ["Automates", "Prog. Dynamique", "Invariants"] },
    { year: "2018", topics: ["Graphes", "Récursion", "Diviser-régner"] },
    { year: "2019", topics: ["Prog. Dynamique", "IA — k-NN", "Graphes"] },
    { year: "2020", topics: ["Arbres", "Invariants", "Récursion", "Complexité"] },
    { year: "2021", topics: ["Graphes + Dijkstra", "Prog. Dynamique", "Automates"] },
    { year: "2022", topics: ["Diviser-régner", "Arbres", "Prog. Dynamique", "SQL"] },
    { year: "2023", topics: ["Récursion", "Graphes", "k-NN", "Invariants"] },
    { year: "2024", topics: ["Prog. Dynamique", "Arbres", "Automates", "Preuve"] },
  ],
  e3a: [
    { year: "2018", topics: ["Tri", "Arbres", "SQL"] },
    { year: "2019", topics: ["Récursion", "Listes chaînées", "SQL"] },
    { year: "2020", topics: ["Graphes", "ABR", "SQL"] },
    { year: "2021", topics: ["Tri", "Piles & Files", "Récursion", "SQL"] },
    { year: "2022", topics: ["Arbres", "SQL", "Invariants", "Gloutons"] },
    { year: "2023", topics: ["Prog. Dynamique", "Récursion", "SQL", "Graphes"] },
    { year: "2024", topics: ["ABR", "SQL", "k-NN", "Tri"] },
  ],
};

export const CAT_COLORS = {
  "Structures":       "#60a5fa",
  "Algorithmique":    "#34d399",
  "Bases de données": "#f472b6",
  "Méthodes":         "#a78bfa",
  "IA & Jeux":        "#fb923c",
  "Représentation":   "#facc15",
};
