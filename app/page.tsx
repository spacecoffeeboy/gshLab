import Link from "next/link";
export default function Home() {
  return (
    <main className="landing">
      <section className="intro">
        <div className="eyebrow">SMALL QUESTIONS. NEW PERSPECTIVES.</div>
        <h1>
          A little guess.
          <br />A whole new <em>Korea.</em>
        </h1>
        <p>
          Go beyond the familiar. Discover the everyday stories,
          <br />
          unexpected facts, and different perspectives of Korea.
        </p>
        <Link className="primary landing-cta" href="/discover">
          Start discovering <span>→</span>
        </Link>
        <div className="landing-note">
          Pick a topic. Follow your curiosity. Keep what stays with you.
        </div>
        <div className="orbit" aria-hidden="true">
          <span>한</span>
          <i>✦</i>
          <b>?</b>
        </div>
      </section>
      <section className="principles">
        <div>
          <span>01 / EXPLORE</span>
          <h3>Your Korea, your curiosity.</h3>
          <p>Find a topic that pulls you in.</p>
        </div>
        <div>
          <span>02 / DISCOVER</span>
          <h3>A question opens a door.</h3>
          <p>Guess a fact or uncover a perspective.</p>
        </div>
        <div>
          <span>03 / KEEP</span>
          <h3>Save your little discoveries.</h3>
          <p>Return to the ones worth remembering.</p>
        </div>
      </section>
    </main>
  );
}
