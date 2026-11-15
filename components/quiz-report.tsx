'use client';
import Link from 'next/link';
import {useRef,useEffect} from 'react';
import {useQuizSession} from './quiz-session';
import {levelInfo,reportInterpretation,formatTime,QUESTION_LIMIT} from '@/lib/quiz-bank';
import {Icon} from './icon';
export function QuizReportScreen(){
 const {report,clear}=useQuizSession(),heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[]);
 if(!report)return <main id="main-content" lang="ko" className="test-shell empty-run"><p className="eyebrow">YOUR KOREA REPORT</p><h1>아직 완료한 시험이 없어요.</h1><p>시험을 마치면 내 점수와 분야별 결과를 여기에서 확인할 수 있어요. 새로고침한 경우에도 다시 응시해 주세요.</p><Link href="/start" className="primary">시험 시작하기 <Icon name="arrow"/></Link></main>;
 const info=levelInfo[report.run.level],interpretation=reportInterpretation(report);
 return <main id="main-content" lang="ko" className="test-shell report-shell">
  <div className="test-topline"><Link href="/" className="text-button" onClick={clear}><Icon name="back"/> Home</Link><span>YOUR KOREA REPORT</span></div>
  <section className="report-hero" aria-labelledby="report-heading"><p className="eyebrow">{info.label} · {report.run.mode==='time-attack'?'TIME ATTACK':'일반 모드'} · 한국어</p><h1 id="report-heading" ref={heading} tabIndex={-1}>{info.label}에서 발견한<br/>나의 한국 이해도</h1><p className="report-score"><strong>{report.correct}</strong><span>/ {report.total}</span></p><p className="report-score-caption">{info.label} {report.total}문항 중 {report.correct}문항 정답 · 정답률 {report.percentage}%</p>{report.total<QUESTION_LIMIT&&<p className="report-bank-note">현재 준비된 {info.label} 문제 {report.total}개로 응시한 결과입니다.</p>}<h2>{interpretation.title}</h2><p>{interpretation.body}</p><p className="report-level-note">선택한 {info.label} 기준의 결과예요. 다른 레벨의 같은 점수와 동일한 실력으로 해석하지 않습니다.</p>{report.reason==='timeout'&&<p className="timeout-note" role="status">5분이 끝나 자동 제출됐어요. 남은 문항은 미응답으로 표시했습니다.</p>}</section>
  <section className="report-stats" aria-label="풀이 기록"><div><span>정답</span><strong>{report.correct}</strong></div><div><span>오답</span><strong>{report.incorrect}</strong></div><div><span>미응답</span><strong>{report.unanswered}</strong></div><div><span>소요 시간</span><strong>{formatTime(report.elapsedMs)}</strong></div></section>
  <section className="report-section" aria-labelledby="category-title"><p className="eyebrow">YOUR STRONG POINTS</p><h2 id="category-title">어디가 익숙했을까?</h2><p>이번 시험에 출제된 분야별 정답 수입니다.</p><ul className="category-results">{report.categories.map(category=><li key={category.category}><div><span>{category.category}</span><strong>{category.correct} / {category.total}</strong></div><div className="category-meter" aria-hidden="true"><span style={{width:`${category.correct/category.total*100}%`}}/></div></li>)}</ul></section>
  <section className="report-section" aria-labelledby="review-title"><p className="eyebrow">TAKE A LITTLE WITH YOU</p><h2 id="review-title">다시 보면 기억에 남을 이야기</h2><p>문제를 열어 내 선택과 해설을 확인해 보세요.</p><div className="report-review">{report.items.map((item,index)=>{
   const correct=item.question.options.find(o=>o.id===item.question.correctOptionId)!;
   const chosen=item.question.options.find(o=>o.id===item.choice);
   return <details className="report-review-item" key={item.question.id}><summary><span className="review-summary"><span className="review-category">{String(index+1).padStart(2,'0')} · {item.question.category} · {item.choice?(item.correct?'정답':'오답'):'미응답'}</span><span>{item.question.prompt}</span></span></summary><div className="review-explanation"><p>내 선택: <strong>{chosen?`${chosen.id} · ${chosen.text}`:'미응답'}</strong></p><p>정답: <strong>{correct.id} · {correct.text}</strong></p><p>{item.question.explanation}</p></div></details>;
  })}</div></section>
  <section className="report-finish"><p className="eyebrow">A LITTLE MORE KOREA</p><h2>다음엔 무엇을 더 알게 될까?</h2><p>같은 레벨에 다시 도전하거나 다른 레벨도 골라 보세요.</p><div className="test-result-actions"><Link href="/start" onClick={clear} className="primary">다시 도전하기 <Icon name="arrow"/></Link><Link href="/" onClick={clear} className="secondary">랜딩으로</Link></div><p className="test-visit-note">이 결과는 이번 응시 동안만 유지돼요. 다른 참여자와 비교한 순위나 평균은 표시하지 않습니다.</p></section>
 </main>;
}
