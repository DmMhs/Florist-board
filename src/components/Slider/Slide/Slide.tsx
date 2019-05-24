import React, { useContext } from 'react';

import './Slide.less';
import { AppContext } from '../../../AppContext';
import { deleteBannerImage } from '../../../services/admin/deleteBannerImage';

const slide = (props: { imgSrc: string; forBanner?: boolean }) => {
  const context = useContext(AppContext);
  const imgURL = props.imgSrc;
  let imgName = '';
  if (props.forBanner === true) {
    imgName = imgURL.split('%2F')[1].split('?')[0];
  }

  const styles = {
    backgroundImage: `url(${props.imgSrc})`
  };

  return (
    <div className="Slide" style={styles}>
      {context.state.userRole === 'admin' && props.forBanner === true ? (
        <div
          className="adminIcons"
          onClick={() => deleteBannerImage(imgName, imgURL)}
        >
          <i className="far fa-trash-alt" />
        </div>
      ) : null}
    </div>
  );
};

export default slide;
