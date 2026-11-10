import { Icon } from './icon';
export function SuccessTick(){
 return <span className="success-tick" role="img" aria-label="Correct">
  <Icon name="check"/>
  <span className="tick-burst" aria-hidden="true"><i/><i/><i/><i/></span>
 </span>;
}
