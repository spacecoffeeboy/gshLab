import { z } from 'zod';
import raw from '../content/quiz-bank.json';
export const levelInfo = {
 beginner: { label: '초급', description: '한국의 익숙한 음식과 생활부터', adjective: '기초' },
 intermediate: { label: '중급', description: '생활 속 표현과 문화도 꽤 알아요', adjective: '생활 감각' },
 advanced: { label: '상급', description: '줄임말과 작은 디테일까지 자신 있어요', adjective: '디테일' },
} as const;
export type Level = keyof typeof levelInfo;
export type Mode = 'standard' | 'time-attack';
const questionSchema = z.object({
 id:z.string().min(1),sourceNumber:z.number().int().positive(),level:z.enum(['beginner','intermediate','advanced']),type:z.enum(['mcq','ox']),category:z.string().min(1),prompt:z.string().trim().min(1),
 options:z.array(z.object({id:z.enum(['A','B','C']),text:z.string().trim().min(1)})).min(2).max(3),
 correctOptionId:z.enum(['A','B','C']),explanation:z.string().trim().min(1),
}).superRefine((q,ctx)=>{
 if(new Set(q.options.map(o=>o.id)).size!==q.options.length || !q.options.some(o=>o.id===q.correctOptionId))ctx.addIssue({code:'custom',message:'Invalid option keys'});
 if(q.type==='ox'&&q.options.length!==2)ctx.addIssue({code:'custom',message:'OX requires two options'});
});
const parsed=z.object({version:z.string().min(1),language:z.literal('ko'),questions:z.array(questionSchema).min(1)}).parse(raw);
if(new Set(parsed.questions.map(q=>q.id)).size!==parsed.questions.length)throw Error('Duplicate bank IDs');
export const quizBank=parsed.questions;
export const bankVersion=parsed.version;
export type BankQuestion=z.infer<typeof questionSchema>;
export const levels=Object.keys(levelInfo) as Level[];
export const QUESTION_LIMIT=15;
export const TIME_LIMIT_MS=5*60*1000;
export function levelPool(level:Level){return quizBank.filter(q=>q.level===level);}
export function questionById(id:string){const q=quizBank.find(q=>q.id===id);if(!q)throw Error('Unknown question');return q;}
export function pickQuestions(level:Level,random:()=>number=Math.random){
 const pool=[...levelPool(level)];
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,QUESTION_LIMIT);
}
export type RecordedChoice={optionId:string;answeredAt:number};
export type QuizRun={id:string;bankVersion:string;level:Level;mode:Mode;questionIds:string[];startedAt:number;deadlineAt:number|null;answers:Record<string,RecordedChoice>};
export function createRun(level:Level,mode:Mode,now=Date.now(),random:()=>number=Math.random):QuizRun{
 const questions=pickQuestions(level,random);if(!questions.length)throw Error('No questions for this level');
 return {id:crypto.randomUUID(),bankVersion,level,mode,questionIds:questions.map(q=>q.id),startedAt:now,deadlineAt:mode==='time-attack'?now+TIME_LIMIT_MS:null,answers:{}};
}
export function recordChoice(run:QuizRun,id:string,optionId:string,now=Date.now()):QuizRun{
 if(!run.questionIds.includes(id))throw Error('Question is not in this test');
 if(!questionById(id).options.some(o=>o.id===optionId))throw Error('Invalid option');
 if(run.answers[id]||(run.deadlineAt!==null&&now>=run.deadlineAt))return run;
 return {...run,answers:{...run.answers,[id]:{optionId,answeredAt:now}}};
}
export function makeReport(run:QuizRun,reason:'completed'|'timeout',now=Date.now()){
 if(reason==='completed'&&run.questionIds.some(id=>!run.answers[id]))throw Error('Test is not complete');
 if(reason==='timeout'&&(run.deadlineAt===null||now<run.deadlineAt))throw Error('Timer has not expired');
 const items=run.questionIds.map(id=>{
  const q=questionById(id),choice=run.answers[id];
  return {question:q,choice:choice?.optionId??null,correct:choice?.optionId===q.correctOptionId};
 });
 const total=items.length,correct=items.filter(i=>i.correct).length,unanswered=items.filter(i=>!i.choice).length;
 const categories=[...new Set(items.map(i=>i.question.category))].map(category=>({category,total:items.filter(i=>i.question.category===category).length,correct:items.filter(i=>i.question.category===category&&i.correct).length}));
 return {run,reason,total,correct,incorrect:total-correct-unanswered,unanswered,percentage:Math.round(correct/total*100),elapsedMs:Math.max(0,Math.min(now,run.deadlineAt??now)-run.startedAt),items,categories};
}
export type QuizReport=ReturnType<typeof makeReport>;
export function reportInterpretation(report:QuizReport){
 const label=levelInfo[report.run.level].label;
 if(report.percentage>=80)return {title:report.run.level==='beginner'?'기초가 탄탄해요.':report.run.level==='intermediate'?'한국 생활 감각이 살아 있어요.':'작은 디테일에도 강해요.',body:`${label} 문제에서 높은 정답률을 기록했어요. 아래에서 맞힌 문제와 새롭게 알게 된 내용을 돌아보세요.`};
 if(report.percentage>=50)return {title:'아는 만큼, 새로 알게 된 것도 있어요.',body:`${label} 문제를 통해 익숙한 부분과 더 알아볼 부분을 확인했어요. 분야별 결과와 해설을 함께 살펴보세요.`};
 return {title:'오늘은 새로운 발견이 많았어요.',body:`이번 ${label} 문제에서 낯선 내용을 만났네요. 점수에만 머무르지 말고 해설에서 다음에 기억할 것을 찾아보세요.`};
}
export function formatTime(milliseconds:number){const s=Math.max(0,Math.ceil(milliseconds/1000));return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;}
