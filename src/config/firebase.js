// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOIU9w4oUYz1xSEhVrZCmxGATF5Ja1_tY",
    authDomain: "twitter-clone-d0a33.firebaseapp.com",
    databaseURL: "https://twitter-clone-d0a33-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "twitter-clone-d0a33",
    storageBucket: "twitter-clone-d0a33.appspot.com",
    messagingSenderId: "377378859915",
    appId: "1:377378859915:web:2369f12914e56f49a25d8e"
  };

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
 export const provider = new firebase.auth.GoogleAuthProvider();

export default fire;