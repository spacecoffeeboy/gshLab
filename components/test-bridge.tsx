'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {levels,levelInfo,levelPool,QUESTION_LIMIT,TIME_LIMIT_MINUTES,languageNames,type Level,type Mode,type Language} from '@/lib/quiz-bank';
import {useQuizSession} from './quiz-session';
import {Icon} from './icon';
export function TestBridge(){
 const [level,setLevel]=useState<Level|null>(null),[mode,setMode]=useState<Mode>('standard'),[language,setLanguage]=useState<Language>('en');
 const {start}=useQuizSession(),router=useRouter();
 const count=level?Math.min(QUESTION_LIMIT,levelPool(level).length):QUESTION_LIMIT;
 function begin(){if(!level)return;start(level,mode,language);router.push('/test');}
 return <main id="main-content" lang="en" className="bridge-shell">
  <div className="test-topline"><Link className="text-button" href="/"><Icon name="back"/> Home</Link><span>BEFORE YOU BEGIN</span></div>
  <p className="eyebrow">A LITTLE CHALLENGE. A LITTLE MORE KOREA.</p>
  <h1>Where does your<br/>Korea knowledge begin?</h1>
  <p className="bridge-description">Pick the level that feels like you. Your test will use questions from that level only.</p>
  <section className="bridge-group" aria-labelledby="level-label"><h2 id="level-label">01 · Your starting level</h2><div className="level-choices">{levels.map(value=>{
   const size=Math.min(QUESTION_LIMIT,levelPool(value).length);
   return <button key={value} className={`level-choice ${level===value?'is-selected':''}`} aria-pressed={level===value} onClick={()=>setLevel(value)}><span className="level-choice-title">{levelInfo[value].label}<span aria-hidden="true"><Icon name={level===value?'check':'arrow'}/></span></span><span>{levelInfo[value].description}</span><small>{size} questions{size<QUESTION_LIMIT?' · Our current Advanced set':''}</small></button>;
  })}</div></section>
  <section className="bridge-group" aria-labelledby="language-label"><h2 id="language-label">02 · Question language</h2><div className="bridge-segments">{(['en','ko'] as const).map(value=><button key={value} className={`segment ${language===value?'is-selected':''}`} aria-pressed={language===value} onClick={()=>setLanguage(value)}>{languageNames[value]} {value==='ko'&&<span lang="ko">한국어</span>}{language===value&&<Icon name="check"/>}</button>)}</div><p className="bridge-language-note">English questions explain Korean words with pronunciation guides and Hangul where helpful.</p></section>
  <section className="bridge-group" aria-labelledby="mode-label"><h2 id="mode-label">03 · Your pace</h2><div className="mode-choices"><button className={`mode-choice ${mode==='standard'?'is-selected':''}`} aria-pressed={mode==='standard'} onClick={()=>setMode('standard')}><strong>Standard</strong><span>No timer. Take it at your own pace.</span></button><button className={`mode-choice ${mode==='time-attack'?'is-selected':''}`} aria-pressed={mode==='time-attack'} onClick={()=>setMode('time-attack')}><strong>TIME ATTACK</strong><span>{TIME_LIMIT_MINUTES} minutes. Your test submits when time is up.</span></button></div></section>
  <div className="bridge-start"><p role="status">{level?`${levelInfo[level].label} · ${languageNames[language]} · ${count} questions · ${mode==='time-attack'?`${TIME_LIMIT_MINUTES}-minute limit`:'No time limit'}`:'Choose a level to start your test.'}</p><button className="primary" disabled={!level} onClick={begin}>Start my test <Icon name="arrow"/></button></div>
  <p className="test-visit-note">No account needed. Refreshing or closing the tab clears this attempt.</p>
 </main>;
}
