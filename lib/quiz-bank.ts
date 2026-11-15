import { z } from 'zod';
import raw from '../content/quiz-bank.json';
import englishRaw from '../content/quiz-bank-en.json';
export const levelInfo = {
 beginner: { label: 'Beginner', description: 'I know a few familiar things', adjective: 'the essentials' },
 intermediate: { label: 'Intermediate', description: 'I know my way around Korean life', adjective: 'everyday life' },
 advanced: { label: 'Advanced', description: 'I catch the little details, too', adjective: 'the details' },
} as const;
export type Level = keyof typeof levelInfo;
export type Mode = 'standard' | 'time-attack';
export type Language = 'en' | 'ko';
export const languageNames = {en:'English',ko:'Korean'} as const;
export const categoryNames:Record<string,string>={'문화':'Culture','화폐':'Money','생활':'Everyday life','언어':'Language','음식':'Food','지리':'Places','역사':'History','교통':'Transport','여행':'Travel'};
export function categoryLabel(value:string){return categoryNames[value]??value;}
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
const english=z.object({sourceVersion:z.string(),version:z.string(),language:z.literal('en'),questions:z.record(z.string(),z.object({prompt:z.string().trim().min(1),options:z.record(z.string(),z.string().trim().min(1)),explanation:z.string().trim().min(1)}))}).parse(englishRaw);
if(english.sourceVersion!==parsed.version)throw Error('English bank needs review against the latest Korean source');
if(Object.keys(english.questions).length!==parsed.questions.length)throw Error('English translation count mismatch');
for(const q of parsed.questions){
 const t=english.questions[q.id];
 if(!t || q.options.some(o=>!t.options[o.id]) || Object.keys(t.options).length!==q.options.length)throw Error(`Incomplete English translation: ${q.id}`);
}
export const bankVersion=`${parsed.version}:${english.version}`;
export type BankQuestion=z.infer<typeof questionSchema>;
export const levels=Object.keys(levelInfo) as Level[];
export const QUESTION_LIMIT=15;
export const TIME_LIMIT_MINUTES=3;
export const TIME_LIMIT_MS=TIME_LIMIT_MINUTES*60*1000;
export function levelPool(level:Level){return quizBank.filter(q=>q.level===level);}
export function questionById(id:string,language:Language='ko'):BankQuestion{
 const q=quizBank.find(q=>q.id===id);if(!q)throw Error('Unknown question');
 if(language==='ko')return q;
 const t=english.questions[id];
 return {...q,category:categoryLabel(q.category),prompt:t.prompt,options:q.options.map(o=>({...o,text:t.options[o.id]})),explanation:t.explanation};
}
export function pickQuestions(level:Level,random:()=>number=Math.random){
 const pool=[...levelPool(level)];
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 return pool.slice(0,QUESTION_LIMIT);
}
export type RecordedChoice={optionId:string;answeredAt:number};
export type QuizRun={id:string;bankVersion:string;level:Level;mode:Mode;language:Language;questionIds:string[];startedAt:number;deadlineAt:number|null;answers:Record<string,RecordedChoice>};
export function createRun(level:Level,mode:Mode,now=Date.now(),random:()=>number=Math.random,language:Language='en'):QuizRun{
 const questions=pickQuestions(level,random);if(!questions.length)throw Error('No questions for this level');
 return {id:crypto.randomUUID(),bankVersion,level,mode,language,questionIds:questions.map(q=>q.id),startedAt:now,deadlineAt:mode==='time-attack'?now+TIME_LIMIT_MS:null,answers:{}};
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
  const q=questionById(id,run.language),choice=run.answers[id];
  return {question:q,choice:choice?.optionId??null,correct:choice?.optionId===q.correctOptionId};
 });
 const total=items.length,correct=items.filter(i=>i.correct).length,unanswered=items.filter(i=>!i.choice).length;
 const categories=[...new Set(items.map(i=>i.question.category))].map(category=>({category,total:items.filter(i=>i.question.category===category).length,correct:items.filter(i=>i.question.category===category&&i.correct).length}));
 return {run,reason,total,correct,incorrect:total-correct-unanswered,unanswered,percentage:Math.round(correct/total*100),elapsedMs:Math.max(0,Math.min(now,run.deadlineAt??now)-run.startedAt),items,categories};
}
export type QuizReport=ReturnType<typeof makeReport>;
export function reportInterpretation(report:QuizReport){
 const label=levelInfo[report.run.level].label;
 if(report.percentage>=80)return {title:report.run.level==='beginner'?'You have the essentials down.':report.run.level==='intermediate'?'You know your way around Korean life.':'You catch the little details.',body:`A strong result at ${label} level. Take a look at what you knew—and the little things you discovered along the way.`};
 if(report.percentage>=50)return {title:'A few familiar things. A few new discoveries.',body:`Your ${label} test showed what feels familiar and what is still new. Explore your category results and revisit the answers below.`};
 return {title:'You have a few new things to take with you.',body:`This ${label} set had some unfamiliar details. The score is a starting point; the explanations are where your next discoveries begin.`};
}
export function formatTime(milliseconds:number){const s=Math.max(0,Math.ceil(milliseconds/1000));return `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;}
