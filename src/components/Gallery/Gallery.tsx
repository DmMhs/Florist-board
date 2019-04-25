import React, { Component, ReactElement } from 'react';

import './Gallery.less';
import { galleryImagesRef } from '../../firebase';
import Spinner from '../Spinner/Spinner';
import Modal from './Modal/Modal';
import labels from '../../config/labels';
import { AuthContext } from '../Auth/AuthContext';

interface GalleryProps {}
interface GalleryState {
  images: string[];
  fetchInProgress: boolean;
  showModal: boolean;
  modalIndex: number;
}

class Gallery extends Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);
    this.state = {
      images: [],
      fetchInProgress: false,
      showModal: false,
      modalIndex: 0
    };
  }
  componentDidMount() {
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
  imageClickedHandler = (index: number) => {
    this.setState({
      showModal: true,
      modalIndex: index
    });
  };
  prevClickedHandler = () => {
    if (this.state.modalIndex !== 0) {
      this.setState({
        modalIndex: this.state.modalIndex! - 1
      });
    }
  };
  nextClickedHandler = () => {
    if (this.state.images.length > this.state.modalIndex + 1)
      this.setState({
        modalIndex: this.state.modalIndex! + 1
      });
  };
  closeModalClickedHandler = () => {
    this.setState({
      showModal: false,
      modalIndex: 0
    });
  };
  render() {
    const imagesList = this.state.images.map(
      (imageUrl: string, index: number) => {
        return (
          <img
            src={imageUrl}
            alt={`gallery-img-${index}`}
            key={index}
            onClick={this.imageClickedHandler.bind(this, index)}
            className="image"
          />
        );
      }
    );
    return (
      <AuthContext.Consumer>
        {value => (
          <div className="Gallery">
            <h2>{labels[value.state.lang as string].pages.gallery.main}</h2>
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
      </AuthContext.Consumer>
    );
  }
}

export default Gallery;
