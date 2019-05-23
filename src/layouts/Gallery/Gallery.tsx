import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { galleryImagesRef } from '../../firebase';
import { Spinner } from '../../components';
import Modal from './Modal/Modal';
import { AppContext } from '../../AppContext';
import { deleteGalleryImage } from '../../services/admin/deleteGalleryImage';
import './Gallery.less';

interface GalleryState {
  images: string[];
  fetchInProgress: boolean;
  showModal: boolean;
  modalIndex: number;
}

class Gallery extends Component<RouteComponentProps<{}>, GalleryState> {
  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      images: [],
      fetchInProgress: false,
      showModal: false,
      modalIndex: 0
    };
  }

  public componentDidMount() {
    this.setState({
      fetchInProgress: true
    });
    galleryImagesRef.on('value', snapshot => {
      const newImages: string[] = [];
      snapshot!.forEach((image: firebase.database.DataSnapshot) => {
        newImages.push(image.val());
      });
      this.setState({
        images: newImages,
        fetchInProgress: false
      });
    });
  }

  private imageClickedHandler = (index: number) => {
    this.setState({
      showModal: true,
      modalIndex: index
    });
  };

  private prevClickedHandler = () => {
    if (this.state.modalIndex !== 0) {
      this.setState({
        modalIndex: this.state.modalIndex! - 1
      });
    }
  };

  private nextClickedHandler = () => {
    if (this.state.images.length > this.state.modalIndex + 1) {
      this.setState({
        modalIndex: this.state.modalIndex! + 1
      });
    }
  };

  private closeModalClickedHandler = () => {
    this.setState({
      showModal: false,
      modalIndex: 0
    });
  };

  public render() {
    const context = this.context;

    const imagesList = this.state.images.map(
      (imageUrl: string, index: number) => {
        const imageName = imageUrl.split('%2F')[1].split('?')[0];
        return (
          <div className="img-wrapper" key={index}>
            {context.state.userRole === 'admin' ? (
              <div
                className="adminIcons"
                onClick={deleteGalleryImage.bind(this, imageName, imageUrl)}
              >
                <i className="far fa-trash-alt" />
              </div>
            ) : null}

            <img
              src={imageUrl}
              alt={`gallery-img-${index}`}
              onClick={this.imageClickedHandler.bind(this, index)}
              className="image"
            />
          </div>
        );
      }
    );

    const labels = context.state.labels;
    const lang = context.state.lang;

    return (
      <AppContext.Consumer>
        {value => (
          <div className="Gallery">
            <h2>{labels[lang].pages.gallery.main}</h2>
            <hr />
            {this.state.fetchInProgress === true ? (
              <Spinner />
            ) : (
              <div className="images-wrapper">
                <div className="column">
                  {imagesList.slice(0, Math.floor(imagesList.length / 4))}
                </div>
                <div className="column">
                  {imagesList.slice(
                    Math.floor(imagesList.length / 4),
                    Math.floor(imagesList.length / 4) * 2
                  )}
                </div>
                <div className="column">
                  {imagesList.slice(
                    Math.floor(imagesList.length / 4) * 2,
                    Math.floor(imagesList.length / 4) * 3
                  )}
                </div>
                <div className="column">
                  {imagesList.slice(
                    Math.floor(imagesList.length / 4) * 3,
                    imagesList.length + 1
                  )}
                </div>
              </div>
            )}
            {this.state.showModal === true ? (
              <Modal
                images={imagesList}
                initial={this.state.modalIndex}
                prevClickedHandler={this.prevClickedHandler}
                nextClickedHandler={this.nextClickedHandler}
                closeModal={this.closeModalClickedHandler}
              />
            ) : null}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

Gallery.contextType = AppContext;

export default withRouter<RouteComponentProps<{}>>(Gallery);
