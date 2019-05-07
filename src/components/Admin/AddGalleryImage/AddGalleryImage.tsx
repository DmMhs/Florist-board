import React, { Component } from 'react';

import './AddGalleryImage.less';
import { AppContext } from '../../../AppContext';
import { storageRef, galleryImagesRef } from '../../../firebase';

interface AddGalleryImageProps {}

interface AddGalleryImageState {
  images: File[];
}

class AddGalleryImage extends Component<
  AddGalleryImageProps,
  AddGalleryImageState
> {
  constructor(props: AddGalleryImageProps) {
    super(props);
    this.state = {
      images: []
    };
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

  private formSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <form onSubmit={this.formSubmitHandler} className="AddProduct">
              <div className="form-control product-images">
                <label>Add image to the galery:</label>
                <br />
                <div className="input-wrapper">
                  <input
                    type="file"
                    onChange={this.imgInputChangedHandler.bind(this, 0)}
                  />
                </div>
              </div>
              <button type="submit">SUBMIT</button>
            </form>
          )
        }
      </AppContext.Consumer>
    );
  }
}

export default AddGalleryImage;
