import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Almeng-E — A little more Korea",
  description:
    "How well do you know Korea? Start with one little question and discover a little more.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="masthead">
          <a href="/" className="brand" aria-label="Almeng-E home">
            <span className="brand-mark" aria-hidden="true">
              <img src="/brand/almengi-al.svg" width="40" height="40" alt="" />
            </span>
            <span className="brand-copy">
              <span className="brand-wordmark">Almeng-E</span>
              <span className="brand-tagline">A little more Korea</span>
            </span>
          </a>
        </header>
        {children}
        <footer>
          <span>Curiosity looks good on you.</span>
          <span>
            Made for a closer look at Korea. <span aria-hidden="true">→</span>
          </span>
        </footer>
      </body>
    </html>
  );
}
