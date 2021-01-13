import React from 'react'

interface Props {
  
}

const Confetti = (props: Props) => {

  const [unMount, setUnMount] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setUnMount(true);
    }, 4000)
  },[])

  const confettiGenerator = () => {
    let i = 149;
    const confetti: JSX.Element[] = [];
    const wrapper = document.createElement('div');
    wrapper.classList.add('confetti-wrapper');
  
    while (i > -1) {
      const confettiEl = <div className={`confetti-${+i}`}></div>
      confetti.push(confettiEl)
      // const confetti = document.createElement('div');
      // confetti.classList.add(`confetti-${+i}`)
      // wrapper.appendChild(confetti);
      i--
    }
    // document.querySelector('.options').appendChild(wrapper);
    return confetti;
  }
  return (
    !unMount ? <div className="confetti-wrapper">
      {confettiGenerator()}
    </div> : <></>
  )
}

export default Confetti
