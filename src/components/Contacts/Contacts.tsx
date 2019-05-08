import React, { Component } from 'react';

import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { contacts } from '../../config/contacts';
import labels from '../../config/labels';
import { AppContext } from '../../AppContext';

import './Contacts.less';
import { urls } from '../../config/urls';

class Contacts extends Component {
  public render() {
    return (
      <AppContext.Consumer>
        {value => (
          <div className="Contacts">
            <div className="contacts-wrapper">
              <h2>{labels[value.state.lang as string].pages.contacts.map}</h2>
              <GoogleMap url={urls.google_map_address} />
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
      </AppContext.Consumer>
    );
  }
}

export default Contacts;
