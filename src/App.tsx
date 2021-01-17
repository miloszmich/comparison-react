import Close from 'layout/Close/Close';
import Footer from 'layout/Footer/Footer';
import Header from 'layout/Header/Header';
import Loader from 'layout/Loader/Loader';
import Reasons from 'layout/Reasons/Reasons';
import StepContainer from 'pages/StepContainer';
import React from 'react';
import 'scss/style.scss';
import axios from 'axios';
import Confetti from 'layout/Confetti/Confetti';
import ModalSlide from 'helpers/ModalSlide';

function App() {

  const [isVisible, setVisibility] = React.useState(false);
  const [loaderVisibility, setLoaderVisibility] = React.useState(true);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const [numberOfUses, setNumberOfUses] = React.useState(0);


  const [stepFirstValue, setStepFirstValue] = React.useState<number | null>(null);
  const [stepSecondValue, setStepSecondValue] = React.useState<number | null>(null);
  const [stepThirdValues, setStepThirdValues] = React.useState<number[]>([]);
  const [stepFourthValue, setStepFourthValue] = React.useState<number | null>(null);
  const [stepFifthValue, setStepFifthValue] = React.useState<number>(0);

  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    document.querySelector('.comparison-fire')!.addEventListener('click', () => {
      setVisibility(true);
      setShowModal(true);
      setShow(true);
    })
  })


  React.useEffect(() => {
    const getData = async () => {
      const numberOfUsesDB = await axios.get('https://najlepsibukmacherzy.pl/wp-json/wp/v2/polaspecjalne/6324/');

      setNumberOfUses(Number(numberOfUsesDB.data.porownywarka_licznik));
      setTimeout(() => setLoaderVisibility(false), 2000);
    }

    getData();
  }, []);

  const stepHandler = () => {
    setShow(false);
    setTimeout(() => {
      setStep(step + 1);
      setShow(true);
    }, 1000)
  }

  const resetResult = () => {
    setStepFirstValue(null);
    setStepSecondValue(null);
    setStepThirdValues([]);
    setStepFourthValue(null);
    setStepFifthValue(0);
    setShowConfetti(false);
    setStep(0);
  };

  const setNewCurrentStep = (step: number) => {
    if (step === 0) {
      resetResult();
    }
    if (step === 1) {
      setStepSecondValue(null);
      setStepThirdValues([]);
      setStepFourthValue(null);
      setStepFifthValue(0);
      setShowConfetti(false);
      setStep(step);
    }
    if (step === 2) {
      setStepThirdValues([]);
      setStepFourthValue(null);
      setStepFifthValue(0);
      setShowConfetti(false);
      setStep(step);
    }
    if (step === 3) {
      setStepFourthValue(null);
      setStepFifthValue(0);
      setShowConfetti(false);
      setStep(step);
    }
    if (step === 4) {
      setStepFifthValue(0);
      setShowConfetti(false);
      setStep(step);
    }
  };

  const closeHandler = () => {
    setVisibility(false);
    resetResult();
  }


  React.useEffect(() => {
    if (step === 5) setLoaderVisibility(true);
  },[step])

  return (
    <div className={`modal-comparison${isVisible ? '' : '--not-active'}`}>
      {showConfetti && <Confetti />}
      {isVisible && <ModalSlide show={showModal}><div className="comparison">
        <Loader 
          loaderVisibility={loaderVisibility}
        />
        <Close handleClose={() => closeHandler()}/>
        <Header />
        {step !== 5 && <Reasons numberOfUses={numberOfUses}/>}
          <StepContainer 
            show={show}
            stepHandler={stepHandler}
            step={step} 
            setStep={setStep}
            stepFirstValue={stepFirstValue}
            setStepFirstValue={setStepFirstValue}
            stepSecondValue={stepSecondValue}
            setStepSecondValue={setStepSecondValue}
            stepThirdValues={stepThirdValues}
            setStepThirdValues={setStepThirdValues}
            stepFourthValue={stepFourthValue}
            setStepFourthValue={setStepFourthValue}
            stepFifthValue={stepFifthValue}
            setStepFifthValue={setStepFifthValue}
            resetResult={resetResult}
            setLoaderVisibility={setLoaderVisibility}
            loaderVisibility={loaderVisibility}
            setShowConfetti={setShowConfetti}
            />
        <Footer 
          step={step} 
          stepThirdValues={stepThirdValues} 
          stepFifthValue={stepFifthValue} 
          stepHandler={stepHandler}
          setNewCurrentStep={setNewCurrentStep}
        />
      </div></ModalSlide>}
    </div> 
  );
}

export default App;
