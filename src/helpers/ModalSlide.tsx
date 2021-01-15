import React from "react";

interface Props {
  show: boolean;
  children: JSX.Element;
}

const ModalSlide = ({ show, children }: Props) => {
  const [shouldRender, setRender] = React.useState(show);

  React.useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender ? (
      <div
        style={{ animation: `${show && "slide-from-top"} 1s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    ) : (<></>)
  );
};

export default ModalSlide;