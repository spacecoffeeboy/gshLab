'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { sampleQuestion as question } from '@/lib/korea-test';
import { Icon } from './icon';
import { SuccessTick } from './success-tick';
export function KoreaTest(){
 const [selected,setSelected]=useState<string | null>(null);
 const [submitted,setSubmitted]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{
  heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
 },[submitted]);
 function restart(){setSelected(null);setSubmitted(false);window.scrollTo({top:0,behavior:'instant'});}
 const chosen=question.options.find(option=>option.id===selected);
 return <main id="main-content" className="test-shell">
  <div className="test-topline"><Link href="/" className="text-button"><Icon name="back"/> Home</Link><span>THE KOREA TEST · FIRST LOOK</span></div>
  {!submitted ? <>
   <div className="test-progress-label"><span>Question 1 of 1</span><span>Sample edition</span></div>
   <div className="test-progress" role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={1} aria-valuenow={selected?1:0}><span style={{width:selected?'100%':'0%'}}/></div>
   <section className="test-question" aria-labelledby="test-question-title">
    <p className="eyebrow">{question.label}</p><h1 ref={heading} tabIndex={-1} id="test-question-title">{question.question}</h1>
    <fieldset><legend className="sr-only">Choose one side dish</legend><div className="options">{question.options.map(option=><button key={option.id} className={`option ${selected===option.id?'chosen':''}`} aria-pressed={selected===option.id} onClick={()=>setSelected(option.id)}><span className="option-id">{option.id}</span><span>{option.text}</span><span aria-hidden="true" className="option-state">{selected===option.id?'●':'→'}</span></button>)}</div></fieldset>
    <p className="test-hint">Take your pick. A little explanation comes next.</p>
   </section>
   <div className="test-navigation"><span>One question. A little discovery.</span><button className="primary" disabled={!selected} onClick={()=>setSubmitted(true)}>See the answer <Icon name="arrow"/></button></div>
   <p className="test-visit-note">No account needed. Refreshing or leaving this page resets your answer.</p>
  </> : <>
   <section className="test-explanation" aria-labelledby="explanation-title">
    <p className="eyebrow">{selected===question.featuredOptionId?'A CLASSIC PICK':'ANOTHER GOOD PAIRING'}</p>
    <div className="sample-result-heading">{selected===question.featuredOptionId && <SuccessTick/>}<h1 id="explanation-title" ref={heading} tabIndex={-1}>{question.headline}</h1></div>
    <p className="test-your-pick">Your pick: <strong>{chosen?.text}</strong></p>
    <div className="answer-summary"><span>THE CLASSIC SIDEKICK</span><p><strong>A · Kimchi</strong></p></div>
    <p className="test-explanation-copy">{question.explanation}</p>
    <div className="insight"><span>A LITTLE MORE TO THE STORY</span><p>{question.takeaway}</p></div>
    <p className="test-visit-note">{question.note}</p>
   </section>
   <section className="test-finish" aria-labelledby="finish-title"><p className="eyebrow">SAMPLE COMPLETE · 1 OF 1</p><h2 id="finish-title">That’s a little more Korea.</h2><p>You’ve reached the end of this first look. More questions and Korea levels are still to come.</p><div className="test-result-actions"><Link className="primary" href="/">Back to home <Icon name="arrow"/></Link><button className="secondary" onClick={restart}>Try this question again</button></div></section>
  </>}
 </main>;
}
