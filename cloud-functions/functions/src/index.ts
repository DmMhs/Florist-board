import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://florist-cb933.firebaseio.com'
});

export const giveAdminRole = functions.https.onRequest((request, response) => {
  response.send('Is admin: ' + request.params.admin);
});

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
