import "../src/css/landing/common.css";

export const metadata = {
  title: "ODEX",
  description: "From potential to exceptional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
