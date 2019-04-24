import React, { Component, ReactElement } from 'react';

import './Gallery.less';
import { galleryImagesRef } from '../../firebase';
import Spinner from '../Spinner/Spinner';

interface GalleryProps {}
interface GalleryState {
  images: string[];
  fetchInProgress: boolean;
}

class Gallery extends Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);
    this.state = {
      images: [],
      fetchInProgress: false
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
  render() {
    const imagesList = this.state.images.map(
      (imageUrl: string, index: number) => {
        return <img src={imageUrl} alt={`gallery-img-${index}`} key={index} />;
      }
    );
    return (
      <div className="Gallery">
        <h2>Our Gallery</h2>
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
      </div>
    );
  }
}

export default Gallery;
