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
            <span className="brand-mark">a</span>almengi
            <span className="korean">알맹이</span>
          </a>
          <span className="header-note">A little more Korea.</span>
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
