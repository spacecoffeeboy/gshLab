import { Icon } from './icon';
export function SuccessTick({animate=true}:{animate?:boolean}){
 return <span className={`success-tick ${animate ? "" : "is-static"}`} role="img" aria-label="Correct">
  <Icon name="check"/>
  {animate && <span className="tick-burst" aria-hidden="true"><i/><i/><i/><i/></span>}
 </span>;
}
