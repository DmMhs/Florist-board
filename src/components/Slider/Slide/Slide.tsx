import React, { useRef } from 'react';

import './Slide.less';

const slide = (props: { imgSrc: string }) => {
  const styles = {
    backgroundImage: `url(${props.imgSrc})`
  };
  const slideRef = useRef(null);
  return <div className="Slide" style={styles} ref={slideRef} />;
};

export default slide;
