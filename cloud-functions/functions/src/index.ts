import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { database } from './firebase';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://florist-cb933.firebaseio.com'
});

export const assignUserRole = functions.https.onRequest(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  let adminId = '';
  await database
    .ref('admins')
    .once('value')
    .then(snapshot => {
      snapshot.forEach(data => {
        adminId = data.val();
      });
    })
    .catch(err => console.log(err));

  console.log('Your role: ' + req.query.role);
  console.log('Your id: ' + req.query.id);

  const id = req.query.id;

  const user = await admin.auth().getUser(id);

  if (user.customClaims && (user.customClaims as any).role !== undefined) {
    return;
  }

  return admin.auth().setCustomUserClaims(user.uid, {
    role: adminId === id ? 'admin' : 'user'
  });
});
