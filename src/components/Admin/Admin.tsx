import React, { Component } from 'react';
import firebase from 'firebase';

import './Admin.less';
import { AppContext } from '../../AppContext';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import AddProduct from './AddProduct/AddProduct';
import labels from '../../config/labels';
import AddGalleryImage from './AddGalleryImage/AddGalleryImage';

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
        form = <h3>Labels Form</h3>;
        break;
      default:
        form = <h3>Default form</h3>;
    }
    return (
      <AppContext.Consumer>
        {value =>
          value && value.state.userRole === 'admin' ? (
            <div className="Admin">
              <h1>{labels[value.state.lang as string].pages.admin.title}</h1>
              <hr />
              <ul className="admin-actions">
                <li>
                  <a onClick={this.switchModeTo.bind(this, 'add-product')}>
                    Add Product
                  </a>
                </li>
                <li>
                  <a
                    onClick={this.switchModeTo.bind(
                      this,
                      'configurate-gallery'
                    )}
                  >
                    Gallery Images
                  </a>
                </li>
                <li>
                  <a
                    onClick={this.switchModeTo.bind(this, 'configurate-labels')}
                  >
                    Labels
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
export default withRouter<RouteComponentProps<{}>>(Admin);
