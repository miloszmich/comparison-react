import React from 'react'
import DisciplineStep from './DisciplineStep/DisciplineStep';
import Card from './StandardStep/components/Card'
import StandardStep from './StandardStep/StandardStep';

interface Props {
  step: number;
  setStep: (step: number) => void;
  stepFirstValue: number | null;
  setStepFirstValue: (value: number | null) => void;
  stepSecondValue: number | null;
  setStepSecondValue: (value: number | null) => void;
  stepThirdValues: number[];
  setStepThirdValues: (value: number[]) => void;
  stepFourthValue: number | null;
  setStepFourthValue: (value: number | null) => void;
}

const DefaultStep = (props: Props) => {

  const steps = [
    'Od jak dawna obstawiasz zakłady bukmacherskie?',
    'Na którym urządzeniu będziesz najczęściej obstawiał?',
    'Które dyscypliny będziesz najczęściej obstawiał?',
    'Szukasz bukmachera z ofertą powitalną?',
    'Jaka będzie wielkość pierwszego depozytu?'
  ];



 const firstStep = [
    { 
    title: 'Jestem debiutantem', 
    description: ['To moje pierwsze kroki w obstawianiu'],
    result:'weak'
   }, 
    { 
    title: 'Jestem doświadczony', 
    description: ['Wiem co to AKO, marża, livebetting i freebet'],
    result: 'medium'}, 
    { 
    title: 'Jestem legendą', 
    description: ['Jestem postrachem bukmacherów!'],
    result: 'strong' }
  ];

  const secondStep = [
    { 
    title: 'Na smartfonie lub tablecie', 
    description: ['Zawsze pod ręką', 'Szybkie zakłady'],
  result: 'mobile' }, 
    { 
    title: 'Na komputerze', 
    description: ['Przejrzysta i funkcjonalna strona', 'Wygodne przeglądanie oferty'],
  result: 'comp' }, 
    { 
    title: 'Jeszcze nie wiem', 
    description: ['Nie mam preferencji'],
  result:'no-preferrences' }
  ];

  const thirdStep = [
    { 
    title: 'Piłkę nożną', 
    selected: false,
    result:'piłka nożna' }, 
    { 
    title: 'Koszykówkę', 
    selected: false,
    result:'koszykówka' }, 
    { 
    title: 'Tenis ziemny', 
    selected: false,
  result:'tenis ziemny' }, 
    { 
    title: 'Hokej', 
    selected: false,
  result:'hokej' }, 
    { 
    title: 'Sporty walki', 
    selected: false,
  result:'sporty walki' }, 
    { 
    title: 'Siatkówkę', 
    selected: false,
  result:'siatkówka' }, 
    { 
    title: 'eSport', 
    selected: false,
  result:'esport' }, 
    { 
    title: 'Wirtualne Sporty', 
    selected: false,
  result: 'sporty wirtualne' }, 
    { 
    title: 'Inne', 
    selected: false,
  result: 'inne' }, 
  ];

  const fourthStep = [
    { 
    title: 'Bonus do depozytu', 
    description: ['Bonus dodany do Twojego depozytu'],
  result:'bonus-to-deposit' }, 
    { 
    title: 'Bonus bez depozytu', 
    description: ['Bonus na start bez wpłaty własnej'],
  result:'only-bonus' 
}, 
    { 
    title: 'Nie chcę bonusu', 
    description: ['Nie jestem zainteresowany promocjami'],
  result:'no-bonus' }
  ];

  const stepHandler = () => {
    setTimeout(() => {
      props.setStep(props.step + 1);
    }, 1000)
  }

  const standardStepValueHandler = (value: number) => {
    if (props.step === 0) {
      props.setStepFirstValue(value);
      stepHandler();
    }
    if (props.step === 1) {
      props.setStepSecondValue(value);
      stepHandler();
    }
    if (props.step === 3) {
      props.setStepFourthValue(value);
      stepHandler();
    }

  }

  const disciplineStepValueHandler = (value: number, active: boolean) => {
    const copiedValues = [...props.stepThirdValues];
    if (active) {
      copiedValues.push(value);
      props.setStepThirdValues(copiedValues);
    } else {
      const index = copiedValues.findIndex(v => v === value);
      copiedValues.splice(index, 1);
      props.setStepThirdValues(copiedValues);
    }
  }

  let activeOption: number | null = null;
  if (props.step === 0) activeOption = props.stepFirstValue;
  if (props.step === 1) activeOption = props.stepSecondValue;
  if (props.step === 3) activeOption = props.stepFourthValue;

  let currentStepComponent;

  switch (props.step) {
    case 0:
      currentStepComponent = <StandardStep stepData={firstStep} step={props.step} stepValueHandler={standardStepValueHandler} activeOption={activeOption}/>
      break;
    case 1:
      currentStepComponent = <StandardStep stepData={secondStep} step={props.step} stepValueHandler={standardStepValueHandler} activeOption={activeOption}/>
      break;
    case 2:
      currentStepComponent = <DisciplineStep stepData={thirdStep} step={props.step} stepValueHandler={disciplineStepValueHandler} activeOptions={props.stepThirdValues}/>
      break;
    case 3:
      currentStepComponent = <StandardStep stepData={fourthStep} step={props.step} stepValueHandler={standardStepValueHandler} activeOption={activeOption}/>
      break;
  }

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
      {currentStepComponent}
    </section>
  </main>
  )
}

export default DefaultStep
