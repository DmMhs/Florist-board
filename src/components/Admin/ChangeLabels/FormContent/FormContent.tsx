import React, { Component } from 'react';

import { Labels } from '../../../../models/Labels';
import './FormContent.less';

interface FormContentProps {
  labels: Labels;
  lang: string;

  changeOption: (
    option: string,
    lang: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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
            onChange={this.props.changeOption!.bind(
              this.props,
              'brand',
              lang as string
            )}
            required
          />
          <p className="current">Current value: {labels[lang].brand}</p>
        </div>

        <div className="form-control">
          <label>Change navigation label for... </label>
          <br />
          <p>home page:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'home',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.home}
          </p>
          <p>shop page:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'shop',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.shop}
          </p>
          <p>gallery page:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'gallery',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.gallery}
          </p>
          <p>contacts page:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'contacts',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.contacts}
          </p>
          <p>cart:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'cart',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.cart}
          </p>
          <p>account/main dropdown option:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'account.main',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.account.main}
          </p>
          <p>account/menu/signIn dropdown option:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'account.menu.signIn',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.account.menu.signIn}
          </p>
          <p>account/menu/signUp dropdown option:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'account.menu.signUp',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.account.menu.signUp}
          </p>
          <p>account/menu/logOut dropdown option:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'account.menu.logOut',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.account.menu.logOut}
          </p>
          <p>lang select button:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'lang',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].navigation.lang}
          </p>
        </div>

        <div className="form-control">
          <label>Change pages/admin... </label>
          <br />
          <p>title: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.title',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.title}
          </p>
          <p>navigation/addProduct: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.addProduct',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.navigation.addProduct}
          </p>
          <p>navigation/galleryImages: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.galleryImages',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.navigation.galleryImages}
          </p>
          <p>navigation/labels: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.labels',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.navigation.labels}
          </p>
          <p>addProductForm/available/title: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.available.title',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {labels[lang].pages.admin.addProductForm.available.title}
          </p>
          <p>addProductForm/available/option1: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.available.option1',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {labels[lang].pages.admin.addProductForm.available.option1}
          </p>
          <p>addProductForm/available/option2: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.available.option2',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {labels[lang].pages.admin.addProductForm.available.option2}
          </p>
          <p>addProductForm/title: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.title',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addProductForm.title}
          </p>
          <p>addProductForm/title_ua: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.title_ua',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addProductForm.title_ua}
          </p>
          <p>addProductForm/images: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.images',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addProductForm.images}
          </p>
          <p>addProductForm/price: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.price',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addProductForm.price}
          </p>
          <p>addProductForm/description: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.description',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addProductForm.description}
          </p>
          <p>addProductForm/description_ua: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.description_ua',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {labels[lang].pages.admin.addProductForm.description_ua}
          </p>
          <p>addGalleryImageForm/info/restriction: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addGalleryImageForm.info.restriction',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {labels[lang].pages.admin.addGalleryImageForm.info.restriction}
          </p>
          <p>addGalleryImageForm/info/totalImagesNumber: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addGalleryImageForm.info.totalImagesNumber',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value:{' '}
            {
              labels[lang].pages.admin.addGalleryImageForm.info
                .totalImagesNumber
            }
          </p>
          <p>addGalleryImageForm/add: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addGalleryImageForm.add',
              lang as string
            )}
            required
          />
          <p className="current">
            Current value: {labels[lang].pages.admin.addGalleryImageForm.add}
          </p>
        </div>
      </div>
    );
  }
}

export default FormContent;
