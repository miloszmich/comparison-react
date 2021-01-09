import React from 'react'

import { ReactComponent as MagicWand } from './magicwand.svg'

interface Props {
  
}

const Header = (props: Props) => {
  return (
    <header className="comparison__header header">
    <div className="header__title">
      <div className="header__magic-wand">
      <MagicWand />
      </div>
      <h2><b>Twój bukmacher w 30 sekund</b></h2>
    </div>
    <p>WYBIERZ BUKMACHERA ONLINE <strong>W 5 PROSTYCH KROKACH</strong></p>
  </header>
  )
}

export default Header;
