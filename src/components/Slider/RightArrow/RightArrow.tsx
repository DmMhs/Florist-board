import React from 'react';

import './RightArrow.less';

const RightArrow = (props: any) => {
  return (
    <div
      className="right-arrow"
      onClick={props.goToNextSlide}
      style={{ display: props.show ? 'flex' : 'none' }}
    >
      <i className="fas fa-chevron-right" aria-hidden="true" />
    </div>
  );
};

export default RightArrow;
