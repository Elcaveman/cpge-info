import "../src/css/landing/common.css";

export const metadata = {
  title: "Pivot | CPGE Info",
  description: "From potential to exceptional — tout ce qu'il te faut pour exceller en informatique.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
