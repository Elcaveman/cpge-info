import { useMemo, useState, useCallback } from "react";
import "../css/ContactPage.css";

/* ── tiny inline SVG icons ── */
const Icon = {
  send: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  copy: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  check: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  external: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

const SUBJECTS = ["Question sur un cours", "Bug ou suggestion", "Collaboration", "Autre"];

const EMPTY_FORM = { fname: "", lname: "", email: "", subject: "", message: "" };
const EMPTY_ERRORS = { fname: false, email: false, message: false };

export default function ContactPage({ links = {} }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [errors, setErrors]   = useState(EMPTY_ERRORS);
  const [toast, setToast]     = useState(null); // null | "sent" | { field: "copied", text }
  const [copied, setCopied]   = useState(null); // which row was just copied

  /* ── derived link list ── */
  const contactLinks = useMemo(() => [
    {
      icon: "🐙",
      name: "GitHub",
      value: links.github?.replace(/^https?:\/\//, "") || "github.com",
      badge: "PUBLIC",
      badgeClass: "contact-badge--green",
      href: links.github || "https://github.com",
      isExternal: true,
    },
    {
      icon: "🌐",
      name: "Site Groupe",
      value: links.group?.replace(/^https?:\/\//, "") || "site du groupe",
      badge: "GROUPE",
      badgeClass: "contact-badge--blue",
      href: links.group || "#",
      isExternal: true,
    },
    {
      icon: "📧",
      name: "Email",
      value: (links.email || "mailto:contact@example.com").replace(/^mailto:/, ""),
      badge: "MAIL",
      badgeClass: "contact-badge--orange",
      href: links.email || "mailto:contact@example.com",
      isExternal: false,
    },
  ], [links.github, links.group, links.email]);

  /* ── copy-to-clipboard on row ── */
  const handleCopy = useCallback((e, name, text) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  /* ── form field change ── */
  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  /* ── send ── */
  function handleSend() {
    const newErrors = {
      fname:   !form.fname.trim(),
      email:   !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      message: !form.message.trim(),
    };
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const clean = (str) => str.replace(/[<>]/g, "").trim();

    const subject = encodeURIComponent(
      `[Prepa Info] ${clean(form.subject) || "Message"} — ${clean(form.fname)} ${clean(form.lname)}`
    );
    const body = encodeURIComponent(
      `De : ${clean(form.fname)} ${clean(form.lname)}\nEmail : ${clean(form.email)}\n\n${clean(form.message)}`
    );

    const link = document.createElement("a");
    link.href = `mailto:${links.email || "02.oudaoud@gmail.com"}?subject=${subject}&body=${body}`;
    link.rel = "noopener noreferrer";
    link.click();

    setToast("sent");
    setTimeout(() => setToast(null), 2500);
    setForm(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
  }

  return (
    <div className="contact-page">

      <div className="content">
        {/* ── heading ── */}
        <div className="contact-heading">
          <h1 className="contact-heading-title">Contact — Prepa Info</h1>
          <p className="contact-breadcrumb">
            <span>Prepa Info</span>
            <span className="contact-breadcrumb-sep">·</span>
            <span>Contact</span>
          </p>
        </div>

        {/* ── links block ── */}
        <div className="section-block">
          <div className="section-header">
            <span className="section-title">
              <span className="section-title-bar" />
              Liens &amp; Réseaux
            </span>
            <span className="section-count">{contactLinks.length} liens</span>
          </div>

          <div className="contact-links-list">
            {contactLinks.map(({ icon, name, value, badge, badgeClass, href, isExternal }) => (
              <a
                key={name}
                className={`contact-row${copied === name ? " contact-row--copied" : ""}`}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel="noopener noreferrer"
                title={`Ouvrir ${name}`}
              >
                <span className="contact-row-icon">{icon}</span>
                <span className="contact-row-name">{name}</span>
                <span className="contact-row-value">{value}</span>
                <span className="contact-row-actions">
                  <button
                    className="contact-copy-btn"
                    title="Copier"
                    onClick={(e) => handleCopy(e, name, value)}
                  >
                    {copied === name ? Icon.check : Icon.copy}
                  </button>
                  <span className={`contact-row-badge ${badgeClass}`}>{badge}</span>
                  <span className="contact-row-ext">{Icon.external}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── form block ── */}
        <div className="section-block">
          <div className="section-header">
            <span className="section-title">
              <span className="section-title-bar section-title-bar--orange" />
              Envoyer un message
            </span>
            <span className="section-count">formulaire</span>
          </div>

          <div className="contact-form-inner">
            <div className="contact-form-grid">

              {/* Prénom */}
              <label className={`contact-label${errors.fname ? " contact-label--error" : ""}`}>
                <span className="contact-label-text">
                  Prénom <span className="contact-required">*</span>
                </span>
                <input
                  className="search contact-input"
                  value={form.fname}
                  onChange={set("fname")}
                  placeholder="John"
                  autoComplete="given-name"
                />
                {errors.fname && <span className="contact-error-msg">Champ requis</span>}
              </label>

              {/* Nom */}
              <label className="contact-label">
                <span className="contact-label-text">Nom</span>
                <input
                  className="search contact-input"
                  value={form.lname}
                  onChange={set("lname")}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </label>

              {/* Email */}
              <label className={`contact-label${errors.email ? " contact-label--error" : ""}`}>
                <span className="contact-label-text">
                  Email <span className="contact-required">*</span>
                </span>
                <input
                  className="search contact-input"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="mail@example.com"
                  autoComplete="email"
                />
                {errors.email && <span className="contact-error-msg">Email invalide</span>}
              </label>

              {/* Sujet */}
              <label className="contact-label">
                <span className="contact-label-text">Sujet</span>
                <select
                  className="contact-select"
                  value={form.subject}
                  onChange={set("subject")}
                >
                  <option value="">Choisir…</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              {/* Message */}
              <label className={`contact-label contact-label--full${errors.message ? " contact-label--error" : ""}`}>
                <span className="contact-label-text">
                  Message <span className="contact-required">*</span>
                </span>
                <textarea
                  className="search contact-input contact-textarea"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Décrivez votre demande…"
                />
                {errors.message && <span className="contact-error-msg">Champ requis</span>}
              </label>
            </div>

            <div className="contact-form-actions">
              <span className="results-count">// réponse sous 48h</span>
              <button type="button" className="reset-btn contact-send-btn" onClick={handleSend}>
                {Icon.send}
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── toast ── */}
      <div className={`contact-toast${toast === "sent" ? " contact-toast--show" : ""}`}>
        {Icon.check}
        Message envoyé !
      </div>
    </div>
  );
}
