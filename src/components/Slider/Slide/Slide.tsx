import React from 'react';

import './Slide.less';

const slide = (props: { imgSrc: string }) => {
  const styles = {
    backgroundImage: `url(${props.imgSrc})`
  };

  return <div className="Slide" style={styles} />;
};

export default slide;
