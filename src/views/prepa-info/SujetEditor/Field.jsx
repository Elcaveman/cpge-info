export function Field({ label, required = false, children, className = "" }) {
  return (
    <div className={`sujet-field ${className}`.trim()}>
      <div className="sujet-field__label">
        <span>{label}</span>
        {required ? <span className="sujet-field__required">*</span> : null}
      </div>
      {children}
    </div>
  );
}
