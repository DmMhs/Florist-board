import * as firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyB7esiw1XYzS2_hllELqqYzqN5wIQav0Oc',
  authDomain: 'florist-cb933.firebaseapp.com',
  databaseURL: 'https://florist-cb933.firebaseio.com',
  projectId: 'florist-cb933',
  storageBucket: 'florist-cb933.appspot.com',
  messagingSenderId: '582977319235'
};

firebase.initializeApp(config);
export const database = firebase.database();
export const homeImagesRef = database.ref('home-images');
export const productsRef = database.ref('products');
export const galleryImagesRef = database.ref('gallery-images');
