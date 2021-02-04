import Button from 'layout/shared/Button/Button'
import { ReactComponent as Check } from 'layout/shared/assets/check.svg'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

interface Props {
  bookInfo: Record<string, string>;
  usedBook: string;
  tekstIndywidualnyDyscypliny: string;
  tekstIndywidualnyPoziom: string;
  tekstIndywidualnyUrzadzenie: string;
  setLoaderVisibility: (info: boolean) => void;
  setShowConfetti: (info: boolean) => void;
  infoAboutUsingBonus: number;
}

const ScoreStep = (props: Props) => {
  const [copyTextInfo, setCopyTextInfo] = React.useState(' Kopiuj kod')

  const bookLink = props.bookInfo.site ? props.bookInfo.site : props.bookInfo.buk === "Fortuna" ? 'www.efortuna.pl' : props.bookInfo.buk === "Totolotek" ? 'www.totolotek.pl' : null;

  const copyText = () => {
    navigator.clipboard.writeText(props.bookInfo.promoCode);
    setCopyTextInfo(' Skopiowano!')
  };

  let infoAboutBonus = <></>;
  if (props.infoAboutUsingBonus === 0) infoAboutBonus = <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage"><b>Wysoki wynik oferty powitalnej</b> przy podanej wysokości depozytu</span></p>;
  if (props.infoAboutUsingBonus === 1) infoAboutBonus = <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage"><b>Wysoki wynik oferty powitalnej</b> bez depozytu</span></p>;

  return (
    <div className="options__wrapper">
      <div className="options__left-column left-column">
        <a href={props.bookInfo.link} target="_blank"><img className="left-column__image" 
        src={props.bookInfo.logo} 
        alt="bookmaker logo"
        />
        </a>
        <div className="left-column__button"><Button content="REJESTRACJA" onClickHandler={() => window.open(props.bookInfo.link, '_blank')}/></div>
      </div>
      <div className="options__right-column right-column">
        <div className="right-column__top">
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Odpowiedni dla <b>{props.tekstIndywidualnyPoziom}</b></span></p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Dostępny <b>{props.tekstIndywidualnyUrzadzenie}</b></span></p>
          <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Bogata oferta na <b>{props.tekstIndywidualnyDyscypliny}</b></span></p>
          {infoAboutBonus}
          {/* <p><span className="right-column__plus--last"></span>
            <span className="right-column__advantage">
            </span>
          </p> */}
          {props.bookInfo.buk !== 'forBET' && props.bookInfo.buk !== 'ETOTO' ? <p><span className="right-column__plus"><Check /></span><span className="right-column__advantage">Rejestracja bez dowodu (konto tymczasowe)</span></p> : <></>}
        </div>
        <div className="right-column__bottom">
        {props.bookInfo.promoCode && <p><span className="right-column__info">{`Kod do rejestracji: `}</span><input type="text" readOnly={true} className="right-column__info--var" value={props.bookInfo.promoCode} /><span className="right-column__info--copy" onClick={copyText}>
          {/* <i className="fas fa-copy"></i> 
           */}
           <FontAwesomeIcon icon={faCopy} />
          {copyTextInfo}
          </span></p>}
 

        {bookLink && <p><span className="right-column__info">Strona rejestracji:</span><span className="right-column__info--var">{` `}<a href={props.bookInfo.link} target="_blank">{`${bookLink}`}</a></span></p>}
        </div>
      </div>
    </div>
  )
}

export default ScoreStep
