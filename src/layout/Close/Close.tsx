import React from 'react'

type Props = {
  handleClose: () => void;
}

const Close = (props: Props) => {

  return (
    <div className="comparison__close" onClick={props.handleClose}>
    <span className="comparison__close--line1"></span>
    <span className="comparison__close--line2"></span>
  </div>
  )

}

export default Close;