// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtPl_IVUKOWYbKKd4n5rAm-eCLb0IDbnI",
  authDomain: "findallytest-fa386.firebaseapp.com",
  projectId: "findallytest-fa386",
  storageBucket: "findallytest-fa386.appspot.com",
  messagingSenderId: "144990851171",
  appId: "1:144990851171:web:02121a031b82701a9de856",
  measurementId: "G-4G7TS18RYJ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
