import LandingApp from "../src/views/landing/LandingApp.jsx";

// No edge runtime — landing is fully static content, prerendered at build time.
// Cloudflare Pages will serve it instantly as a static HTML file from CDN.

export default function HomePage() {
  return <LandingApp />;
}
