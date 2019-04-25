import React from 'react';

import './Toggle.less';

interface ToggleProps {
  style: React.CSSProperties;
  click:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const toggle = React.forwardRef((props: ToggleProps, ref) => {
  return (
    <i
      className="fas fa-ellipsis-h Toggle"
      onClick={props.click}
      style={props.style}
      ref={ref as any}
    />
  );
});

export default toggle;
