import styles from './landing.module.css';
import { RollingHero } from '@/components/rolling-hero';
import { CharacterStories } from '@/components/character-stories';
export default function Home() {
 return (
  <main id="main-content" className={styles.landing}>
   <RollingHero />
   <CharacterStories />
  </main>
 );
}
