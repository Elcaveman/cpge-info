/**
 * Colored-bar section header used in cheat sheet pages.
 *
 * Props:
 *   title   — section title text
 *   count   — badge text shown at the right (e.g. "12 cmds")
 *   color   — CSS color for the left bar (used via --section-color)
 *   barClass — optional extra class on the bar div (e.g. "cat-basics" for SQL)
 *   className — optional extra class on the wrapper
 */
export function SectionHeader({ title, count, color, barClass = "", className = "" }) {
  return (
    <div className={`section-header sec-header ${className}`.trim()}>
      <div
        className={`section-color-bar sec-bar ${barClass}`.trim()}
        style={color ? { "--section-color": color, background: color } : undefined}
      />
      <span className="section-title-text sec-title">{title}</span>
      {count != null && (
        <span className="section-count sec-count">{count}</span>
      )}
    </div>
  );
}
