import React, { Component } from 'react';
import firebase from 'firebase';

import './Admin.less';
import { AppContext } from '../../AppContext';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import AddProduct from './AddProduct/AddProduct';
import AddGalleryImage from './AddGalleryImage/AddGalleryImage';
import ChangeLabels from './ChangeLabels/ChangeLabels';

interface AdminState {
  mode:
    | 'add-product'
    | 'edit-product'
    | 'configurate-gallery'
    | 'configurate-labels';
}

class Admin extends Component<RouteComponentProps<{}>, AdminState> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      mode: 'add-product'
    };
  }

  private switchModeTo = (
    mode:
      | 'add-product'
      | 'edit-product'
      | 'configurate-gallery'
      | 'configurate-labels'
  ) => {
    this.setState({
      mode
    });
  };

  public render() {
    const { mode } = this.state;
    const context = this.context;
    const lang = context.state.lang;
    const labels = context.state.labels;
    const labelsRoot = labels[lang].pages.admin;

    let form: JSX.Element;
    switch (mode) {
      case 'add-product':
        form = <AddProduct />;
        break;
      case 'edit-product':
        form = <h3>Edit Product Form</h3>;
        break;
      case 'configurate-gallery':
        form = <AddGalleryImage />;
        break;
      case 'configurate-labels':
        form = <ChangeLabels />;
        break;
      default:
        form = <h3>Hm...</h3>;
    }
    return (
      <AppContext.Consumer>
        {value =>
          value && value.state.userRole === 'admin' ? (
            <div className="Admin">
              <h1>{labelsRoot.title}</h1>
              <hr />
              <ul className="admin-actions">
                <li>
                  <a onClick={this.switchModeTo.bind(this, 'add-product')}>
                    {labelsRoot.navigation.addProduct}
                  </a>
                </li>
                <li>
                  <a
                    onClick={this.switchModeTo.bind(
                      this,
                      'configurate-gallery'
                    )}
                  >
                    {labelsRoot.navigation.galleryImages}
                  </a>
                </li>
                <li>
                  <a
                    onClick={this.switchModeTo.bind(this, 'configurate-labels')}
                  >
                    {labelsRoot.navigation.labels}
                  </a>
                </li>
              </ul>
              <div className="form-wrapper">{form}</div>
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      </AppContext.Consumer>
    );
  }
}

Admin.contextType = AppContext;

export default withRouter<RouteComponentProps<{}>>(Admin);
