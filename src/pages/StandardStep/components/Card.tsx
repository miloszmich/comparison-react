import React from 'react'
import { ReactComponent as Step0Op0 } from './assets/step0-op0.svg';
import { ReactComponent as Step0Op0A } from './assets/step0-op0-active.svg';
import { ReactComponent as Step0Op1 } from './assets/step0-op1.svg';
import { ReactComponent as Step0Op1A } from './assets/step0-op1-active.svg';
import { ReactComponent as Step0Op2 } from './assets/step0-op2.svg';
import { ReactComponent as Step0Op2A } from './assets/step0-op2-active.svg';
import { ReactComponent as Step1Op0 } from './assets/step1-op0.svg';
import { ReactComponent as Step1Op0A } from './assets/step1-op0-active.svg';
import { ReactComponent as Step1Op1 } from './assets/step1-op1.svg';
import { ReactComponent as Step1Op1A } from './assets/step1-op1-active.svg';
import { ReactComponent as Step1Op2 } from './assets/step1-op2.svg';
import { ReactComponent as Step1Op2A } from './assets/step1-op2-active.svg';
import { ReactComponent as Step3Op0 } from './assets/step3-op0.svg';
import { ReactComponent as Step3Op0A } from './assets/step3-op0-active.svg';
import { ReactComponent as Step3Op1 } from './assets/step3-op1.svg';
import { ReactComponent as Step3Op1A } from './assets/step3-op1-active.svg';
import { ReactComponent as Step3Op2 } from './assets/step3-op2.svg';
import { ReactComponent as Step3Op2A } from './assets/step3-op2-active.svg';


interface Props {
  title: string;
  description: string[];
  result: string;
  step: number;
  activeOption: number | null;
  index: number;
  onClick: () => void;
}

const Card = (props: Props) => {
let optionsIcons: JSX.Element[] = [];
let optionsIconActives: JSX.Element[] = [];

switch (props.step) {
  case 0:
    optionsIcons = [<Step0Op0 />, <Step0Op1 />, <Step0Op2 />]
    optionsIconActives = [<Step0Op0A />, <Step0Op1A />, <Step0Op2A />]
    break;
  case 1:
    optionsIcons = [<Step1Op0 />, <Step1Op1 />, <Step1Op2 />]
    optionsIconActives = [<Step1Op0A />, <Step1Op1A />, <Step1Op2A />]
    break;
  case 3:
    optionsIcons = [<Step3Op0 />, <Step3Op1 />, <Step3Op2 />]
    optionsIconActives = [<Step3Op0A />, <Step3Op1A />, <Step3Op2A />]
    break;
}

  return (
<div className={`options__card card ${props.index === props.activeOption ? 'card--active' : ''}`} data-index={props.index} data-result={props.result} onClick={props.onClick}>
  <div className="card__icon">
    {props.index === props.activeOption ? optionsIconActives[props.index] : optionsIcons[props.index]}
</div>
<div className="card__wrapper">
  <h3 className="card__title">{props.title}</h3>
  <div className="card__desc">
  <p>{props.description.map(d => <>{d}<br/></>)}</p>
    </div>
    </div>
    <div className="card__background"></div>
    </div>
  )
}

export default Card
