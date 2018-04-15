import * as firebase from 'firebase';

var config = {
    apiKey: process.env.apiKey,
    authDomain: "stroopef.firebaseapp.com",
    databaseURL: "https://stroopef.firebaseio.com",
    projectId: "stroopef",
    storageBucket: "",
  };
export default firebase.initializeApp(config);
