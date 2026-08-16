import "../src/css/landing/common.css";

const SITE_URL = "https://prepainfo.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pivot — Prépa Info | Ressources CPGE Informatique MP PC PSI PT",
    template: "%s | Pivot — Prépa Info",
  },
  description:
    "Pivot est la plateforme prépa info gratuite pour les CPGE informatique (MP, PC, PSI, PT) : checklist du programme 2025, aide mémoire Python et SQL, algorithmes classiques du CNC, annales de concours corrigées.",
  keywords: [
    "prépa info",
    "prepa info",
    "CPGE informatique",
    "MP2I",
    "classe préparatoire informatique",
    "programme informatique CPGE",
    "annales CNC informatique",
    "Python prépa",
    "SQL prépa",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Pivot — Prépa Info",
    title: "Pivot — Prépa Info | Ressources CPGE Informatique",
    description:
      "Checklist du programme, aide mémoire Python et SQL, algorithmes classiques du CNC, annales corrigées — tout pour la prépa info, gratuit.",
    images: ["/pivot-icon.svg"],
  },
  twitter: {
    card: "summary",
    title: "Pivot — Prépa Info",
    description:
      "La plateforme gratuite pour les préparationnaires en informatique (MP, PC, PSI, PT).",
    images: ["/pivot-icon.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Pivot",
  alternateName: "Pivot — Prépa Info",
  url: SITE_URL,
  logo: `${SITE_URL}/pivot-icon.svg`,
  description:
    "Plateforme gratuite de ressources pour les classes préparatoires informatique (MP, PC, PSI, PT) : checklist du programme, aide mémoire Python/SQL, algorithmes CNC, annales de concours.",
  sameAs: ["https://github.com/Elcaveman/cpge-info"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
