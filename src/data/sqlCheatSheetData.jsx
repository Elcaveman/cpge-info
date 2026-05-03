// SQL Cheat Sheet - Data
export const CATS = [
  { id: "all",        label: "Toutes",       color: "#fff" },
  { id: "basics",     label: "Basics",       color: "#4ade80" },
  { id: "filtering",  label: "Filtering",    color: "#f472b6" },
  { id: "joins",      label: "Joins",        color: "#60a5fa" },
  { id: "aggregation",label: "Aggregation",  color: "#a78bfa" },
  { id: "ddl",        label: "DDL",          color: "#fb923c" },
  { id: "dml",        label: "DML",          color: "#facc15" },
  { id: "subqueries", label: "Subqueries",   color: "#34d399" },
  { id: "advanced",   label: "Advanced",     color: "#f87171" },
];

export const SECTIONS = [
  {
    cat: "basics", title: "Basic Queries",
    cmds: [
      { kw: "SELECT * FROM", rest: "table",                        desc: "Select all columns" },
      { kw: "SELECT", rest: "col1, col2 FROM table",               desc: "Select specific columns" },
      { kw: "SELECT DISTINCT", rest: "col FROM table",             desc: "Remove duplicate rows" },
      { kw: "SELECT * FROM", rest: "table LIMIT 10",               desc: "Limit rows returned" },
      { kw: "ORDER BY", rest: "col ASC | DESC",                    desc: "Sort results" },
      { kw: "SELECT", rest: "col AS alias FROM table",             desc: "Rename column (alias)" },
    ]
  },
  {
    cat: "filtering", title: "Filtering & Conditions",
    cmds: [
      { kw: "WHERE", rest: "col = 'value'",                        desc: "Filter by equality" },
      { kw: "WHERE", rest: "col BETWEEN 10 AND 50",                desc: "Range filter (inclusive)" },
      { kw: "WHERE", rest: "col IN ('a', 'b', 'c')",              desc: "Match list of values" },
      { kw: "WHERE", rest: "col NOT IN ('a', 'b')",               desc: "Exclude list of values" },
      { kw: "WHERE", rest: "col IS NULL",                          desc: "Column has no value" },
      { kw: "WHERE", rest: "col IS NOT NULL",                      desc: "Column has a value" },
      { kw: "WHERE", rest: "col LIKE '%text%'",                    desc: "Pattern match (% = any)" },
      { kw: "WHERE", rest: "col LIKE 't_xt'",                     desc: "Pattern match (_ = one char)" },
      { kw: "WHERE", rest: "a = 1 AND b = 2",                     desc: "Both conditions true" },
      { kw: "WHERE", rest: "a = 1 OR b = 2",                      desc: "Either condition true" },
    ]
  },
  {
    cat: "joins", title: "Joins",
    cmds: [
      { kw: "INNER JOIN", rest: "t2 ON t1.id = t2.id",            desc: "Rows matching in both tables" },
      { kw: "LEFT JOIN",  rest: "t2 ON t1.id = t2.id",            desc: "All left + matched right" },
      { kw: "RIGHT JOIN", rest: "t2 ON t1.id = t2.id",            desc: "All right + matched left" },
      { kw: "FULL OUTER JOIN", rest: "t2 ON t1.id = t2.id",       desc: "All rows from both tables" },
      { kw: "CROSS JOIN", rest: "t2",                              desc: "Every combination of rows" },
      { kw: "FROM", rest: "t AS a JOIN t AS b ON a.id = b.pid",   desc: "Self join" },
    ]
  },
  {
    cat: "aggregation", title: "Aggregation & Grouping",
    cmds: [
      { kw: "COUNT(*)",  rest: "",                                  desc: "Count all rows" },
      { kw: "COUNT(",    rest: "col)",                              desc: "Count non-null values" },
      { kw: "SUM(",      rest: "col)",                              desc: "Sum of values" },
      { kw: "AVG(",      rest: "col)",                              desc: "Average of values" },
      { kw: "MIN(",      rest: "col) / MAX(col)",                  desc: "Smallest / largest value" },
      { kw: "GROUP BY",  rest: "col",                              desc: "Group rows for aggregation" },
      { kw: "GROUP BY",  rest: "col HAVING COUNT(*) > 5",          desc: "Filter groups (post-aggregation)" },
    ]
  },
  {
    cat: "ddl", title: "DDL — Define Structure",
    cmds: [
      { kw: "CREATE TABLE", rest: "t (id INT, name VARCHAR(100))", desc: "Create new table" },
      { kw: "DROP TABLE",   rest: "t",                             desc: "Delete table permanently" },
      { kw: "DROP TABLE IF EXISTS", rest: "t",                     desc: "Drop only if it exists" },
      { kw: "ALTER TABLE",  rest: "t ADD col INT",                 desc: "Add a column" },
      { kw: "ALTER TABLE",  rest: "t DROP COLUMN col",             desc: "Remove a column" },
      { kw: "ALTER TABLE",  rest: "t RENAME TO new_name",          desc: "Rename a table" },
      { kw: "CREATE INDEX", rest: "idx ON t(col)",                 desc: "Index for faster queries" },
      { kw: "CREATE VIEW",  rest: "v AS SELECT ...",               desc: "Saved virtual query" },
    ]
  },
  {
    cat: "dml", title: "DML — Modify Data",
    cmds: [
      { kw: "INSERT INTO", rest: "t (col) VALUES ('val')",         desc: "Insert a new row" },
      { kw: "INSERT INTO", rest: "t SELECT * FROM t2",             desc: "Insert from another table" },
      { kw: "UPDATE",      rest: "t SET col = 'val' WHERE id = 1", desc: "Update existing rows" },
      { kw: "DELETE FROM", rest: "t WHERE id = 1",                 desc: "Delete specific rows" },
      { kw: "TRUNCATE TABLE", rest: "t",                           desc: "Delete all rows (fast)" },
    ]
  },
  {
    cat: "subqueries", title: "Subqueries & CTEs",
    cmds: [
      { kw: "WHERE", rest: "col = (SELECT MAX(col) FROM t)",       desc: "Subquery in WHERE" },
      { kw: "WHERE EXISTS", rest: "(SELECT 1 FROM t2 WHERE ...)",  desc: "Check if subquery returns rows" },
      { kw: "FROM", rest: "(SELECT ...) AS sub",                   desc: "Derived table in FROM" },
      { kw: "WITH", rest: "cte AS (SELECT ...) SELECT * FROM cte", desc: "CTE — named temp result" },
      { kw: "WITH RECURSIVE", rest: "cte AS (...)",                desc: "Recursive CTE" },
    ]
  },
  {
    cat: "advanced", title: "Advanced & Window Functions",
    cmds: [
      { kw: "ROW_NUMBER()", rest: "OVER (PARTITION BY col ORDER BY col)", desc: "Row number per partition" },
      { kw: "RANK()",       rest: "OVER (ORDER BY col)",            desc: "Rank with gaps on ties" },
      { kw: "DENSE_RANK()", rest: "OVER (ORDER BY col)",            desc: "Rank without gaps on ties" },
      { kw: "LAG(",         rest: "col, 1) OVER (ORDER BY col)",    desc: "Value from previous row" },
      { kw: "LEAD(",        rest: "col, 1) OVER (ORDER BY col)",    desc: "Value from next row" },
      { kw: "SUM(",         rest: "col) OVER (ORDER BY date)",      desc: "Running total" },
      { kw: "CASE WHEN",    rest: "x > 0 THEN 'pos' ELSE 'neg' END", desc: "Conditional value (if/else)" },
      { kw: "COALESCE(",    rest: "col, 'default')",                desc: "First non-null value" },
      { kw: "NULLIF(",      rest: "col, 0)",                        desc: "Null if values are equal" },
      { kw: "UNION",        rest: "",                               desc: "Combine results, no duplicates" },
      { kw: "UNION ALL",    rest: "",                               desc: "Combine results, keep duplicates" },
      { kw: "CAST(",        rest: "col AS DATE)",                   desc: "Convert data type" },
      { kw: "CONCAT(",      rest: "col1, ' ', col2)",               desc: "Combine strings" },
    ]
  },
];

export const NAV_ITEMS = [
  { id: "basics",      label: "Basics",       icon: "▶" },
  { id: "filtering",   label: "Filtering",    icon: "⌁" },
  { id: "joins",       label: "Joins",        icon: "⋈" },
  { id: "aggregation", label: "Aggregation",  icon: "∑" },
  { id: "ddl",         label: "DDL",          icon: "⬡" },
  { id: "dml",         label: "DML",          icon: "✎" },
  { id: "subqueries",  label: "Subqueries",   icon: "⊂" },
  { id: "advanced",    label: "Advanced",     icon: "◈" },
];
