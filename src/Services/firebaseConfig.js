
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA6f8jdGMBZ6VwZjPfd7G7265jpcSUlxGU",
  authDomain: "atlasproject-6abd0.firebaseapp.com",
  databaseURL: "https://atlasproject-6abd0-default-rtdb.firebaseio.com",
  projectId: "atlasproject-6abd0",
  storageBucket: "atlasproject-6abd0.appspot.com",
  messagingSenderId: "85982376523",
  appId: "1:85982376523:web:750aa3889c1c2055c5d3ce",
  measurementId: "G-R6FCNSFXF5"
};

 const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app)
