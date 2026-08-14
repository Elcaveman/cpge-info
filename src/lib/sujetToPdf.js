const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 18;
const MARGIN_Y = 22;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const COLORS = {
  bg: [9, 9, 15],
  surface: [16, 16, 28],
  surfaceAlt: [22, 22, 36],
  text: [226, 232, 240],
  muted: [100, 110, 130],
  faint: [55, 60, 75],
  cyan: [96, 165, 250],
  purple: [192, 132, 252],
  green: [74, 222, 128],
  orange: [251, 146, 60],
  red: [248, 113, 113],
  yellow: [250, 204, 21],
  codeBg: [13, 17, 23],
  codeFg: [195, 232, 141],
  pitfallBg: [40, 18, 18],
  pitfallBdr: [248, 113, 113],
};

const TYPE_COLOR = {
  python: COLORS.green,
  sql: COLORS.cyan,
  algo: COLORS.purple,
  cours: COLORS.muted,
};

const PRIORITY_COLOR = {
  P0: COLORS.red,
  P1: COLORS.orange,
  P2: COLORS.yellow,
};

function setFill(doc, rgb) {
  doc.setFillColor(...rgb);
}

function setColor(doc, rgb) {
  doc.setTextColor(...rgb);
  doc.setDrawColor(...rgb);
}

function fillRoundRect(doc, x, y, w, h, r, color) {
  setFill(doc, color);
  doc.roundedRect(x, y, w, h, r, r, "F");
}

function leftBorder(doc, x, y, h, color, thickness = 0.8) {
  doc.setDrawColor(...color);
  doc.setLineWidth(thickness);
  doc.line(x, y, x, y + h);
}

function ensureSpace(doc, y, needed, state) {
  if (y + needed > PAGE_H - MARGIN_Y) {
    doc.addPage();
    drawPageBackground(doc);
    drawPageFooter(doc, state);
    return MARGIN_Y + 8;
  }

  return y;
}

function drawPageBackground(doc) {
  setFill(doc, COLORS.bg);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
}

function drawPageFooter(doc, state) {
  const pageNum = doc.internal.getCurrentPageInfo().pageNumber;

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  setColor(doc, COLORS.faint);
  doc.text(`Pivot · ${state.concours} ${state.year} · Informatique`, MARGIN_X, PAGE_H - 8);
  doc.text(`${pageNum}`, PAGE_W - MARGIN_X, PAGE_H - 8, { align: "right" });

  doc.setDrawColor(...COLORS.faint);
  doc.setLineWidth(0.2);
  doc.line(MARGIN_X, PAGE_H - 11, PAGE_W - MARGIN_X, PAGE_H - 11);
}

function drawCoverPage(doc, sujet) {
  drawPageBackground(doc);

  setFill(doc, COLORS.surface);
  doc.rect(0, 0, PAGE_W, 60, "F");

  setFill(doc, COLORS.cyan);
  doc.rect(0, 58, PAGE_W, 0.5, "F");

  doc.setFontSize(11);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.cyan);
  doc.text("Pivot", MARGIN_X, 20);

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  setColor(doc, COLORS.muted);
  doc.text("CORRECTION OFFICIELLE", MARGIN_X, 26);

  doc.setFontSize(28);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.text);
  doc.text(`${sujet.concours}`, MARGIN_X, 90);

  doc.setFontSize(22);
  setColor(doc, COLORS.cyan);
  doc.text(`${sujet.year}`, MARGIN_X, 104);

  doc.setFontSize(16);
  setColor(doc, COLORS.purple);
  doc.text("Informatique", MARGIN_X, 116);

  let metaY = 135;
  const metaItems = [
    ["Filières", sujet.filieres.join("  /  ")],
    ["Durée", sujet.duree || "—"],
    ["Concours", sujet.concours],
    ["Tags", (sujet.tags || []).join(", ")],
  ];

  metaItems.forEach(([label, value]) => {
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    setColor(doc, COLORS.muted);
    doc.text(label.toUpperCase(), MARGIN_X, metaY);

    doc.setFontSize(9);
    doc.setFont("courier", "bold");
    setColor(doc, COLORS.text);
    doc.text(String(value), MARGIN_X + 28, metaY);
    metaY += 9;
  });

  metaY += 10;
  doc.setFontSize(8);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.muted);
  doc.text("SOMMAIRE", MARGIN_X, metaY);
  metaY += 6;

  doc.setDrawColor(...COLORS.faint);
  doc.setLineWidth(0.2);
  doc.line(MARGIN_X, metaY, PAGE_W - MARGIN_X, metaY);
  metaY += 5;

  let questionCount = 0;

  sujet.parties.forEach((partie) => {
    doc.setFontSize(8);
    doc.setFont("courier", "bold");
    setColor(doc, COLORS.text);
    doc.text(`Partie ${partie.id}  —  ${partie.title}`, MARGIN_X, metaY);

    doc.setFontSize(7.5);
    doc.setFont("courier", "normal");
    setColor(doc, COLORS.muted);
    doc.text(
      `${partie.questions.length} question${partie.questions.length > 1 ? "s" : ""}`,
      PAGE_W - MARGIN_X,
      metaY,
      { align: "right" },
    );
    metaY += 5;

    partie.questions.forEach((question) => {
      questionCount += 1;
      doc.setFontSize(7);
      doc.setFont("courier", "normal");
      setColor(doc, COLORS.faint);
      doc.text(`  Q ${question.id}  ${question.text}`, MARGIN_X + 4, metaY);
      metaY += 4;
    });

    metaY += 2;
  });

  metaY += 4;
  doc.setFontSize(8);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.cyan);
  doc.text(`${questionCount} question${questionCount > 1 ? "s" : ""} au total`, MARGIN_X, metaY);

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  setColor(doc, COLORS.faint);
  doc.text("prepainfo.com  ·  Pivot", PAGE_W / 2, PAGE_H - 14, { align: "center" });
}

