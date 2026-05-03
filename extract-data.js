// This script extracts data from JSX pages and creates data files
// Run: node extract-data.js

const fs = require('fs');
const path = require('path');

// Read all JSX files
const cncContent = fs.readFileSync('src/pages/CNCAlgoRef.jsx', 'utf8');
const pythonContent = fs.readFileSync('src/pages/PythonCheatSheet.jsx', 'utf8');
const sqlContent = fs.readFileSync('src/pages/SQLCheatSheet.jsx', 'utf8');
const statsContent = fs.readFileSync('src/pages/Stats.jsx', 'utf8');

function extractBetween(content, startPattern, endPattern) {
  const start = content.indexOf(startPattern);
  if (start === -1) return '';
  const end = content.indexOf(endPattern, start + startPattern.length);
  return content.substring(start, end);
}

// Extract CNC data
const cncData = `export const FONT    = "'JetBrains Mono','Fira Code',monospace";
export const HEADING = "'Rajdhani','Chakra Petch',sans-serif";

${extractBetween(cncContent, 'const CATS = [', '];', 0)}];

export const CC = Object.fromEntries(CATS.map(c=>[c.id,c.color]));

${extractBetween(cncContent, 'const SECTIONS = [', '];', 0)}];

${extractBetween(cncContent, 'const NAV = [', '];', 0)}];
`;

// Extract Python data  
const pythonData = `export const FONT = "'JetBrains Mono', 'Fira Code', monospace";
export const HEADING = "'Rajdhani', 'Chakra Petch', sans-serif";

${extractBetween(pythonContent, 'const CATS = [', '];', 0)}];

export const CAT_COLOR = Object.fromEntries(CATS.map(c => [c.id, c.color]));

${extractBetween(pythonContent, 'const SECTIONS = [', '];', 0)}];

${extractBetween(pythonContent, 'const NAV_ITEMS = [', '];', 0)}];
`;

// Extract SQL data
const sqlData = `${extractBetween(sqlContent, 'const CATS = [', '];', 0)}];

${extractBetween(sqlContent, 'const SECTIONS = [', '];', 0)}];

${extractBetween(sqlContent, 'const NAV_ITEMS = [', '];', 0)}];
`;

// Extract Stats data
const statsData = `${extractBetween(statsContent, 'const ALL_DATA = [', '];', 0)}];

${extractBetween(statsContent, 'const TIMELINES = {', '};', 0)}};

${extractBetween(statsContent, 'const CAT_COLORS = {', '};', 0)}};
`;

console.log('CNC data:', cncData.length, 'bytes');
console.log('Python data:', pythonData.length, 'bytes');
console.log('SQL data:', sqlData.length, 'bytes');
console.log('Stats data:', statsData.length, 'bytes');

// Write files
fs.writeFileSync('src/data/cncAlgoRefData.js', cncData);
fs.writeFileSync('src/data/pythonCheatSheetData.js', pythonData);
fs.writeFileSync('src/data/sqlCheatSheetData.js', sqlData);
fs.writeFileSync('src/data/statsData.js', statsData);

console.log('\nData files created successfully!');
