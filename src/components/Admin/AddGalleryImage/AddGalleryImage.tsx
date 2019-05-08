import React, { Component } from 'react';

import './AddGalleryImage.less';
import { AppContext } from '../../../AppContext';
import { storageRef, galleryImagesRef } from '../../../firebase';
import labels from '../../../config/labels';

interface AddGalleryImageProps {}

interface AddGalleryImageState {
  images: File[];
  totalImagesNumber: number;
}

class AddGalleryImage extends Component<
  AddGalleryImageProps,
  AddGalleryImageState
> {
  constructor(props: AddGalleryImageProps) {
    super(props);
    this.state = {
      images: [],
      totalImagesNumber: 0
    };
  }

  public componentDidMount() {
    galleryImagesRef.on('value', snapshot => {
      this.setState({
        totalImagesNumber: Object.keys(snapshot!.val()).length
      });
    });
  }

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

  private formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { images } = this.state;
    this.setState({
      images: []
    });

    images.map(async (image: File) => {
      const file = (image as any)[0];
      const formattedFileName = (image as any)[0].name;
      await storageRef
        .child('gallery-images')
        .child(formattedFileName)
        .put(file)
        .catch(err => {
          console.log(err);
        });
      const imageURL = await storageRef
        .child('gallery-images')
        .child(formattedFileName)
        .getDownloadURL();
      galleryImagesRef.push(imageURL);
    });
  };

  public render() {
    const context = this.context;
    const labelsRoot =
      labels[context.state.lang as string].pages.admin.addGalleryImageForm;
    const submitBtnLabel =
      labels[context.state.lang as string].pages.admin.submitBtn;
    const color = this.state.totalImagesNumber % 4 === 0 ? 'green' : 'darkred';
    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <form onSubmit={this.formSubmitHandler} className="AddProduct form">
              <div className="form-control product-images">
                <p style={{ color }} className="gallery-info">
                  {labelsRoot.info.restriction}
                </p>
                <p className="gallery-info">
                  {labelsRoot.info.totalImagesNumber}{' '}
                  {this.state.totalImagesNumber}
                </p>
                <hr />
                <label>{labelsRoot.add}</label>
                <br />
                <div className="input-wrapper">
                  <input
                    type="file"
                    onChange={this.imgInputChangedHandler.bind(this, 0)}
                  />
                </div>
              </div>
              <button type="submit">{submitBtnLabel}</button>
            </form>
          )
        }
      </AppContext.Consumer>
    );
  }
}

AddGalleryImage.contextType = AppContext;

export default AddGalleryImage;
