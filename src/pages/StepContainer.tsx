import Slide from 'helpers/Slide';
import React from 'react'
import DisciplineStep from './DisciplineStep/DisciplineStep';
import SliderStep from './SliderStep/SliderStep';
import StandardStep from './StandardStep/StandardStep';
import { ReactComponent as Return } from './assets/return.svg'

import { ReactComponent as Op7 } from './DisciplineStep/components/assets/op7.svg';
import axios from 'axios';
import { firstStep, fourthStep, secondStep, thirdStep } from 'helpers/standardData';
import ScoreStep from './ScoreStep/ScoreStep';
import { getBook } from 'helpers/setScore';

interface Props {
  show: boolean;
  stepHandler: (stepModifier?: number) => void;
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
  stepFifthValue: number;
  setStepFifthValue: (value: number) => void;
  resetResult: () => void;
  loaderVisibility: boolean;
  setLoaderVisibility: (info: boolean) => void;
  setShowConfetti: (info: boolean) => void;
}

const StepContainer = (props: Props) => {

  const [booksData, setBooksData] = React.useState<Record<string, string>[]>([]);
  const [multipierData, setMultipierData] = React.useState<Record<string, Record<string, (string | number)>[]>>({});
  const [deviceAndSkillData, setDeviceAndSkillData] = React.useState<Record<string, Record<string, (string | number)>[]>>({});
  const [infoAboutDisciplines, setInfoAboutDisciplines] = React.useState<Record<string, (string | number)>[]>([]);

  const [result, setResult] = React.useState<Record<string, string>>();

  const [useBonus, setUseBonus] = React.useState<boolean>(false);


  const steps = [
    'Od jak dawna obstawiasz zakłady bukmacherskie?',
    'Na którym urządzeniu będziesz najczęściej obstawiał?',
    'Które dyscypliny będziesz najczęściej obstawiał?',
    'Szukasz bukmachera z ofertą powitalną?',
    'Jaka będzie wielkość pierwszego depozytu?'
  ];

  const stringParser = (string: string) => {
    return JSON.parse(string);
  }

  React.useEffect(() => {
    const getData = async () => {
      const comparisonData = await axios.get('https://najlepsibukmacherzy.pl/wp-json/wp/v2/polaspecjalne/8689/');
      const bookData = await axios.get('https://najlepsibukmacherzy.pl/wp-json/wp/v2/bukmacherzy/');

      const usedBookData = bookData.data.map((bd: any) => {
        return {
          name: bd.title.rendered.split(' ')[0].replace(',', ''),
          promoCode: bd.nu_promokod,
          site: bd.nu_witryna,
          logo: bd.nu_logo_widget
        }
      });

      const fortuna = {
        name: 'Fortuna',
        promoCode: 'WiecejPLN',
        site: 'www.efortuna.pl',
        logo: 'https://najlepsibukmacherzy.pl/wp-content/uploads/2017/10/fortuna_tabela2.png'
      }
      
      usedBookData.push(fortuna);   
      
      const updatedBooksData = [...stringParser(comparisonData.data.dane_bukow)].map(bd => {
        const foundedIndex = usedBookData.findIndex((ubd: any) => ubd.name.toUpperCase() === bd.buk.toUpperCase());
        const standardPromoCode = usedBookData[foundedIndex] && usedBookData[foundedIndex].promoCode ? usedBookData[foundedIndex].promoCode : null;
        const standardLogo = usedBookData[foundedIndex] && usedBookData[foundedIndex].logo ? usedBookData[foundedIndex].logo : bd.logo;

        return {
          ...bd,
          promoCode: standardPromoCode,
          site: usedBookData[foundedIndex] && usedBookData[foundedIndex].site ? usedBookData[foundedIndex].site : null,
          logo: standardLogo
        }
      });

      setBooksData(updatedBooksData);
      setMultipierData(stringParser(comparisonData.data.mnozniki_dodatkow));
      setDeviceAndSkillData(stringParser(comparisonData.data.urzadzenie_i_skill));
      setInfoAboutDisciplines(stringParser(comparisonData.data.dyscypliny_punkty));

    }

    getData();
  }, []);


  React.useEffect(() => {
    if (props.step === 5) {

      const depositInfo = booksData.map(b => {
        return { buk: b.buk, minDep: b.minDep }
      })
      
      const result = getBook(
        {
          firstStep: firstStep[props.stepFirstValue as number].result,
          secondStep: secondStep[props.stepSecondValue as number].result,
          thirdStep: props.stepThirdValues.map(v => thirdStep[v].result),
          fourthStep: fourthStep[props.stepFourthValue as number].result,
          fifthStep: props.stepFifthValue,
        }, {
          byDevice: deviceAndSkillData,
          multipiers: multipierData,
          disciplines: infoAboutDisciplines,
          depositInfo
        },
        useBonus
      )

      setResult(result);
    }
  }, [props.step]);

  const standardStepValueHandler = (value: number) => {
    if (props.step === 0) {
      props.setStepFirstValue(value);
      props.stepHandler();
    }
    if (props.step === 1) {
      props.setStepSecondValue(value);
      props.stepHandler();
    }
    if (props.step === 3) {
      if (value === 0) {
        props.setStepFourthValue(value);
        props.stepHandler();
        setUseBonus(true);
      } else {
        props.setStepFourthValue(value);
        props.stepHandler(1);
        setUseBonus(false);
      }
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
    case 4:
      currentStepComponent = <SliderStep setStepFifthValue={props.setStepFifthValue}/>
      break;
    case 5:
      currentStepComponent = result ? <ScoreStep 
        bookInfo={ booksData.find(bd => bd.buk === result.result) ||  {buk: 'Fortuna', link: '', logo: ''}} 
        usedBook={result.result}
        tekstIndywidualnyDyscypliny={result.tekstIndywidualnyDyscypliny} 
        tekstIndywidualnyPoziom={result.tekstIndywidualnyPoziom}
        tekstIndywidualnyUrzadzenie={result.tekstIndywidualnyUrzadzenie}
        setLoaderVisibility={props.setLoaderVisibility}
        setShowConfetti={props.setShowConfetti}
        infoAboutUsingBonus={props.stepFourthValue || 0}
      /> : <></>
      break;
  }

  React.useEffect(() => {
    if (props.step === 5) setTimeout(() => {
      props.setLoaderVisibility(false);
      props.setShowConfetti(true);
    }, 3000)
  },[props.step])

  return (
    !props.loaderVisibility ? <main style={{overflow: 'hidden', minHeight: '410px'}}>
      <Slide show={props.show} className="comparison__options options">
        <>
    <h3 className={`options__title ${props.step === 5 ? 'options__title--last-step' : ''}`}>
      <span className={`options__title${props.step < 5 ? '--step' : '--info'}`}>
        {props.step < 5 ? `${props.step + 1}/5. ` : <>{`Mamy to! 🎉 Twoje odpowiedzi sugerują, `}<br/></>}
        </span>
        <span className={`options__title${props.step < 5 ? '--desc' : '--info'}`}>
          {props.step < 5 
            ? steps[props.step] 
            : result && result.result && <span className={`options__title${props.step < 5 ? '--desc' : '--info'}`}>{`że najlepszym bukmacherem dla Ciebie może być `}<a className="options__result--title-link" href={booksData.find(bd => bd.buk === result.result)!.link}>{result.result}</a></span>}
        </span>
      {props.step === 4 && <p className="options__title--algorithm"><Op7/> <i>Algorytm wybierze dopasowaną ofertę do wysokości Twojego pierwszego depozytu</i></p>}
      {props.step === 5 && <><br/><span className="options__title--return" onClick={() => props.resetResult()}><Return />Wybierz na nowo</span></>}
      </h3>
    <section className={`options__container${props.step === 2 ? '--discipline' : '--standard'}`}>
      {currentStepComponent}
    </section>
    </>
    </Slide>
  </main> : <></>
  )
}

export default StepContainer
