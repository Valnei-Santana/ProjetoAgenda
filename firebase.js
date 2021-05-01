import firebase from "firebase";
require('firebase/firestore')
require('firebase/auth')

const firebaseConfig = {
  apiKey: 'AIzaSyBYYocddiLrZsvYx1RjMVUGuiceWZylUTk',
  authDomain: 'react-app-6e02a.firebaseapp.com',
  databaseURL: 'https://react-app-6e02a.firebaseapp.com',
  projectId: 'react-app-6e02a',
  storageBucket: 'react-app-6e02a.appspot.com',
  messagingSenderId: '551685491651',
  appId: '1:551685491651:web:79c81f58abd2ae5c5e4b76'
};
if (firebase.apps.length === 0) {
firebase.initializeApp(firebaseConfig);
}
  export default firebase;