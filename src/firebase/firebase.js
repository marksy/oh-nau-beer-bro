import firebase from 'firebase';
import dbSettings from '../dbSettings';

const config = {
  apiKey: dbSettings.apiKey,
  authDomain: dbSettings.authDomain,
  databaseURL: dbSettings.databaseURL,
  projectId: dbSettings.projectId,
  storageBucket: dbSettings.storageBucket,
  messagingSenderId: dbSettings.messagingSenderId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };

export default firebase;
