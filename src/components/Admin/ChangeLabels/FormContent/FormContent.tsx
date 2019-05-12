import React, { Component } from 'react';

import { Labels } from '../../../../models/Labels';
import './FormContent.less';
import { AppContext } from '../../../../AppContext';

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
    
    const context = this.context;
    const contextLang = context.state.lang;
    const contextLabels = context.state.labels;
    const {change, current} = contextLabels[contextLang].pages.admin;
    console.log(current);
    return (
      <div className="FormContent">
        <div className="form-control">
          <label>{change} brand: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'brand',
              lang as string
            )}
          />
          <p className="current">{current} {labels[lang].brand}</p>
        </div>

        <div className="form-control">
          <label>{change} navigation... </label>
          <br />
          <p>home:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.home',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.home}
          </p>
          <p>shop:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.shop',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.shop}
          </p>
          <p>gallery:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.gallery',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.gallery}
          </p>
          <p>contacts page:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.contacts',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.contacts}
          </p>
          <p>cart:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.cart',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.cart}
          </p>
          <p>account/main:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.account.main',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.account.main}
          </p>
          <p>account/menu/signIn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.account.menu.signIn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.account.menu.signIn}
          </p>
          <p>account/menu/signUp:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.account.menu.signUp',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.account.menu.signUp}
          </p>
          <p>account/menu/logOut:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.account.menu.logOut',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.account.menu.logOut}
          </p>
          <p>lang:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'navigation.lang',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].navigation.lang}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/admin... </label>
          <br />
          <p>title: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.title',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.title}
          </p>
          <p>navigation/addProduct: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.addProduct',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.navigation.addProduct}
          </p>
          <p>navigation/galleryImages: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.galleryImages',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.navigation.galleryImages}
          </p>
          <p>navigation/labels: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.navigation.labels',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.navigation.labels}
          </p>
          <p>addProductForm/available/title: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.available.title',
              lang as string
            )}
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addProductForm.title}
          </p>
          <p>addProductForm/title_ua: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.title_ua',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addProductForm.title_ua}
          </p>
          <p>addProductForm/images: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.images',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addProductForm.images}
          </p>
          <p>addProductForm/price: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.price',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addProductForm.price}
          </p>
          <p>addProductForm/description: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.description',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addProductForm.description}
          </p>
          <p>addProductForm/description_ua: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.addProductForm.description_ua',
              lang as string
            )}
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current}{' '}
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
          />
          <p className="current">
            {current} {labels[lang].pages.admin.addGalleryImageForm.add}
          </p>
          <p>changeLabelsForm/change: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.change',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.change}
          </p>
          <p>changeLabelsForm/current: </p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.admin.current',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.admin.current}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/shop... </label>
          <br />
          <p>notAvailable:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.notAvailable',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.notAvailable}
          </p>
          <p>sort/main:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.sort.main',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.sort.main}
          </p>
          <p>sort/btn/byName:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.sort.btn.byName',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.sort.btn.byName}
          </p>
          <p>sort/btn/byPrice:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.sort.btn.byPrice',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.sort.btn.byPrice}
          </p>
          <p>filter/main:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.filter.main',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.filter.main}
          </p>
          <p>filter/available:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.filter.available',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.filter.available}
          </p>
          <p>filter/price:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.filter.price',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.filter.price}
          </p>
          <p>filter/priceInputs/from:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.filter.priceInputs.from',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.filter.priceInputs.from}
          </p>
          <p>filter/priceInputs/to:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.filter.priceInputs.to',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.filter.priceInputs.to}
          </p>
          <p>cart/empty:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.empty',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.empty}
          </p>
          <p>cart/btn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.btn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.btn}
          </p>
          <p>cart/title:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.title',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.title}
          </p>
          <p>cart/amount:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.amount',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.amount}
          </p>
          <p>cart/price:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.price',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.price}
          </p>
          <p>cart/total:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.total',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.total}
          </p>
          <p>cart/orderBtn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.shop.cart.orderBtn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.shop.cart.orderBtn}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/gallery/main: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.gallery.main',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.gallery.main}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/contacts... </label>
          <br />
          <p>map:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.contacts.map',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.contacts.map}
          </p>
          <p>info:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.contacts.info',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.contacts.info}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/auth... </label>
          <br />
          <p>email:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.email',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.email}
          </p>
          <p>password:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.password',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.password}
          </p>
          <p>btn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.btn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.btn}
          </p>
          <p>alternative:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.alternative',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.alternative}
          </p>
          <p>isAuth/main:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.isAuth.main',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.isAuth.main}
          </p>
          <p>isAuth/sub:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.isAuth.sub',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.isAuth.sub}
          </p>
          <p>signup/google:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signup.google',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signup.google}
          </p>
          <p>signup/facebook:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signup.facebook',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signup.facebook}
          </p>
          <p>signup/account:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signup.account',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signup.account}
          </p>
          <p>signup/btn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signup.btn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signup.btn}
          </p>
          <p>signin/google:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signin.google',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signin.google}
          </p>
          <p>signin/facebook:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signin.facebook',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signin.facebook}
          </p>
          <p>signin/account:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signin.account',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signin.account}
          </p>
          <p>signin/btn:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.auth.signin.btn',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.auth.signin.btn}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/pageNotFound: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.pageNotFound',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.pageNotFound}
          </p>
        </div>

        <div className="form-control">
          <label>{change} pages/productDetails... </label>
          <br />
          <p>description:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.productDetails.description',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.productDetails.description}
          </p>
          <p>only:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.productDetails.only',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.productDetails.only}
          </p>
          <p>notAvailable:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.productDetails.notAvailable',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.productDetails.notAvailable}
          </p>
          <p>facebookShare:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.productDetails.facebookShare',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.productDetails.facebookShare}
          </p>
          <p>goShopping:</p>
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'pages.productDetails.goShopping',
              lang as string
            )}
          />
          <p className="current">
            {current} {labels[lang].pages.productDetails.goShopping}
          </p>
        </div>

        <div className="form-control">
          <label>{change} footer: </label>
          <br />
          <input
            type="text"
            onChange={this.props.changeOption!.bind(
              this.props,
              'footer',
              lang as string
            )}
          />
          <p className="current">{current} {labels[lang].footer}</p>
        </div>
      </div>
    );
  }
}

FormContent.contextType = AppContext;

export default FormContent;
