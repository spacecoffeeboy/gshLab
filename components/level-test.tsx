'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {levelInfo,questionById,formatTime} from '@/lib/quiz-bank';
import {useQuizSession} from './quiz-session';
import {Icon} from './icon';
import {SuccessTick} from './success-tick';
export function LevelTest(){
 const {run}=useQuizSession();
 return <LevelTestRun key={run?.id??'no-run'}/>;
}
function LevelTestRun(){
 const {run,report,answer,finish,clear}=useQuizSession();
 const [index,setIndex]=useState(0),[expanded,setExpanded]=useState(false),[now,setNow]=useState(()=>Date.now());
 const heading=useRef<HTMLHeadingElement>(null),router=useRouter();
 useEffect(()=>{if(report)router.replace('/report');},[report,router]);
 useEffect(()=>{
  if(!run?.deadlineAt||report)return;
  function tick(){setNow(Date.now());}
  const timer=window.setInterval(tick,250);
  document.addEventListener('visibilitychange',tick);window.addEventListener('focus',tick);
  tick();
  return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',tick);window.removeEventListener('focus',tick);};
 },[run?.id,run?.deadlineAt,report]);
 useEffect(()=>{
  if(run?.deadlineAt&&now>=run.deadlineAt&&!report){finish('timeout');router.replace('/report');}
 },[now,run,report,finish,router]);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[index]);
 if(!run)return <main id="main-content" lang="ko" className="test-shell empty-run"><p className="eyebrow">YOUR KOREA TEST</p><h1>먼저 내 레벨을 골라 주세요.</h1><p>레벨과 풀이 방식을 고르면 바로 문제를 풀 수 있어요.</p><Link href="/start" className="primary">응시 설정으로 <Icon name="arrow"/></Link></main>;
 if(report)return <main id="main-content" className="test-shell"><p>리포트를 여는 중이에요.</p><Link href="/report">결과 보기</Link></main>;
 const q=questionById(run.questionIds[index]),choice=run.answers[q.id]?.optionId;
 const correct=q.options.find(o=>o.id===q.correctOptionId)!;
 const remaining=run.deadlineAt===null?null:Math.max(0,run.deadlineAt-now);
 const answered=Object.keys(run.answers).length;
 function pick(id:string){
  if(!run)return;
  if(run.deadlineAt!==null&&Date.now()>=run.deadlineAt){finish('timeout');router.replace('/report');return;}
  answer(q.id,id);
 }
 function next(){
  if(!choice)return;
  if(index===run!.questionIds.length-1){finish('completed');router.push('/report');}
  else {setExpanded(false);setIndex(value=>value+1);}
 }
 return <main id="main-content" lang="ko" className="test-shell level-test-shell">
  <div className="test-topline"><Link href="/start" className="text-button" onClick={clear}><Icon name="back"/> 응시 설정</Link><span>{levelInfo[run.level].label} · 한국어 · {run.mode==='time-attack'?'TIME ATTACK':'일반 모드'}</span></div>
  <div className="test-progress-label"><span>{index+1} / {run.questionIds.length} 문항</span>{remaining!==null?<span className={`test-clock ${remaining<60000?'clock-low':''}`} role="timer" aria-label={`남은 시간 ${formatTime(remaining)}`}>{formatTime(remaining)}</span>:<span>{answered}문항 답변 완료</span>}</div>
  <div className="test-progress" role="progressbar" aria-label="답변 진행률" aria-valuemin={0} aria-valuemax={run.questionIds.length} aria-valuenow={answered}><span style={{width:`${answered/run.questionIds.length*100}%`}}/></div>
  <section className="test-question" data-question-id={q.id} aria-labelledby="level-question-title"><p className="eyebrow">{q.category} · {q.type==='ox'?'OX':'선다형'}</p><h1 id="level-question-title" ref={heading} tabIndex={-1}>{q.prompt}</h1>
   <fieldset disabled={Boolean(choice)}><legend className="sr-only">답 하나를 선택하세요</legend><div className="options">{q.options.map(option=>{
    const checked=Boolean(choice)&&option.id===q.correctOptionId;
    return <button key={q.id+option.id} className={`option ${choice===option.id?'chosen':''} ${checked?'sample-correct':''}`} aria-pressed={choice===option.id} onClick={()=>pick(option.id)}><span className="option-id">{option.id}</span><span>{option.text}</span><span className="option-state">{checked?<SuccessTick animate={choice===q.correctOptionId}/>:<span aria-hidden="true">{choice===option.id?'×':'→'}</span>}</span></button>;
   })}</div></fieldset>
   <p className="test-hint" role="status">{choice?(choice===q.correctOptionId?'맞혔어요.':`정답은 ${correct.id} · ${correct.text}입니다.`):'답을 고르면 바로 확인할 수 있어요.'}</p>
  </section>
  <div className="test-navigation"><button className="secondary" disabled={!choice} aria-expanded={expanded} aria-controls="question-explanation" onClick={()=>setExpanded(value=>!value)}>{expanded?'해설 접기':'해설 보기'} <span aria-hidden="true">{expanded?'−':'+'}</span></button><button className="primary" disabled={!choice} onClick={next}>{index===run.questionIds.length-1?'리포트 보기':'다음 문제'} <Icon name="arrow"/></button></div>
  <section id="question-explanation" className="inline-explanation" hidden={!expanded}><p className="eyebrow">A LITTLE MORE KOREA</p><h2>문제 속 작은 이야기</h2><p>{q.explanation}</p></section>
  <p className="test-visit-note">{run.mode==='time-attack'?'해설을 읽는 동안에도 시간은 흐릅니다. 시간이 끝나면 미응답 문항을 포함해 자동 제출돼요.':'시간 제한 없이 풀어 보세요.'} 새로고침하면 응시 기록이 초기화됩니다.</p>
 </main>;
}
