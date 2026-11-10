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
     <p className="welcome-description">Beyond the familiar. Into the little details.<br/>Start with a small question. Take a little more Korea with you.</p>
     <div className="hero-action-group">
      <Link className="primary" href="/test">Take the Korea test <span aria-hidden="true">→</span></Link>
      <span className="welcome-caption">1 sample question · No account needed</span>
     </div>
    </div>
   </section>
   <section className="welcome-formats" aria-labelledby="formats-title">
    <div className="welcome-section-heading">
     <span className="eyebrow">A SMALL TEST. A LITTLE MORE KOREA.</span>
     <h2 id="formats-title">Know a little.<br/>Discover a little more.</h2>
    </div>
    <div className="welcome-format-grid">
     <article><span className="format-label">01 / TAKE YOUR PICK</span><h3>One little question.<br/>Your kind of answer.</h3><p>Start with a familiar bowl of ramyeon. Choose your sidekick, then discover the little story behind the pairing.</p><span className="format-footnote">No timer. No pressure.</span></article>
     <article><span className="format-label">02 / TAKE SOMETHING WITH YOU</span><h3>A familiar pairing.<br/>A little more to discover.</h3><p>See the explanation after your pick. This first look is just one question; the full Korea test is still to come.</p><span className="format-footnote">A first taste of what’s next.</span></article>
    </div>
   </section>
   <section className="welcome-start" aria-labelledby="start-title">
    <div><span className="eyebrow">CURIOUS WHERE YOU STAND?</span><h2 id="start-title">Your next discovery starts here.</h2><p>Bring what you know. Leave with a little more.</p></div>
    <Link className="primary" href="/test">Try the sample question <span aria-hidden="true">→</span></Link>
   </section>
  </main>
 );
}
