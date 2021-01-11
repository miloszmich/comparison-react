import React from 'react'
import Card from './components/Card'

interface StepData {
  title: string;
  description: string[];
  result: string;
}

interface Props {
  stepData: StepData[];
  step: number;
  stepValueHandler: (value: number) => void;
  activeOption: number | null;
}

const StandardStep = (props: Props) => {
  return (
    <>
    {props.stepData.map((sd, index) => <Card
      onClick={() => props.stepValueHandler(index)} 
      key={index}
      title={sd.title} 
      description={sd.description} 
      result={sd.result} 
      index={index} 
      step={props.step}
      activeOption={props.activeOption}
    />)}
    </>
  )
}

export default StandardStep
