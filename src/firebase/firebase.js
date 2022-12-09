// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZa8FuV77FAGkMbzWC4jgzDFJYYE0L8aY",
  authDomain: "dot4eplus7.firebaseapp.com",
  databaseURL:
    "https://dot4eplus7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dot4eplus7",
  storageBucket: "dot4eplus7.appspot.com",
  messagingSenderId: "226417690077",
  appId: "1:226417690077:web:1d743fc6630b2f4f606234",
  measurementId: "G-7DQXJP4LZT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

export { firebase, auth, db, storage };