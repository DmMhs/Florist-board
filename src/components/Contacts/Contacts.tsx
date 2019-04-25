import React, { Component } from 'react';

import './Contacts.less';
import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { contacts } from '../../config/contacts';
import labels from '../../config/labels';
import { AuthContext } from '../Auth/AuthContext';

class Contacts extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {value => (
          <div className="Contacts">
            <div className="contacts-wrapper">
              <h2>{labels[value.state.lang as string].pages.contacts.map}</h2>
              <GoogleMap url="https://maps.google.com/maps?q=Lviv%2C%20Rynok%20Square&t=&z=13&ie=UTF8&iwloc=&output=embed" />
              <hr />
              <ContactInfo
                address={contacts[value.state.lang as string].address}
                phone={contacts.phone}
                email={contacts.email}
                instagram={contacts.links.instagram}
                facebook={contacts.links.facebook}
                telegram={contacts.links.telegram}
              />
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Contacts;
