import React, { Component } from 'react';

import { Labels } from '../../../../models/Labels';
import './FormContent.less';

interface FormContentProps {
  labels: Labels;
  lang: string;
  changeBrand: (
    lang: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

interface FormContentState {
  labels: Labels;
}

class FormContent extends Component<FormContentProps, FormContentState> {
  public static getDerivedStateFromProps(
    props: FormContentProps,
    state: FormContentState
  ) {
    return {
      labels: props.labels
    };
  }
  constructor(props: FormContentProps) {
    super(props);
    this.state = {
      labels: {}
    };
  }
  public render() {
    const { labels } = this.state;
    const { lang } = this.props;

    return (
      <div className="FormContent">
        <div className="form-control">
          <label>Change the brand name: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeBrand!.bind(this.props, lang as string)}
            required
          />
          <p className="current">Current value: {labels[lang].brand}</p>
        </div>
        <div className="form-control">
          <label>Change navigation labels: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeBrand!.bind(this.props, lang as string)}
            required
          />
          <p className="current">Current value: </p>
        </div>
      </div>
    );
  }
}

export default FormContent;
