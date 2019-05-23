import React, { Component } from 'react';

import { AppContext } from '../../../AppContext';
import { storageRef, homeImagesRef } from '../../../firebase';
import './AddBannerImage.less';
import { uploadBannerImage } from '../../../services/admin/uploadBannerImage';
import { getBannerImageDownloadURL } from '../../../services/admin/getBannerImageDownloadURL';

interface AddGalleryImageProps {}

interface AddGalleryImageState {
  images: File[];
  totalImagesNumber: number;
}

class AddBannerImage extends Component<
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
    homeImagesRef.on('value', snapshot => {
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
      await uploadBannerImage(file, formattedFileName);
      getBannerImageDownloadURL(formattedFileName)
        .then(res => {
          return res;
        })
        .then(imgURL => {
          homeImagesRef.push(imgURL);
        });
    });
  };

  public render() {
    const context = this.context;
    const labels = context.state.labels;
    const lang = context.state.lang;

    const labelsRoot = labels[lang].pages.admin.addBannerImageForm;
    const submitBtnLabel = labels[lang].pages.admin.submitBtn;

    return (
      <AppContext.Consumer>
        {value =>
          value && (
            <form
              onSubmit={this.formSubmitHandler}
              className="AddGalleryImage form"
            >
              <div className="form-control product-images">
                <p className="gallery-info">
                  {labelsRoot.info.totalImagesNumber}{' '}
                  {this.state.totalImagesNumber}
                </p>
                <hr />
                <label className="accent">{labelsRoot.add}</label>
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

AddBannerImage.contextType = AppContext;

export default AddBannerImage;
