import React from 'react'
import Card from './components/Card'

interface Props {
  step: number;
}

const DefaultStep = (props: Props) => {

  const steps = [
    'Od jak dawna obstawiasz zakłady bukmacherskie?',
    'Na którym urządzeniu będziesz najczęściej obstawiał?',
    'Które dyscypliny będziesz najczęściej obstawiał?',
    'Szukasz bukmachera z ofertą powitalną?',
    'Jaka będzie wielkość pierwszego depozytu?'
  ];

  return (
    <main className="comparison__options options">
    <h3 className="options__title">
      <span className="options__title--step">
        {`${props.step + 1}/5.`}
        </span>
        <span className="options__title--desc">
          {steps[props.step]}
        </span>
      </h3>
    <section className="options__container">
      <Card />
      <Card />
      <Card />
    </section>
  </main>
  )
}

export default DefaultStep
