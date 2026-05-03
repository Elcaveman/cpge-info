import { useState, useMemo } from "react";
import "./PythonCheatSheet.css";

const FONT = "'JetBrains Mono', 'Fira Code', monospace";
const HEADING = "'Rajdhani', 'Chakra Petch', sans-serif";

const CATS = [
  { id: "all",       label: "Toutes",      color: "#fff"     },
  { id: "basics",    label: "Basics",      color: "#4ade80"  },
  { id: "strings",   label: "Strings",     color: "#f472b6"  },
  { id: "lists",     label: "Lists",       color: "#60a5fa"  },
  { id: "dicts",     label: "Dicts",       color: "#a78bfa"  },
  { id: "control",   label: "Control",     color: "#fb923c"  },
  { id: "functions", label: "Functions",   color: "#facc15"  },
  { id: "files",     label: "Files & IO",  color: "#34d399"  },
  { id: "numpy",     label: "NumPy",       color: "#f87171"  },
  { id: "plotly",    label: "Plotly",      color: "#38bdf8"  },
  { id: "sqlite",    label: "SQLite3",     color: "#c084fc"  },
];

const CAT_COLOR = Object.fromEntries(CATS.map(c => [c.id, c.color]));

const SECTIONS = [
  {
    cat: "basics", title: "Python Basics",
    cmds: [
      { code: "x = 42",                           desc: "Assign a variable" },
      { code: "type(x)",                           desc: "Get the type of a value" },
      { code: "print('Hello, world!')",            desc: "Print to console" },
      { code: "input('Enter: ')",                  desc: "Read user input (returns string)" },
      { code: "int(x)  /  float(x)  /  str(x)",   desc: "Type conversion" },
      { code: "len(obj)",                          desc: "Length of string / list / dict…" },
      { code: "range(start, stop, step)",          desc: "Generate a sequence of numbers" },
      { code: "# This is a comment",              desc: "Single-line comment" },
      { code: "x = x if cond else y",             desc: "Ternary (inline if-else)" },
      { code: "isinstance(x, int)",               desc: "Check if x is of a given type" },
      { code: "abs(x)  /  round(x, 2)",           desc: "Absolute value / rounding" },
      { code: "min(a, b)  /  max(a, b)",          desc: "Min and max of values" },
      { code: "import math; math.sqrt(x)",        desc: "Square root via math module" },
    ]
  },
  {
    cat: "strings", title: "Strings",
    cmds: [
      { code: "s = 'hello'  /  s = \"world\"",    desc: "String literals (single or double)" },
      { code: "s.upper()  /  s.lower()",          desc: "Uppercase / lowercase" },
      { code: "s.strip()",                        desc: "Remove leading/trailing whitespace" },
      { code: "s.split(',')",                     desc: "Split string into a list" },
      { code: "','.join(lst)",                    desc: "Join list into a string" },
      { code: "s.replace('a', 'b')",              desc: "Replace substring" },
      { code: "s.startswith('hi')  /  s.endswith('!')", desc: "Check prefix / suffix" },
      { code: "'text' in s",                      desc: "Check if substring exists" },
      { code: "s[0]  /  s[-1]",                  desc: "First / last character" },
      { code: "s[1:4]",                           desc: "Slice characters 1 to 3" },
      { code: "f'Hello {name}!'",                 desc: "f-string formatting (Python 3.6+)" },
      { code: "s.format(name='world')",           desc: "String format method" },
      { code: "len(s)",                           desc: "Length of string" },
    ]
  },
  {
    cat: "lists", title: "Lists",
    cmds: [
      { code: "lst = [1, 2, 3]",                  desc: "Create a list" },
      { code: "lst.append(4)",                    desc: "Add item at the end" },
      { code: "lst.insert(0, 99)",                desc: "Insert at index" },
      { code: "lst.pop()",                        desc: "Remove & return last item" },
      { code: "lst.remove(2)",                    desc: "Remove first occurrence of value" },
      { code: "lst[1]  /  lst[-1]",              desc: "Access by index / last item" },
      { code: "lst[1:3]",                         desc: "Slice a sub-list" },
      { code: "lst.sort()",                       desc: "Sort in place (ascending)" },
      { code: "sorted(lst, reverse=True)",        desc: "Return new sorted list (desc)" },
      { code: "[x**2 for x in lst]",              desc: "List comprehension" },
      { code: "[x for x in lst if x > 0]",       desc: "Filtered list comprehension" },
      { code: "lst1 + lst2",                      desc: "Concatenate two lists" },
      { code: "2 in lst",                         desc: "Check membership" },
      { code: "lst.index(3)",                     desc: "Find index of a value" },
      { code: "len(lst)",                         desc: "Number of elements" },
    ]
  },
  {
    cat: "dicts", title: "Dictionaries & Sets",
    cmds: [
      { code: "d = {'key': 'value'}",             desc: "Create a dictionary" },
      { code: "d['key']",                         desc: "Access value by key (raises KeyError)" },
      { code: "d.get('key', default)",            desc: "Safe access with default" },
      { code: "d['new_key'] = 99",               desc: "Add or update a key" },
      { code: "del d['key']",                     desc: "Delete a key" },
      { code: "d.keys()  /  d.values()",         desc: "All keys / all values" },
      { code: "d.items()",                        desc: "All key-value pairs as tuples" },
      { code: "'key' in d",                       desc: "Check if key exists" },
      { code: "{k: v for k,v in d.items()}",     desc: "Dict comprehension" },
      { code: "s = {1, 2, 3}",                   desc: "Create a set (unique values)" },
      { code: "s.add(4)  /  s.discard(2)",       desc: "Add / remove from set" },
      { code: "s1 & s2  /  s1 | s2  /  s1 - s2", desc: "Intersection / union / difference" },
    ]
  },
  {
    cat: "control", title: "Control Flow",
    cmds: [
      { code: "if x > 0:\n    print('pos')",      desc: "Basic if statement" },
      { code: "if x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ...", desc: "if / elif / else" },
      { code: "for i in range(10):\n    print(i)", desc: "For loop with range" },
      { code: "for item in lst:\n    print(item)", desc: "Iterate over a list" },
      { code: "for i, v in enumerate(lst):",      desc: "Loop with index and value" },
      { code: "for k, v in d.items():",           desc: "Loop over dict key-value pairs" },
      { code: "while x > 0:\n    x -= 1",        desc: "While loop" },
      { code: "break",                             desc: "Exit loop immediately" },
      { code: "continue",                          desc: "Skip to next iteration" },
      { code: "pass",                              desc: "No-op placeholder" },
      { code: "try:\n    ...\nexcept ValueError as e:\n    ...", desc: "Try / except error handling" },
      { code: "finally:\n    ...",                desc: "Always runs after try/except" },
      { code: "raise ValueError('msg')",          desc: "Raise an exception" },
    ]
  },
  {
    cat: "functions", title: "Functions & OOP",
    cmds: [
      { code: "def greet(name):\n    return f'Hi {name}'", desc: "Define a function" },
      { code: "def add(a, b=0):",                 desc: "Function with default argument" },
      { code: "def fn(*args, **kwargs):",          desc: "Variadic positional & keyword args" },
      { code: "lambda x: x * 2",                  desc: "Anonymous function (lambda)" },
      { code: "map(fn, lst)",                      desc: "Apply function to each element" },
      { code: "filter(fn, lst)",                   desc: "Keep elements where fn is True" },
      { code: "sorted(lst, key=lambda x: x[1])", desc: "Sort by custom key" },
      { code: "class Dog:\n    def __init__(self, name):\n        self.name = name", desc: "Define a class" },
      { code: "class Poodle(Dog):",               desc: "Inheritance" },
      { code: "d = Dog('Rex')",                    desc: "Create an instance" },
      { code: "d.name",                            desc: "Access attribute" },
      { code: "@staticmethod  /  @classmethod",   desc: "Static / class method decorators" },
      { code: "def __str__(self): return ...",     desc: "String representation" },
    ]
  },
  {
    cat: "files", title: "Files & I/O",
    cmds: [
      { code: "with open('f.txt', 'r') as f:",    desc: "Open file for reading (safe)" },
      { code: "f.read()",                          desc: "Read entire file as string" },
      { code: "f.readlines()",                     desc: "Read file as list of lines" },
      { code: "with open('f.txt', 'w') as f:",    desc: "Open file for writing" },
      { code: "f.write('text')",                   desc: "Write string to file" },
      { code: "with open('f.txt', 'a') as f:",    desc: "Open file for appending" },
      { code: "import json\njson.dump(d, f)",      desc: "Write dict to JSON file" },
      { code: "json.load(f)",                      desc: "Read JSON file into dict" },
      { code: "import csv\ncsv.reader(f)",         desc: "Read CSV file row by row" },
      { code: "import os\nos.listdir('.')",        desc: "List files in directory" },
      { code: "os.path.exists('file.txt')",        desc: "Check if path exists" },
      { code: "os.makedirs('dir', exist_ok=True)", desc: "Create directory" },
    ]
  },
  {
    cat: "numpy", title: "NumPy",
    cmds: [
      { code: "import numpy as np",               desc: "Import NumPy (standard alias)" },
      { code: "np.array([1, 2, 3])",              desc: "Create a 1D array" },
      { code: "np.zeros((3, 4))",                 desc: "3×4 array of zeros" },
      { code: "np.ones((2, 3))",                  desc: "2×3 array of ones" },
      { code: "np.arange(0, 10, 2)",              desc: "Array from 0 to 8 step 2" },
      { code: "np.linspace(0, 1, 50)",            desc: "50 evenly spaced values 0→1" },
      { code: "a.shape  /  a.dtype",              desc: "Shape tuple / data type" },
      { code: "a.reshape(2, 6)",                  desc: "Reshape without copying data" },
      { code: "a[1, :]  /  a[:, 0]",             desc: "Row 1 / column 0 slice" },
      { code: "a[a > 5]",                         desc: "Boolean mask filtering" },
      { code: "np.sum(a)  /  np.mean(a)",         desc: "Sum / mean of all elements" },
      { code: "np.std(a)  /  np.var(a)",          desc: "Standard deviation / variance" },
      { code: "np.min(a)  /  np.max(a)",          desc: "Min / max value" },
      { code: "np.sort(a)",                        desc: "Sorted copy of array" },
      { code: "np.dot(a, b)  /  a @ b",           desc: "Dot product / matrix multiply" },
      { code: "np.random.rand(3, 3)",             desc: "3×3 random floats [0, 1)" },
      { code: "np.random.randint(0, 10, 5)",      desc: "5 random ints from 0 to 9" },
      { code: "np.concatenate([a, b], axis=0)",   desc: "Stack arrays along axis" },
    ]
  },
  {
    cat: "plotly", title: "Plotly",
    cmds: [
      { code: "import plotly.express as px",      desc: "Import Plotly Express (high-level)" },
      { code: "import plotly.graph_objects as go", desc: "Import low-level graph objects" },
      { code: "px.scatter(df, x='col1', y='col2')", desc: "Scatter plot from DataFrame" },
      { code: "px.line(df, x='date', y='value')", desc: "Line chart" },
      { code: "px.bar(df, x='cat', y='val')",     desc: "Bar chart" },
      { code: "px.histogram(df, x='col')",        desc: "Histogram" },
      { code: "px.pie(df, names='cat', values='val')", desc: "Pie chart" },
      { code: "px.box(df, x='group', y='val')",   desc: "Box plot" },
      { code: "px.scatter(df, color='group')",    desc: "Color points by category" },
      { code: "fig = px.line(df)\nfig.show()",    desc: "Display the figure" },
      { code: "fig.update_layout(title='My Chart', template='plotly_dark')", desc: "Update layout / theme" },
      { code: "fig.update_traces(marker_size=8)", desc: "Customize trace appearance" },
      { code: "fig.add_trace(go.Scatter(x=x, y=y))", desc: "Add a trace manually" },
      { code: "fig.write_html('chart.html')",     desc: "Export as interactive HTML" },
      { code: "fig.write_image('chart.png')",     desc: "Export as static image" },
    ]
  },
  {
    cat: "sqlite", title: "SQLite3",
    cmds: [
      { code: "import sqlite3",                   desc: "Import built-in SQLite module" },
      { code: "conn = sqlite3.connect('db.sqlite')", desc: "Open / create a database file" },
      { code: "conn = sqlite3.connect(':memory:')", desc: "In-memory database (temporary)" },
      { code: "cur = conn.cursor()",              desc: "Create a cursor to execute SQL" },
      { code: "cur.execute('CREATE TABLE ...')",  desc: "Execute a SQL statement" },
      { code: "cur.execute('INSERT INTO t VALUES (?, ?)', (1, 'x'))", desc: "Parameterized insert (safe)" },
      { code: "conn.commit()",                     desc: "Save (commit) changes" },
      { code: "cur.execute('SELECT * FROM t')",   desc: "Run a SELECT query" },
      { code: "cur.fetchall()",                   desc: "Fetch all rows as list of tuples" },
      { code: "cur.fetchone()",                   desc: "Fetch next row only" },
      { code: "for row in cur.execute('SELECT ...'):", desc: "Iterate over results directly" },
      { code: "cur.executemany('INSERT ...', rows)", desc: "Insert many rows at once" },
      { code: "cur.execute('UPDATE t SET col=? WHERE id=?', (v, id))", desc: "Parameterized update" },
      { code: "cur.execute('DELETE FROM t WHERE id=?', (id,))", desc: "Parameterized delete" },
      { code: "conn.close()",                     desc: "Close the connection" },
      { code: "with sqlite3.connect('db.sqlite') as conn:", desc: "Context manager (auto-commit/close)" },
    ]
  },
];

