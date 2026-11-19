'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './rolling-hero.module.css';

export function RollingHero() {
  const section = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const height = matchMedia('(min-height: 661px)');
    let frame = 0;
    function update() {
      frame = 0;
      const active = !motion.matches && height.matches;
      setEnabled(active);
      if (!active || !section.current || !panel.current) {
        setStage(0);
        return;
      }
      const distance = section.current.offsetHeight - panel.current.offsetHeight;
      const progress = Math.max(0, -section.current.getBoundingClientRect().top) / Math.max(1, distance);
      setStage(progress < 0.27 ? 0 : progress < 0.6 ? 1 : 2);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    height.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      height.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section ref={section} className={styles.scene} data-enabled={enabled} data-stage={stage} aria-labelledby="welcome-title">
      <div ref={panel} className={styles.panel}>
        <div className={styles.gari} role="img" aria-label="Gari, a curious grey heron, peeking over the headline" />
        <h1 id="welcome-title" className={styles.headline}>
          <span className={styles.accessible}>How well do you know Korea?</span>
          <span className={styles.window} aria-hidden="true">
            <span className={styles.track} style={{ transform: `translateY(-${stage * 100 / 3}%)` }}>
              <span className={styles.slide}><span>HOW WELL</span><span>DO YOU KNOW</span><em>KOREA?</em></span>
              <span className={styles.slide}><span>ARE YOU</span><em>READY?</em></span>
              <span className={styles.slide}><span>LET’S GET</span><em>ALMENGE!</em></span>
            </span>
          </span>
        </h1>
        <div className={styles.roro} role="img" aria-label="Roro, a little egret looking up from stepping stones in the stream" />
        <p className={styles.description}>Been to Korea? There’s more to remember.<br />Never been? There’s more to discover.</p>
        <Link className={styles.cta} href="/start">START QUIZ <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link>
      </div>
    </section>
  );
}
