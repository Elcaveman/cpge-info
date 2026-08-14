/**
 * Tokenizes source code using a caller-supplied regex.
 *
 * tokenRegex must have exactly 6 capture groups in this order:
 *   1 comment, 2 string, 3 number, 4 keyword, 5 function/builtin, 6 type/module
 *
 * classMap maps each group index (0-based) to a CSS class name.
 * Returns an array of { text, cls } tokens safe to render as React spans.
 */
export function tokenize(code, tokenRegex, classMap) {
  const out = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      out.push({ text: code.slice(lastIndex, match.index), cls: null });
    }

    let cls = null;
    for (let i = 0; i < classMap.length; i++) {
      if (match[i + 1] !== undefined) { cls = classMap[i]; break; }
    }

    out.push({ text: match[0], cls });
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    out.push({ text: code.slice(lastIndex), cls: null });
  }

  return out;
}
