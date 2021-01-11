import React from 'react'
import { ReactComponent as Op0 } from './assets/op0.svg';
import { ReactComponent as Op0A } from './assets/op0-active.svg';
import { ReactComponent as Op1 } from './assets/op1.svg';
import { ReactComponent as Op1A } from './assets/op1-active.svg';
import { ReactComponent as Op2 } from './assets/op2.svg';
import { ReactComponent as Op2A } from './assets/op2-active.svg';
import { ReactComponent as Op3 } from './assets/op3.svg';
import { ReactComponent as Op3A } from './assets/op3-active.svg';
import { ReactComponent as Op4 } from './assets/op4.svg';
import { ReactComponent as Op4A } from './assets/op4-active.svg';
import { ReactComponent as Op5 } from './assets/op5.svg';
import { ReactComponent as Op5A } from './assets/op5-active.svg';
import { ReactComponent as Op6 } from './assets/op6.svg';
import { ReactComponent as Op6A } from './assets/op6-active.svg';
import { ReactComponent as Op7 } from './assets/op7.svg';
import { ReactComponent as Op7A } from './assets/op7-active.svg';
import { ReactComponent as Op8 } from './assets/op8.svg';
import { ReactComponent as Op8A } from './assets/op8-active.svg';

interface Props {
  title: string;
  selected: boolean;
  result: string;
  step: number;
  activeOptions: number[];
  index: number;
  onClick: (value: number, active: boolean) => void;
}

const DisciplineCard = (props: Props) => {

  const [isActive, setIsActive] = React.useState(props.activeOptions.includes(props.index));

  React.useEffect(() => {
    if (props.activeOptions.includes(props.index)) setIsActive(true);
    else setIsActive(false);
  }, [props.activeOptions])

  let optionIcon: JSX.Element = <></>;
  let optionIconActive: JSX.Element = <></>;

  switch (props.index) {
    case 0:
      optionIcon = <Op0 />;
      optionIconActive = <Op0A />
      break;
    case 1:
      optionIcon = <Op1 />;
      optionIconActive = <Op1A />
      break;
    case 2:
      optionIcon = <Op2 />;
      optionIconActive = <Op2A />
      break;
    case 3:
      optionIcon = <Op3 />;
      optionIconActive = <Op3A />
      break;
    case 4:
      optionIcon = <Op4 />;
      optionIconActive = <Op4A />
      break;
    case 5:
      optionIcon = <Op5 />;
      optionIconActive = <Op5A />
      break;
    case 6:
      optionIcon = <Op6 />;
      optionIconActive = <Op6A />
      break;
    case 7:
      optionIcon = <Op7 />;
      optionIconActive = <Op7A />
      break;
    case 8:
      optionIcon = <Op8 />;
      optionIconActive = <Op8A />
      break;

  }

  const handleClick = () => {
    props.onClick(props.index, !isActive);
  }

  return (
    <div className={`options__card card-mini ${isActive ? 'card-mini--active' : ''}`} data-index={props.index} data-result={props.result} onClick={handleClick}>
      <div className="card__icon">
      {isActive ? optionIconActive : optionIcon}
        </div>
        <h3 className="card__title">{props.title}</h3>
        <input name="checkbox0" className="comparison-checkbox" type="checkbox" checked={isActive} onChange={handleClick}/>
          <label htmlFor="checkbox0"/>
          <div className="card-mini__background">
            </div>
    </div>
  )
}

export default DisciplineCard