function drawPartieHeader(doc, partie, y, state) {
  y = ensureSpace(doc, y, 20, state);

  setFill(doc, COLORS.surface);
  doc.rect(MARGIN_X, y, CONTENT_W, 13, "F");

  setFill(doc, COLORS.cyan);
  doc.rect(MARGIN_X, y, 2, 13, "F");

  doc.setFontSize(7);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.muted);
  doc.text(`PARTIE  ${partie.id}`, MARGIN_X + 6, y + 5);

  doc.setFontSize(11);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.text);
  doc.text(partie.title, MARGIN_X + 6, y + 10.5);

  doc.setFontSize(7);
  doc.setFont("courier", "normal");
  setColor(doc, COLORS.muted);
  doc.text(
    `${partie.questions.length} question${partie.questions.length > 1 ? "s" : ""}`,
    PAGE_W - MARGIN_X,
    y + 10.5,
    { align: "right" },
  );

  return y + 18;
}

function drawQuestion(doc, question, y, state) {
  const lineHeight = 4.5;
  const codeLineHeight = 4.8;
  const innerWidth = CONTENT_W - 4;
  const innerX = MARGIN_X + 2;

  y = ensureSpace(doc, y, 24, state);
  fillRoundRect(doc, MARGIN_X, y - 3, CONTENT_W, 9, 1.5, COLORS.surface);

  doc.setFontSize(7);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.muted);
  doc.text(`Q ${question.id}`, MARGIN_X + 3, y + 2.5);

  doc.setFontSize(8.5);
  doc.setFont("courier", "bold");
  setColor(doc, COLORS.text);
  const questionLines = doc.splitTextToSize(question.text || "", CONTENT_W - 48);
  doc.text(questionLines, MARGIN_X + 22, y + 2.5);

  const typeColor = TYPE_COLOR[question.type] || COLORS.muted;
  const priorityColor = PRIORITY_COLOR[question.priority] || COLORS.muted;
  let badgeX = PAGE_W - MARGIN_X - 2;
  doc.setFontSize(7);

  const priorityWidth = doc.getTextWidth(question.priority) + 4;
  setFill(doc, priorityColor.map((channel) => Math.round(channel * 0.12 + 9)));
  doc.roundedRect(badgeX - priorityWidth, y - 1, priorityWidth, 5, 0.8, 0.8, "F");
  setColor(doc, priorityColor);
  doc.setFont("courier", "bold");
  doc.text(question.priority, badgeX - priorityWidth + 2, y + 2.5);
  badgeX -= priorityWidth + 2;

  const typeLabel = (question.type || "?").toUpperCase();
  const typeWidth = doc.getTextWidth(typeLabel) + 4;
  setFill(doc, typeColor.map((channel) => Math.round(channel * 0.12 + 9)));
  doc.roundedRect(badgeX - typeWidth, y - 1, typeWidth, 5, 0.8, 0.8, "F");
  setColor(doc, typeColor);
  doc.text(typeLabel, badgeX - typeWidth + 2, y + 2.5);

  y += questionLines.length > 1 ? 5 + (questionLines.length - 1) * 4 : 9;

  if (question.enonce) {
    y = ensureSpace(doc, y, 14, state);

    doc.setFontSize(6.5);
    doc.setFont("courier", "bold");
    setColor(doc, COLORS.muted);
    doc.text("ÉNONCÉ", innerX, y + 1);
    y += 5;

    fillRoundRect(doc, MARGIN_X, y - 2, CONTENT_W, 2, 1, COLORS.surfaceAlt);

    doc.setFontSize(8);
    doc.setFont("courier", "normal");
    const statementLines = doc.splitTextToSize(question.enonce, innerWidth - 4);
    const statementHeight = statementLines.length * lineHeight + 8;

    y = ensureSpace(doc, y, statementHeight, state);
    fillRoundRect(doc, MARGIN_X, y - 2, CONTENT_W, statementHeight, 1.5, COLORS.surfaceAlt);
    setColor(doc, COLORS.text);
    doc.text(statementLines, innerX + 2, y + 2.8);
    y += statementHeight + 3;
  }

  y = ensureSpace(doc, y, 8, state);
  doc.setFontSize(6.5);
  doc.setFont("courier", "bold");
  setColor(doc, typeColor);
  doc.text("✦  CORRECTION", innerX, y + 1);
  y += 5;

  if (question.code) {
    const codeLines = question.code.split("\n");
    const codeHeight = codeLines.length * codeLineHeight + 8;

    y = ensureSpace(doc, y, Math.min(codeHeight, 60), state);
    fillRoundRect(doc, MARGIN_X, y - 2, CONTENT_W, codeHeight, 2, COLORS.codeBg);
    leftBorder(doc, MARGIN_X, y - 2, codeHeight, typeColor, 1.2);

    doc.setFontSize(7.8);
    doc.setFont("courier", "normal");

    let codeY = y + 3;

    for (let index = 0; index < codeLines.length; index += 1) {
      const line = codeLines[index];

      if (codeY + codeLineHeight > PAGE_H - MARGIN_Y) {
        doc.addPage();
        drawPageBackground(doc);
        drawPageFooter(doc, state);
        codeY = MARGIN_Y + 8;

        const remainingLines = codeLines.slice(index);
        const remainingHeight = remainingLines.length * codeLineHeight + 8;
        fillRoundRect(doc, MARGIN_X, codeY - 2, CONTENT_W, remainingHeight, 2, COLORS.codeBg);
        leftBorder(doc, MARGIN_X, codeY - 2, remainingHeight, typeColor, 1.2);
      }

      if (line.trimStart().startsWith("#") || line.trimStart().startsWith("--")) {
        setColor(doc, COLORS.muted);
      } else if (/^\s*(def|return|for|while|if|elif|else|import|from|class|with|SELECT|FROM|WHERE|JOIN|GROUP BY|ORDER BY|HAVING)\b/.test(line)) {
        setColor(doc, COLORS.purple);
      } else {
        setColor(doc, COLORS.codeFg);
      }

      doc.text(line, innerX + 2, codeY);
      codeY += codeLineHeight;
    }

    y = codeY + 4;
  }

  if (question.complexity) {
    y = ensureSpace(doc, y, 10, state);
    const complexityText = `⏱  ${question.complexity}${question.complexityNote ? `  —  ${question.complexityNote}` : ""}`;

    doc.setFontSize(7.5);
    doc.setFont("courier", "normal");
    const complexityWidth = doc.getTextWidth(complexityText) + 8;
    setFill(doc, COLORS.surfaceAlt);
    doc.setDrawColor(...typeColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(innerX, y - 2, complexityWidth, 6, 1.5, 1.5, "FD");
    setColor(doc, typeColor);
    doc.text(complexityText, innerX + 4, y + 2);
    y += 10;
  }

  if (question.pitfall) {
    y = ensureSpace(doc, y, 18, state);

    doc.setFontSize(7.5);
    doc.setFont("courier", "normal");
    const pitfallLines = doc.splitTextToSize(`⚠  ${question.pitfall}`, innerWidth - 6);
    const pitfallHeight = pitfallLines.length * lineHeight + 8;

    y = ensureSpace(doc, y, pitfallHeight, state);
    fillRoundRect(doc, MARGIN_X, y - 2, CONTENT_W, pitfallHeight, 1.5, COLORS.pitfallBg);
    leftBorder(doc, MARGIN_X, y - 2, pitfallHeight, COLORS.pitfallBdr, 1.5);

    doc.setFontSize(7);
    doc.setFont("courier", "bold");
    setColor(doc, COLORS.red);
    doc.text("PIÈGE CLASSIQUE", innerX + 3, y + 1.5);

    doc.setFont("courier", "normal");
    doc.setFontSize(7.5);
    doc.text(pitfallLines, innerX + 3, y + 6);
    y += pitfallHeight + 4;
  }

  return y + 6;
}

