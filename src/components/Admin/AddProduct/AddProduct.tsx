import React, { Component } from 'react';

import './AddProduct.less';
import { AppContext } from '../../../AppContext';
import { storageRef, productsRef } from '../../../firebase';
import { Product } from '../../../models/Product';

interface AddProductProps {
  editModeEnabled?: boolean;
}
interface AddProductState {
  available: boolean;
  title: string;
  title_uk: string;
  images: File[];
  price: number;
  currency: string;
  description: string;
  description_uk: string;
}

class AddProduct extends Component<AddProductProps, AddProductState> {
  constructor(props: AddProductProps) {
    super(props);
    this.state = {
      available: true,
      title: '',
      title_uk: '',
      images: [],
      price: 0,
      currency: 'usd',
      description: '',
      description_uk: ''
    };
  }

  private descriptionChangedHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      description: event.target.value
    });
  };
  private descriptionUkChangedHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      description_uk: event.target.value
    });
  };

  private currencyChangedHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      currency: event.target.value
    });
  };

  private priceInputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      price: +event.target.value
    });
  };

  private imgInputChangedHandler = (
    position: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedImages: File[] = [...this.state.images];
    updatedImages[position] = event.target.files as any;
    this.setState({
      images: updatedImages
    });
  };

  private titleInputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      title: event.target.value
    });
  };

  private titleUkInputChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      title_uk: event.target.value
    });
  };

  private availableChangedHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      available: event.target.value === 'true'
    });
  };

  private formSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const {
      available,
      images,
      title,
      title_uk,
      price,
      currency,
      description,
      description_uk
    } = this.state;

    this.setState({
      available: true,
      title: '',
      title_uk: '',
      images: [],
      price: 0,
      currency: 'usd',
      description: '',
      description_uk: ''
    });

    const formattedFolderName = title.toLowerCase();
    const imagesRef = storageRef
      .child('products-images')
      .child(formattedFolderName);
    const imageURLs: string[] = [];
    let productKey: string = '';

    const newProduct: Product = {
      title,
      title_uk,
      price,
      available,
      description,
      description_uk,
      currency,
      images: imageURLs
    };
    await productsRef
      .push(newProduct)
      .then(response => {
        productKey = response.key as string;
      })
      .catch(err => {
        console.log(err);
      });
    await Promise.all(
      images.map(async (image: File) => {
        const file = (image as any)[0];
        const formattedFileName = (image as any)[0].name.split('.')[0];
        await imagesRef
          .child(formattedFileName)
          .put(file)
          .catch(err => {
            console.log(err);
          });
        const imageURL = await imagesRef
          .child(formattedFileName)
          .getDownloadURL();
        imageURLs.push(imageURL);
      })
    );
    productsRef
      .child(productKey)
      .update({
        images: imageURLs
      })
      .catch(err => {
        console.log(err);
      });
  };

  public render() {
    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <form onSubmit={this.formSubmitHandler} className="AddProduct">
              <div className="form-control">
                <label>Product available:</label>
                <br />
                <select onChange={this.availableChangedHandler}>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
              <div className="form-control">
                <label>Product title:</label>
                <br />
                <input
                  type="text"
                  onChange={this.titleInputChangedHandler}
                  required
                  value={this.state.title as string}
                />
                <label>Product title uk: </label>
                <br />
                <input
                  type="text"
                  onChange={this.titleUkInputChangedHandler}
                  required
                  value={this.state.title_uk as string}
                />
              </div>
              <div className="form-control product-images">
                <label>Product images:</label>
                <br />
                <div className="input-wrapper">
                  <input
                    type="file"
                    onChange={this.imgInputChangedHandler.bind(this, 0)}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="file"
                    onChange={this.imgInputChangedHandler.bind(this, 1)}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="file"
                    onChange={this.imgInputChangedHandler.bind(this, 2)}
                  />
                </div>
              </div>
              <div className="form-control">
                <label>Product price:</label>
                <br />
                <div className="price">
                  <input
                    type="number"
                    required
                    onChange={this.priceInputChangedHandler}
                    value={this.state.price as number}
                  />
                  <select onChange={this.currencyChangedHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="uah">UAH</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label>Product description:</label>
                <br />
                <textarea
                  required
                  placeholder="Add product description"
                  onChange={this.descriptionChangedHandler}
                  value={this.state.description as string}
                />
                <label>Product description uk:</label>
                <br />
                <textarea
                  required
                  placeholder="Add product description"
                  onChange={this.descriptionUkChangedHandler}
                  value={this.state.description_uk as string}
                />
              </div>
              <button type="submit">SUBMIT</button>
            </form>
          )
        }
      </AppContext.Consumer>
    );
  }
}

export default AddProduct;
