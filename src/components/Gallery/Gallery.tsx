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
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-1.jpg?alt=media&token=1e2cc5ea-f02c-44a4-90b7-bec8fa221d2c'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-2.jpg?alt=media&token=dc625aef-cc19-4272-a1b8-0b20ada9aefb'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-3.jpg?alt=media&token=472c8f8e-8d33-47f6-bc65-b67662d88794'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-4.JPG?alt=media&token=8784086f-df18-43d9-b9fb-2c438595e6f2'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-5.jpg?alt=media&token=694eaf38-d128-4937-ba58-4754a8a7787d'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-6.jpg?alt=media&token=9333a131-581b-48df-a727-4cf8185b41f3'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-7.jpg?alt=media&token=51cc4591-743f-4d79-a41d-879a6559b1eb'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-8.jpg?alt=media&token=68d05f19-5521-476a-92fc-b69443c22f34'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-9.JPG?alt=media&token=b3f81c5c-2890-4063-a1ab-34a1719e5385'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-10.jpg?alt=media&token=0c20c087-0cc9-45bd-a3e5-16556ead96f2'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-11.jpg?alt=media&token=7a17d6e1-b2e5-4cbc-9008-d153e2d7d570'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-12.jpg?alt=media&token=8e641ef5-8f3c-493a-b916-e15480f60e46'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-13.JPG?alt=media&token=6c0f5cb3-a92a-459b-b7d6-32aa9b5da6c8'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-14.JPG?alt=media&token=f9ea683f-43e9-4230-83d7-5386d77d23e6'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-15.JPG?alt=media&token=d7469b84-57df-42cb-90e9-e610ddf0e24a'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-16.JPG?alt=media&token=77cd0c2f-f6eb-4669-b556-c962d53a626a'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-17.jpg?alt=media&token=20fbdfec-cf2f-48ef-b695-179e5f686200'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-18.JPG?alt=media&token=628808ab-3987-4e81-aa7e-c081b2d15db3'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-19.jpg?alt=media&token=9a4e8daf-1f8a-4190-a29f-6ac7ff4ec52a'
    // );
    // galleryImages.push(
    //   'https://firebasestorage.googleapis.com/v0/b/florist-cb933.appspot.com/o/gallery-images%2Fimage-20.jpg?alt=media&token=40e5875a-db58-4ae5-9ecd-aef411d34617'
    // );
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
        <h2>Our Bouquets</h2>
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
