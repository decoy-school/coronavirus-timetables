import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE8NRl_b2GQ8jq_6wMV9YI1pTKKQKjYaE",
  authDomain: "cornavirus-timetables.firebaseapp.com",
  databaseURL: "https://cornavirus-timetables.firebaseio.com",
  projectId: "cornavirus-timetables",
  storageBucket: "cornavirus-timetables.appspot.com",
  messagingSenderId: "527226581533",
  appId: "1:527226581533:web:aacc94aac2a2c877e28cf4",
  measurementId: "G-FZ868B1M44",
};

firebase.initializeApp(firebaseConfig);

export const Auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const DB = firebase.firestore();
