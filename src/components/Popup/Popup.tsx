import React from 'react';

import './Popup.less';

type PopupTypes = 'success' | 'failure' | 'info';

interface PopupProps {
  type: PopupTypes | null;
  message: string;
  key?: string;
}

const popup = (props: PopupProps) => {
  const { type, message } = props;
  let color: string;
  let icon;

  switch (type) {
    case 'success':
      icon = <i className="far fa-check-square" />;
      color = 'rgb(134, 218, 134)';
      break;
    case 'failure':
      icon = <i className="far fa-window-close" />;
      color = 'rgb(218, 69, 69)';
      break;
    case 'info':
      icon = <i className="fas fa-info-circle" />;
      color = 'skyblue';
      break;
    default:
      color = 'transparent';
  }

  return (
    <div
      className="Popup"
      style={{
        backgroundColor: color
      }}
    >
      <span className="popup-message">
        {icon}
        {message}
      </span>
    </div>
  );
};

export default popup;
