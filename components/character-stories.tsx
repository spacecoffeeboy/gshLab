import hero from './rolling-hero.module.css';
import styles from './character-stories.module.css';

export function CharacterStories() {
  return (
    <section className={styles.stories} aria-labelledby="characters-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>TWO BIRDS. TWO WAYS TO DISCOVER.</p>
        <h2 id="characters-title">Meet your curious companions.</h2>
        <p>Inspired by the birds of Cheonggyecheon, Seoul.<br />Always on the lookout for a little more.</p>
      </div>
      <article className={styles.row} aria-labelledby="gari-title">
        <div className={styles.art}><div className={`${hero.gari} ${styles.gari}`} role="img" aria-label="Gari, the grey heron" /></div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>GARI / THE QUIET OBSERVER</p>
          <h3 id="gari-title">Stay a little.<br />See a little more.</h3>
          <p>Gari knows that a good catch is worth the wait. Like a heron watching the water, Gari takes a moment, looks closer, and spots the little things others pass by.</p>
          <p className={styles.note}>Sometimes, discovery starts with staying still.</p>
        </div>
      </article>
      <article className={`${styles.row} ${styles.reverse}`} aria-labelledby="roro-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>RORO / THE RESTLESS EXPLORER</p>
          <h3 id="roro-title">One more step.<br />One more discovery.</h3>
          <p>Roro would rather try the next stepping stone. Like an egret moving through the shallows in search of a catch, Roro follows each spark of curiosity to see what turns up.</p>
          <p className={styles.note}>There’s always a little more around the next bend.</p>
        </div>
        <div className={styles.art}><div className={`${hero.roro} ${styles.roro}`} role="img" aria-label="Roro, the little egret on stepping stones" /></div>
      </article>
    </section>
  );
}
