'use client';
import { createContext,useContext,useState,type ReactNode } from 'react';
import {createRun,recordChoice,makeReport,type Level,type Mode,type QuizRun,type QuizReport} from '@/lib/quiz-bank';
type Session={run:QuizRun|null;report:QuizReport|null;start:(level:Level,mode:Mode)=>void;answer:(id:string,optionId:string)=>void;finish:(reason:'completed'|'timeout')=>void;clear:()=>void};
const Context=createContext<Session|null>(null);
export function QuizSessionProvider({children}:{children:ReactNode}){
 const [run,setRun]=useState<QuizRun|null>(null),[report,setReport]=useState<QuizReport|null>(null);
 function start(level:Level,mode:Mode){setRun(createRun(level,mode));setReport(null);}
 function answer(id:string,optionId:string){if(report)return;setRun(current=>current?recordChoice(current,id,optionId):null);}
 function finish(reason:'completed'|'timeout'){if(!run||report)return;setReport(makeReport(run,reason));}
 function clear(){setRun(null);setReport(null);}
 return <Context.Provider value={{run,report,start,answer,finish,clear}}>{children}</Context.Provider>;
}
export function useQuizSession(){const state=useContext(Context);if(!state)throw Error('QuizSessionProvider is missing');return state;}
