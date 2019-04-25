import React, { useContext } from 'react';

import './ContactInfo.less';
import labels from '../../../config/labels';
import { AuthContext } from '../../Auth/AuthContext';

interface ContactInfoProps {
  address: string;
  phone: string;
  email?: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
}

const contactInfo = (props: ContactInfoProps) => {
  const { address, phone, email, telegram, facebook, instagram } = props;
  const context = useContext(AuthContext);
  return (
    <div className="ContactsInfo">
      <h3>{labels[context.state.lang as string].pages.contacts.info}</h3>
      <hr />
      <div className="contact-option">
        <div className="icon-wrapper">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Faddress.png?alt=media&token=2fb28441-7270-4ebe-93eb-54bf0c7f1dfa"
            alt="address"
          />
        </div>{' '}
        {address}
      </div>
      <div className="contact-option">
        <div className="icon-wrapper">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Fmobile-phone.png?alt=media&token=a184bbb9-5b5b-47a9-bb33-d61740e95b9c"
            alt="phone"
          />
        </div>{' '}
        {phone}
      </div>
      {email !== undefined ? (
        <div className="contact-option">
          <div className="icon-wrapper">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Femail.png?alt=media&token=0e246b98-8137-4068-9594-d9441b571a06"
              alt="email"
            />
          </div>{' '}
          {email}
        </div>
      ) : null}
      {facebook !== undefined ||
      instagram !== undefined ||
      telegram !== undefined ? (
        <div className="socials">
          {' '}
          <hr />
          {facebook !== undefined ? (
            <div className="contact-option">
              <div className="icon-wrapper">
                <a href={facebook}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Ffacebook.png?alt=media&token=5fdb89e0-3382-43af-af56-379ed4a5db2f"
                    alt="facebook"
                  />
                </a>
              </div>
            </div>
          ) : null}
          {instagram !== undefined ? (
            <div className="contact-option">
              <div className="icon-wrapper">
                <a href={instagram}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Finstagram.png?alt=media&token=58c1731f-94f2-4d23-82e8-1e2d753413b7"
                    alt="instagram"
                  />
                </a>
              </div>
            </div>
          ) : null}
          {telegram !== undefined ? (
            <div className="contact-option">
              <div className="icon-wrapper">
                <a href={telegram}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/icons%2Fcontact-page%2Ftelegram.png?alt=media&token=95badfef-90f7-49b8-858e-a92a03657f4e"
                    alt="telegram"
                  />
                </a>
              </div>{' '}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default contactInfo;
