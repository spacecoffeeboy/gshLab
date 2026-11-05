"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="empty">
      <h1>Let’s try that again.</h1>
      <p>We couldn’t load this discovery.</p>
      <button className="primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
