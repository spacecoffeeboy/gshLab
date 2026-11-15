'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {levels,levelInfo,levelPool,QUESTION_LIMIT,type Level,type Mode} from '@/lib/quiz-bank';
import {useQuizSession} from './quiz-session';
import {Icon} from './icon';
export function TestBridge(){
 const [level,setLevel]=useState<Level|null>(null),[mode,setMode]=useState<Mode>('standard');
 const {start}=useQuizSession(),router=useRouter();
 const count=level?Math.min(QUESTION_LIMIT,levelPool(level).length):QUESTION_LIMIT;
 function begin(){if(!level)return;start(level,mode);router.push('/test');}
 return <main id="main-content" lang="ko" className="bridge-shell">
  <div className="test-topline"><Link className="text-button" href="/"><Icon name="back"/> Home</Link><span>BEFORE YOU BEGIN</span></div>
  <p className="eyebrow">5분, 한국을 얼마나 알고 있나요?</p>
  <h1>내 한국 이해도는<br/>어느 정도일까?</h1>
  <p className="bridge-description">예상하는 레벨을 골라 주세요. 선택한 레벨의 문제로만 시험을 구성해요.</p>
  <section className="bridge-group" aria-labelledby="level-label"><h2 id="level-label">01 · 예상 레벨</h2><div className="level-choices">{levels.map(value=>{
   const size=Math.min(QUESTION_LIMIT,levelPool(value).length);
   return <button key={value} className={`level-choice ${level===value?'is-selected':''}`} aria-pressed={level===value} onClick={()=>setLevel(value)}><span className="level-choice-title">{levelInfo[value].label}<span aria-hidden="true">{level===value?'●':'↗'}</span></span><span>{levelInfo[value].description}</span><small>{size}문항{size<QUESTION_LIMIT?' · 현재 준비된 상급 문제 전체':''}</small></button>;
  })}</div></section>
  <section className="bridge-group" aria-labelledby="language-label"><h2 id="language-label">02 · 문제 언어</h2><div className="bridge-segments"><button className="segment is-selected" aria-pressed="true">한국어 <Icon name="check"/></button><button className="segment" disabled>English <span>준비 중</span></button></div></section>
  <section className="bridge-group" aria-labelledby="mode-label"><h2 id="mode-label">03 · 풀이 방식</h2><div className="mode-choices"><button className={`mode-choice ${mode==='standard'?'is-selected':''}`} aria-pressed={mode==='standard'} onClick={()=>setMode('standard')}><strong>일반 모드</strong><span>시간 제한 없이 내 속도로</span></button><button className={`mode-choice ${mode==='time-attack'?'is-selected':''}`} aria-pressed={mode==='time-attack'} onClick={()=>setMode('time-attack')}><strong>TIME ATTACK</strong><span>5분 안에 도전 · 시간이 끝나면 자동 제출</span></button></div></section>
  <div className="bridge-start"><p role="status">{level?`${levelInfo[level].label} · 한국어 · ${count}문항 · ${mode==='time-attack'?'제한 시간 5분':'시간 제한 없음'}`:'레벨을 고르면 시험을 시작할 수 있어요.'}</p><button className="primary" disabled={!level} onClick={begin}>시험 시작하기 <Icon name="arrow"/></button></div>
  <p className="test-visit-note">로그인 없이 참여해요. 새로고침하거나 탭을 닫으면 이번 응시 기록은 초기화됩니다.</p>
 </main>;
}
