import React from 'react';

import './Toggle.less';

interface ToggleProps {
  style: React.CSSProperties;
  click:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const toggle = (props: ToggleProps) => {
  return (
    <i
      className="fas fa-ellipsis-h Toggle"
      onClick={props.click}
      style={props.style}
    />
  );
};

export default toggle;
