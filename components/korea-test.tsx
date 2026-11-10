'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { sampleQuestion as question } from '@/lib/korea-test';
import { Icon } from './icon';
import { SuccessTick } from './success-tick';
export function KoreaTest(){
 const [selected,setSelected]=useState<string | null>(null);
 const [expanded,setExpanded]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 function restart(){
  setSelected(null);setExpanded(false);
  heading.current?.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
 }
 return <main id="main-content" className="test-shell">
  <div className="test-topline"><Link href="/" className="text-button"><Icon name="back"/> Home</Link><span>THE KOREA TEST · FIRST LOOK</span></div>
  <div className="test-progress-label"><span>Question 1 of 1</span><span>Sample edition</span></div>
  <div className="test-progress" role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={1} aria-valuenow={selected?1:0}><span style={{width:selected?'100%':'0%'}}/></div>
  <section className="test-question" aria-labelledby="test-question-title">
   <p className="eyebrow">{question.label}</p><h1 ref={heading} tabIndex={-1} id="test-question-title">{question.question}</h1>
   <fieldset disabled={selected!==null}><legend className="sr-only">Choose one side dish</legend><div className="options">{question.options.map(option=>{
    const checked=selected!==null && option.id===question.featuredOptionId;
    return <button key={option.id} className={`option ${selected===option.id?'chosen':''} ${checked?'sample-correct':''}`} aria-pressed={selected===option.id} onClick={()=>setSelected(option.id)}><span className="option-id">{option.id}</span><span>{option.text}</span><span className="option-state">{checked?<SuccessTick animate={selected===question.featuredOptionId}/>:<span aria-hidden="true">{selected===option.id?'×':'→'}</span>}</span></button>;
   })}</div></fieldset>
   <p className="test-hint" role="status">{selected?(selected===question.featuredOptionId?'Nice pick. Kimchi is the classic sidekick.':'The classic sidekick is kimchi. Danmuji is another good pairing.'):'Pick a sidekick to check your answer.'}</p>
  </section>
  <div className="test-navigation"><span>One question. A little discovery.</span><button className="primary" disabled={!selected} aria-expanded={expanded} aria-controls="sample-explanation" onClick={()=>setExpanded(value=>!value)}>{expanded?'Hide explanation':'View explanation'} <span aria-hidden="true">{expanded?'−':'+'}</span></button></div>
  <div id="sample-explanation" hidden={!expanded}>
   <section className="test-explanation inline-explanation" aria-labelledby="explanation-title">
    <p className="eyebrow">A LITTLE MORE TO THE STORY</p>
    <h2 id="explanation-title">{question.headline}</h2>
    <p className="test-explanation-copy">{question.explanation}</p>
    <div className="insight"><span>ANOTHER GOOD PAIRING</span><p>{question.takeaway}</p></div>
    <p className="test-visit-note">{question.note}</p>
   </section>
   <section className="test-finish" aria-labelledby="finish-title"><p className="eyebrow">SAMPLE COMPLETE · 1 OF 1</p><h2 id="finish-title">That’s a little more Korea.</h2><p>You’ve reached the end of this first look. More questions and Korea levels are still to come.</p><div className="test-result-actions"><Link className="primary" href="/">Back to home <Icon name="arrow"/></Link><button className="secondary" onClick={restart}>Try this question again</button></div></section>
  </div>
  <p className="test-visit-note">No account needed. Refreshing or leaving this page resets your answer.</p>
 </main>;
}
