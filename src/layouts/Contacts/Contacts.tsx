import React, { Component } from 'react';

import GoogleMap from './Map/GoogleMap';
import ContactInfo from './ContactInfo/ContactInfo';
import { AppContext } from '../../AppContext';
import { urls } from '../../config/urls';
import { database } from '../../firebase';
import './Contacts.less';

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

  public componentDidMount() {
    database
      .ref()
      .child('contacts')
      .on('value', snapshot => {
        this.setState({
          contacts: snapshot!.val()
        });
        database
          .ref()
          .child('urls')
          .on('value', snapshot2 => {
            this.setState({
              google_map_url: snapshot2!.val().google_map_address,
              social_urls: {
                facebook: snapshot2!.val().socials.facebook,
                instagram: snapshot2!.val().socials.instagram,
                telegram: snapshot2!.val().socials.telegram
              },
              fetchInProgress: false
            });
          });
      });
  }

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
