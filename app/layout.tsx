import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Almengi — A little more Korea",
  description:
    "Discover Korea, one surprise at a time. Short quizzes and real perspectives, thoughtfully curated.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="masthead">
          <a href="/" className="brand" aria-label="Almengi home">
            <span className="brand-mark" aria-hidden="true"><img src="/brand/almengi-al.svg" width="40" height="40" alt="" /></span>
            <span className="brand-copy"><span className="brand-wordmark">Almengi</span><span className="brand-tagline">A little more Korea</span></span>
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
