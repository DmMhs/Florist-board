import React, { Component } from 'react';

import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { AppContext } from '../../AppContext';
import { urls } from '../../config/urls';
import './Contacts.less';
import { getURLs } from '../../services/admin/getURLs';
import { getContacts } from '../../services/admin/getContacts';

interface ContactsProps {}
interface ContactsState {
  contacts: {
    en: {
      address: string;
    };
    ua: {
      address: string;
    };
    postCode: string;
    phone: string;
    email: string;
  };
  social_urls: {
    facebook: string;
    instagram: string;
    telegram: string;
  };
  google_map_url: string;
  fetchInProgress: boolean;
}

class Contacts extends Component<ContactsProps, ContactsState> {
  constructor(props: ContactsProps) {
    super(props);
    this.state = {
      contacts: {
        en: {
          address: ''
        },
        ua: {
          address: ''
        },
        postCode: '',
        phone: '',
        email: ''
      },
      social_urls: {
        facebook: '',
        instagram: '',
        telegram: ''
      },
      google_map_url: '',
      fetchInProgress: true
    };
  }

  public componentDidMount = async () => {
    const contacts = await getContacts();

    this.setState({
      contacts: contacts
    });
    const data = await getURLs();
    this.setState({
      google_map_url: data.google_map_address,
      social_urls: {
        facebook: data.socials.facebook,
        instagram: data.socials.instagram,
        telegram: data.socials.telegram
      },
      fetchInProgress: false
    });
  };

  public render() {
    const context = this.context;
    const labels = context.state.labels;
    const lang = context.state.lang;
    const contacts = this.state.contacts;
    const social = this.state.social_urls;
    return (
      <AppContext.Consumer>
        {value => (
          <div className="Contacts">
            <div className="contacts-wrapper">
              <h2>{labels[lang].pages.contacts.map}</h2>
              <GoogleMap url={urls.google_map_address} />
              <hr />
              <ContactInfo
                address={(contacts as { [key: string]: any })[lang].address}
                phone={contacts.phone}
                email={contacts.email}
                instagram={social.instagram}
                facebook={social.facebook}
                telegram={social.telegram}
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
