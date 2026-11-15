import {test} from 'node:test';
import assert from 'node:assert/strict';
import {quizBank,levelPool,createRun,recordChoice,makeReport,TIME_LIMIT_MS,reportInterpretation,questionById,pickQuestions,levels} from '../lib/quiz-bank';
test('reviewed static bank includes only confirmed rows and preserves the agreed single-level exam sizes',()=>{
 assert.equal(quizBank.length,70);
 assert.deepEqual(levels.map(l=>levelPool(l).length),[28,35,7]);
 for(const number of [13,16,22,25,26,31,36,37,41,55,56,62])assert.ok(!quizBank.some(q=>q.sourceNumber===number));
 for(const [level,size]of [['beginner',15],['intermediate',15],['advanced',7]] as const){
  const questions=pickQuestions(level,()=>.5);assert.equal(questions.length,size);assert.equal(new Set(questions.map(q=>q.id)).size,size);assert.ok(questions.every(q=>q.level===level));
 }
 assert.equal(questionById('almeng-078').correctOptionId,'B');
 assert.equal(questionById('almeng-047').options[1].text,'김밥');
});
test('first answers are immutable, answer keys are validated and no answer can be added at/after the Time Attack deadline',()=>{
 const run=createRun('advanced','time-attack',1000,()=>.5),q=questionById(run.questionIds[0]);
 assert.throws(()=>recordChoice(run,'not-in-set','A',1001));
 assert.throws(()=>recordChoice(run,q.id,'Z',1001));
 const answered=recordChoice(run,q.id,q.correctOptionId,1001);
 const different=q.options.find(o=>o.id!==q.correctOptionId)!;
 assert.equal(recordChoice(answered,q.id,different.id,1002),answered);
 assert.equal(recordChoice(run,q.id,q.correctOptionId,1000+TIME_LIMIT_MS),run);
 assert.throws(()=>makeReport(run,'completed',1002));
 assert.throws(()=>makeReport(run,'timeout',1002));
});
test('scores retain level, real denominator, categories, and missed timeout questions; no invented population ranking',()=>{
 let run=createRun('advanced','standard',1000,()=>.5);
 for(const id of run.questionIds)run=recordChoice(run,id,questionById(id).correctOptionId,2000);
 const report=makeReport(run,'completed',3000);
 assert.equal(report.run.level,'advanced');assert.equal(report.correct,7);assert.equal(report.total,7);assert.equal(report.percentage,100);
 assert.equal(report.categories.reduce((n,c)=>n+c.total,0),7);
 assert.match(reportInterpretation(report).body,/Advanced/);
 const timer=createRun('beginner','time-attack',1000,()=>.5),first=questionById(timer.questionIds[0]);
 const partial=recordChoice(timer,first.id,first.correctOptionId,1001);
 const timed=makeReport(partial,'timeout',1000+TIME_LIMIT_MS+2000);
 assert.equal(timed.total,15);assert.equal(timed.correct,1);assert.equal(timed.unanswered,14);assert.equal(timed.percentage,7);assert.equal(timed.elapsedMs,TIME_LIMIT_MS);
});

test('all 70 questions have complete English variants with identical keys, levels and answer identity',()=>{
 assert.equal(TIME_LIMIT_MS,180_000);
 for(const q of quizBank){
  const english=questionById(q.id,'en');
  assert.equal(english.correctOptionId,q.correctOptionId);assert.equal(english.level,q.level);assert.equal(english.type,q.type);
  assert.deepEqual(english.options.map(o=>o.id),q.options.map(o=>o.id));
  assert.notEqual(english.prompt,q.prompt);assert.notEqual(english.explanation,q.explanation);
  assert.match(english.prompt,/[A-Za-z]/);assert.match(english.explanation,/[A-Za-z]/);
  assert.ok(english.options.every(o=>/[A-Za-z]/.test(o.text)));
 }
 for(const id of ['almeng-006','almeng-034','almeng-035','almeng-064','almeng-080','almeng-081','almeng-082']){
  const q=questionById(id,'en');assert.match(q.prompt+q.options.map(o=>o.text).join('')+q.explanation,/[가-힣]/);
 }
 assert.equal(createRun('beginner','standard').language,'en');
 const native=createRun('advanced','standard',1000,()=>.5,'ko');
 assert.equal(native.language,'ko');
});
