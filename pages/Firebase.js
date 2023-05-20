import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDsfqhIbsKbbkIuoyNZpW0mpEldLo0S0HU",
  authDomain: "zimofirebasetask.firebaseapp.com",
  projectId: "zimofirebasetask",
  storageBucket: "zimofirebasetask.appspot.com",
  messagingSenderId: "706026596413",
  appId: "1:706026596413:web:0ed1297d1daa9fec99a254",
  measurementId: "G-59PQTFEG52"
};


export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
export const db = getFirestore();

// var db = firebase.firestore();