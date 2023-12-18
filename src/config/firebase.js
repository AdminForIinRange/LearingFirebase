// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2sugaUmkw_VUWUC96hXM6Nj5dYPtiwQU",
  authDomain: "fir-project-f472b.firebaseapp.com",
  projectId: "fir-project-f472b",
  storageBucket: "fir-project-f472b.appspot.com",
  messagingSenderId: "565545373920",
  appId: "1:565545373920:web:2dc835f7392df2762fc085",
  measurementId: "G-SQ80DPT08L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app) 
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app);
