import { downloadBlob } from "./utils.js";

export function JsonPreview({ sujet, onNotice }) {
  const json = JSON.stringify(sujet, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      onNotice("JSON copié dans le presse-papiers.");
    } catch {
      onNotice("Impossible de copier le JSON automatiquement.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: "application/json" });
    downloadBlob(blob, `${sujet.concours.toLowerCase()}-${sujet.year}-info.json`);
    onNotice("Fichier JSON exporté.");
  };

  return (
    <section className="sujet-panel">
      <div className="sujet-panel__header sujet-panel__header--spread">
        <div className="sujet-panel__eyebrow">Aperçu JSON — prêt à importer</div>
        <div className="sujet-inline-actions sujet-inline-actions--tight">
          <button type="button" className="sujet-icon-btn" onClick={handleCopy}>Copier</button>
          <button type="button" className="sujet-icon-btn sujet-icon-btn--success" onClick={handleDownload}>↓ Télécharger .json</button>
        </div>
      </div>
      <pre className="sujet-json-output">{json}</pre>
    </section>
  );
}
