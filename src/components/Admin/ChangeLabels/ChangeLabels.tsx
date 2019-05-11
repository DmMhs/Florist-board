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
    //database.ref('labels').set(labels);
    this.setState({
      fetchInProgress: true
    });
    database.ref('labels').on('value', snapshot => {
      this.setState({
        newLabels: snapshot!.val(),
        fetchInProgress: false
      });
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
    const pathArr = option.split('.');
    const check = pathArr.length > 1;
    let updatedLabels = { ...this.state.newLabels };

    // if (check === true) {
    //   updatedLabels[lang];
    //   let obj = updatedLabels;
    //   for (let i = 0; i < pathArr.length; i++) {
    //     console.log(Object.keys(updatedLabels[lang].pathArr[i]));
    //   }

    //   this.setState({
    //     newLabels: updatedLabels
    //   });
    // } else {
    //   updatedLabels[lang][option] = event.target.value;
    //   this.setState({
    //     newLabels: updatedLabels
    //   });
  };
  public render() {
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

    const formContentUa = (
      <FormContent
        labels={this.state.newLabels}
        lang="ua"
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
                  {formContentUa}
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
