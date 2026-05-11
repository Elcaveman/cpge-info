export const required = (v) => typeof v === "string" && v.trim().length > 0;

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const sanitize = (str) =>
  str.replace(/[<>'"&]/g, "").replace(/\n+/g, " ").trim().slice(0, 500);
