import React from 'react'
import { ReactComponent as Warranty } from './assets/warranty.svg'
import Button from 'layout/shared/Button/Button';
import axios from 'axios';

interface Props {
  step: number;
  stepThirdValues: number[];
  stepHandler: () => void;
  stepFifthValue: number;
  setNewCurrentStep: (step: number) => void;
}

const Footer = (props: Props) => {

  let stepCTA = <></>;

  function getCookie (cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return false;
}

function setCookie (cname: string, cvalue: boolean, secs: number) {
    var d = new Date();
    d.setTime(d.getTime() + (secs*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const comparisonResultUpdate = () => {
  if (!getCookie("porownywarka-counted")) {
  axios.post("https://najlepsibukmacherzy.pl/wp-content/themes/najlepsibukmacherzy/logic/kalkulator-bonusowy-counter.php", { "pass": 'DSF6YVjmKy' }, {
    headers: {
    "Authorization": "Basic bHVrYXN6Oms1aW8gMlBRNyA3Z00wIG1ocDMgMXJJUCBKZ3lh",
    }
  }
);   
setCookie("porownywarka-counted", true, 5)
}

}
  
  if ([0, 1, 3, 4, 5].includes(props.step)) {
    stepCTA = <div className="warranty__legal"><span>made by najlepsibukmacherzy.pl</span><span>Wersja narzędzia: 1.0</span></div>
  } 
  if (props.step === 2) {
    stepCTA = <div className="warranty__legal"><span>made by najlepsibukmacherzy.pl</span><span>Wersja narzędzia: 1.0</span></div>
  }
  if (props.step === 2 && props.stepThirdValues.length > 0) {
    stepCTA = <Button onClickHandler={props.stepHandler} content="NASTĘPNY KROK"/>
  }

  if (props.step === 4 && props.stepFifthValue !== 0) {
    stepCTA = <Button isSubmit={true} onClickHandler={() => {
      props.stepHandler();
      comparisonResultUpdate();
    }} content="OK! POKAŻ WYNIK!"/>
  }
 

  

  const stepDesc = [
    '1. Doświadczenie',
    '2. Urządzenie',
    '3. Dyscypliny',
    '4. Bonusy',
    '5. Wynik'
  ];

  const stepper = stepDesc.map((s, index) => (
    <li key={index}>
    <span className={`stepper__circle circle${props.step === index ? '--current' : props.step > index ? '--ready' : ''}`} onClick={() => {
      if (props.step > index) props.setNewCurrentStep(index)
    }}>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
      <div className="circle__content"></div></span> 
    <p className="stepper__desc">
      {s}
    </p>
   </li>
  ))

  return (
    <footer className="comparison__footer-modal footer-modal">
    <section className="comparison__stepper stepper">
      <div className="stepper__line">
        <div className="stepper__line--progress" style={{width: `${props.step < 5 ? props.step * 25 : 100}%`}}></div>
      </div>
      <div className="stepper__steps">
        <ul className="stepper__container">
          {stepper}
        </ul>
      </div>
    </section>

    <div className="stepper__warranty warranty">
      {stepCTA}
    </div>
  </footer>
  )
}

export default Footer
