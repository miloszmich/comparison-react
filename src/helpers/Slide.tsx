import React from "react";

interface Props {
  show: boolean;
  children: JSX.Element;
  className: string;
}

const Slide = ({ show, children, className }: Props) => {
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
        style={{ animation: `${show ? "slide-in" : "slide-out"} 1s` }}
        onAnimationEnd={onAnimationEnd}
        className={className}
      >
        {children}
      </div>
    ) : (<></>)
  );
};

export default Slide;