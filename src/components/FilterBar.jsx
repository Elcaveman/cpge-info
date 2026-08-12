/**
 * Reusable filter pill row for cheat sheet pages.
 *
 * Props:
 *   label    — row label text (e.g. "CATÉGORIE")
 *   options  — array of { id, label, color? }
 *   value    — currently active option id
 *   onChange — (id) => void
 *   children — optional extra content appended after the pills (e.g. frequency legend)
 */
export function FilterBar({ label, options, value, onChange, children, topSlot }) {
  return (
    <div className="filter-bar">
      {topSlot}
      <div className="filter-row">
        {label && <span className="filter-label flabel">{label}</span>}
        {options.map(opt => (
          <div
            key={opt.id}
            className={`pill ${opt.className ?? ""} ${value === opt.id ? "active" : ""}`.trim()}
            style={opt.color ? { "--pill-color": value === opt.id ? opt.color : "transparent" } : undefined}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
