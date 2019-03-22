import React from 'react';

import './Slide.less';

const slide = (props: any) => {
  const style = {
    display: 'none'
  };
  props.visible === true ? (style.display = 'block') : (style.display = 'none');
  const slideContent = (
    <div className="image-wrapper">
      <img src={props.imgSrc} style={style} className="fade" />
    </div>
  );

  return <div className="Slide">{slideContent}</div>;
};

export default slide;
