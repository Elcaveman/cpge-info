// Concours Informatique CPGE — Data
// Sources: zbakhinfo.odoo.com, concours-commun-inp.fr, concoursminesponts.fr, e3a-polytech.fr

export const CONCOURS = [
  {
    id: "cnc",
    name: "CNC Maroc",
    shortName: "CNC",
    flag: "🇲🇦",
    color: "#4ade80",
    url: "https://zbakhinfo.odoo.com/cnc",
    description:
      "Concours National Commun du Maroc. L'épreuve d'informatique dure 4h, en Python. Elle couvre les structures de données (arbres, listes, graphes), les algorithmes classiques, SQL et les bases de données.",
    examInfo: [
      { label: "Durée", value: "4h" },
      { label: "Langage", value: "Python" },
      { label: "Format", value: "Questions de cours + problème" },
      { label: "Session", value: "Juin/Juillet" },
    ],
    filieres: ["MP", "PSI", "TSI"],
    coefficients: { MP: 5, PSI: 5, TSI: 4 },
    annales: [
      {
        year: 2025,
        MP:  { sujet: "https://zbakhinfo.odoo.com/web/content/3868?unique=cc00d22a3a75d89b9ad59ea73542a342cfac653d&download=true" },
        PSI: { sujet: "https://zbakhinfo.odoo.com/web/content/3869?unique=97ed0bd639acbe5bae623ac47de570cd6a0e579a&download=true" },
        TSI: { sujet: "https://zbakhinfo.odoo.com/web/content/3870?unique=099ce222fa55f94da9e690709977b9c3d56a5c98&download=true" },
      },
      {
        year: 2024,
        MP:  { sujet: "https://zbakhinfo.odoo.com/web/content/3116?unique=0cf8908ca096ce65c4041d66286deea007b4f27e&download=true" },
        PSI: { sujet: "https://zbakhinfo.odoo.com/web/content/3117?unique=f4e524d6005965ee8240f7b983c2a32c101cbb71&download=true" },
        TSI: null,
      },
      {
        year: 2023,
        MP:  { sujet: "https://zbakhinfo.odoo.com/web/content/2093?unique=33dae5eff2a8a8089fda5a2376a9f8916ab16144&download=true" },
        PSI: { sujet: "https://zbakhinfo.odoo.com/web/content/2307?unique=ee6a4f1891189821b9274388315193491aca894a&download=true" },
        TSI: { sujet: "https://zbakhinfo.odoo.com/web/content/2335?unique=1387727af813721dcb701ab06401f86d6c52a684&download=true" },
      },
      {
        year: 2022,
        MP:  { sujet: "https://zbakhinfo.odoo.com/web/content/660?unique=29205b788d83ae2df7fe34fe695f3dbef53f6596&download=true" },
        PSI: { sujet: "https://zbakhinfo.odoo.com/web/content/661?unique=856ddc6c613bbb6f6c7554ecd04d7c26202f12d9&download=true" },
        TSI: { sujet: "https://zbakhinfo.odoo.com/web/content/3506?unique=05bf9fc37a0f2dddd2cf8c38e18e6535dcf7bb9b&download=true", note: "Zéro" },
      },
      {
        year: 2021,
        MP:  null,
        PSI: { sujet: "https://zbakhinfo.odoo.com/web/content/2351?unique=f4186c9ffccbc8fe98d692a7081a21b8b5a8d54d&download=true" },
        TSI: null,
      },
      { year: 2020, MP: null, PSI: null, TSI: null, note: "Non disponibles publiquement" },
    ],
  },
  {
    id: "ccp",
    name: "CCP / CCINP",
    shortName: "CCINP",
    flag: "🇫🇷",
    color: "#60a5fa",
    url: "https://www.concours-commun-inp.fr/fr/epreuves/annales.html",
    description:
      "Concours Commun INP — 1er réseau des Grandes Écoles d'ingénieurs françaises. L'épreuve d'informatique est distincte par filière (MP et PSI). Elle dure 3h et couvre les algorithmes, structures de données et SQL.",
    examInfo: [
      { label: "Durée", value: "3h" },
      { label: "Langage", value: "Python / OCaml" },
      { label: "Format", value: "Problème en plusieurs parties" },
      { label: "Session", value: "Avril" },
    ],
    filieres: ["MP", "PSI"],
    coefficients: { MP: 4, PSI: 4 },
    annales: [
      {
        year: 2025,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2025/MP/Informatique_2025.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2025/MP/MP_ECRIT_Informatique%202025_10.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2025/PSI/Informatique_2025.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2025/PSI/Rapport%20Ecrits%20Informatique%20PSI%202025.pdf?download=true" },
      },
      {
        year: 2024,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2024/MP/2024_MP7IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2024/MP/MP_ECRIT_Informatique%202024.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2024/PSI/2024_PSI5IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2024/PSI/rapport%20informatique%202024.pdf?download=true" },
      },
      {
        year: 2023,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2023/MP7IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2023/MP/MP_ECRIT_Informatique%202023_07.09.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2023/PSI5IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2023/PSI/Rapport%20Informatique%20PSI%202023.pdf?download=true" },
      },
      {
        year: 2022,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2022/MP/MP7Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2022/MP/RapportMP_ECRIT_INFORMATIQUE_2022.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2022/PSI/PSI5Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2022/PSI/rapport_ecrits%20PSI_2022%20Informatique.pdf?download=true" },
      },
      {
        year: 2021,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2021/MP/MP7IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_attachment/annales-mp-article/MP_ECRIT_INFORMATIQUE.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/2021/PSI/PSI5IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_attachment/annales-psi-article/Rapport_ecrits%20PSI_Informatique.pdf?download=true" },
      },
      {
        year: 2020,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_attachment/annales-mp-article/MP7IN_informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_attachment/annales-mp-article/MP_INFORMATIQUE_2020.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_attachment/annales-psi-article/informatique_PSI5IN.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_attachment/annales-psi-article/PSI_2020%20Informatique.pdf?download=true" },
      },
      {
        year: 2019,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2019/Informatique-19.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2019/MP_ECRIT_INFORMATIQUE.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2019/Informatique%2019.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_attachment/annales-psi-article/ecrit%20informatique.pdf?download=true" },
      },
      {
        year: 2018,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2018/MP-Info.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2018/mp_rapport_ecrit_info.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2018/PSI-Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2018/psi_ecrit_info.pdf?download=true" },
      },
      {
        year: 2017,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2017/MP-Info.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2017/PSI-Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2017/psi_ecrit_info.pdf?download=true" },
      },
      {
        year: 2016,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2016/MP-Info.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2016/mp_rapport_ecrit_info.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2016/PSI-Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2016/psi_ecrit_info.pdf?download=true" },
      },
      {
        year: 2015,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2015/MP-Info.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2015/mp_rapport_ecrit_info.pdf?download=true" },
        PSI: { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2015/PSI-Informatique.pdf?download=true", rapport: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/PSI/2015/psi_ecrit_info_rapport.pdf?download=true" },
      },
      {
        year: 2014,
        MP:  { sujet: "https://www.concours-commun-inp.fr/_resource/annales%20%C3%A9crits/MP/2014/MP-Info.pdf?download=true" },
        PSI: null,
      },
    ],
  },
  {
    id: "mines",
    name: "Mines-Ponts",
    shortName: "Mines",
    flag: "🇫🇷",
    color: "#f472b6",
    url: "https://concoursminesponts.fr/annales/",
    description:
      "Concours des Mines-Ponts, donnant accès à des grandes écoles d'ingénieurs prestigieuses (Mines ParisTech, Ponts, Télécom Paris…). L'épreuve d'info est commune MP/PC/PSI (3h) + une épreuve option MP supplémentaire.",
    examInfo: [
      { label: "Durée", value: "3h (commune) + 3h (option MP)" },
      { label: "Langage", value: "Python / OCaml" },
      { label: "Format", value: "Problème théorique / implémentation" },
      { label: "Session", value: "Avril" },
    ],
    filieres: ["MP/PC/PSI", "Option MP"],
    coefficients: { "MP/PC/PSI": 3, "Option MP": 2 },
    annales: [
      {
        year: 2025,
        "MP/PC/PSI": { sujet: "https://concoursminesponts.fr/wp-content/uploads/2025/04/Info-MP-PC-PSI.pdf" },
        "Option MP":  { sujet: "https://concoursminesponts.fr/wp-content/uploads/2025/04/Info-option-MP.pdf" },
        zip: "https://concoursminesponts.fr/wp-content/uploads/2025/04/SUJETS-2025.zip",
      },
      { year: 2024, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2024.zip" },
      { year: 2023, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2023.zip" },
      { year: 2022, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2022.zip" },
      { year: 2021, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2021.zip" },
      { year: 2020, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2020.zip" },
      { year: 2019, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2019.zip" },
      { year: 2018, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2018.zip" },
      { year: 2017, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2017.zip" },
      { year: 2016, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2016.zip" },
      { year: 2015, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2015.zip" },
      { year: 2014, zip: "https://wordpress.concoursminesponts.fr/wp-content/uploads/2024/07/2014.zip" },
    ],
  },
  {
    id: "e3a",
    name: "E3A-Polytech",
    shortName: "E3A",
    flag: "🇫🇷",
    color: "#fb923c",
    url: "https://www.e3a-polytech.fr/annales-et-rapport/",
    description:
      "Concours E3A-Polytech, donnant accès aux écoles Polytech et partenaires. L'épreuve d'informatique distincte n'existe que depuis 2023 (mutualisée avec CCINP). Avant 2023, pas d'épreuve info séparée.",
    examInfo: [
      { label: "Durée", value: "3h" },
      { label: "Langage", value: "Python" },
      { label: "Format", value: "Commun avec CCINP depuis 2023" },
      { label: "Info depuis", value: "2023" },
    ],
    filieres: ["MP", "PSI"],
    coefficients: { MP: 3, PSI: 3 },
    annales: [
      { year: 2025, note: "Disponible sur e3a-polytech.fr", siteUrl: "https://www.e3a-polytech.fr/annales-et-rapport/" },
      { year: 2024, note: "Disponible sur e3a-polytech.fr", siteUrl: "https://www.e3a-polytech.fr/annales-et-rapport/" },
      { year: 2023, note: "Disponible sur e3a-polytech.fr", siteUrl: "https://www.e3a-polytech.fr/annales-et-rapport/" },
    ],
  },
];

export const SOURCES = [
  {
    name: "zbakhinfo",
    desc: "CNC Maroc — sujets + quelques corrigés",
    url: "https://zbakhinfo.odoo.com/cnc",
    color: "#4ade80",
    icon: "📄",
  },
  {
    name: "doc-solus.fr",
    desc: "Index par thème (graphes, arbres, SQL…) toutes banques",
    url: "https://www.doc-solus.fr/prepa/sci/adc/bin/view.index.html?type=outils&matiere=INFO",
    color: "#60a5fa",
    icon: "🗂️",
  },
  {
    name: "bankexam.fr",
    desc: "Agrégateur multi-concours, recherche par matière",
    url: "https://www.bankexam.fr",
    color: "#f472b6",
    icon: "🏦",
  },
  {
    name: "upsti.fr",
    desc: "Annales + rapports toutes filières (UPSTI)",
    url: "https://www.upsti.fr/espace-etudiants/annales-de-concours",
    color: "#a78bfa",
    icon: "📚",
  },
  {
    name: "prepas.org",
    desc: "Portail officiel des prépas scientifiques",
    url: "http://prepas.org",
    color: "#fb923c",
    icon: "🎓",
  },
  {
    name: "Annales CCINP (archive)",
    desc: "Annales 2003–2013 de l'ancien CCP",
    url: "http://oldccp.scei-concours.fr/sccp.php?page=cpge/sujet/sujet_accueil_cpge.html",
    color: "#facc15",
    icon: "🗄️",
  },
];
