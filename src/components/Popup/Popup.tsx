import React from 'react';

import './Popup.less';

interface PopupProps {
  message: string;
}

const popup = (props: PopupProps) => {
  return (
    <div className="Popup">
      <span className="popup-message">{props.message}</span>
    </div>
  );
};

export default popup;
