import React, { Component } from 'react';

import './ChangeLabels.less';
import { AppContext } from '../../../AppContext';
import { database } from '../../../firebase';
import { Labels } from '../../../models/Labels';
import { urls } from '../../../config/urls';
import { Spinner } from '../../../components';
import FormContent from './FormContent/FormContent';
import { createObjectPath } from '../../../services/admin/createObjectPath';
import { updateLabels } from '../../../services/admin/updateLabels';

interface ChangeLabelsProps {}
interface ChangeLabelsState {
  newLabels: Labels;
  fetchedLabels: Labels;
  fetchInProgress: boolean;
}

class ChangeLabels extends Component<ChangeLabelsProps, ChangeLabelsState> {
  constructor(props: ChangeLabelsProps) {
    super(props);
    this.state = {
      newLabels: {},
      fetchedLabels: {},
      fetchInProgress: true
    };
  }

  public componentDidMount = () => {
    // database.ref().child('labels').set(labels);
    this.setState({
      fetchInProgress: true
    });
    database
      .ref()
      .child('labels')
      .on('value', snapshot => {
        this.setState({
          newLabels: snapshot!.val(),
          fetchedLabels: snapshot!.val(),
          fetchInProgress: false
        });
      });
  };

  private formSubmitHandler = () => {
    updateLabels(this.state.newLabels);
  };

  private changeOptionHandler = (
    option: string,
    lang: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedLabels = { ...this.state.newLabels };
    createObjectPath(updatedLabels[lang], option, event.target.value as string);
    this.setState({
      newLabels: updatedLabels
    });
  };
  public render() {
    const context = this.context;
    const lang = context.state.lang;
    const labelsRoot = context.state.labels[lang].pages.admin;

    const formContentEN = (
      <FormContent
        labels={this.state.fetchedLabels}
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
        labels={this.state.fetchedLabels}
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
                    {labelsRoot.changeLabelsForm.main}{' '}
                    <img src={urls.en_flag} className="flag-image" />
                  </h3>
                  <hr />
                  {formContentEN}
                  <h3>
                    {value.state.lang === 'en'
                      ? 'Labels Configuration'
                      : 'Налаштування лейблів'}{' '}
                    <img src={urls.ua_flag} className="flag-image" />
                  </h3>
                  <hr />
                  {formContentUa}
                  <button type="submit">{labelsRoot.submitBtn}</button>
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
