import React from 'react'

interface Props {
  setStepFifthValue: (value: number) => void;
}

const SliderStep = (props: Props) => {

  const [sliderValue, setSliderValue] = React.useState(0);
  const [trackWidth, setTrackWidth] = React.useState('');
  const [trackHeight, setTrackHeight] = React.useState(0);
  const [shadowWidth, setShadowWidth] = React.useState(0);

  const sliderInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const editedSliderValue = sliderValue > 5000 ? 5000 : sliderValue;
    const newTrackValue = (editedSliderValue / 5000 * 100) > 85 ? `${(editedSliderValue / 5000 * 100)}% - 25.5px` : `${(editedSliderValue / 5000 * 100)}%`;
    setTrackWidth(newTrackValue);
  }, [sliderValue])

  React.useEffect(() => {
    props.setStepFifthValue(sliderValue);
  }, [sliderValue])

  React.useEffect(() => {
    if (sliderInputRef.current) {
      const dimensions = sliderInputRef.current.getBoundingClientRect();
      setTrackHeight(dimensions.height);
      setShadowWidth(dimensions.width - 13)
    }
  },[sliderInputRef])

  const handleChangeInput = (value: string) => {
    if (/,/.test(value) || /-/.test(value) || /\+/.test(value)) return;
    const parsedValue = Number(value);
    if (parsedValue === null || parsedValue === undefined) return setSliderValue(0);
    if (parsedValue < 0) return setSliderValue(0);
    // if  (parsedValue  > 5000) return setSliderValue(5000);
    return setSliderValue(parsedValue);
  }

  return (
    <>
    <div className="options__slider slider">
  <div className="slider__container">
    <div className="slider__wrapper">
      <input 
        ref={sliderInputRef}
        type="range" 
        min="0" 
        max="5000" 
        value={sliderValue}  
        step="10" 
        className="slider__input" 
        onChange={(e) => setSliderValue(Number(e.target.value))}/>
      <div className="slider__background" style={{height: `${trackHeight}px`, width: `calc(${trackWidth})`}}></div>
      <div className="slider__background--shadow" style={{width: `${trackWidth}px`}}></div>
      <div className="slider__shadow" style={{width: `${shadowWidth}px`}}></div>
    </div>
    <div className="slider__label">
      <span className="slider__label--value">0</span>
      <span className="slider__label--value">1000</span>
      <span className="slider__label--value">5000+</span>
    </div>
  </div>
  <div className="slider__value value">
    <label className="value__label" htmlFor="deposit">Kwota depozytu</label>
    <input className="value__input" type="number" value={sliderValue} name="deposit" onChange={(e) => handleChangeInput(e.target.value)}/>
    <span className="value__currency">PLN</span>
  </div>
</div>
</>
  )
}

export default SliderStep
