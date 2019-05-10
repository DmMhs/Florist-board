import React, { Component } from 'react';

import './ChangeLabels.less';
import { AppContext } from '../../../AppContext';
import labels from '../../../config/labels';
import { database } from '../../../firebase';
import { Labels } from '../../../models/Labels';
import { urls } from '../../../config/urls';
import Spinner from '../../Spinner/Spinner';
import FormContent from './FormContent/FormContent';

interface ChangeLabelsProps {}
interface ChangeLabelsState {
  newLabels: Labels;
  fetchInProgress: boolean;
}

class ChangeLabels extends Component<ChangeLabelsProps, ChangeLabelsState> {
  constructor(props: ChangeLabelsProps) {
    super(props);
    this.state = {
      newLabels: {},
      fetchInProgress: true
    };
  }

  public componentDidMount = () => {
    // database.ref('labels').set(labels);
    this.setState({
      fetchInProgress: true
    });
    database.ref('labels').on('value', snapshot => {
      this.setState({
        newLabels: snapshot!.val(),
        fetchInProgress: false
      });
      console.log(this.state.newLabels);
    });
  };

  private formSubmitHandler = () => {};

  private changeOptionHandler = (
    option: string,
    lang: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedLabels = { ...this.state.newLabels };
    updatedLabels[lang].navigation[option] = event.target.value;
    this.setState({
      newLabels: updatedLabels
    });
  };

  public render() {
    console.log(this.state.newLabels);
    const formContentEN = (
      <FormContent
        labels={this.state.newLabels}
        lang="en"
        changeOption={
          this.changeOptionHandler as (
            option: string,
            lang: string,
            event:
              | React.ChangeEvent<HTMLInputElement>
              | React.ChangeEvent<HTMLSelectElement>
          ) => void
        }
      />
    );
    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <form onSubmit={this.formSubmitHandler} className="LabelsForm form">
              {this.state.fetchInProgress === true ? (
                <Spinner />
              ) : (
                <div>
                  <h3>
                    Labels Configuration{' '}
                    <img src={urls.en_flag} className="flag-image" />
                  </h3>
                  <hr />
                  {formContentEN}
                  <h3>
                    Labels Configuration{' '}
                    <img src={urls.ua_flag} className="flag-image" />
                  </h3>
                  <hr />
                  <button type="submit">SUBMIT</button>
                </div>
              )}
            </form>
          )
        }
      </AppContext.Consumer>
    );
  }
}

ChangeLabels.contextType = AppContext;

export default ChangeLabels;
