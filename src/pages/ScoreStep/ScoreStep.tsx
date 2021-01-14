import Button from 'layout/shared/Button/Button'
import { ReactComponent as Check } from 'layout/shared/assets/check.svg'

import React from 'react'

interface Props {
  bookInfo: Record<string, string>;
  usedBook: string;
  tekstIndywidualnyDyscypliny: string;
  tekstIndywidualnyPoziom: string;
  tekstIndywidualnyUrzadzenie: string;
}

const ScoreStep = (props: Props) => {
  return (
    <div className="options__wrapper">
      <div className="options__left-column left-column">
        <img className="left-column__image flip-scale-up-hor" 
        src={props.bookInfo.logo} 
        alt="bookmaker logo"
        />
        <div className="left-column__button"><Button content="REJESTRACJA" onClickHandler={() => window.location.replace(props.bookInfo.link)}/></div>
      </div>
      <div className="options__right-column right-column">
        <div className="right-column__top">
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">{`Najlepszy dla ${props.tekstIndywidualnyPoziom}`}</span></p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">{`Dobrze oceniana aplikacja na ${props.tekstIndywidualnyPoziom}`}</span></p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">{`Bogata oferta na ${props.tekstIndywidualnyDyscypliny}`}</span></p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Wysoki wynik oferty powitalnej przy podanej wysokości</span></p>
          <p><span className="right-column__plus--last"></span>
            <span className="right-column__advantage">
              depozytu
            </span>
          </p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Szybka rejestracja bez dowodu</span></p>
        </div>
        <div className="right-column__bottom">
        {props.bookInfo.promoCode && <p><span className="right-column__info">Kod do rejestracji:</span><span className="right-column__info--var">{` ${props.bookInfo.promoCode}`}</span></p>}
        {props.bookInfo.site && <p><span className="right-column__info">Strona rejestracji:</span><span className="right-column__info--var">{` `}<a href={props.bookInfo.site}>{`${props.bookInfo.site}`}</a></span></p>}
        </div>
      </div>
    </div>
  )
}

export default ScoreStep