async function getJsPdf() {
  try {
    const mod = await import("jspdf");
    return mod.jsPDF || mod.default;
  } catch {
    if (typeof window !== "undefined" && window.jspdf) {
      return window.jspdf.jsPDF;
    }

    throw new Error("jsPDF not found. Run: npm install jspdf");
  }
}

async function buildSujetPdfDoc(sujet) {
  const jsPDF = await getJsPdf();
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const state = { concours: sujet.concours, year: sujet.year };

  drawCoverPage(doc, sujet);

  sujet.parties.forEach((partie) => {
    doc.addPage();
    drawPageBackground(doc);
    drawPageFooter(doc, state);

    let cursorY = MARGIN_Y;
    cursorY = drawPartieHeader(doc, partie, cursorY, state);

    partie.questions.forEach((question) => {
      cursorY = drawQuestion(doc, question, cursorY, state);
    });
  });

  return doc;
}

export async function exportSujetToPdf(sujet, options = {}) {
  const doc = await buildSujetPdfDoc(sujet);
  const filename = options.filename || `${sujet.concours.toLowerCase()}-${sujet.year}-info-correction.pdf`;

  if (options.openInTab) {
    if (typeof window === "undefined") {
      throw new Error("openInTab is only available in the browser.");
    }

    const blob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return;
  }

  doc.save(filename);
}

export async function sujetToPdfBlob(sujet) {
  const doc = await buildSujetPdfDoc(sujet);
  return new Blob([doc.output("arraybuffer")], { type: "application/pdf" });
}