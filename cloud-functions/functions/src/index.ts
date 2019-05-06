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

export const giveAdminRole = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    const user = await admin.auth().getUserByEmail(request.params.email);
    if (user.customClaims && (user.customClaims as any).admin === true) {
      response.send('NOICE!');
      return;
    }
    response.send("You're ADMIN");
    // return admin.auth().setCustomUserClaims(user.uid, {
    //   admin: true
    // });
  }
);

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
