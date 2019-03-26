import React from 'react';

import './LeftArrow.less';
import { NavArrow } from '../../../models/NavArrow';

const LeftArrow = (props: NavArrow) => {
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
