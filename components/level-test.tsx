'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {levelInfo,questionById,formatTime,categoryLabel,languageNames,TIME_LIMIT_MS,TIME_LIMIT_MINUTES} from '@/lib/quiz-bank';
import {useQuizSession} from './quiz-session';
import {Icon} from './icon';
import {SuccessTick} from './success-tick';
export function LevelTest(){const {run}=useQuizSession();return <LevelTestRun key={run?.id??'no-run'}/>;}
function LevelTestRun(){
 const {run,report,answer,finish,clear}=useQuizSession();
 const [index,setIndex]=useState(0),[expanded,setExpanded]=useState(false),[now,setNow]=useState(()=>Date.now());
 const heading=useRef<HTMLHeadingElement>(null),router=useRouter();
 useEffect(()=>{if(report)router.replace('/report');},[report,router]);
 useEffect(()=>{
  if(!run?.deadlineAt||report)return;
  function tick(){setNow(Date.now());}
  const timer=window.setInterval(tick,250);
  document.addEventListener('visibilitychange',tick);window.addEventListener('focus',tick);tick();
  return()=>{window.clearInterval(timer);document.removeEventListener('visibilitychange',tick);window.removeEventListener('focus',tick);};
 },[run?.id,run?.deadlineAt,report]);
 useEffect(()=>{if(run?.deadlineAt&&now>=run.deadlineAt&&!report){finish('timeout');router.replace('/report');}},[now,run,report,finish,router]);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[index]);
 if(!run)return <main id="main-content" lang="en" className="test-shell empty-run"><p className="eyebrow">YOUR KOREA TEST</p><h1>Find your starting point first.</h1><p>Choose your level, question language and pace. Then jump straight into the test.</p><Link href="/start" className="primary">Set up my test <Icon name="arrow"/></Link></main>;
 if(report)return <main id="main-content" className="test-shell"><p>Opening your report…</p><Link href="/report">See my results</Link></main>;
 const q=questionById(run.questionIds[index],run.language),choice=run.answers[q.id]?.optionId;
 const correct=q.options.find(o=>o.id===q.correctOptionId)!;
 const remaining=run.deadlineAt===null?null:Math.max(0,Math.min(TIME_LIMIT_MS,run.deadlineAt-now));
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
 return <main id="main-content" lang="en" className="test-shell level-test-shell">
  <div className="test-topline"><Link href="/start" className="text-button" onClick={clear}><Icon name="back"/> Test setup</Link><span>{levelInfo[run.level].label} · {languageNames[run.language]} · {run.mode==='time-attack'?'TIME ATTACK':'Standard'}</span></div>
  {remaining!==null&&<section className="timer-panel" aria-label="Time Attack timer"><div className="timer-caption"><span>Time remaining</span><span className={`test-clock ${remaining<60000?'clock-low':''}`} role="timer" aria-label={`${formatTime(remaining)} remaining`}>{formatTime(remaining)}</span></div><div className={`time-progress ${remaining<60000?'time-progress-low':''}`} role="progressbar" aria-label="Time remaining" aria-valuemin={0} aria-valuemax={TIME_LIMIT_MS/1000} aria-valuenow={Math.ceil(remaining/1000)} aria-valuetext={`${formatTime(remaining)} remaining`}><span style={{width:`${remaining/TIME_LIMIT_MS*100}%`}}/></div></section>}
  <div className="test-progress-label"><span>Question {index+1} of {run.questionIds.length}</span><span>{answered} answered</span></div>
  <div className="test-progress" role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={run.questionIds.length} aria-valuenow={answered}><span style={{width:`${answered/run.questionIds.length*100}%`}}/></div>
  <section className="test-question" lang={run.language} data-question-id={q.id} aria-labelledby="level-question-title"><p className="eyebrow" lang="en">{categoryLabel(q.category)} · {q.type==='ox'?'True or false':'Multiple choice'}</p><h1 id="level-question-title" ref={heading} tabIndex={-1}>{q.prompt}</h1>
   <fieldset disabled={Boolean(choice)}><legend className="sr-only">Choose one answer</legend><div className="options">{q.options.map(option=>{
    const checked=Boolean(choice)&&option.id===q.correctOptionId;
    return <button key={q.id+option.id} className={`option ${choice===option.id?'chosen':''} ${checked?'sample-correct':''}`} aria-pressed={choice===option.id} onClick={()=>pick(option.id)}><span className="option-id">{option.id}</span><span>{option.text}</span><span className="option-state">{checked?<SuccessTick animate={choice===q.correctOptionId}/>:<span aria-hidden="true">{choice===option.id?'×':'→'}</span>}</span></button>;
   })}</div></fieldset>
   <p className="test-hint" lang="en" role="status">{choice?(choice===q.correctOptionId?'Nice pick.':`The answer is ${correct.id} · ${correct.text}.`):'Take your pick to check your answer.'}</p>
  </section>
  <div className="test-navigation"><button className="secondary" disabled={!choice} aria-expanded={expanded} aria-controls="question-explanation" onClick={()=>setExpanded(value=>!value)}>{expanded?'Hide explanation':'View explanation'} <span aria-hidden="true">{expanded?'−':'+'}</span></button><button className="primary" disabled={!choice} onClick={next}>{index===run.questionIds.length-1?'See my report':'Next question'} <Icon name="arrow"/></button></div>
  <section id="question-explanation" className="inline-explanation" hidden={!expanded}><p className="eyebrow">A LITTLE MORE KOREA</p><h2>The story behind the answer</h2><p lang={run.language}>{q.explanation}</p></section>
  <p className="test-visit-note">{run.mode==='time-attack'?`The ${TIME_LIMIT_MINUTES}-minute timer keeps running while you read. When time is up, the test submits with any unanswered questions.`:'No timer. Take it at your own pace.'} Refreshing clears this attempt.</p>
 </main>;
}
