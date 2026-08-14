import { useState, useMemo } from "react";

/**
 * Shared state and logic for cheat sheet pages.
 *
 * @param {Array}    sections  - Data sections array
 * @param {string}   itemKey   - Key holding the items array on each section ('cmds' or 'algos')
 * @param {Function} matchItem - (item, query) => boolean — custom search predicate
 */
export function useCheatSheet(sections, itemKey, matchItem) {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [activeNav, setActiveNav] = useState(null);

  const filtered = useMemo(() => {
    return sections
      .filter(s => activeCat === "all" || s.cat === activeCat)
      .map(s => ({
        ...s,
        [itemKey]: s[itemKey].filter(item => {
          if (!search) return true;
          return matchItem(item, search.toLowerCase());
        }),
      }))
      .filter(s => s[itemKey].length > 0);
  }, [activeCat, search, sections, itemKey, matchItem]);

  const total = sections.reduce((a, s) => a + s[itemKey].length, 0);
  const shown = filtered.reduce((a, s) => a + s[itemKey].length, 0);
  const progress = total > 0 ? Math.round((shown / total) * 100) : 0;

  function copy(text, id) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  function scrollToSection(catId) {
    setActiveCat("all");
    setSearch("");
    setActiveNav(catId);
    setTimeout(() => {
      document.getElementById("sec-" + catId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return {
    activeCat, setActiveCat,
    search, setSearch,
    copied, copy,
    activeNav,
    scrollToSection,
    filtered, total, shown, progress,
  };
}
