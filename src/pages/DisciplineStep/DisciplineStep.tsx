import React from 'react'
import DisciplineCard from './components/DisciplineCard'

interface StepData {
  title: string, 
  selected: boolean,
  result: string
}

interface Props {
  stepData: StepData[];
  step: number;
  stepValueHandler: (value: number, active: boolean) => void;
  activeOptions: number[];
}

const DisciplineStep = (props: Props) => {
  return (
    <>
    {props.stepData.map((sd, index) => <DisciplineCard 
      key={index}
      title={sd.title}
      selected={sd.selected}
      result={sd.result}
      activeOptions={props.activeOptions}
      index={index}
      onClick={props.stepValueHandler}
      step={props.step}
    />)}
    </>
  )
}

export default DisciplineStep
