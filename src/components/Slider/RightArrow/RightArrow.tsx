import React from 'react';

import './RightArrow.less';
import { NavArrow } from '../../../models/NavArrow';

const RightArrow = (props: NavArrow) => {
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
