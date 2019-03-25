import React from 'react';

import './LeftArrow.less';

const LeftArrow = (props: any) => {
  return (
    <div
      className="left-arrow"
      onClick={props.goToPrevSlide}
      style={{ display: props.show ? 'flex' : 'none' }}
    >
      <i className="fas fa-chevron-left" aria-hidden="true" />
    </div>
  );
};

export default LeftArrow;
