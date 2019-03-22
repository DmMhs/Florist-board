import React from 'react';

import './Slide.less';

const slide = (props: any) => {
  const styles = {
    backgroundImage: `url(${props.imgSrc})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  };

  return <div className="Slide" style={styles} />;
};

export default slide;