const NAV_ITEMS = [
  { id: "basics",    label: "Basics",      icon: "🐍" },
  { id: "strings",   label: "Strings",     icon: "\"\"" },
  { id: "lists",     label: "Lists",       icon: "[]" },
  { id: "dicts",     label: "Dicts",       icon: "{}" },
  { id: "control",   label: "Control",     icon: "⤵" },
  { id: "functions", label: "Functions",   icon: "ƒ"  },
  { id: "files",     label: "Files & IO",  icon: "📄" },
  { id: "numpy",     label: "NumPy",       icon: "∑"  },
  { id: "plotly",    label: "Plotly",      icon: "📈" },
  { id: "sqlite",    label: "SQLite3",     icon: "🗄"  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Rajdhani:wght@600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0d0f;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    min-height: 100vh;
  }

  .layout { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 200px; min-width: 200px;
    background: #111114;
    border-right: 1px solid #1e1e26;
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0;
    z-index: 10;
  }
  .sidebar-logo {
    padding: 20px 18px 14px;
    border-bottom: 1px solid #1e1e26;
  }
  .logo-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 20px; font-weight: 700;
    color: #fff; letter-spacing: 0.02em;
  }
  .logo-sub {
    font-size: 10px; color: #4b5563;
    margin-top: 3px; letter-spacing: 0.15em;
  }
  .sidebar-nav { flex: 1; padding: 14px 0; overflow-y: auto; }
  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 18px;
    font-size: 12px; color: #6b7280;
    cursor: pointer; transition: all 0.15s;
    border-left: 2px solid transparent;
    user-select: none;
  }
  .nav-item:hover { color: #e2e8f0; background: #16161a; }
  .nav-item.active { color: #fff; background: #16161a; }
  .nav-icon { width: 18px; text-align: center; flex-shrink: 0; }
  .nav-dot {
    width: 6px; height: 6px; border-radius: 50%;
    margin-left: auto; flex-shrink: 0;
  }
  .sidebar-footer {
    padding: 14px 18px;
    border-top: 1px solid #1e1e26;
    font-size: 10px; color: #374151; letter-spacing: 0.05em;
  }
  .progress-bar-bg {
    height: 2px; background: #1e1e26;
    margin-top: 6px; border-radius: 2px; overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4ade80, #38bdf8, #c084fc);
    border-radius: 2px; transition: width 0.5s ease;
  }

  /* ── MAIN ── */
  .main { margin-left: 200px; flex: 1; display: flex; flex-direction: column; }

  .topbar {
    padding: 16px 36px;
    border-bottom: 1px solid #1e1e26;
    background: #111114;
    position: sticky; top: 0; z-index: 5;
    display: flex; align-items: center; justify-content: space-between;
  }
  .topbar-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 22px; font-weight: 700;
    color: #fff; letter-spacing: 0.04em;
  }
  .search-input {
    background: #1a1a20; border: 1px solid #2a2a35;
    border-radius: 6px; color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; padding: 7px 14px; width: 230px;
    outline: none; transition: border-color 0.15s;
  }
  .search-input::placeholder { color: #4b5563; }
  .search-input:focus { border-color: #4b5563; }

  .content { padding: 30px 36px; }

  .page-heading {
    font-family: 'Rajdhani', sans-serif;
    font-size: 32px; font-weight: 700;
    color: #fff; margin-bottom: 6px; letter-spacing: 0.02em;
  }
  .page-sub {
    font-size: 11px; color: #4b5563;
    letter-spacing: 0.1em; margin-bottom: 26px;
  }
  .page-sub span { margin-right: 8px; }
  .page-sub span::after { content: ' ·'; margin-left: 8px; color: #2a2a35; }
  .page-sub span:last-child::after { content: ''; }

  /* ── FILTER BAR ── */
  .filter-bar {
    background: #111114;
    border: 1px solid #1e1e26;
    border-radius: 10px; padding: 16px 20px;
    margin-bottom: 22px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .filter-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .filter-label {
    font-size: 9px; letter-spacing: 0.18em;
    color: #4b5563; width: 70px; flex-shrink: 0;
  }
  .pill {
    font-size: 11px; padding: 5px 13px;
    border-radius: 20px; border: 1px solid #2a2a35;
    background: transparent; color: #9ca3af;
    cursor: pointer; font-family: inherit;
    transition: all 0.15s; user-select: none; white-space: nowrap;
  }
  .pill:hover { border-color: #4b5563; color: #e2e8f0; }
  .pill.active { color: #0d0d0f; border-color: transparent; font-weight: 600; }

  /* ── LEGEND ── */
  .legend {
    display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;
  }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #9ca3af; }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* ── SECTION ── */
  .section {
    background: #111114; border: 1px solid #1e1e26;
    border-radius: 10px; margin-bottom: 14px; overflow: hidden;
  }
  .section-header {
    padding: 11px 20px; border-bottom: 1px solid #1e1e26;
    display: flex; align-items: center; gap: 10px;
  }
  .section-color-bar { width: 3px; height: 14px; border-radius: 2px; flex-shrink: 0; }
  .section-title-text {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px; font-weight: 600;
    color: #e2e8f0; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .section-count {
    margin-left: auto;
    background: #1a1a20; border: 1px solid #2a2a35;
    border-radius: 10px; padding: 2px 9px;
    font-size: 10px; color: #4b5563;
  }

  /* ── CMD ROW ── */
  .cmd-table { width: 100%; border-collapse: collapse; }
  .cmd-row {
    border-bottom: 1px solid #16161a;
    cursor: pointer; transition: background 0.1s;
  }
  .cmd-row:last-child { border-bottom: none; }
  .cmd-row:hover { background: #16161a; }
  .cmd-row.copied { background: #0f2520; }

  .cmd-cell-code {
    padding: 9px 20px; font-size: 11.5px; width: 55%;
    vertical-align: top; white-space: pre;
    line-height: 1.6;
  }
  .cmd-cell-desc {
    padding: 9px 20px; font-size: 11px;
    color: #6b7280; border-left: 1px solid #16161a;
    width: 45%; vertical-align: middle;
  }

  /* syntax colours */
  .py-kw  { color: #f472b6; font-weight: 600; }  /* keywords: def, import, for… */
  .py-fn  { color: #60a5fa; }                     /* built-ins / methods */
  .py-str { color: #fbbf24; }                     /* strings */
  .py-cm  { color: #4b5563; font-style: italic; } /* comments */
  .py-num { color: #a78bfa; }                     /* numbers */
  .py-op  { color: #f87171; }                     /* operators */
  .py-mod { color: #34d399; font-weight: 600; }   /* module names */

  .copy-badge {
    display: inline-block; font-size: 9px;
    padding: 2px 6px; border-radius: 4px;
    background: #0f2520; color: #4ade80;
    margin-left: 8px; opacity: 0; transition: opacity 0.2s;
    vertical-align: middle; white-space: nowrap;
  }
  .cmd-row.copied .copy-badge { opacity: 1; }

  .no-results {
    padding: 48px; text-align: center;
    color: #374151; font-size: 13px;
  }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 2px; }

// Very lightweight syntax highlighter for Python snippets
function highlight(code) {
  // We'll do a simple token-based approach
  const keywords = /\b(import|from|as|def|class|return|if|elif|else|for|while|in|not|and|or|break|continue|pass|try|except|finally|raise|with|lambda|True|False|None|self)\b/g;
  const builtins = /\b(print|input|len|type|int|float|str|list|dict|set|tuple|range|enumerate|map|filter|sorted|min|max|sum|abs|round|open|isinstance|staticmethod|classmethod|super|zip|any|all|hasattr|getattr|setattr)\b/g;
  const modules  = /\b(np|px|go|json|csv|os|math|sqlite3|conn|cur|fig|df)\b/g;
  const strings  = /(f?'[^']*'|f?"[^"]*")/g;
  const comments = /(#.*)/g;
  const numbers  = /\b(\d+\.?\d*)\b/g;

  // Escape HTML first
  let s = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply highlights (order matters — comments last to override)
  s = s.replace(strings,  m => `<span class="py-str">${m}</span>`);
  s = s.replace(numbers,  m => `<span class="py-num">${m}</span>`);
  s = s.replace(keywords, m => `<span class="py-kw">${m}</span>`);
  s = s.replace(builtins, m => `<span class="py-fn">${m}</span>`);
  s = s.replace(modules,  m => `<span class="py-mod">${m}</span>`);
  s = s.replace(comments, m => `<span class="py-cm">${m}</span>`);

  return s;
}

export default function PythonCheatSheet() {
  const [activeCat, setActiveCat]   = useState("all");
  const [search,    setSearch]      = useState("");
  const [copied,    setCopied]      = useState(null);
  const [activeNav, setActiveNav]   = useState(null);

  const filtered = useMemo(() => {
    return SECTIONS
      .filter(s => activeCat === "all" || s.cat === activeCat)
      .map(s => ({
        ...s,
        cmds: s.cmds.filter(c => {
          if (!search) return true;
          const q = search.toLowerCase();
          return c.code.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
        })
      }))
      .filter(s => s.cmds.length > 0);
  }, [activeCat, search]);

  const total  = SECTIONS.reduce((a, s) => a + s.cmds.length, 0);
  const shown  = filtered.reduce((a, s) => a + s.cmds.length, 0);
  const progress = Math.round((shown / total) * 100);

  function copy(code, id) {
    const raw = code.replace(/\n/g, "\n");
    navigator.clipboard.writeText(raw).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  }

  function scrollTo(catId) {
    setActiveCat("all");
    setSearch("");
    setActiveNav(catId);
    setTimeout(() => {
      const el = document.getElementById("sec-" + catId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <div className="python-cheat">
      <div className="layout">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-title">Py Ref</div>
            <div className="logo-sub">PYTHON · NUMPY · PLOTLY</div>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map(n => (
              <div
                key={n.id}
                className={`nav-item ${activeNav === n.id ? "active" : ""}`}
                style={{ '--cat-color': CAT_COLOR[n.id] }}
                onClick={() => scrollTo(n.id)}
              >
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                <span className="nav-dot" style={{ '--cat-color': CAT_COLOR[n.id] }} />
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            VISIBLE · {shown}/{total}
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          <div className="topbar">
            <div className="topbar-title">Python Cheat Sheet</div>
            <input
              className="search-input"
              placeholder="Search commands..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCat("all"); setActiveNav(null); }}
            />
          </div>

          <div className="content">
            <h1 className="page-heading">Python — Référence Débutant</h1>
            <div className="page-sub">
              {["Basics", "Strings", "Lists", "Dicts", "Control", "Functions", "Files", "NumPy", "Plotly", "SQLite3"].map(l => (
                <span key={l}>{l}</span>
              ))}
            </div>

            {/* FILTER BAR */}
            <div className="filter-bar">
              <div className="filter-row">
                <span className="filter-label">CATÉGORIE</span>
                {CATS.map(c => (
                  <div
                    key={c.id}
                    className={`pill ${activeCat === c.id ? "active" : ""}`}
                    style={{ '--pill-color': activeCat === c.id ? c.color : 'transparent' }}
                    onClick={() => { setActiveCat(c.id); setSearch(""); setActiveNav(null); }}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>

            {/* LEGEND */}
            <div className="legend">
              {CATS.filter(c => c.id !== "all").map(c => (
                <div key={c.id} className="legend-item">
                  <div className="legend-dot" style={{ '--legend-color': c.color }} />
                  {c.label}
                </div>
              ))}
            </div>

            {/* SECTIONS */}
            {filtered.length === 0 && (
              <div className="no-results">No commands match "{search}"</div>
            )}

            {filtered.map(sec => {
              const color = CAT_COLOR[sec.cat];
              return (
                <div key={sec.cat} id={"sec-" + sec.cat} className="section">
                  <div className="section-header">
                    <div className="section-color-bar" style={{ '--section-color': color }} />
                    <span className="section-title-text">{sec.title}</span>
                    <span className="section-count">{sec.cmds.length} cmds</span>
                  </div>
                  <table className="cmd-table">
                    <tbody>
                      {sec.cmds.map((c, i) => {
                        const rowId = sec.cat + "-" + i;
                        const isMultiLine = c.code.includes("\n");
                        return (
                          <tr
                            key={i}
                            className={`cmd-row ${copied === rowId ? "copied" : ""}`}
                            onClick={() => copy(c.code, rowId)}
                            title="Click to copy"
                          >
                            <td className="cmd-cell-code">
                              <span
                                dangerouslySetInnerHTML={{ __html: highlight(c.code) }}
                              />
                              <span className="copy-badge">copied!</span>
                            </td>
                            <td className="cmd-cell-desc">{c.desc}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
