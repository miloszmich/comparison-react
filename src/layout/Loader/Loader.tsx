import React from 'react';

type Props = {
  loaderVisibility: boolean;
}

const Loader = (props: Props): JSX.Element => {

  return (
    
    props.loaderVisibility ? <div className="comparison-loader">
    <div className="comparison-loader__container">
      <span className="comparison-loader__circle"><span className="comparison-loader__circle--ready1"></span></span>
      <span className="comparison-loader__circle"><span className="comparison-loader__circle--ready2"></span></span>
      <span className="comparison-loader__circle"><span className="comparison-loader__circle--ready3"></span></span>
      <span className="comparison-loader__circle"><span className="comparison-loader__circle--ready4"></span></span>
      <span className="comparison-loader__circle"><span className="comparison-loader__circle--ready5"></span></span>
      <div className="comparison-loader__lines">
        <span className="comparison-loader__line1"></span>
        <span className="comparison-loader__line2"></span>
        <span className="comparison-loader__line3"></span>
        <span className="comparison-loader__line4"></span>
      </div>
    </div>
  </div> : <></>

  )
};

export default Loader;