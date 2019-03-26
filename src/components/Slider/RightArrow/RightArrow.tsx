import React from 'react';

import './RightArrow.less';

export interface NavArrowProps {
  show: boolean;
  goToNextSlide: any;
}

const RightArrow = (props: NavArrowProps) => {
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
