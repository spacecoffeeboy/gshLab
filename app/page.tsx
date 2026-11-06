import Link from "next/link";
export default function Home() {
  return (
    <main className="landing-v2">
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">YOUR DAILY DOSE OF DISCOVERY</p>
          <h1 id="welcome-title">
            A little closer
            <br />
            to <em>Korea.</em>
          </h1>
          <p className="welcome-description">
            Small questions. Real stories. Discover the Korea beyond the familiar.
          </p>
          <Link className="primary" href="/discover">
            Start discovering <span aria-hidden="true">→</span>
          </Link>
          <p className="welcome-caption">
            A few minutes. A fresh perspective. No account needed.
          </p>
        </div>
        <div className="alphabet-art">
          <img src="/illustrations/alphabet-bridge.svg" width="520" height="380" alt="A to Z and ㄱ to ㅎ, connected by a small lime spark." />
        </div>
      </section>
      <section className="welcome-formats" aria-labelledby="formats-title">
        <div className="welcome-section-heading">
          <span className="eyebrow">TWO WAYS TO SEE SOMETHING NEW</span>
          <h2 id="formats-title">
            One little question.
            <br />
            More than one kind of discovery.
          </h2>
        </div>
        <div className="welcome-format-grid">
          <article>
            <span className="format-label">01 / QUIZ</span>
            <h3>
              Make a guess.
              <br />
              Find a fact.
            </h3>
            <p>
              Pick an answer, then uncover the explanation and the source behind
              it.
            </p>
            <span className="format-footnote">
              For your “wait, really?” moments.
            </span>
          </article>
          <article>
            <span className="format-label">02 / REVEAL</span>
            <h3>
              A different story.
              <br />A different perspective.
            </h3>
            <p>
              Consider what might happen or what you would do. Then discover
              someone’s experience.
            </p>
            <span className="format-footnote">
              No scores. Just another way to see it.
            </span>
          </article>
        </div>
      </section>
      <section className="welcome-start" aria-labelledby="start-title">
        <div>
          <span className="eyebrow">FOLLOW A DIFFERENT THREAD</span>
          <h2 id="start-title">No plans? Perfect.</h2>
          <p>
            Let a random discovery find you. Save the ones that stay with you.
          </p>
        </div>
        <Link className="primary" href="/discover?feed=random">
          Try the random feed <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
