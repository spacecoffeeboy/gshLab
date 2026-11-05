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
            <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 128 128" focusable="false"><rect width="128" height="128" rx="24" fill="#111111"/><g fill="#D8F36A"><path fillRule="evenodd" d="M17 91 36 36h15l19 55H55l-3.5-12h-17L31 91Zm20-23h11L42.5 49Z"/><path d="M76 36h14v42h23v13H76Z"/></g></svg></span>almengi
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
