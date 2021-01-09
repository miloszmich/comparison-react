import React from 'react'
import { ReactComponent as Step1Op1 } from './assets/step1-op1.svg'
import { ReactComponent as Step1Op1A } from './assets/step1-op1-active.svg'

interface Props {
  
}

const Card = (props: Props) => {
  return (
<div className="options__card card" data-index="0" data-result="weak">
  <div className="card__icon">
    <Step1Op1 />
</div>
<div className="card__wrapper">
  <h3 className="card__title">Jestem debiutantem</h3>
  <div className="card__desc">
    <p>To moje pierwsze kroki <br/> w obstawianiu</p>
    </div>
    </div>
    <div className="card__background"></div>
    </div>
  )
}

export default Card
