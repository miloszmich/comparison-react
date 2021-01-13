import React from 'react'
import { ReactComponent as Check } from '../shared/assets/check.svg'

interface Props {
  numberOfUses: number;
}

const Reasons = (props: Props) => {
  return (
    <div className="comparison__reasons reasons">
    <p className="reasons__par">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="reasons__svg svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
      <span className="reasons__span">Inteligentna porównywarka bukmacherów</span>
    </p>
    <p className="reasons__par">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="reasons__svg svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
      <span className="reasons__span">Łatwo wybierzesz najlepszą firmę</span>
    </p>
    <p className="reasons__par">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" className="reasons__svg svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
      <span className="reasons__span">Skorzystało już <span id="how_much_to_use">{props.numberOfUses}</span> typerów</span>
    </p>
  </div>
  )
}

export default Reasons
