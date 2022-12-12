import React from "react";

const SkipLink = props => {
  const onClick = event => {
    event.preventDefault();

    const container = document.querySelector(props.skipTo);

    if (container) {
      container.tabIndex = -1;
      container.focus();
      setTimeout(() => container.removeAttribute("tabindex"), 1000);
    }
  };

  return React.cloneElement(props.children, {
    onClick,
    className: props.className
  });
};

SkipLink.defaultProps = {
  className: "skip-link",
  skipTo: "main:first-of-type"
};

export default SkipLink;
