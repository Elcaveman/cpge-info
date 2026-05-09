import PrepaApp from "../../../src/views/prepa-info/PrepaApp.jsx";

export const runtime = "edge";

const PATH_TO_PAGE = {
  "": "todo",
  resources: "resources",
  stats: "stats",
  sql: "sqlcheatsheet",
  python: "python",
  cnc: "cnc",
  concours: "concours",
  contact: "contact",
};

export default async function PrepaPage({ params }) {
  const { slug: slugParts = [] } = await params;
  const slug = slugParts[0] ?? "";
  const page = PATH_TO_PAGE[slug] ?? "todo";

  return <PrepaApp page={page} />;
}
