import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyBnHYJiI3PAbHkp74MZaKrkTDtm0AtDKOY',
  authDomain: 'pemira-73ec6.firebaseapp.com',
  databaseURL: 'https://pemira-73ec6.firebaseio.com',
  projectId: 'pemira-73ec6',
  storageBucket: 'pemira-73ec6.appspot.com',
  messagingSenderId: '491034963843'
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const database = firebase.database();

export default firebase;
