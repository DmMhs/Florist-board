import React, { Component } from 'react';

import './Contacts.less';
import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { contacts } from '../../config/contacts';

class Contacts extends Component {
  render() {
    return (
      <div className="Contacts">
        <div className="contacts-wrapper">
          <h2>Where to find us ?</h2>
          <GoogleMap url="https://maps.google.com/maps?q=Lviv%2C%20Rynok%20Square&t=&z=13&ie=UTF8&iwloc=&output=embed" />
          <hr />
          <ContactInfo
            address={contacts.address}
            phone={contacts.phone}
            email={contacts.email}
            instagram={contacts.links.instagram}
            facebook={contacts.links.facebook}
            telegram={contacts.links.telegram}
          />
        </div>
      </div>
    );
  }
}

export default Contacts;
