import Link from 'next/link';
export default function Home() {
 return (
  <main id="main-content" className="landing-v2 test-landing">
   <section className="welcome-hero type-hero" aria-labelledby="welcome-title">
    <div className="type-hero-top">
     <p className="eyebrow">A LITTLE KNOWLEDGE. A FEW SURPRISES.</p>
     <h1 id="welcome-title">
      <span className="hero-line">How well do</span>
      <span className="hero-line">you know <em>Korea?</em></span>
     </h1>
    </div>
    <div className="type-hero-bottom">
     <p className="welcome-description">Beyond the familiar. Into the little details.<br/>Find your starting point. Take a little more Korea with you.</p>
     <div className="hero-action-group">
      <Link className="primary" href="/start">Take the Korea test <span aria-hidden="true">→</span></Link>
      <span className="welcome-caption">Up to 15 questions · About 5 minutes · No account needed</span>
     </div>
    </div>
   </section>
   <section className="welcome-formats" aria-labelledby="formats-title">
    <div className="welcome-section-heading">
     <span className="eyebrow">A SMALL TEST. A LITTLE MORE KOREA.</span>
     <h2 id="formats-title">Know a little.<br/>Discover a little more.</h2>
    </div>
    <div className="welcome-format-grid">
     <article><span className="format-label">01 / TAKE YOUR PICK</span><h3>Your level.<br/>Your kind of challenge.</h3><p>Choose your level and take the test in Korean. Go at your own pace, or take on a three-minute Time Attack.</p><span className="format-footnote">Beginner · Intermediate · Advanced</span></article>
     <article><span className="format-label">02 / TAKE SOMETHING WITH YOU</span><h3>A clearer picture.<br/>A little more to discover.</h3><p>Get a report for your chosen level. See your score, explore your strongest areas, and revisit every answer.</p><span className="format-footnote">Your score, in context.</span></article>
    </div>
   </section>
   <section className="welcome-start" aria-labelledby="start-title">
    <div><span className="eyebrow">CURIOUS WHERE YOU STAND?</span><h2 id="start-title">Your next discovery starts here.</h2><p>Bring what you know. Leave with a little more.</p></div>
    <Link className="primary" href="/start">Find my starting point <span aria-hidden="true">→</span></Link>
   </section>
  </main>
 );
}
