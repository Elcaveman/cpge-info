import PrepaApp from "../../../src/views/prepa-info/PrepaApp.jsx";

// All known slug values — Next will prerender each at build time so Cloudflare
// serves them as static HTML files from CDN edge cache instead of running a
// Worker on every request.
export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["resources"] },
    { slug: ["stats"] },
    { slug: ["sql"] },
    { slug: ["python"] },
    { slug: ["cnc"] },
    { slug: ["concours"] },
    { slug: ["contact"] },
  ];
}

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
