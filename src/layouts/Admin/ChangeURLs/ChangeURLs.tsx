import React, { Component } from 'react';

import { database } from '../../../firebase';
import { AppContext } from '../../../AppContext';
import { Spinner } from '../../../components';
import { createObjectPath } from '../../../services/createObjectPath';
import './ChangeURLs.less';

interface ChangeURLsProps {}
interface ChangeURLsState {
  newURLs: {};
  currentURLs: {
    en_flag: string;
    ua_flag: string;
    google_map_address: string;
    socials: {
      instagram: string;
      telegram: string;
      facebook: string;
    };
  };
  fetchInProgress: boolean;
}
class ChangeURLs extends Component<ChangeURLsProps, ChangeURLsState> {
  constructor(props: ChangeURLsProps) {
    super(props);
    this.state = {
      newURLs: {},
      currentURLs: {
        en_flag: '',
        ua_flag: '',
        google_map_address: '',
        socials: {
          instagram: '',
          telegram: '',
          facebook: ''
        }
      },
      fetchInProgress: true
    };
  }

  public componentDidMount() {
    database
      .ref()
      .child('urls')
      .on('value', snapshot => {
        this.setState({
          newURLs: snapshot!.val(),
          currentURLs: snapshot!.val(),
          fetchInProgress: false
        });
      });
  }

  private formSubmitHandler = () => {
    database
      .ref()
      .child('urls')
      .update(this.state.newURLs);
  };

  private changeOptionHandler = (
    option: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedURLs = { ...this.state.newURLs };
    createObjectPath(updatedURLs, option, event.target.value as string);
    this.setState({
      newURLs: updatedURLs
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
          <label>{change} URLs...</label>
          <p>en_flag:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'en_flag')}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.en_flag}
          </p>
          <p>ua_flag:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(this.props, 'ua_flag')}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.ua_flag}
          </p>
          <p>google_map_address:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(
              this.props,
              'google_map_address'
            )}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.google_map_address}
          </p>
          <p>socials/instagram:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(
              this.props,
              'socials.instagram'
            )}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.socials.instagram}
          </p>
          <p>socials/facebook:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(
              this.props,
              'socials.facebook'
            )}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.socials.facebook}
          </p>
          <p>socials/telegram:</p>
          <br />
          <input
            type="text"
            onChange={this.changeOptionHandler!.bind(
              this.props,
              'socials.telegram'
            )}
          />
          <p className="current">
            {current}
            {this.state.currentURLs.socials.telegram}
          </p>
        </div>
        <button type="submit" className="submitBtn">
          {submitBtn}
        </button>
      </div>
    );

    return (
      <AppContext.Consumer>
        {value => (
          <form onSubmit={this.formSubmitHandler} className="URLsForm form">
            {this.state.fetchInProgress === true ? <Spinner /> : formContent}
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

ChangeURLs.contextType = AppContext;

export default ChangeURLs;
