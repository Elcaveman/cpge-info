export function PageLoader() {
  return (
    <div className="page-loader">
      <svg className="page-loader__svg" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <circle cx="36" cy="36" r="30" stroke="#1a1a2e" strokeWidth="4" />
        <circle
          cx="36" cy="36" r="30"
          stroke="url(#pl-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="104 85"
        />
      </svg>

      <div className="page-loader__text">
        <p className="page-loader__label">
          Loading..<span className="page-loader__cursor">_</span>
        </p>
        <p className="page-loader__brand">By Pivot</p>
      </div>
    </div>
  );
}
