import React, { Component } from 'react';

import { database } from '../../../firebase';
import { AppContext } from '../../../AppContext';
import { Spinner } from '../../../components';
import { createObjectPath } from '../../../services/admin/createObjectPath';
import './ChangeContacts.less';
import { updateContacts } from '../../../services/admin/updateContacts';

interface ChangeContactsProps {}
interface ChangeContactsState {
  newContacts: {};
  currentContacts: {
    en: {
      address: string;
    };
    ua: {
      address: string;
    };
    postCode?: string;
    phone: string;
    email: string;
    links?: {
      instagram?: string;
      telegram?: string;
      facebook?: string;
    };
  };
  fetchInProgress: boolean;
}
class ChangeContacts extends Component<
  ChangeContactsProps,
  ChangeContactsState
> {
  constructor(props: ChangeContactsProps) {
    super(props);
    this.state = {
      newContacts: {},
      currentContacts: {
        en: {
          address: ''
        },
        ua: {
          address: ''
        },
        postCode: '',
        phone: '',
        email: '',
        links: {
          instagram: '',
          telegram: '',
          facebook: ''
        }
      },
      fetchInProgress: true
    };
  }

  public componentDidMount = () => {
    database
      .ref()
      .child('contacts')
      .on('value', snapshot => {
        this.setState({
          newContacts: snapshot!.val(),
          currentContacts: snapshot!.val(),
          fetchInProgress: false
        });
      });
  };

  private formSubmitHandler = () => {
    updateContacts(this.state.newContacts);
  };

  private changeOptionHandler = (
    option: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedContacts = { ...this.state.newContacts };
    createObjectPath(updatedContacts, option, event.target.value as string);
    this.setState({
      newContacts: updatedContacts
    });
  };

  public render() {
    const context = this.context;
    const lang = context.state.lang;
    const labels = context.state.labels;
    const labelsRoot = labels[lang].pages.admin;
    const { current, change, submitBtn } = labelsRoot;

    const formContent = (
      <div className="FormContent">
        <div className="form-control">
          <label>{change} contacts...</label>
          <p>adress (EN):</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'en.address')}
          />
          <p className="current">
            {current}
            {this.state.currentContacts.en.address}
          </p>
          <p>adress (UA): </p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'ua.address')}
          />
          <p className="current">
            {current}
            {this.state.currentContacts.ua.address}
          </p>
          <p>postCode: </p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'postCode')}
          />
          <p className="current">
            {current}
            {this.state.currentContacts.postCode}
          </p>
          <p>phone: </p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'phone')}
          />
          <p className="current">
            {current}
            {this.state.currentContacts.phone}
          </p>
          <p>email: </p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'email')}
          />
          <p className="current">
            {current}
            {this.state.currentContacts.email}
          </p>
        </div>
        <button type="submit">{submitBtn}</button>
      </div>
    );

    return (
      <AppContext.Consumer>
        {value => (
          <form onSubmit={this.formSubmitHandler} className="ContactsForm form">
            {this.state.fetchInProgress === true ? <Spinner /> : formContent}
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

ChangeContacts.contextType = AppContext;

export default ChangeContacts;
