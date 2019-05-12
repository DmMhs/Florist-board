import React, { Component } from 'react';

import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { contacts } from '../../config/contacts';
import { AppContext } from '../../AppContext';
import { urls } from '../../config/urls';
import './Contacts.less';

class Contacts extends Component {
  public render() {
    const context = this.context;
    const labels = context.state.labels;
    const lang = context.state.lang;

    return (
      <AppContext.Consumer>
        {value => (
          <div className="Contacts">
            <div className="contacts-wrapper">
              <h2>{labels[lang].pages.contacts.map}</h2>
              <GoogleMap url={urls.google_map_address} />
              <hr />
              <ContactInfo
                address={contacts[lang].address}
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

Contacts.contextType = AppContext;

export default Contacts;
